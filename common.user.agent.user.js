// ==UserScript==
// @name 常用油猴脚本方法：User-Agnet
// @version 0.0.4-deprecated
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// ==/UserScript==
// common level 0
gmlog('公共库：User-Agnet');

/** 只读引用 */
const getUserAgent = ()=>navigator.userAgent.toString();
const userAgent = getUserAgent();

/** 设置浏览器UA标识 */
const setUserAgent=userAgent=>Object.defineProperty(navigator,"userAgent",{value:userAgent,writable:false,configurable:false,enumerable:true});