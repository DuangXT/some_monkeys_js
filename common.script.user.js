// ==UserScript==
// @name         常用油猴脚本方法：页面脚本
// @description
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.script.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.script.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.user.js
// @match *
// @include *
// @run-at document-start
// @grant none
// @grant unsafeWindow
// ==/UserScript==

// common level 3
gmlog('公共库：页面脚本');


/** 以插入script标签的形式，向页面body内插入新的脚本引用 */
function addScriptTag(jslocation){
    if('string' !== typeof jslocation){
        throw new TypeError('parameter "jslocation" must be a url string');
    }
    let script = createElement('script');
    // script.type = "text/javascript";
    script.src = jslocation;
    head.add(script);
    return script;
}

/** 以插入script标签的形式，向页面body内插入新的脚本代码 */
function addScriptByCode(jscode, mainLocation=document.body){
    if(typeof mainLocation === 'string'){
        switch (mainLocation){
            case 'body':
                mainLocation = body;
                break;
            case 'head':
                mainLocation = head;
                break;
            default:
                mainLocation = $qs(mainLocation);
        }
    }

    let script = createElement('script');
    script.type = "text/javascript";
    script.innerHTML = jscode;
    mainLocation.appendChild(script);
    return script;
}

const addHeadScriptByCode = jscode => addScriptByCode(jscode, head);
const addBodyScriptByCode = jscode => addScriptByCode(jscode, body);
const addScript = addScriptByCode;