// !!!!!! 错误办法
const UTF16 = {
    // 编码：字符串 → \x 字节序列
    encode(str, littleEndian = true, includeBOM = true) {
        const encoder = new TextEncoder(littleEndian ? 'utf-16le' : 'utf-16be');
        const uint8 = encoder.encode(str);
        const bytes = new Uint8Array(uint8);

        if (includeBOM) {
            const bom = littleEndian ? [0xFF, 0xFE] : [0xFE, 0xFF];
            const withBOM = new Uint8Array(bom.length + bytes.length);
            withBOM.set(bom, 0);
            withBOM.set(bytes, bom.length);
            return Array.from(withBOM)
                .map(b => '\\x' + b.toString(16).padStart(2, '0'))
                .join('');
        }

        return Array.from(bytes)
            .map(b => '\\x' + b.toString(16).padStart(2, '0'))
            .join('');
    },

    // 解码：\x 字节序列 → 字符串
    decode(hexStr) {
        const matches = hexStr.match(/\\x([0-9a-fA-F]{2})/g);
        if (!matches) return '';

        const bytes = matches.map(m => parseInt(m.slice(2), 16));
        let littleEndian = true;
        let offset = 0;

        // 检测 BOM
        if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
            littleEndian = false;
            offset = 2;
        } else if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
            littleEndian = true;
            offset = 2;
        }

        const uint16 = new Uint16Array(bytes.slice(offset));
        const decoder = new TextDecoder(littleEndian ? 'utf-16le' : 'utf-16be');
        return decoder.decode(uint16);
    }
};
