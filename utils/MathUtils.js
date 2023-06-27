console.log("工具类：数学");

/** 工具类：数学
 * @version 0.0.1
 */
const MathUtils = {

    /** 范围内获取一个随机整数 */
    getRandomInt: (max, min=0) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

};

