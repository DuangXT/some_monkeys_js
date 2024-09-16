/** 工具类：DOM对象url跳转
 * @version 0.0.6
 */
const SelectorLinkJumpUtils = (function() {

    /**
     * 循环获取a标签元素的href，直到元素及href存在并跳转
     * @param _selector
     * @param _property
     * @param timeout 循环检查元素标签是否存在间隙，毫秒
     * @param flag true=在当前页重定向，false=在新标签页打开
     */
    const alwaysRedirect = function(_selector, _property='href', timeout=3000, flag=true){
        let alink = 'string' === typeof _selector ?
            document.querySelector(_selector) : _selector;
        let url; // url重定向
        if(alink && alink[_property]) url = alink[_property];
        console.log(alink);
        if(!url){
            console.log('未获取到标签或链接，%s毫秒后重试', timeout);
            setTimeout(function(){
                alwaysRedirect(_selector, _property, timeout, flag); // 每n秒循环直到成功跳转
            }, timeout);
            return;
        }
        console.log('即将跳转到链接', url);
        if(flag) location.href = url;
        else window.open(url);
    }


    const alwaysOpenNewTab = function(_selector, _property='href', timeout=3000) {
        alwaysRedirect(_selector, _property, timeout, false);
    }


    return{
        alwaysRedirect,
        alwaysJump: alwaysRedirect,

        alwaysOpenNewTab,
        alwaysOpen: alwaysOpenNewTab,
    }
});
console.log("工具类：DOM对象url跳转 SelectorLinkJumpUtils");
