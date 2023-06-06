// ==UserScript==
// @name         常用油猴脚本方法：视频元素
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.video.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.video.user.js

// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.function.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.style.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.json.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.user.js

// @match *
// @include *
// @run-at document-start
// @grant none
// @grant unsafeWindow
// ==/UserScript==

// common level 3
gmlog('公共库：视频元素');


/** 暂停全部视频 */
function pauseVideos() {
    let videos = $qsa("video");
    // videos.forEach(video => video.pause());
    for (const video of videos) {
        video.pause();
    }
}

/** 页面不处于前台(焦点)时暂停全部视频 */
function pauseVideosIfPageIsBackground(){
    // thinking of....
}

/** 选择清晰度专用 */
function clickIfNoLogin(liSelector, liNoLoginSpan, spanText){
    let length = $qsa(liSelector).length;
    for(let i=0; i<length; i++){
        let loginSpan = $qs(liSelector + ":nth-child(" + i + ") > " + liNoLoginSpan);
        if(loginSpan || loginSpan.textContent.containsIgnoreCase(spanText)){ // 存在说明未登录跳过下一个
            continue;
        }
        selectorClick(liSelector + ":nth-child(" + i + ")");
        return;
    }
}