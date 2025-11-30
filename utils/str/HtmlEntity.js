/**
 * HTML 深度实体编解码工具
 * -------------------------------------------------
 * encode(str)          → "123" → "&#x31;&#x32;&#x33;"
 * decode(str)          → "&#x31;&#x32;&#x33;" → "123"
 * encodeDeep(obj)      → 递归编码对象/数组中的所有字符串
 * decodeDeep(obj)      → 递归解码对象/数组中的所有字符串
 */
const HtmlEntity = {
    // ---------- 基础编码 ----------
    encode(str, useHex = true) {
        if (typeof str !== 'string') return str;
        return str.split('').map(ch => {
            const code = ch.charCodeAt(0);
            // 常见安全字符直接保留（可自行增删）
            if (code === 0x09 || code === 0x0A || code === 0x0D ||
                (code >= 0x20 && code <= 0x7E && !'<>&"\''.includes(ch))) {
                return ch;
            }
            return useHex
                ? `&#x${code.toString(16).toUpperCase()};`
                : `&#${code};`;
        }).join('');
    },

    // ---------- 基础解码 ----------
    decode(str) {
        if (typeof str !== 'string') return str;

        // 1. 解码 &#xHH; / &#NNN;
        str = str.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        str = str.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));

        // 2. 解码已命名的实体（可选，内置常见表）
        const named = {
            lt: '<', gt: '>', amp: '&', quot: '"', apos: "'",
            nbsp: '\u00A0', copy: '©', reg: '®', euro: '€' // 按需补充
        };
        str = str.replace(/&([a-zA-Z]+);/g, (m, name) => named[name] ?? m);
        return str;
    },

    // ---------- 深度递归 ----------
    encodeDeep(obj, useHex = true) {
        return this._deep(obj, v => this.encode(v, useHex));
    },
    decodeDeep(obj) {
        return this._deep(obj, v => this.decode(v));
    },

    // 内部递归实现
    _deep(obj, fn) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) {
            return obj.map(v => this._deep(v, fn));
        }
        const result = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                result[key] = (typeof val === 'string') ? fn(val) : this._deep(val, fn);
            }
        }
        return result;
    }
};