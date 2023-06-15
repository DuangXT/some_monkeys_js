// ==UserScript==
// @name         常用油猴脚本方法：字符串
// @description
// @version      0.0.6
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// ==/UserScript==

// common level 0
gmlog('公共库：字符串');

Object.prototype.isString=function(){return '[object String]' === Object.prototype.toString.call(this)}

String.prototype.equals = function(...string){
    for (const s of string) {
        if (this === s) return true;
    }
    return false;
}
String.prototype.equalsIgnoreCase = function(...string){
    for (const s of string) {
        if (this.toUpperCase() === s.toUpperCase())
            return true;
    }
    return false;
}

const strEquals = (s1, s2, ignoreCase = false) =>
    ignoreCase && s1 && s2 ? s1.toUpperCase() === s2.toUpperCase() : s1 === s2;
const strEqualsIgnoreCase = (s1, s2) => strEquals(s1, s2, true);

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

String.prototype.notContains=(...s)=>!String.prototype.contains(...s);
String.prototype.containsIgnoreCase = function (...substrs){
    let newSubStrs = [];
    substrs.forEach(s=> newSubStrs.push(s.toUpperCase()));
    return this.toUpperCase().contains(...newSubStrs);
}
String.prototype.notContainsIgnoreCase=(...s)=>!String.prototype.containsIgnoreCase(...s);

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
