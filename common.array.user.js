// ==UserScript==
// @name 常用油猴脚本方法：数组
// @version 0.0.4
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// ==/UserScript==
// common level 0
gmlog('公共库：数组');

Array.prototype.contains = Array.prototype.contains ? Array.prototype.contains
    : function(...values){return values.every(value=>this.includes(value));}
const arraySortHeavy=(array)=>JSON.stringify([...new Set(array)]);