console.log("工具类：发起请求");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js

const originalOpen = XMLHttpRequest.prototype.open;
const originalFetch = window.fetch;

/** 工具类：发起请求
 * @version 0.0.9
 */
const RequestUtils = {

    /** 重写fetch */
    rewriteFetch: ()=>{
        window.fetch = (url, options) => {
            return originalFetch(url, options).then(async (response) => {
                const responseClone = response.clone();
                let res = await responseClone.json();
                res.data.push('重写fetch修改数据')
                return new Response(JSON.stringify(res), response);
            });
        };
    },

    /** 设置查询参数 */
    setSearchParams: (paramJson)=>{
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
    },
    setQueryParams: function(...args){return this.setSearchParams(...args)},

    /** 添加一个查询参数 */ // setSearchParam
    addSearchParam: (paramName, paramValue) => RequestUtils.setSearchParams({paramName: paramValue}),

    /** 添加请求头 */
    addHeaders: function (headerJson) {
        window.fetch = function(url, options) {
            for (const key in headerJson){
                // 修改请求头
                console.log('修改了请求头：', key, headerJson[key]);
                options.headers[key] = headerJson[key];
            }

            // 调用原始的 fetch 方法
            return originalFetch.apply(this, arguments);
        };
    },

    /** 添加一个请求头 */
    addHeader: function(headerName, headerValue){return this.addHeaders({headerName: headerValue})},

    /** 允许设置referer */
    allowRefererJson: referer=>{
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
    },

    xmlHttpRequest: function(url, callback, method='GET', referer=''){
        referer = this.allowRefererJson(referer && StringUtils.isString(referer) ? referer : location.href);
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
    },

    /** 请求(加载)一个新脚本 */
    evalScript: function(jsurl){return this.xmlHttpRequest(jsurl, eval, 'GET')},

    requestUrl: function(url, method='GET', referer){
        let s = '===============================================================';
        console.log(s);
        console.log('访问开始', url);
        this.xmlHttpRequest(url, console.log, method, referer);
        console.log('访问url结束');
        console.log(s);
    },
}