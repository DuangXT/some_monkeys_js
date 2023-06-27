console.log("工具类：视频媒体");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/SelectorUtils.js

/** 工具类：视频媒体
 * @version 0.0.4
 */
const VideoUtils = {

    /** 暂停全部视频 */
    pauseVideos: ()=>{
        let videos = document.querySelectorAll("video");
        // videos.forEach(video => video.pause());
        for (const video of videos) {
            video.pause();
        }
    },

    /** 页面不处于前台(焦点)时暂停全部视频 */
    pauseVideosIfPageIsBackground:()=>{
        // thinking of....
    },


    /** 选择清晰度专用 */
    clickIfNoLogin:(liSelector, liNoLoginSpan, spanText)=>{
        let length = document.querySelectorAll(liSelector).length;
        for(let i=0; i<length; i++){
            let loginSpan = document.querySelector(liSelector + ":nth-child(" + i + ") > " + liNoLoginSpan);
            if(loginSpan || loginSpan.textContent.containsIgnoreCase(spanText)){ // 存在说明未登录跳过下一个
                continue;
            }
            $dom.click(liSelector + ":nth-child(" + i + ")");
            return;
        }
    },

}