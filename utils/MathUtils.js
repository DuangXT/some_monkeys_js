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
    }




};

