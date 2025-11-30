/**
 * 工具类：对象数组 Objects Array
 * @version 0.0.2
 */
const ObjectArrayUtils = {

    /** 对象数组做去重处理 */
    deduplicationJsonArray: jsonArray => // Array.from(JSON.stringify([...new Set(array)])),
        Array.from(new Set(jsonArray.map(JSON.stringify))).map(JSON.parse),

    /** 使用reduce()方法和Map对象处理去重 */
    deduplicationByReduce: array =>
        Array.from(array.reduce((previous, current)=>{
            let key = current.id + '|' + current.name;
            if (!previous.get(key)) {
                previous.set(key, current);
            }
            return previous;
        }, new Map()).values()),

    /** 使用filter()方法和临时对象处理去重 */
    deduplicationByFilter: array => {
        let tempobj = {};
        return array.filter(obj => {
            let key = obj.id + '|' + obj.name;
            if (!tempobj[key]) {
                tempobj[key] = true;
                return true;
            }
            return false;
        });
    },
}
console.log("工具类：对象数组 Objects Array  ObjectArrayUtils");

