// ==UserScript==
// @name         常用油猴脚本方法：数值/数学/计算
// @description
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.math.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.math.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// @run-at document-start
// @grant none
// @grant unsafeWindow
// ==/UserScript==

// common level 0
gmlog('公共库：数值/数学/计算');

/** 范围内获取一个随机整数 */
function getRandomInt(max, min=0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

