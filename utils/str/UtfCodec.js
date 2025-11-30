/**
 * 通用 UTF 编解码器
 * 支持: UTF-8, UTF-16LE, UTF-16BE
 * 输入: 字符串 或 \xHH 字节串
 * 输出: 字符串 或 \xHH 字节串
 */
const UtfCodec =  (function() {
    // === 编码：字符串 → \xHH 字节串 ===
    function encode(str, format = 'utf8') {
        const encoder = new TextEncoder(format.replace('16', '-16'));
        const bytes = encoder.encode(str);
        return Array.from(bytes)
            .map(b => '\\x' + b.toString(16).padStart(2, '0'))
            .join('');
    };

    // === 解码：\xHH 字节串 → 字符串（自动识别编码）===
    function decode(hexStr) {
        // 提取所有 \xHH
        const matches = hexStr.match(/\\x([0-9A-Fa-f]{2})/gi);
        if (!matches) return '';

        const bytes = matches.map(m => parseInt(m.slice(2), 16));
        const view = new Uint8Array(bytes);

        // === 自动识别编码 ===
        // 1. UTF-16 BOM
        if (bytes.length >= 2) {
            if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
                return new TextDecoder('utf-16le').decode(view.slice(2));
            }
            if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
                return new TextDecoder('utf-16be').decode(view.slice(2));
            }
        }

        // 2. 尝试 UTF-16LE（常见）
        try {
            const str16le = new TextDecoder('utf-16le').decode(view);
            if (_isValidUTF16(str16le)) return str16le;
        } catch (e) {}

        // 3. 尝试 UTF-16BE
        try {
            const reversed = new Uint8Array(bytes).reverse();
            const str16be = new TextDecoder('utf-16be').decode(reversed);
            if (_isValidUTF16(str16be)) return str16be;
        } catch (e) {}

        // 4. 默认 UTF-8
        return new TextDecoder('utf-8', { fatal: false }).decode(view);
    };

    // 辅助：判断是否有效 UTF-16 字符串（无孤立代理）
    function _isValidUTF16(str) {
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            if (code >= 0xD800 && code <= 0xDBFF) {
                if (i + 1 >= str.length) return false;
                const low = str.charCodeAt(i + 1);
                if (low < 0xDC00 || low > 0xDFFF) return false;
                i++;
            } else if (code >= 0xDC00 && code <= 0xDFFF) {
                return false;
            }
        }
        return true;
    };

    return {encode, decode};
})();