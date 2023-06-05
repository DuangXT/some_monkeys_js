// ==UserScript==
// @name         常用油猴脚本方法：数组
// @description
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/common.array.user.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.array.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.array.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.user.js
// @match *
// @include *
// @run-at document-start
// @grant none
// @grant unsafeWindow
// ==/UserScript==

gmlog('公共库：数组');

Array.prototype.contains = function (...values){
    return values.every(value => this.includes(value));
}
