/**
 * 工具类：数组
 * @version 0.0.6
 */
const ArrayUtils = {

    /** 查找一个数据在数组中存在的数量（无类型判断） */
    counts: (array, value) => array.filter(item => item === value).length,

    /** 随机取得其中一个值 */
    random: array => array ? array[Math.floor(Math.random() * array.length)] : undefined,

    deduplicationBySet: array => Array.from(new Set(array)),

    deduplicationByFilter: array => array.filter((value, index, self)=>{
        return self.indexOf(value) === index;
    }),

    deduplicationByReduce: array => array.reduce((previous, current)=>{
        if (previous.indexOf(current) === -1) {
            previous.push(current);
        }
        return previous;
    }, []),

    deduplicationByForeach: array => {
        let uniqueArray = [];
        array.forEach(function(value) {
            if (uniqueArray.indexOf(value) === -1) {
                uniqueArray.push(value);
            }
        });
        return uniqueArray;
    },

    deduplicationByMap: array => {
        let uniqueArray = [];
        let map = new Map();
        for (let i = 0; i < array.length; i++) {
            if (!map.has(array[i])) {
                map.set(array[i], true);
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }
}
console.log("工具类：数组 ArrayUtils");