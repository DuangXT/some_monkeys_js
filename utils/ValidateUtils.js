
/** 工具类：有效性校验
 * @version 0.1.0
 */
const ValidateUtils = {

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
        if ("" === object.trim()) {
            console.log("object is empty");
            return true;
        }
        if (0 === object.trim().length) {
            console.log("object.length is 0");
            return true;
        }
        return false;
    },

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


    /** 任意一个参数为空时返回 true */
    isBlanks: function () {
        for (let argument of arguments) {
            if (this.isBlank(argument))
                return true;
        }
        return false;
    },

    /** 校验字符串是否不为空 */
    isNotBlank: function (object) {
        return !(this.isBlank(object))
    },

    /** 校验字符串是否不为空或无效的字符串（null、undefined 和 NaN） */
    isNotBlankOrInvalidString: function (object) {
        return !(this.isBlankOrInvalidString(object))
    },

    /** 任意一个参数不为空时返回 true */
    isNotBlanks: function () {
        for (let argument of arguments) {
            if (this.isNotBlank(argument))
                return true;
        }
        return false;
    },

    /** 是否设置有真值内容（空、0、false、空格等都为假值） */
    isSet: function (object) {
        if(this.isBlankOrInvalidString(object)){
            return false;
        }
        if(0.0 === object){
            console.log("object is zero number");
            return false;
        }
        if('false' === object.toString().trim()){
            console.log("object is false string");
            return false;
        }
        return true;
    },

    /**判断一个对象是否为空 */
    isBlankObject: obj=> JSON.stringify(obj) === "{}" || Object.keys(obj).length === 0,

    /** 判断一个对象是否不为空 */
    notBlankObject: function (obj) {
        return !(this.isBlankObject(obj))
    },
}