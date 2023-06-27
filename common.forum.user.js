// ==UserScript==
// @name 常用油猴脚本方法：论坛
// @version 0.0.5
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/DomExtend.js
// ==/UserScript==
// common level 1

gmlog('公共库：论坛');

let currentUrlIncludes = (...searchString) => location.href.contains(...searchString);

function isForum(){
    return currentUrlIncludes("/forum") || currentUrlIncludes("/bbs");
}

/** 判断当前页面是否可能是discuz论坛 */
function isDiscuz(){
    // 检查页面源码是否包含 Discuz 关键词
    let bodyText = document.body.textContent;
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