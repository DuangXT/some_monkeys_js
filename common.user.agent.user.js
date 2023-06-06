// ==UserScript==
// @name         常用油猴脚本方法：User-Agnet
// @description
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.agent.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.agent.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// @run-at document-start
// ==/UserScript==

// common level 0
gmlog('公共库：User-Agnet');

/** 设置浏览器UA标识 */
const setUserAgent=userAgent=>Object.defineProperty(navigator,"userAgent",{value:userAgent,writable:false,configurable:false,enumerable:true});