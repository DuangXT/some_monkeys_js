// ==UserScript==
// @name         常用油猴脚本方法：论坛
// @description
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.forum.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.forum.user.js

// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.function.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.style.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.json.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.url.link.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.user.js

// @match *
// @include *
// @run-at document-start
// @grant none
// @grant unsafeWindow
// ==/UserScript==

// common level 3

gmlog('公共库：论坛');

function isForum(){
    return currentUrlIncludes("/forum") || currentUrlIncludes("/bbs");
}

/** 判断当前页面是否可能是discuz论坛 */
function isDiscuz(){
    // 检查页面源码是否包含 Discuz 关键词
    let bodyText = body.textContent;
    if (!bodyText.includes("Discuz") &&
        !bodyText.includes("Comsenz") &&
        !bodyText.includes("UCenter")) {
        return false;
    }

    // 检查页面是否有 Discuz 论坛常用类名
    if (!$qs(".forum") && !$qs(".thread") && !$qs(".post")) {
        return false;
    }

    // 检查页面 URL 是否提示是论坛页面
    if (!currentUrlIncludes("forum") &&
        !currentUrlIncludes("thread") &&
        !currentUrlIncludes("post")) {
        return false;
    }

    // 综合判断页面很有可能是 Discuz 论坛
    return true;
}