/** 工具类：重定向
 * @version 0.0.9.7
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/UrlFunctions.js
 */
const RedirectUtils = (function () {

    if (!UrlFunctions) {
        console.error("缺少依赖！！！", "工具类：重定向", "UrlFunctions");
        return {};
    }

    const redirect = (url = location.href, replace = false) => {
        if (!url) url = location.href;
        if (!url.startsWith("http")) url = 'https://' + url;
        if (replace && location.href.toString() !== url) {
            console.log('替换链接为：', url);
            location.replace(url);
            return;
        }
        console.log('跳转链接：', url);
        location.href = url;
    };

    /** 当域名匹配时，询问是否跳转到目标地址 */
    const askRedirect = function (host, targetUrl, targetInfo) {

        function jump(_host) {
            if (_host && 'string' === typeof _host) {
                if (hostnameHas(_host)) {
                    let confText = "您是否想访问【 " + targetUrl + " 】？";
                    if (targetInfo) confText += "\n\n    " + targetInfo;
                    if (confirm(confText)) {
                        redirect(targetUrl, true);
                        return;
                    }
                }
            } else console.log('askRedirect(): 域名对象不是字符串', _host);
        }

        if (Array.isArray(host)) {
            host.forEach(_host => jump(_host));
        } else jump(host);
    };

    return {
        redirect,

        askRedirect,
        wantRedirect: askRedirect,
    }
})();
console.log("工具类：重定向");
