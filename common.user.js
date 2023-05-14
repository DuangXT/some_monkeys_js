// ==UserScript==
// @name         个人常用js脚本方法、参数
// @description  避免总是复制粘贴的东西
// @version      0.0.5.7
// @author       DuangXT
// @grant        none
// @match        *
// @include      *
// @run-at       document-start
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/common.user.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.js
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// 作用域=当前脚本；只执行一次；脚本加载完成后立即执行。
// (function () { })();

// 事件监听函数；作用域=整个页面；所有资源加载完成后执行；后续加载的 window.onload 会覆盖之前加载的。
// window.onload = function () { }


// 全局元素
const originalFetch = window.fetch;
const originalOpen = XMLHttpRequest.prototype.open;
// const $doc = s => document;
const querySelector = document.querySelector.bind(document); // s => document.querySelector(s);
const querySelectorAll = document.querySelectorAll.bind(document); // s => [...document.querySelectorAll(s)];
const $qs = querySelector;
const $qsa = querySelectorAll;
const $all = querySelectorAll;
// const $ = querySelector; // 不建议，容易引起冲突
const $$ = querySelectorAll;
Document.prototype.$qs = Document.prototype.querySelector;
Element.prototype.$qs = Element.prototype.querySelector;
Document.prototype.$qsa = Document.prototype.querySelectorAll;
Element.prototype.$qsa = Element.prototype.querySelectorAll;


const log = (...s) => console.log.bind(console)(...s);

// 样式
/** 隐藏元素 */
const style_hidden = ";display:none;visibility:hidden!important;";
/** 彩色页面 */
const style_fullcolor = "filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=0);filter:grayscale(0%)!important;-webkit-filter:grayscale(0%)!important;-moz-filter:grayscale(0%)!important;-ms-filter:grayscale(0)!important;-o-filter:grayscale(0%)!important;";
/** 自由滚动 */
const style_overflow = "overflow:auto!important;";
/** 文本选择 */
const style_freetext = "user-select:text!important;-webkit-user-select:text!important;-moz-user-select:text!important;-o-user-select:text!important;-ms-user-select:text!important;";


/** 查找url中是否包含指定字符 */
const strMatching = (str, match) => str.indexOf(match) >= 0;
String.prototype.contains = function (string) {
    return this.indexOf(string) >= 0
}


/** 匹配当前URL规则 */
function currentUrlIncludes(...searchString){
    for (let ss of searchString) {
        if(document.URL.includes(ss)) return true;
    }
    return false;
}

/** 判断域名内是否包含匹配字符串 */
const hostnameHas = (...matchs) => {
    for (let match of matchs) {
        if(strMatching(location.hostname, match)) return true;
    }
    return false;
};

/** 判断链接内是否包含匹配字符串 */
function currentUrlContain(...matchs){
    for (let match of matchs) {
        if(strMatching(location.href, match)) return true;
    }
    return false;
}

function selectorRunIfExist(obj, func){
    if('function' !== typeof func){
        throw new TypeError('func must be a function');
    }
    if(obj){ func(); }
}

/** 选择器，存在时执行click() */
function selectorClick(_selector){
    if('string' !== typeof _selector){
        throw new TypeError('_selector must be a string');
    }
    let s;
    selectorRunIfExist( s = $qs(_selector), function(){
        s.click();
        log('执行了点击操作', _selector);
    });
}

/** 选择器，存在时移除指定的class */
function selectorRemoveClass(_selector, ...removeClasses){
    if('string' !== typeof _selector){
        throw new TypeError('_selector must be a string');
    }
    let selector = $qs(_selector);
    if(selector) {
        // removeClasses.forEach(_class => {
        for(let _class of removeClasses){
            if(typeof _class === 'string'){
                selector.classList.remove(_class);
            }
            else log("a parameter 'removeClasses', not type string  ", _class);
        }
    }
}

/**
 * 执行方法并捕获异常
 * @param func      执行方法
 * @param err_tip0  异常提示
 * @param tip       执行完成的提示
 * @param err_tip1  异常额外的提示
 */
function run(func, err_tip0, tip, err_tip1) {
    if('function' !== typeof func){
        throw new TypeError('func must be a function');
    }
    try {
        func();
        if (tip) log("[tip] " + tip);
    } catch (e) {
        if (err_tip0) log(err_tip0);
        console.error(e);
        if (err_tip1) log(err_tip1);
    }
}

/** 如果主站点匹配则执行动作 */
function runIfHostIs(){
    if(arguments.length < 2){
        throw new TypeError('参数应至少传递两位，且最后一位为执行函数');
    }
    let callback = arguments[arguments.length-1];
    if('function' !== typeof callback){
        throw new TypeError('参数错误哦！最后一位参数应为执行函数');
    }
    let hosts = Array.prototype.slice.call(arguments);
    hosts.splice(hosts.length - 1, 1);
    if(hostnameHas(hosts)){
        callback();
    }
}

/** 函数加入等待队列 */
function runLast(func){
    if('function' !== typeof func){
        throw new TypeError('func must be a function');
    }
    setTimeout(function () {
        func();
    }, 0);
}
const runAtLast = taskLast = functionLast = funcLast = runLast;

const create = tagName => document.createElement(tagName);
const add = addTag = addElement = createElement = create ;



/** 以插入style标签的形式，向head内添加样式 */
function addStyleTag(css) {
    if('string' !== typeof css){
        throw new TypeError('parameter "css" must be a string');
    }
    if (!document.head) return;
    let style = createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}

/** 以插入script标签的形式，向页面body内插入新的脚本引用 */
function addScriptTag(jslocation){
    if('string' !== typeof jslocation){
        throw new TypeError('parameter "jslocation" must be a url string');
    }
    let script = createElement('script');
    // script.setAttribute("src", jslocation);
    script.src = jslocation;
    document.body.appendChild(script);
}
/** 以插入script标签的形式，向页面body内插入新的脚本代码 */
function addScript(jscode){
    let script = createElement('script');
    script.innerHTML = jscode;
    document.body.appendChild(script);
}


const getTagElements = (tagName) => document.getElementsByTagName(tagName);
/**
 * 指定标签对象
 * @param tagName      标签名
 * @param tagLocation  标签位置
 */
const getTagElement = (tagName, tagLocation=0) => getTagElements(tagName)[tagLocation];
/** 兼容以前用这个名字的脚本 */
const getTagElem = (tagName, tagLocation) => getTagElement(tagName, tagLocation);


/**
 * 指定标签设置属性
 * @param tagName      标签名
 * @param attrName     属性名
 * @param attrContent  属性内容
 * @param tagLocation  标签位置
 */
function setTagAttr(tagName, attrName, attrContent, tagLocation = 0) {
    getTagElement(tagName, tagLocation).setAttribute(attrName, attrContent);
}
/**
 * 指定标签设置样式
 * @param tagName      标签名
 * @param styleName    样式名
 * @param styleValue   样式值
 * @param tagLocation  标签位置
 */
function setStyle(tagName, styleName, styleValue, tagLocation = 0){
    getTagElement(tagName, tagLocation).style[styleName] = styleValue;
}

/** 设置浏览器UA标识 */
function setUserAgent(userAgent) {
    Object.defineProperty(navigator, "userAgent", { value: userAgent, writable: false, configurable: false, enumerable: true });
}

/**
 * 获取随机字符串
 * @param str 随机字符候选组，字符重复越多权重越高
 * @param len 得到随机字符的长度
 * @returns {string}
 */
function getRandStr(str, len) {
    let ret = '';
    while (len--) {
        ret += str[parseInt(Math.random() * str.length + '')];
    }
    return ret;
}

/** 尝试移除单个指定的元素 */
function removeElement(s) {
    let ele = $qs(s);
    if (ele) {
        ele.remove();
        log("移除元素：" + s);
    }
}
const deleteElement = removeElement;

const removeElements = (...s) => s.forEach(removeElement);
const deleteElements = removeElements;

/** 尝试隐藏单个指定的元素 */
function hideElement(s) {
    let ele = $qs(s);
    if (ele) {
        if (ele.style) log("元素 " + s + "隐藏前样式：" + ele.style);
        // ele.setAttribute("style", style_hidden);
        ele.style.cssText = ele.style.cssText + style_hidden;
    }
}
const hideElements = (...s) => s.forEach(hideElement);

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

/** 获取url中的参数对象 */
function getURLParams(url){
    if(!url){
        log("没有指定url，获取当前页面url的参数集");
        return getLocationQueryVariables();
    }

    let params = {}, pattern = /(\w+)=(\w+)/ig;
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

/** 从url中获取一个指定的参数 */
const getUrlParam = (name, url=location.href) => getURLParams(url)[name];

/** 油猴-加载新脚本 */
function evalScript(jsurl){
    GM_xmlhttpRequest({
        method: 'GET',
        url: jsurl,
        onload: function(response) {
            eval(response.responseText);
        }
    });
}

/** 刷新页面至指定链接 */
const refesh = (url=location.href) => location.href = url;

function requestUrl(url, method='GET'){
    let s = '===============================================================';
    log(s);
    log('访问开始', url);
    GM_xmlhttpRequest({
        method: method,
        url: url,
        onload: function(response) {
            log(response.responseText);
        }
    });
    log('访问url结束');
    log(s);
}

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

/** 暂停全部视频 */
function pauseVideos() {
    let videos = $$("video");
    // videos.forEach(video => video.pause());
    for (const video of videos) {
        video.pause();
    }
}

function isForum(){
    return currentUrlIncludes("/forum") || currentUrlIncludes("/bbs");
}

/** 判断当前页面是否可能是discuz论坛 */
function isDiscuz(){
    // 检查页面源码是否包含 Discuz 关键词
    let bodyText = document.body.innerText;
    if (!bodyText.includes("Discuz") &&
        !bodyText.includes("Comsenz") &&
        !bodyText.includes("UCenter")) {
        return false;
    }

    // 检查页面是否有 Discuz 论坛常用类名
    if (!$qs(".forum") && !$qs(".thread") && !$qs(".post")) {
        return false;
    }

    // 检查页面 URL 是否提示是论坛页面
    if (!currentUrlIncludes("forum") &&
        !currentUrlIncludes("thread") &&
        !currentUrlIncludes("post")) {
        return false;
    }

    // 综合判断页面很有可能是 Discuz 论坛
    return true;
}

/** 循环获取a标签元素的href，直到元素及href存在并跳转 */
function urlJump(_selector, _property='href', timeout=3000, flag=true){
    let alink = $qs(_selector);
    let url; // url重定向
    if(alink && alink['_property']) url = alink['_property'];
    if(!url){
        setTimeout(function(){
            urlJump(_selector, _property); // 每3秒循环直到成功跳转
        }, timeout);
        return;
    }
    log('即将跳转到链接', url);
    if(flag) refesh(url);
    else window.open(url);
}
const urlRedirect = urlJump;
const urlJumpOpen = (_selector, _property='href', timeout=3000) =>
    urlJump(_selector, _property, timeout, false);



log("------=======****** common.js loaded ******=======------");