const MathUtils = {

    /**
     * 获取随机字符串
     * @param str 随机字符候选组，字符重复越多权重越高
     * @param len 得到随机字符的长度
     * @returns {string}
     */
    getRandStr: function (str, len) {
        let ret = '';
        while (len--) {
            ret += str[parseInt(Math.random() * str.length)];
        }
        return ret;
    },

    /** 范围内获取一个随机整数 */
    getRandomInt: (max, min=0) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },


};

