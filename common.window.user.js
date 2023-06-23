// ==UserScript==
// @name 常用油猴脚本方法：网页窗口
// @version 0.0.1
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// ==/UserScript==
// common level 0
gmlog('公共库：网页窗口');

/** 关闭当前窗口 */
const closeWindow = closenow = closewindow = ()=>{
    try{
        // window.open(location, "_self").close();

        if (navigator.userAgent.containsIgnoreCase('Firefox', 'Chrome')) {
            // 重定向到空白页再关闭
            location.href = 'about:blank'
            window.close();
        }

        window.opener = null; // window;
        window.open("", "_self").close();
        window.open("about:blank", "_top").close();
        top.close();
    }catch (e){
        logerror("关闭当前窗口出错", e);
    }
}
