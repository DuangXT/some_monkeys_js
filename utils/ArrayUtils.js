console.log("工具类：数组");
/**
 * 工具类：数组
 * @version 0.0.3
 */
const ArrayUtils = {
    /** 去重排序 */
    sortHeavy: array=>JSON.stringify([...new Set(array)]),
    arraySortHeavy: function(array){return this.sortHeavy(array)},
}
