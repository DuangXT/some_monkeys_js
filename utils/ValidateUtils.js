console.log("工具类：有效性校验");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
/** 工具类：有效性校验
 * @version 0.1.1
 */
const ValidateUtils = {

    /** 是否设置有真值内容（空、0、false、空格等都为假值） */
    isSet: function (object) {
        if(StringUtils.isBlankOrInvalidString(object)){
            return false;
        }
        if(0.0 === object){
            console.log("object is zero number");
            return false;
        }
        if('FALSE' === object.toString().trim().toUpperCase()){
            console.log("object is false string");
            return false;
        }
        return true;
    },

    /**判断一个对象是否为空 */
    isBlankObject: obj => JSON.stringify(obj) === "{}" || Object.keys(obj).length === 0,

    /** 判断一个对象是否不为空 */
    isNotBlankObject: obj => !ValidateUtils.isBlankObject(obj),
    notBlankObject: ValidateUtils.isNotBlankObject,

}