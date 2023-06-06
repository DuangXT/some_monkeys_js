// ==UserScript==
// @name         常用油猴脚本方法：链接
// @description
// @version      0.0.4
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.url.link.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.url.link.user.js

// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js

// @match *
// @include *
// ==/UserScript==

// common level 1
gmlog('公共库：链接');

const currentUrl = location.href;
const hostname = location.hostname;

/** 刷新页面至指定链接 */
const refesh = (url=location.href, replace) => {
    if(!url) url = location.href;
    if(!url.startsWith("http")) url = 'https://' + url;
    if(replace && location.href !== url){
        log('替换链接为：', url);
        location.replace(url);
        return;
    }
    log('跳转链接：', url);
    location.href = url;
}
// 尝试禁用页面刷新
window.location.reload = ()=>log('页面刷新已被禁用');

/** 判断当前URL内是否包含匹配的字符串 */
const currentUrlIncludes = (...searchString) => window.location.href.contains(...searchString);
const currentUrlContain = currentUrlContains = currentUrlIncludes;

/** 判断域名内是否包含匹配字符串 */
const hostnameContains = (...matchs) => hostname.containsIgnoreCase(...matchs);
const hostnameHas = hostnameContains;
const hostnameIs = (...hostnames) => {
    for (let host of hostnames) {
        if(host.toLowerCase() === hostname.toLowerCase()) return true;
    }
    return false;
}


/** 如果主站点匹配则执行动作 */
function runIfHostIs(){
    if(arguments.length < 2){
        throw new TypeError('参数应至少传递两位，且最后一位为执行函数');
    }
    let callback = arguments[arguments.length-1];
    if(!isFunction(callback)){
        throw new TypeError('参数错误哦！最后一位参数应为执行函数');
    }
    let hosts = Array.prototype.slice.call(arguments);
    hosts.splice(hosts.length - 1, 1);
    if(hostnameHas(hosts)){
        callback();
    }
}


/** 查询参数是否包含 */
function searchParamsContains(...paramNames){
    let params = getQueryParams();
    for (let paramName of paramNames) {
        if(params[paramName]) return true;
    }
    return false;
}
const queryParamsContains = searchParamsContains;

/** 获取当前页面链接上的url参数对象 */
function getLocationQueryVariables(){
    let query = location.search.substring(1),
        vars = query.split("&"), params = {};
    vars.forEach(var1 => {
        let pair = var1.split("=");
        params[pair[0]] = pair[1];
    });
    return params;
}

/** 获取url中的参数对象
 *
 * @Deprecated 这个函数中的正则表达式使用 \w 进行匹配，会导致转义问题
 */
function getURLParams(url){
    if(!url){
        log("没有指定url，获取当前页面url的参数集");
        return getLocationQueryVariables();
    }

    let params = {}, pattern = /(\w+)=(\w+)/ig; // 表达式只用\w是有问题的
    url.replace(pattern, ($, $1, $2) => {
        params[$1] = $2;
    });
    return params;
}

/**
 * 获取查询参数
 * //by http://stackoverflow.com/a/1099670
 */
function getQueryParams(qs = document.location.search) {
    qs = qs.split('+').join(' ');
    let params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}

const getQueryParam = (name) => getQueryParams()[name];

/** 从url中获取一个指定的参数
 *
 * @Deprecated see getURLParams() documentation
 */
const getUrlParam = (name, url) => getURLParams(url)[name];


