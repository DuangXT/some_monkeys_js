console.log("工具类：网页窗口");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js

/** 工具类：网页窗口
 * @version 0.0.17
 */
const WindowUtils={

    width: function(win=window) {
        return win.innerWidth || win.document.documentElement.clientWidth;
    },
    height: function(win=window){
        return win.innerHeight || win.document.documentElement.clientHeight;
    },

    /** 立即关闭当前窗口 */
    closenow: function(win=window){
        try{
            win.opener = win;

            console.log("将要关闭当前窗口", win.location.href);
            // window.open(location, "_self").close();
            if (navigator.userAgent.containsIgnoreCase('Firefox', 'Chrome')) {
                // 重定向到空白页再关闭
                win.location.href = 'about:blank'
                win.close();
            }

            win.open("", "_self").close();
            win.open("about:blank", "_top").close();
            win.close();
            win.top.close();
        }catch (e){
            console.error("关闭当前窗口出错", e);
        }
    },

    /** 关闭指定窗口 */
    close: function(timeout=0, win=window){
            setTimeout(()=>this.closenow(win), timeout);
    },
    closewindow: function(t, w){this.close(t, w)},
    closeWindow: function(t, w){this.close(t, w)},

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