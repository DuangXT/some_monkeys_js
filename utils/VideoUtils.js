/** 工具类：视频媒体
 * @version 0.0.6.1
 */
const VideoUtils = (function () {

    /** 暂停全部视频 */
    const pauseVideos = ()=>{
        let videos = document.querySelectorAll("video");
        // videos.forEach(video => video.pause());
        for (const video of videos) {
            video.pause();
        }
    }

    /** 页面不处于前台(焦点)时暂停全部视频 */
    const pauseVideosIfPageIsBackground = ()=>{
        // thinking of....
    }

    return {
        pauseVideos,


    }

})();
console.log("工具类：视频媒体 VideoUtils");

