// ==UserScript==
// @name 常用油猴脚本方法：对象
// @version 0.0.3
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.math.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.json.user.js
// @grant unsafeWindow
// ==/UserScript==
// common level 1
gmlog('公共库：对象');

/** 随机获取对象内的一个值 */
function getRandomValue(obj){
    if(Array.isArray(obj) || isNodeList(obj)){
        return obj[getRandomInt(obj.length)];
    } // 非数组类型的作为对象处理
    if('object' !== typeof obj){
        throw new TypeError('not a object');
    }
    let keys = Object.keys(obj);
    return obj[keys[getRandomInt(keys.length)]];
}


Object.prototype.containsKey = Object.prototype.containsKey ? Object.prototype.containsKey
    : function(...keys){
    for (let key of keys) {
        if(key in this) return this[key];
    }
    return false;
};
Object.prototype.containsValue = Object.prototype.containsValue ? Object.prototype.containsValue
    : function(...values){
    let arr = Object.values(this);
    return values.every(value => arr.includes(value));
};
Object.prototype.contains = Object.prototype.contains ? Object.prototype.contains
    : function(...substrs){
    return this.containsKey(substrs) || this.containsValue(substrs);
};

/** 对象长路径快捷获取值(key.key.key) */
function getPathValue(obj, path) {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        result = result[key];
    }
    return result;
}