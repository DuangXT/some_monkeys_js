// ==UserScript==
// @name         自动跳转
// @description  不要询问或者跳去非点击的链接了（知乎、CSDN）
// @version      0.0.2
// @author       DuangXT
// @namespace    https://github.com/DuangXT/some_monkeys_js
// @match        *://link.csdn.net/*
// @match        *://link.zhihu.com/*
// @homepageURL  https://github.com/DuangXT/some_monkeys_js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/auto_link.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/auto_link.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// @grant        none
// ==/UserScript==


(function() {

    let currentURL = window.location.href;
    let targetUrl = '';
    if (
      urlMatching(currentURL, "link.csdn.net") ||
      urlMatching(currentURL, "link.zhihu.com")
    ) {
        targetUrl = decodeURIComponent(getUrlParam("target"));
    }

    if(targetUrl && targetUrl != undefined && targetUrl!='undefined'){
        console.log("自动跳转至【" + targetUrl + "】");
        window.location.href = targetUrl;
    }

})();