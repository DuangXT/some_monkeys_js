/** 工具类：有效性校验
 * @version 0.1.4
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
 */
const ValidateUtils = (function () {
    if(!StringUtils){
        console.error("缺少依赖！！！", "工具类：有效性校验 ValidateUtils", "StringUtils");
        return {};
    }

    /**判断一个对象是否为空 */
    const isBlankObject = obj => JSON.stringify(obj) === "{}" || Object.keys(obj).length === 0;

    /** 判断一个对象是否不为空 */
    const isNotBlankObject = obj => !isBlankObject(obj);

    return {
        /** 是否设置有真值内容（空、0、false、空格等都为假值） */
        isSet: function (object) {
            if (StringUtils.isBlankOrInvalidString(object)) {
                return false;
            }
            if (0.0 === object) {
                console.log("object is zero number");
                return false;
            }
            if ('FALSE' === object.toString().trim().toUpperCase()) {
                console.log("object is false string");
                return false;
            }
            return true;
        },

        isBlankObject,

        isNotBlankObject,
        notBlankObject: isNotBlankObject,
    }
})();
console.log("工具类：有效性校验 ValidateUtils");
