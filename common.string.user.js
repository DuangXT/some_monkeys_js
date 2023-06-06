// ==UserScript==
// @name         常用油猴脚本方法：字符串
// @description
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// @run-at document-start
// ==/UserScript==

// common level 0
gmlog('公共库：字符串');

String.prototype.contains = function (...strings) {
    for (let s of strings) {
        s = s.toString();
        if(
            // this.indexOf(s) >= 0 // <ES6
            this.includes(s) // >=ES6
        ) return true;
    }
    return false;
}
String.prototype.notContains = !String.prototype.contains;
String.prototype.containsIgnoreCase = function (...substrs){
    let newSubStrs = [];
    substrs.forEach(s=> newSubStrs.push(s.toUpperCase()));
    return this.toUpperCase().contains(...newSubStrs);
}
String.prototype.notContainsIgnoreCase = !String.prototype.containsIgnoreCase;

/** 查找字符串中是否包含指定字符 */
const strContains = (str, ...substrs) => {
    if(!str && !substrs) return true; // 两个都是无效值
    if(!str || !substrs || 'string' !== typeof str || substrs.length<1) return false;
    for (let substr of substrs) {
        if(str.indexOf(substr.toString()) >= 0) return true;
    }
    return false;
}
const strNotContain = !strContains;

const strContainsIgnoreCase = (str, ...substrs) => {
    let newSubStrs = [];
    substrs.forEach(s=> newSubStrs.push(s.toLowerCase()));
    return strContains(str.toLowerCase(), ...newSubStrs);
}
const strNotContainsIgnoreCase = !strContainsIgnoreCase;

/**
 * 获取随机字符串
 * @param str 随机字符候选组，字符重复越多权重越高
 * @param len 得到随机字符的长度
 * @returns {string}
 */
function getRandStr(str, len) {
    let ret = '';
    while (len--) {
        ret += str[parseInt(Math.random() * str.length + '')];
    }
    return ret;
}
