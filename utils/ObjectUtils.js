/** 工具类：对象操作
 * @version 0.0.6
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/MathUtils.js
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/NodeUtils.js
 */
const ObjectUtils = (function() {
    if(!NodeUtils || !MathUtils){
        console.error("缺少依赖！！！", "工具类：对象操作 ObjectUtils", "NodeUtils", "MathUtils");
        return {};
    }

    const isObject = obj => 'object' === typeof obj;
    const notObject = function(obj){return !isObject(obj)};

    return {
        isObject,
        notObject,

        /** 随机获取对象内的一个值 */
        getRandomValue: function(obj){
            if(Array.isArray(obj) || NodeUtils.isNodeList(obj)){
                return obj[MathUtils.getRandomInt(obj.length)];
            } // 非数组类型的作为对象处理
            if(notObject(obj)){
                throw new TypeError('not a object');
            }
            let keys = Object.keys(obj);
            return obj[keys[MathUtils.getRandomInt(keys.length)]];
        },

        /** 对象长路径快捷获取值(key.key.key) */
        getPathValue:(obj, path)=>{
            const keys = path.split('.');
            let result = obj;
            for (let key of keys) {
                result = result[key];
            }
            return result;
        },

    }
});
console.log("工具类：对象操作 ObjectUtils");
