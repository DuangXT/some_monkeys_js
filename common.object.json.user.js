// ==UserScript==
// @name         常用油猴脚本方法：JSON对象
// @description
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/common.object.json.user.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.json.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.json.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// @run-at document-start
// @grant none
// @grant unsafeWindow
// ==/UserScript==

gmlog('公共库：JSON对象');

// Object.prototype.toJson = function(){return JSON.stringify(this);}
const toJson = (obj) => {
    if('object' === typeof obj)
        return JSON.stringify(obj);
    if('string' === typeof obj)
        return JSON.parse(obj); // eval('('+ obj +')'); 旧版本方法
    if('function' === typeof obj && JSON.stringifyWithFunctions)
        return JSON.stringifyWithFunctions(obj);
    throw new TypeError('Not a type that can be converted to JSON');
}
