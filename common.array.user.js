// ==UserScript==
// @name         常用油猴脚本方法：数组
// @description
// @version      0.0.4
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.array.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.array.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// ==/UserScript==

// common level 0
gmlog('公共库：数组');

Array.prototype.contains= Array.prototype.contains ? Array.prototype.contains
    : function(...values){return values.every(value=>this.includes(value));}
const arraySortHeavy=(array)=>JSON.stringify([...new Set(array)]);