// ==UserScript==
// @name 常用油猴脚本方法：日志
// @version 0.0.4
// @author DuangXT
// @grant GM_log
// @grant GM.log
// ==/UserScript==
// common level 0
const log = (...s) => console.log.bind(console)(...s); // GM_log(...s); GM.log(...s);
const gmlog = title => log('...... 油猴脚本加载：%s ......', title);
gmlog('公共库：日志');
const logerror = (...s)=>console.error.bind(console)(...s);
const logwarn = (...s)=>console.warn.bind(console)(...s);
const loginfo = (...s)=>console.info.bind(console)(...s);
const logdebug = (...s)=>console.debug.bind(console)(...s);

