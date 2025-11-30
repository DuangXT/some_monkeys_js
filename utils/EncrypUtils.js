const EncrypUtils = (function () {

    /**
     * MD5 加密函数（纯 JavaScript 实现）
     * @param {string} message - 要加密的字符串
     * @param {number} [bits=32] - 输出位数：32（默认）或 16
     * @returns {string} 十六进制哈希值（32 位或 16 位）
     */
    function md5(message, bits = 32) {
        if (bits !== 16 && bits !== 32) bits = 32;

        // 使用 TextEncoder 转为 UTF-8 字节
        const encoder = new TextEncoder();
        let bytes = encoder.encode(message);

        // MD5 初始状态（小端）
        let a = 0x67452301;
        let b = 0xefcdab89;
        let c = 0x98badcfe;
        let d = 0x10325476;

        const leftRotate = (x, n) => (x << n) | (x >>> (32 - n));
        const add32 = (x, y) => (x + y) | 0;

        const F = (x, y, z) => (x & y) | (~x & z);
        const G = (x, y, z) => (x & z) | (y & ~z);
        const H = (x, y, z) => x ^ y ^ z;
        const I = (x, y, z) => y ^ (x | ~z);

        // 常量表 T[i]
        const T = new Uint32Array(64);
        for (let i = 0; i < 64; i++) {
            T[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0;
        }

        // 每轮左移位数
        const S = [
            7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
            5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
            4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
            6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
        ];

        // 填充消息
        const bitLen = bytes.length * 8;
        const paddedLen = Math.ceil((bitLen + 65) / 512) * 512;
        const padded = new Uint8Array(paddedLen >>> 3);
        padded.set(bytes);
        padded[bytes.length] = 0x80;

        // 追加长度（64 位小端）
        const lenHi = (bitLen / 0x100000000) >>> 0;
        const lenLo = bitLen >>> 0;
        const base = padded.length - 8;
        for (let i = 0; i < 4; i++) {
            padded[base + i] = (lenLo >>> (i * 8)) & 0xff;
            padded[base + 4 + i] = (lenHi >>> (i * 8)) & 0xff;
        }

        // 转为 32 位字数组（小端）
        const words = new Uint32Array(padded.length >>> 2);
        for (let i = 0; i < words.length; i++) {
            const j = i * 4;
            words[i] = padded[j] | (padded[j + 1] << 8) | (padded[j + 2] << 16) | (padded[j + 3] << 24);
        }

        // 主循环：每 512 位处理一次
        for (let i = 0; i < words.length; i += 16) {
            let A = a, B = b, C = c, D = d;
            for (let j = 0; j < 64; j++) {
                let f, g;
                if (j < 16) {
                    f = F(B, C, D);
                    g = j;
                } else if (j < 32) {
                    f = G(B, C, D);
                    g = (5 * j + 1) % 16;
                } else if (j < 48) {
                    f = H(B, C, D);
                    g = (3 * j + 5) % 16;
                } else {
                    f = I(B, C, D);
                    g = (7 * j) % 16;
                }

                const temp = D;
                D = C;
                C = B;
                B = add32(B, leftRotate(add32(add32(A, f), add32(T[j], words[i + g])), S[j]));
                A = temp;
            }
            a = add32(a, A);
            b = add32(b, B);
            c = add32(c, C);
            d = add32(d, D);
        }

        // 组装 16 字节摘要
        const digest = new Uint8Array(16);
        [a, b, c, d].forEach((val, i) => {
            for (let j = 0; j < 4; j++) {
                digest[i * 4 + j] = (val >>> (j * 8)) & 0xff;
            }
        });

        // 输出：32 位全部，16 位取中间 8 字节（第 4~11 字节）
        const resultBytes = bits === 16 ? digest.slice(4, 12) : digest;
        return Array.from(resultBytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    return {

        md5,

    };
})();
console.log("工具类：EncrypUtils 文本加密工具");