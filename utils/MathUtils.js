/** 工具类：数学
 * @version 0.0.4
 */
const MathUtils = {

    /** 范围内获取一个随机整数 */
    getRandomInt: (max, min=0) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /** 获取随机数字（字符串） */
    getRandom: (length) => (''+Math.random()).replace('0.','').substring(0, length),

    /** 转换成小数 */
    parseDecimal: function (x) {
        x = Number(parseFloat(x).toFixed(3).slice(0, -1));
        let f = parseFloat(x);
        if (isNaN(f)) {return false;}
        f = Math.round(x * 100) / 100;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },

    /** 补0操作 */
    getzf: function (num) {
        if (parseInt(num) < 10)
            num = '0' + num;
        return num;
    },

};
console.log("工具类：数学 MathUtils");
