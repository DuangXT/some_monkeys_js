// ==UserScript==
// @name         个人常用js脚本方法、参数
// @description  避免总是复制粘贴的东西
// @version      0.0.7.0.5
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
// (()=>{ })();

// 事件监听函数；作用域=整个页面；所有资源加载完成后执行；后续加载的 window.onload 会覆盖之前加载的。
// window.onload = function () { }

const log = (...s) => console.log.bind(console)(...s);
log("------=======****** common.user.js start load ******=======------");


// 全局元素
const originalFetch = window.fetch;
const originalOpen = XMLHttpRequest.prototype.open;
const body = ()=> document.body;
const head = ()=> document.head;
const querySelector = $qs = document.querySelector.bind(document); // s => document.querySelector(s);
const querySelectorAll = $qsa = $all = $$ = document.querySelectorAll.bind(document); // s => [...document.querySelectorAll(s)];
// const $ = querySelector; // 不建议，容易引起冲突
const html = ()=> $qs('html');
Document.prototype.$qs = Document.prototype.querySelector;
Element.prototype.$qs = Element.prototype.querySelector;
Document.prototype.$qsa = Document.prototype.$all = Document.prototype.querySelectorAll;
Element.prototype.$qsa = Element.prototype.$all = Element.prototype.querySelectorAll;
Document.prototype.add = Document.prototype.append ? Document.prototype.append : Document.prototype.append = Document.prototype.appendChild;
Element.prototype.add = Element.prototype.append ? Element.prototype.append : Element.prototype.append = Element.prototype.appendChild;
// head().add = head().append ? head().append : head().append = head().appendChild;
// body().add = body().append ? body().append : body().append = body().appendChild;
// html().add = html().append ? html().append : html().append = html().appendChild;
String.prototype.contains = function (...strings) {
    for (let string of strings) {
        if(this.indexOf(string.toString()) >= 0) return true;
    }
    return false;
}
String.prototype.notContains = !String.prototype.contains;
String.prototype.containsIgnoreCase = function (...substrs){
    let newSubStrs = [];
    substrs.forEach(s=> newSubStrs.push(s.toUpperCase()));
    return this.toLowerCase().contains(...newSubStrs);
}
String.prototype.NotContainsIgnoreCase = !String.prototype.containsIgnoreCase;
Array.prototype.contains = function (...values){
    return values.every(value => this.includes(value));
}
Object.prototype.containsKey = function(...keys){
    for (let key of keys) {
        if(this[key]) return this[key];
    }
    return false;
}
Object.prototype.containsValue = function(...values){
    for (const key in this) {
        for (const value of values) {
            if(this[key] === value) return value;
        }
    }
    return false;
}
Object.prototype.contains = function(...substrs){
    return this.containsKey(substrs) || this.containsValue(substrs);
}


// 样式
/** 隐藏元素css */
const style_hidden = ";display:none;visibility:hidden!important;";
/** 将对象的属性设置为隐藏 */
function setStyleHidden(obj){
    if(!obj || 'object' !== typeof obj){
        throw new TypeError('obj must be a object');
    }
    // obj.setAttribute("style", style_hidden);
    // obj.style.cssText += style_hidden;
    obj.style.display = "none!important";
    obj.style.visibility = "hidden!important";
    return obj;
}
/** 彩色页面 */
const style_fullcolor = "filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=0);filter:grayscale(0%)!important;-webkit-filter:grayscale(0%)!important;-moz-filter:grayscale(0%)!important;-ms-filter:grayscale(0)!important;-o-filter:grayscale(0%)!important;";
/** 自由滚动 */
const style_overflow = "overflow:auto!important;";
/** 文本选择 */
const style_freetext = "user-select:text!important;-webkit-user-select:text!important;-moz-user-select:text!important;-o-user-select:text!important;-ms-user-select:text!important;";


/** 查找字符串中是否包含指定字符 */
const strContains = (str, ...substrs) => {
    if(!str && !substrs) return true; // 两个都是无效值
    if(!str || !substrs || 'string' !== typeof str || substrs.length<1) return false;
    for (let substr of substrs) {
        if(str.indexOf(substr.toString()) >= 0) return true;
    }
    return false;
}
const strNotContain = !strContains;

const strContainsIgnoreCase = (str, ...substrs) => {
    let newSubStrs = [];
    substrs.forEach(s=> newSubStrs.push(s.toLowerCase()));
    return strContains(str.toLowerCase(), ...newSubStrs);
}
const strNotContainsIgnoreCase = !strContainsIgnoreCase;



/** 匹配当前URL规则 */
function currentUrlIncludes(...searchString){
    for (let ss of searchString) {
        if(document.URL.includes(ss)) return true;
    }
    return false;
}

/** 判断域名内是否包含匹配字符串 */
const hostnameContains = (...matchs) => {
    for (let match of matchs) {
        if(strContainsIgnoreCase(location.hostname, match)) return true;
    }
    return false;
};
const hostnameHas = hostnameContains;

/** 判断链接内是否包含匹配字符串 */
function currentUrlContains(...matchs){
    for (let match of matchs) {
        if(strContains(location.href, match)) return true;
    }
    return false;
}
const currentUrlContain = currentUrlContains;

function searchParamsContains(...paramNames){
    let params = getQueryParams();
    for (let paramName of paramNames) {
        if(params[paramName]) return true;
    }
    return false;
}
const queryParamsContains = searchParamsContains;

function selectorRunIfExist(obj, func){
    if('function' !== typeof func){
        throw new TypeError('func must be a function');
    }
    if('string' === typeof obj){
        obj = $qs(obj);
    }
    if(obj) func(obj);
    return obj;
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
    return s;
}
const clickSelector = selectorClick;
const clickSelectors = selectorsClick = (...selectors) => selectors.forEach(selector => selectorClick(selector));

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
                // if(selector.classList.contains(_class))
                selector.classList.remove(_class);
            }
            else log("a parameter 'removeClasses', not type string  ", _class);
        }
    }
    return selector;
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



/** 以插入style标签的形式，向head内添加样式
 * @deprecated 用 GM_addStyle() 啊
 */
function addStyleTagByCSS(css) {
    if('string' !== typeof css){
        throw new TypeError('parameter "css" must be a string');
    }
    if (!document.head) return;
    let style = create('style');
    style.innerHTML = css;
    document.head.add(style);
    return style;
}

/** 添加新的link标签 */
function addLinkTag(linkHref, linkType='text/css', linkRel='stylesheet') {
    if('string' !== typeof linkHref){
        throw new TypeError('parameter "css" must be a string');
    }
    if (!document.head) return;
    let link = create('link');
    link.type = linkType;
    link.rel = linkRel;
    link.href = linkHref;
    document.head.add(link);
    return link;
}

/** 以插入script标签的形式，向页面body内插入新的脚本引用 */
function addScriptTag(jslocation){
    if('string' !== typeof jslocation){
        throw new TypeError('parameter "jslocation" must be a url string');
    }
    let script = create('script');
    script.type = "text/javascript";
    script.src = jslocation;
    document.body.add(script);
    return script;
}
/** 以插入script标签的形式，向页面body内插入新的脚本代码 */
function addScript(jscode){
    let script = create('script');
    script.type = "text/javascript";
    script.innerHTML = jscode;
    document.body.add(script);
    return script;
}




const getTagElements = (tagName) => document.getElementsByTagName(tagName);
/**
 * 指定标签对象
 * @param tagName      标签名
 * @param tagLocation  标签位置
 */
const getTagElement = (tagName, tagLocation=0) => getTagElements(tagName)[tagLocation];
const getTagElem = getTagElement; // 兼容以前用这个名字的脚本


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

/** 范围内获取一个随机整数 */
function getRandomInt(max, min=0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 随机获取对象内的一个值 */
function getRandomValue(obj){
    if(Array.isArray(obj)){
        return obj[getRandomInt(obj.length)];
    } // 非数组类型的作为对象处理
    if('object' !== typeof obj){
        throw new TypeError('obj must be a object');
    }
    let keys = Object.keys(obj);
    return obj[keys[getRandomInt(keys.length)]];
}


/** 移除指定的每个元素 */
function removeElement(...selectors) {
    selectors.forEach((selector)=>{
        let ele = $qs(selector);
        if (ele) {
            ele.remove();
            log("移除元素：", selector);
        }
    });
}
const deleteElement = removeElement;

/** 移除指定的所有元素 */
const removeElements = (...selectors) => {
    selectors.forEach((selector)=>{
        for (let ele of $qsa(selector)) {
            ele.remove();
            log("移除元素：", selector, 'id=' + ele.id, 'class=' + ele.className);
        }
    });
};
const deleteElements = removeElements;

function removeIfTextContrains(obj, ...strs){
    if('object' !== typeof obj){
        throw new TypeError('obj must be a object');
    }
    function _remove(o){
        for (const s in strs) {
            if(o && s && o.innerText.contains(s.toString())){
                o.remove();
            }
        }
    }
    if(Array.isArray(obj)){
        for (let o of obj) {
            _remove(o);
        }
        return obj;
    }
    _remove(obj);
    return obj;
}

/** 隐藏单个指定的元素 */
function hideElement(_selector) {
    let ele = $qs(_selector);
    if (ele) {
        if (ele.style) log("元素 " + _selector + "隐藏前样式：" + ele.style);
        setStyleHidden(ele);
    }
    return ele;
}
/** 隐藏每个指定元素 */
const hideElements = (...selectors) => selectors.forEach(hideElement);

/** 隐藏指定的所有元素 */
function hideAllElements(...selectors){
    selectors.forEach((selector)=>{
        for (let ele of $qsa(selector)) {
            setStyleHidden(ele);
        }
    });
}


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
const refesh = (url=location.href, replace) => {
    if(!url) url = location.href;
    if(!url.startsWith("http")) url = 'https://' + url;
    if(replace || location.href !== url){
        log('替换链接为：', url);
        location.replace(url);
        return;
    }
    log('跳转链接：', url);
    location.href = url;
}

function requestUrl(url, method='GET', referer){
    let s = '===============================================================';
    log(s);
    log('访问开始', url);
    GM_xmlhttpRequest({
        url: url, method: method,
        referrer: referer, referer: referer,
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

/** 暂停全部视频 */
function pauseVideos() {
    let videos = $qsa("video");
    // videos.forEach(video => video.pause());
    for (const video of videos) {
        video.pause();
    }
}

/** 页面不处于前台(焦点)时暂停全部视频 */
function pauseVideosIfPageIsBackground(){
    // thinking of....
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
function selectorUrlAlwaysJump(_selector, _property='href', timeout=3000, flag=true){
    let alink = 'string' === typeof _selector ? $qs(_selector) : _selector;
    let url; // url重定向
    if(alink && alink[_property]) url = alink[_property];
    log(alink);
    if(!url){
        log('未获取到标签或链接，%s毫秒后重试', timeout);
        setTimeout(function(){
            selectorUrlAlwaysJump(_selector, _property, timeout, flag); // 每n秒循环直到成功跳转
        }, timeout);
        return;
    }
    log('即将跳转到链接', url);
    if(flag) refesh(url);
    else window.open(url);
}
const selectorUrlAlwaysRedirect = selectorUrlAlwaysJump;
const selectorUrlAlwaysJumpOpen = (_selector, _property='href', timeout=3000) =>
    selectorUrlAlwaysJump(_selector, _property, timeout, false);

/** 当域名匹配时，询问是否跳转到目标地址 */
function askRedirect(wasHost, targetUrl, targetInfo) {
    function jump(host){
        if(host && 'string' === typeof host){
            if(hostnameHas(host)){
                let confText = "您是否想访问【 " + targetUrl +" 】？";
                if(targetInfo) confText += "\n\n    " + targetInfo;
                if(confirm(confText)){
                    refesh(targetUrl, true);
                    return;
                }
            }
        }
        else log('askRedirect(wasHost): 域名对象不是字符串', host);
    }
    if(Array.isArray(wasHost)){
        wasHost.forEach(host => {
            jump(host);
        });
    }
    else jump(wasHost);
}
const wantRedirect = askRedirect;




log("------=======****** common.user.js loaded ******=======------");