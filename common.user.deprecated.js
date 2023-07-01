// ==UserScript==
// @name         个人常用js脚本方法、参数
// @description  已弃用 / 请根据@require声明选择需要使用的脚本 / 如要继续使用旧版请指定版本号：0.0.8.3
// @version      0.0.10-deprecated
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.deprecated.js

// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/DomExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/DomCreateExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/ArrayExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/NodeExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/ObjectExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/SelectorFunctions.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/UrlFunctions.js

// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/ArrayUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/CommonUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/FileSuffixUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringValidateUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/FunctionUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/JsonUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/MathUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/NodeUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/ObjectUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/RedirectUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/RequestUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/ScriptTagUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/SelectorLinkJumpUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/ValidateUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/SelectorUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StyleTagUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/UrlUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/UserAgentUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/ValidateUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/VideoUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/WindowUtils.js

// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.forum.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.request.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.style.user.js

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