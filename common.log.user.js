// ==UserScript==
// @name 常用油猴脚本方法：日志
// @version 0.0.7
// @author DuangXT
// @grant GM_log
// @grant GM.log
// ==/UserScript==
// common level 0
var log = log ? log :
    // GM_log ? GM_log : GM.log ? GM.log :
    (...s) => console.log.bind(console)(...s);
const gmlog = title => log('...... 油猴脚本加载：%s ......', title);
gmlog('公共库：日志');


