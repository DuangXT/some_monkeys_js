// ==UserScript==
// @name 常用油猴脚本方法：数值/数学/计算
// @version 0.0.3-deprecated
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// ==/UserScript==
// common level 0
gmlog('公共库：数值/数学/计算');

/** 范围内获取一个随机整数 */
function getRandomInt(max, min=0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

