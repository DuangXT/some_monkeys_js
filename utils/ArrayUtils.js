/**
 * 工具类：数组
 * @version 0.0.5
 */
const ArrayUtils = {

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