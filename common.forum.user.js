// ==UserScript==
// @name 常用油猴脚本方法：论坛
// @version 0.0.9
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/DomExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/UrlFunctions.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/UrlUtils.js
// ==/UserScript==
// common level 1

gmlog('公共库：论坛');

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

var urlparams = UrlUtils.getQueryParams();

/**
 * forumdisplay = 帖子列表页<br/>
 * viewthread = 帖子详情页<br/>
 * @param forumMod String 页面类型
 * @param fid String 论坛板块id
 * @return boolean
 */
const forumModIs = (forumMod, fid=false) => {
    let flag = currentUrlIncludes('/forum.php?') && urlparams['mod'] && (urlparams['mod'] === forumMod);
    if(flag && fid) flag = urlparams['fid'] && (urlparams['fid'] === ''+fid);
    return flag;
}

/** 恢复图片链接 */
const restoreImg = () => {
    for (let img of document.querySelectorAll("img")) {
        if (img.src.endsWith("none.gif") || img.src.endsWith("undefined")) {
            // console.log(img.src, img.zoomfile, img.file);
            img.src = img.getAttribute("zoomfile") || img.getAttribute("file");
        }
    }
}