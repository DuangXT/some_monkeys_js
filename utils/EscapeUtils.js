const EscapeUtils = (function () {

    function unicode(str) {
        try {
            let escaped = '';
            for (let i = 0; i < str.length; i++) {
                let hex = str.charCodeAt(i).toString(16);
                escaped += '\\u' + ('0000' + hex).slice(-4);
            }
            return escaped;
        } catch (e) {
            console.error(e);
        }
    };

    function unicodeUnescape(str) {
        try {
            return str.replace(/\\u[\dA-F]{4}/gi, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)))
        } catch (e) {
            console.error(e);
        }
    };

    function hex(str) {
        try {
            let hex = '';
            for (let i = 0; i < str.length; i++) {
                hex += '' + str.charCodeAt(i).toString(16).padStart(2, '0');
            }
            return hex;
        } catch (e) {
            console.error(e);
        }
    };

    function hexDecode(hex) {
        try {
            hex = hex.replace(/[^0-9A-Fa-f]/g, '');
            let str = '';
            for (let i = 0; i < hex.length; i += 2) {
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
            return str;
        } catch (e) {
            console.error(e);
        }
    };

    function htmlEscape(str) {
        try {
            return str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        } catch (e) {
            console.error(e);
        }
    };

    function htmlUnescape(str) {
        try {
            return str.replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"').replace(/&#039;/g, "'");
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 字符串编码为 UTF-16LE 字节序列（\x 形式）
     * @param {string} str - 输入字符串
     * @param {boolean} littleEndian - true=LE, false=BE (默认 LE)
     * @returns {string} 如 "\xFF\xFE\x4C\x00"
     */
    function encodeUTF16(str, littleEndian = true) {
        const encoder = new TextEncoder('utf-16le'); // 内置支持 UTF-16LE
        const uint8 = encoder.encode(str);
        const bytes = littleEndian ? uint8 : uint8.reverse();
        return Array.from(bytes)
            .map(b => '\\x' + b.toString(16).padStart(2, '0'))
            .join('');
    };

    /**
     * 解码 \x 字节序列为字符串（支持 UTF-16LE/BE + BOM 自动检测）
     * @param {string} hexStr - 如 "\xFF\xFE\x4C\x00"
     * @returns {string}
     */
    function decodeUTF16(hexStr) {
        // 提取所有 \xHH
        const matches = hexStr.match(/\\x([0-9a-fA-F]{2})/g);
        if (!matches) return '';

        // 转为字节数组
        const bytes = matches.map(m => parseInt(m.slice(2), 16));

        // 自动检测 BOM
        let littleEndian = true;
        if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
            littleEndian = false;
            bytes.splice(0, 2); // 移除 BOM
        } else if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
            littleEndian = true;
            bytes.splice(0, 2);
        }

        // 转为 Uint16Array
        const uint16 = new Uint16Array(bytes);
        const decoder = new TextDecoder(littleEndian ? 'utf-16le' : 'utf-16be');
        return decoder.decode(uint16);
    };


    return {

        unicode, unicodeUnescape,

        hex, hexDecode,

        htmlEscape, htmlUnescape,

        encodeUTF16, decodeUTF16,
    };
})();
console.log("工具类：EscapeUtils 文本转义工具");
