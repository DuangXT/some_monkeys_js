// ==UserScript==
// @name 常用油猴脚本方法：发起请求
// @version 0.0.3
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @grant GM.xmlHttpRequest
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// ==/UserScript==


// common level 0
gmlog('公共库：发起请求');


const originalFetch = window.fetch;
const originalOpen = XMLHttpRequest.prototype.open;


/** 重写fetch */
function rewriteFetch() {
    window.unsafeWindow.fetch = (url, options) => {
        return originFetch(url, options).then(async (response) => {
            const responseClone = response.clone();
            let res = await responseClone.json();
            res.data.push('油猴脚本修改数据')
            return new Response(JSON.stringify(res), response);
        });
    };
}

/** 设置查询参数 */
function setSearchParams(paramJson){
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        // 修改 GET 请求的参数
        if ('GET' === method) {
            const urlObj = new URL(url);
            for (const key in paramJson){
                urlObj.searchParams.set(key, paramJson[key]);
            }
            url = urlObj.toString();
        }

        // 调用原始的 open 方法
        return originalOpen.apply(this, [method, url, async, user, password]);
    };
}
const setQueryParams = setSearchParams;

/** 添加一个查询参数 */ // setSearchParam
const addSearchParam = (paramName, paramValue) => setSearchParams({paramName: paramValue});

/** 添加请求头 */
function addHeaders(headerJson){
    window.fetch = function(url, options) {
        for (const key in headerJson){
            // 修改请求头
            log('修改了请求头：', key, headerJson[key]);
            options.headers[key] = headerJson[key];
        }

        // 调用原始的 fetch 方法
        return originalFetch.apply(this, arguments);
    };
}

/** 添加一个请求头 */
const addHeader = (headerName, headerValue) => addHeaders({headerName: headerValue});

/** 允许设置referer */
const allowRefererJson = function(referer) {
    let j = {
        "Referrer-Policy": "unsafe-url",
        "Access-Control-Allow-Headers": "Referer",
        'Access-Control-Allow-Origin':'*',
        'Cross-Origin-Resource-Policy':'cross-origin',}
    if(referer) {
        j["referer"] = referer;
        j["referrer"] = referer;
    }
    return j;
}


/** 打开一个定时关闭的迷你小窗口 */
function openMiniWindowWithTimingClose(url, timeout=10000){
    let hideWindowFeatures = // 'noopener,noreferrer,'+
        'hidden,height=1,width=1,left=-1000,top=-1000,location=no,' +
        'menubar=no,toolbar=no,status=no,titlebar=no,scrollbars=no';
    log('打开一个迷你小窗：', url);
    let miniPopup = window.open(url, '_blank', hideWindowFeatures);
    window.setTimeout(function() {
        miniPopup.close();
    }, timeout);
}


/**
 * 油猴-请求(加载)一个新脚本
 * @deprecated 跨域问题无法解决
 */
function evalScript(jsurl){
    xmlHttpRequest(jsurl, eval, 'GET');
}

/**
 * @deprecated 跨域问题无法解决
 */
function xmlHttpRequest(url, callback, method='GET', referer){
    if(referer) referer = allowRefererJson(referer);
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

    let request = new XMLHttpRequest();
    request.open(method, url, true);
    request.withCredentials = true;
    if(referer){
        for (let key in referer) {
            request.setRequestHeader(key, referer[key]);
        }
    }
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            callback(request.responseText);
        }
    };
    request.send();
}

/**
 * @deprecated 跨域问题无法解决
 */
function requestUrl(url, method='GET', referer){
    let s = '===============================================================';
    log(s);
    log('访问开始', url);
    xmlHttpRequest(url, log, method, referer);
    log('访问url结束');
    log(s);
}
