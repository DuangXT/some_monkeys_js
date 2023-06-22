// ==UserScript==
// @name 常用油猴脚本方法：JSON对象
// @version 0.0.1.4
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// ==/UserScript==
// common level 0
gmlog('公共库：JSON对象');

// Object.prototype.toJson = function(){return JSON.stringify(this);}
let toJson = (obj) => {
    if('object' === typeof obj)
        return JSON.stringify(obj);
    if('string' === typeof obj)
        return JSON.parse(obj); // eval('('+ obj +')'); 旧版本方法
    if('function' === typeof obj && JSON.stringifyWithFunctions)
        return JSON.stringifyWithFunctions(obj);
    throw new TypeError('Not a type that can be converted to JSON');
}

function jsonToCsv(obj) {
    if('object' === typeof obj) throw new TypeError('Invalid json object');
    return Object.keys(obj[0]).join(',') + '\n' // hedaer头，获取全部属性名单独列为一行
        + obj.map(item => Object.values(item).join(',')).join('\n');
}
