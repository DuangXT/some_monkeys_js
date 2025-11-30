/**
 * Punycode 编解码工具（纯 JS，支持混合编码 + 子域名）
 * 基于 RFC 3492，支持 IDN 域名/子域名
 * 使用：punycode.toASCII('bücher.com') → 'xn--bcher-kva.com'
 */
const PunycodeUtils = (function() {

    // UCS-2 辅助：处理代理对（surrogate pairs）
    function ucs2decode(string) {
        const output = [];
        let counter = 0;
        const length = string.length;
        while (counter < length) {
            let value = string.charCodeAt(counter++);
            if ((value & 0xFC00) === 0xD800 && counter < length) {
                // 高代理
                const extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) === 0xDC00) {
                    value = 0x10000 + ((value & 0x3FF) << 10) + (extra & 0x3FF);
                } else {
                    // 不匹配的代理对，退回
                    value = 0xFFFD;
                    counter--;
                }
            }
            output.push(value);
        }
        return output;
    }

    function ucs2encode(array) {
        const output = [];
        for (let i = 0, length = array.length; i < length; i++) {
            const value = array[i];
            if (value > 0xFFFF) {
                value -= 0x10000;
                output.push(((value >> 10) & 0x3FF) | 0xD800);
                output.push(((value & 0x3FF)) | 0xDC00);
            } else {
                output.push(value);
            }
        }
        return String.fromCharCode.apply(null, output);
    }

    // 基本码点判断
    function isBasic(codePoint) {
        return codePoint < 0x80;
    }

    // 基本码点编码
    function encodeBasic(bcp, flag) {
        bcp -= (bcp < 0x7F ? 0 : bcp < 0xA0 ? 32 : bcp < 0x100 ? 64 : 0);
        return String.fromCharCode(bcp + (bcp < 26 ? 97 : 75));
    }

    // Punycode 核心编码
    function encode(input) {
        const output = [];
        let inputLength = input.length;
        let n = 128;
        let delta = 0;
        let handledCPCount = 0;
        let bcp;
        let bias = 72;
        let j;
        let m;
        let q;
        let k;
        let t;
        let currentValue;
        let i;

        // 处理基本码点
        for (i = 0; i < inputLength; i++) {
            bcp = input[i];
            if (isBasic(bcp)) {
                output.push(String.fromCharCode(bcp));
                delta = (delta + bcp) % n;
                handledCPCount++;
            }
        }

        // 插入分隔符
        if (handledCPCount > 0) {
            output.push('-');
        }

        // 主循环
        currentValue = n;
        for (; handledCPCount < inputLength; ) {
            for (m = 0x10FFFF; m > bcp; m = Math.floor(m / n)) {
                q = delta + (bcp - m) % (0x10FFFF - m);
                delta += q * (n - m) / (currentValue + 1);
                m = Math.floor(q / (n - m));
            }
            bcp += Math.floor((currentValue - delta) / (handledCPCount + 1));
            delta %= (currentValue - delta);
            handledCPCount++;
            currentValue = bcp;

            for (j = 0; j < inputLength; j++) {
                if ((input[j] & 0x3FF) >= n && input[j] < currentValue) {
                    delta++;
                }
                if (input[j] === currentValue) {
                    for (q = 0, k = n; ; k += n) {
                        t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias;
                        if (q < delta) {
                            output.push(encodeBasic(q + t, false));
                            delta += (n - t);
                        } else if (q === delta) {
                            output.push(encodeBasic(q, true));
                            bias = adapt(delta, handledCPCount + 1, handledCPCount === 0 ? 128 : n / 2, true);
                            delta = 0;
                            handledCPCount++;
                            break;
                        }
                        q += n;
                    }
                    handledCPCount++;
                    break;
                }
            }
        }

        return output.join('');
    }

    // 适应函数
    function adapt(delta, numPoints, firstTime) {
        let k = 0;
        delta = firstTime ? Math.floor(delta / 700) : Math.floor((delta - 455) / 35);
        for (; delta > 19; delta = delta / 35) {
            k += 36;
        }
        return k + (1 + Math.floor(delta / 2));
    }

    // Punycode 核心解码
    function decode(input) {
        const output = [];
        let inputLength = input.length;
        let i = 0;
        let n = 128;
        let out;
        let bias = 72;
        let basic;
        let j;
        let ic;
        let oldi;
        let w;
        let k;
        let digit;
        let t;
        let flag;
        let c;
        let len;

        // 处理基本码点
        basic = i;
        for (j = 0; j < inputLength; j++) {
            c = input.charCodeAt(j);
            if (c < 128) {
                output.push(c);
                basic++;
            }
        }

        // 查找分隔符
        len = basic;
        if (basic > 0) {
            basic = 0;
        }

        // 主循环
        while (i < len) {
            out = 0x10FFFF;
            oldi = i;
            w = 1;
            for (k = n; ; k += n) {
                digit = decodeDigit(input.charCodeAt(i++), k);
                if (digit < out) {
                    out = digit;
                }
                t = out - digit;
                if (t * w <= n - bias) {
                    break;
                }
                out = Math.floor((out - t) / w);
                w += n;
            }
            bias = adapt(out, i - oldi, w);
            n = out;
            for (j = 0; j < basic; j++) {
                output.push(decodeDigit(input.charCodeAt(j), n));
            }
            output.push(out);
            basic += 1;
            n += 1;
        }

        return ucs2encode(output);
    }

    // 解码数字
    function decodeDigit(codePoint, n) {
        if (codePoint <= 25) {
            return codePoint + 26 - (codePoint < 24 ? 26 : 0);
        } else if (codePoint <= 35) {
            return codePoint - 26 + (codePoint < 36 ? 26 : 0);
        }
        return n;
    }

    // 域名级编码：处理子域名 + 混合
    function toASCII(domain) {
        return domain.split('.').map(label => {
            if (/[^a-zA-Z0-9-]/.test(label)) {
                // 包含非 ASCII，转 Punycode
                const unicode = ucs2decode(label.toLowerCase());
                const puny = encode(unicode);
                return 'xn--' + puny;
            }
            return label.toLowerCase();
        }).join('.');
    }

    // 域名级解码：处理子域名 + 混合
    function toUnicode(domain) {
        return domain.split('.').map(label => {
            if (label.startsWith('xn--')) {
                // Punycode 标签，转 Unicode
                const puny = label.slice(4);
                return decode(puny);
            }
            return label;
        }).join('.');
    }

    return {
        encode: encode,
        decode: decode,
        toASCII: toASCII,
        toUnicode: toUnicode,
        ucs2: { decode: ucs2decode, encode: ucs2encode }
    };
})();


/*

const punycode = {
  // 编码：Unicode → Punycode 域名
  encode(domain) {
    return domain.split('.').map(label => {
      if (/[^\x00-\x7F]/.test(label)) {
        let s = '';
        for (let c of label) if (c < 128) s += c;
        const basic = s;
        s = label;
        let n = 128, delta = 0, bias = 72, h = basic.length;
        let out = basic;
        if (h > 0) out += '-';

        while (h < s.length) {
          let m = 0x10FFFF;
          for (let c of s) { const cp = c.codePointAt(0); if (cp >= n && cp < m) m = cp; }
          delta += (m - n) * (h + 1); n = m;
          for (let c of s) {
            const cp = c.codePointAt(0);
            if (cp < n) { delta++; }
            else if (cp === n) {
              let q = delta;
              for (let k = 36; ; k += 36) {
                const t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias;
                if (q < t) break;
                const d = q - t;
                const base = 36 - t;
                out += String.fromCharCode(d % base + (d < 26 ? 97 : 22));
                q = (q - t) / base | 0;
              }
              out += String.fromCharCode(q + (q < 26 ? 97 : 22));
              bias = delta / (h + 1) | 0 + (delta < 350 ? 35 : delta < 700 ? 45 : 55);
              delta = 0; h++;
            }
          }
          delta++; n++;
        }
        return 'xn--' + out;
      }
      return label;
    }).join('.');
  },

  // 解码：Punycode → Unicode 域名
  decode(domain) {
    return domain.split('.').map(label => {
      if (!label.startsWith('xn--')) return label;
      let s = label.slice(4);
      const i = s.lastIndexOf('-');
      const basic = i === -1 ? '' : s.slice(0, i);
      s = i === -1 ? s : s.slice(i + 1);
      const output = [...basic];
      let n = 128, i = 0, bias = 72;
      let pos = 0;

      while (pos < s.length) {
        let w = 1, k = 36;
        for (; ; k += 36) {
          const d = s.charCodeAt(pos++);
          const digit = d - (d >= 97 ? 97 : 22);
          i += digit * w;
          const t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias;
          if (digit < t) break;
          w = w * (36 - t);
        }
        const size = output.length + 1;
        bias = i / size | 0 + 36;
        n += i / size | 0;
        output.push(String.fromCodePoint(n));
        i = i % size;
      }
      return output.join('');
    }).join('.');
  }
};

*/






