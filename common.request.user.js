// ==UserScript==
// @name 常用油猴脚本方法：发起请求
// @version 0.0.7
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/RequestUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.window.user.js
// @grant GM.xmlHttpRequest
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// ==/UserScript==


// common level 1
gmlog('公共库：发起请求');


/** 重写fetch */
function rewriteFetch() {
    window.unsafeWindow.fetch = (url, options) => {
        return originalFetch(url, options).then(async (response) => {
            const responseClone = response.clone();
            let res = await responseClone.json();
            res.data.push('重写fetch修改数据')
            return new Response(JSON.stringify(res), response);
        });
    };
}

/**
 * @deprecated 跨域问题无法解决
 */
function xmlHttpRequest(url, callback, method='GET', referer){
    referer = RequestUtils.allowRefererJson(referer && StringUtils.isString(referer) ? referer : location.href);

    try {
        let gmXmlHttpRequest = GM.xmlHttpRequest || GM_xmlhttpRequest;
        if(gmXmlHttpRequest){
            gmXmlHttpRequest({
                url: url, method: method,
                header: referer,
                onload: function(response) {
                    callback(response.responseText);
                }
            });
            return;
        }
    }catch (e) {
        log('你报错你吗呢？', e);
    }

    RequestUtils.xmlHttpRequest(url, callback, method, referer);
}

