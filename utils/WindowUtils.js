console.log("工具类：网页窗口");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js

/** 工具类：网页窗口
 * @version 0.0.7
 */
const WindowUtils={

    /** 立即关闭当前窗口 */
    closenow: (win=window)=>{
        try{
            console.log("将要关闭当前窗口", location.href);
            // window.open(location, "_self").close();
            if (navigator.userAgent.containsIgnoreCase('Firefox', 'Chrome')) {
                // 重定向到空白页再关闭
                location.href = 'about:blank'
                win.close();
            }

            win.opener = win; // null;
            win.open("", "_self").close();
            win.open("about:blank", "_top").close();
            win.close();
            top.close();
        }catch (e){
            console.error("关闭当前窗口出错", e);
        }
        console.log('窗口关闭失败');
    },

    /** 关闭当前窗口 */
    closewindow: (timeout=0, win=window)=>
            setTimeout(()=>this.closenow(win), timeout),
    closeWindow: function(...args){this.closeWindow(...args)},

    /** 打开一个定时关闭的迷你小窗口 */
    openMiniWindowWithTimingClose: function(url, timeout=10000){
        let hideWindowFeatures = // 'noopener,noreferrer,'+
            'hidden,height=1,width=1,left=-1000,top=-1000,location=no,' +
            'menubar=no,toolbar=no,status=no,titlebar=no,scrollbars=no';
        console.log('打开一个迷你小窗：', url);
        let miniPopup = window.open(url, '_blank', hideWindowFeatures);
        this.closewindow(timeout, miniPopup);
    },

}