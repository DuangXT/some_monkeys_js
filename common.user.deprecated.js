// ==UserScript==
// @name         个人常用js脚本方法、参数
// @description  已弃用 / 请根据@require声明选择需要使用的脚本 / 如要继续使用旧版请指定版本号：0.0.8.3
// @version      0.0.9-deprecated
// @author       DuangXT

// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.deprecated.js

// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.math.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.array.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.function.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.style.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.requst.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.agent.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.json.user.js

// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.url.link.user.js

// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.create.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.selector.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.user.js

// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.jump.link.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.forum.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.script.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.video.user.js

// ==/UserScript==

// 作用域=当前脚本；只执行一次；脚本加载完成后立即执行。
// (function () { })();
// (()=>{ })();

// 事件监听函数；作用域=整个页面；所有资源加载完成后执行；后续加载的 window.onload 会覆盖之前加载的。
// window.onload = function () { }
// window.onload = ()=>{ }

// (()=>{window.onload = ()=>{
// }})();

// common level: 0-最基本的参数函数。等级越大需要引用的依赖脚本越多。

log("------=======****** common.user.js loaded ******=======------");