console.log("工具类：数组");
/**
 * 工具类：数组
 * @version 0.0.2
 * */
const ArrayUtils = {
    /** 去重排序 */
    arraySortHeavy: array=>JSON.stringify([...new Set(array)]),
    sortHeavy: ArrayUtils.arraySortHeavy,
}