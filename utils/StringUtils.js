console.log("工具类：字符串");

/** 工具类：DOM操作
 * @version 0.1.1
 */
const StringUtils = {

    isString: (s)=> '[object String]' === Object.prototype.toString.call(s),
    isNotString: function(s){return !StringUtils.isString(s)},
    notString: function(s){return StringUtils.isNotString(s)},

    /** 校验字符串是否为空 */
    isBlank: function (object) {
        if (null === object) {
            console.log("object is null");
            return true;
        }
        if (undefined === object || 'undefined' === typeof object) {
            console.log("object is undefined");
            return true;
        }
        if(this.notString(object)){
            console.log("object is not a string");
            return false;
        }
        if ("" === object.trim() || 0 === object.trim().length) {
            console.log("object is empty string");
            return true;
        }
        return false;
    },

    /** 校验字符串是否不为空 */
    isNotBlank: function (object) {return !this.isBlank(object)},
    notBlank: function(s){return StringUtils.isNotBlank(s)},


    /** 任意一个参数为空时返回 true */
    isBlanks: function () {
        for (let argument of arguments) {
            if (this.isBlank(argument))
                return true;
        }
        return false;
    },

    /** 任意一个参数不为空时返回 true */
    isNotBlanks: function () {
        for (let argument of arguments) {
            if (this.isNotBlank(argument))
                return true;
        }
        return false;
    },
    notBlanks: function(...s){return this.isNotBlanks(...s)},

    /** 校验字符串是否为空或无效的字符串（null、undefined 和 NaN） */
    isBlankOrInvalidString: function (object) {
        if(this.isBlank(object)) {
            return true;
        }
        let o = object.toString().trim();
        if('NaN' === o || isNaN(o)){
            console.log("object is [NaN] string");
            return true;
        }
        o = o.toLowerCase();
        if('undefined' === o){
            console.log("object is [undefined] string");
            return true;
        }
        if('null' === o){
            console.log("object is [null] string");
            return true;
        }
        return false;
    },

    /** 校验字符串是否不为空或无效的字符串（null、undefined 和 NaN） */
    isNotBlankOrInvalidString: function (object) {return !this.isBlankOrInvalidString(object)},
    notBlankOrInvalidString:  function(...s){return this.isNotBlankOrInvalidString(...s)},

    equals: (s1, s2, ignoreCase = false) =>
        ignoreCase && s1 && s2 ? s1.toUpperCase() === s2.toUpperCase() : s1 === s2,
    equalsIgnoreCase: function(s1, s2){this.equals(s1, s2, true)},

    /** 查找目标字符串中是否包含指定字符 */
    contains: (targetStr, ...substrs) => {
        if(!targetStr && !substrs) return true; // 两个都是无效值
        if(!targetStr || !substrs || 'string' !== typeof targetStr || substrs.length<1) return false;
        for (let substr of substrs) {
            if(targetStr.indexOf(substr.toString()) >= 0) return true;
        }
        return false;
    },
    /** 检查目标字符串中不包含指定字符 */
    notContain: function(targetStr, ...substrs){return !this.contains(targetStr, ...substrs)},

    containsIgnoreCase: (str, ...substrs) => {
        let newSubStrs = [];
        substrs.forEach(s=> newSubStrs.push(s.toLowerCase()));
        return this.contains(str.toLowerCase(), ...newSubStrs);
    },
    notContainsIgnoreCase: function(str, ...substrs){return !this.containsIgnoreCase(str, ...substrs)},


    /**
     * 获取随机字符串
     * @param str 随机字符候选组，字符重复越多权重越高
     * @param len 得到随机字符的长度
     * @returns {string}
     */
    getRandStr: (str, len)=>{
        let ret = '';
        while (len--) {
            ret += str[parseInt(Math.random() * str.length + '')];
        }
        return ret;
    },

    /** 反转义HTML转义符 */
    htmlDecode: function (text) {
        let temp = document.createElement("div");
        temp.style.display = "none!important";
        temp.style.visibility = "hidden!important";
        temp.innerHTML = text && text.toString ? text.toString() : String.toString(text);
        return temp.innerText || temp.textContent;
    },

}
