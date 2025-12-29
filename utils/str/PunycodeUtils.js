// 建议直接使用
// by trae
/**
 * Punycode 编码与解码工具 (RFC 3492)
 *
 * 变量命名说明：
 * - codePoint: 当前处理的字符码点 (RFC中的 n)
 * - bias: 偏差值，用于动态调整阈值
 * - delta: 增量值，表示状态距离
 * - basicCodePoints: 基础 ASCII 字符
 */
const PunycodeUtils = (function () {

    const CONSTANTS = {
        BASE: 36,
        T_MIN: 1,
        T_MAX: 26,
        SKEW: 38,
        DAMP: 700,
        INITIAL_BIAS: 72,
        INITIAL_CODE_POINT: 128,
        DELIMITER: '-'
    };

    /** 计算新的偏差值 (Adaptation) */
    function adaptBias(delta, numPoints, isFirstTime) {
        let k = 0;
        delta = isFirstTime ? Math.floor(delta / CONSTANTS.DAMP) : Math.floor(delta / 2);
        delta += Math.floor(delta / numPoints);

        while (delta > ((CONSTANTS.BASE - CONSTANTS.T_MIN) * CONSTANTS.T_MAX) / 2) {
            delta = Math.floor(delta / (CONSTANTS.BASE - CONSTANTS.T_MIN));
            k += CONSTANTS.BASE;
        }
        return Math.floor(k + ((CONSTANTS.BASE - CONSTANTS.T_MIN + 1) * delta) / (delta + CONSTANTS.SKEW));
    }

    /** 将数字转换为基本字符 (0-25 -> a-z, 26-35 -> 0-9) */
    function digitToBasicChar(digit) {
        return String.fromCharCode(digit + 22 + 75 * (digit < 26));
    }

    /** 将基本字符转换为数字 */
    function basicCharToDigit(code) {
        if (code - 48 < 10) return code - 22;
        if (code - 65 < 26) return code - 65;
        if (code - 97 < 26) return code - 97;
        return CONSTANTS.BASE;
    }

    /** 解码 Punycode 字符串 (不带 xn-- 前缀) */
    function decodeString(input) {
        const output = [];
        const inputLength = input.length;
        let codePoint = CONSTANTS.INITIAL_CODE_POINT;
        let bias = CONSTANTS.INITIAL_BIAS;
        let workIndex = 0; // RFC中的 i

        // 1. 处理基础字符 (分隔符之前的部分)
        const lastDelimiterIndex = input.lastIndexOf(CONSTANTS.DELIMITER);
        let encodedStartIndex = 0;

        if (lastDelimiterIndex > 0) {
            for (let j = 0; j < lastDelimiterIndex; j++) {
                const charCode = input.charCodeAt(j);
                if (charCode >= 0x80) throw new Error('Illegal input >= 0x80');
                output.push(charCode);
            }
            encodedStartIndex = lastDelimiterIndex + 1;
        }

        // 2. 主循环处理编码部分
        let inputIndex = encodedStartIndex;

        while (inputIndex < inputLength) {
            const oldWorkIndex = workIndex;
            let weight = 1;

            for (let step = CONSTANTS.BASE; ; step += CONSTANTS.BASE) {
                if (inputIndex >= inputLength) throw new Error('Punycode: Bad input');

                const charCode = input.charCodeAt(inputIndex++);
                const digit = basicCharToDigit(charCode);

                if (digit >= CONSTANTS.BASE) throw new Error('Punycode: Invalid input char');
                if (digit > Math.floor((Number.MAX_SAFE_INTEGER - workIndex) / weight)) throw new Error('Punycode: Overflow');

                workIndex += digit * weight;

                let threshold; // RFC中的 t
                if (step <= bias + CONSTANTS.T_MIN) threshold = CONSTANTS.T_MIN;
                else if (step >= bias + CONSTANTS.T_MAX) threshold = CONSTANTS.T_MAX;
                else threshold = step - bias;

                if (digit < threshold) break;

                if (weight > Math.floor(Number.MAX_SAFE_INTEGER / (CONSTANTS.BASE - threshold))) throw new Error('Punycode: Overflow');
                weight *= (CONSTANTS.BASE - threshold);
            }

            const numPoints = output.length + 1;
            bias = adaptBias(workIndex - oldWorkIndex, numPoints, oldWorkIndex === 0);

            if (Math.floor(workIndex / numPoints) > Number.MAX_SAFE_INTEGER - codePoint) throw new Error('Punycode: Overflow');

            codePoint += Math.floor(workIndex / numPoints);
            workIndex %= numPoints;

            output.splice(workIndex, 0, codePoint);
            workIndex++;
        }

        return String.fromCodePoint(...output);
    }

    /** 编码 Unicode 字符串为 Punycode */
    function encodeString(input) {
        const output = [];
        // 将字符串转换为码点数组
        const inputCodePoints = [];
        for (const char of input) {
            inputCodePoints.push(char.codePointAt(0));
            if (char.codePointAt(0) > 0xFFFF) {
                // 跳过代理对的第二个部分，如果使用了 for...of 配合 codePointAt 通常不需要手动跳过，
                // 但如果 input 是普通 string，for-of 会正确迭代 code point。
            }
        }
        // 注意：上面的循环对于代理对会自动正确处理（ES6特性）
        // 但是我们需要确保 inputCodePoints 里存的是完整的码点，而不是 UTF-16 单元
        // 使用 Array.from(input) 或者 ...input 更安全
        const codePoints = Array.from(input).map(c => c.codePointAt(0));

        // 1. 复制基础字符 (ASCII)
        for (const code of codePoints) {
            if (code < 128) {
                output.push(String.fromCharCode(code));
            }
        }

        const basicLength = output.length;
        let handledCount = basicLength;

        if (basicLength > 0) {
            output.push(CONSTANTS.DELIMITER);
        }

        let codePoint = CONSTANTS.INITIAL_CODE_POINT;
        let delta = 0;
        let bias = CONSTANTS.INITIAL_BIAS;

        // 2. 主循环处理非 ASCII 字符
        while (handledCount < codePoints.length) {
            // 寻找下一个最小的未处理码点
            let minCodePoint = Number.MAX_SAFE_INTEGER;
            for (const code of codePoints) {
                if (code >= codePoint && code < minCodePoint) {
                    minCodePoint = code;
                }
            }

            if (minCodePoint - codePoint > Math.floor((Number.MAX_SAFE_INTEGER - delta) / (handledCount + 1))) {
                throw new Error('Punycode: Overflow');
            }

            delta += (minCodePoint - codePoint) * (handledCount + 1);
            codePoint = minCodePoint;

            for (const code of codePoints) {
                if (code < codePoint) {
                    delta++;
                    if (delta === 0) throw new Error('Punycode: Overflow');
                }

                if (code === codePoint) {
                    let currentDelta = delta;
                    for (let step = CONSTANTS.BASE; ; step += CONSTANTS.BASE) {
                        let threshold;
                        if (step <= bias + CONSTANTS.T_MIN) threshold = CONSTANTS.T_MIN;
                        else if (step >= bias + CONSTANTS.T_MAX) threshold = CONSTANTS.T_MAX;
                        else threshold = step - bias;

                        if (currentDelta < threshold) break;

                        output.push(digitToBasicChar(threshold + (currentDelta - threshold) % (CONSTANTS.BASE - threshold)));
                        currentDelta = Math.floor((currentDelta - threshold) / (CONSTANTS.BASE - threshold));
                    }

                    output.push(digitToBasicChar(currentDelta));
                    bias = adaptBias(delta, handledCount + 1, handledCount === basicLength);
                    delta = 0;
                    handledCount++;
                }
            }

            delta++;
            codePoint++;
        }

        return output.join('');
    }


    /** 解码 Punycode 域名 */
    function decode(domain) {
        return domain.split('.').map(part => {
            if (part.startsWith('xn--')) return decodeString(part.substring(4));
            return part;
        }).join('.');
    }

    /** 编码 Unicode 域名 */
    function encode(domain) {
        return domain.split('.').map(part => {
            if (/^[\x00-\x7F]*$/.test(part)) return part; // 如果全是 ASCII，不需要编码
            return 'xn--' + encodeString(part);
        }).join('.');
    }


    return {
        encode: encode,
        decode: decode,
    };
})();


