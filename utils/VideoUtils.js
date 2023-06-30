console.log("工具类：视频媒体");

/** 工具类：视频媒体
 * @version 0.0.5
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

}