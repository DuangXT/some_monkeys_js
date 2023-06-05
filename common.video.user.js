// ==UserScript==
// @name         常用油猴脚本方法：视频元素
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/common.video.user.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.video.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.video.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.user.js
// @match *
// @include *
// @run-at document-start
// @grant none
// @grant unsafeWindow
// ==/UserScript==

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