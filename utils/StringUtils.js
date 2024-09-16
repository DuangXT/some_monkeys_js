/** 工具类：DOM操作
 * @version 0.1.6
 */
const StringUtils = (function () {

    const isString = s => '[object String]' === Object.prototype.toString.call(s);
    const isNotString = function (s) {
        return !StringUtils.isString(s)
    };


    /** 校验字符串是否为空 */
    const isBlank = function (object) {
        if (null === object) {
            console.log("object is null");
            return true;
        }
        if (undefined === object || 'undefined' === typeof object) {
            console.log("object is undefined");
            return true;
        }
        if (isNotString(object)) {
            console.log("object is not a string");
            return false;
        }
        if ("" === object.trim() || 0 === object.trim().length) {
            console.log("object is empty string");
            return true;
        }
        return false;
    };

    /** 校验字符串是否不为空 */
    const isNotBlank = function (object) {
        return !isBlank(object)
    };

    /** 任意一个参数不为空时返回 true */
    const isNotBlanks = function () {
        for (let argument of arguments) {
            if (isNotBlank(argument)) return true;
        }
        return false;
    };

    /** 校验字符串是否为空或无效的字符串（null、undefined 和 NaN） */
    const isBlankOrInvalidString = function (object) {
        if (this.isBlank(object)) {
            return true;
        }
        let o = object.toString().trim();
        if ('NaN' === o || isNaN(o)) {
            console.log("object is [NaN] string");
            return true;
        }
        o = o.toLowerCase();
        if ('undefined' === o) {
            console.log("object is [undefined] string");
            return true;
        }
        if ('null' === o) {
            console.log("object is [null] string");
            return true;
        }
        return false;
    };

    /** 校验字符串是否不为空或无效的字符串（null、undefined 和 NaN） */
    const isNotBlankOrInvalidString = function (object) {
        return !this.isBlankOrInvalidString(object)
    };

    const equals = (s1, s2, ignoreCase = false) =>
        ignoreCase && s1 && s2 ? s1.toUpperCase() === s2.toUpperCase() : s1 === s2;


    /** 查找目标字符串中是否包含指定字符 */
    const contains = (targetStr, ...substrs) => {
        if (!targetStr && !substrs) return true; // 两个都是无效值
        if (!targetStr || !substrs || 'string' !== typeof targetStr || substrs.length < 1) return false;
        for (let substr of substrs) {
            if (targetStr.indexOf(substr.toString()) >= 0) return true;
        }
        return false;
    };


    const containsIgnoreCase = (str, ...substrs) => {
        let newSubStrs = [];
        substrs.forEach(s => newSubStrs.push(s.toString().toUpperCase()));
        return this.contains(str.toUpperCase(), ...newSubStrs);
    };

    /**
     * 获取随机字符串
     * @param str 随机字符候选组，字符重复越多权重越高
     * @param len 得到随机字符的长度
     * @returns {string}
     */
    const getRandStr = (str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', len) => {
        let randomText = '';
        while (len--) {
            randomText += str.charAt(Math.floor(Math.random() * str.length));
            // str[parseInt(Math.random() * str.length + '')];
        }
        return randomText;
    };

    return {
        isString,
        isNotString,
        notString: isNotString,

        /** 安全地将对象转换成string */
        toString: object => {
            switch (typeof object) {
                case 'function':
                case 'boolean':
                    return object.toString();
                case 'number':
                    object = Number.isInteger(object) ?
                        object.toLocaleString('fullwide', {useGrouping: false})
                        : object.toFixed(20);
                    break;
                case 'object':
                    object = null !== object ? JSON.stringify(object) : '';
                    break;
                case 'undefined':
                    object = '';
                    break;
            }
            return object;
        },

        isBlank,
        isNotBlank,
        notBlank: isNotBlank,

        /** 任意一个参数为空时返回 true */
        isBlanks: function () {
            for (let argument of arguments) {
                if (isBlank(argument)) return true;
            }
            return false;
        },

        isNotBlanks,
        notBlanks: isNotBlank,

        isBlankOrInvalidString,

        isNotBlankOrInvalidString,
        notBlankOrInvalidString: isNotBlankOrInvalidString,


        equals,
        equalsIgnoreCase: function (s1, s2) {
            return equals(s1, s2, true)
        },


        contains,
        /** 检查目标字符串中不包含指定字符 */
        notContain: function (targetStr, ...substrs) {
            return !contains(targetStr, ...substrs)
        },


        containsIgnoreCase,
        notContainsIgnoreCase: function (str, ...substrs) {
            return !this.containsIgnoreCase(str, ...substrs)
        },


        getRandStr,
        generateRandomText: getRandStr,


        /** 反转义HTML转义符 */
        htmlDecode: function (text) {
            let temp = document.createElement("div");
            temp.style.display = "none!important";
            temp.style.visibility = "hidden!important";
            temp.innerHTML = text && text.toString ? text.toString() : String.toString(text);
            return temp.innerText || temp.textContent;
        },

        /** 使用正则表式去掉全部 HTML/XML 标签 */
        removeTags: text => text.replaceAll(/<[^>]+>/g, ''),

    }

});
console.log("工具类：字符串 StringUtils");
