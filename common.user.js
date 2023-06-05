// ==UserScript==
// @name         个人常用js脚本方法、参数
// @description  避免总是复制粘贴的东西
// @version      0.0.8.2.19
// @author       DuangXT
// @grant        none
// @match        *
// @include      *
// @run-at       document-start
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/common.user.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.user.js
// @grant        unsafeWindow

/** @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js */
// see https://stackoverflow.com/questions/16736320/referenceerror-gm-xmlhttprequest-is-not-defined
// 油猴4.0开始下划线的方法被抛弃，改为对象内函数。需要向下兼容的话就require gm4-polyfill.js
// @grant GM.xmlHttpRequest
// @grant GM_log
// @grant GM.log
// @connect *
// ==/UserScript==

// 作用域=当前脚本；只执行一次；脚本加载完成后立即执行。
// (function () { })();
// (()=>{ })();

// 事件监听函数；作用域=整个页面；所有资源加载完成后执行；后续加载的 window.onload 会覆盖之前加载的。
// window.onload = function () { }
// window.onload = ()=>{ }

// (()=>{window.onload = ()=>{
// }})();


const isFunction = func => func && 'function' === typeof func;

const log = (...s) => console.log.bind(console)(...s); // GM_log(...s); GM.log(...s);
log("------=======****** common.user.js start load ******=======------");
const gmlog = title => log('...... 脚本加载：%s ......', title);

// 全局定义
Object.prototype.containsKey = function(...keys){
    for (let key of keys) {
        if(key in this) return this[key];
    }
    return false;
}
Object.prototype.containsValue = function(...values){
    let arr = Object.values(this);
    return values.every(value => arr.includes(value));
}
Object.prototype.contains = function(...substrs){
    return this.containsKey(substrs) || this.containsValue(substrs);
}
// Object.prototype.toJson = function(){return JSON.stringify(this);}
const toJson = (obj) => JSON.stringify(obj);

Object.prototype.isNode = function(){return this instanceof HTMLElement;}

String.prototype.contains = function (...strings) {
    for (let s of strings) {
        s = s.toString();
        if(
            // this.indexOf(s) >= 0 // <ES6
            this.includes(s) // >=ES6
        ) return true;
    }
    return false;
}
String.prototype.notContains = !String.prototype.contains;
String.prototype.containsIgnoreCase = function (...substrs){
    let newSubStrs = [];
    substrs.forEach(s=> newSubStrs.push(s.toLowerCase()));
    return this.toLowerCase().contains(...newSubStrs);
}
String.prototype.notContainsIgnoreCase = !String.prototype.containsIgnoreCase;
Array.prototype.contains = function (...values){
    return values.every(value => this.includes(value));
}

const originalFetch = window.fetch;
const originalOpen = XMLHttpRequest.prototype.open;

// 定义 querySelector 和 querySelectorAll 的别名可能会导致一些大厂的页面问题（说的就是你，渣浪！）
const /*querySelector =*/ $qs = document.querySelector.bind(document); // s => document.querySelector(s);
const /*querySelectorAll =*/ $qsa = $all = $$ = document.querySelectorAll.bind(document); // s => [...document.querySelectorAll(s)];
// const $ = querySelector; // 不建议，容易引起冲突
const html = document.html;
const body = document.body;
const head = document.head;
const allTag = allElements = () => $qsa('*');

Document.prototype.$qs = Document.prototype.querySelector;
Element.prototype.$qs = Element.prototype.querySelector;
Document.prototype.$qsa = Document.prototype.$all = Document.prototype.querySelectorAll;
Element.prototype.$qsa = Element.prototype.$all = Element.prototype.querySelectorAll;
// head.add = head.append ? head.append : head.append = head.appendChild;
// body.add = body.append ? body.append : body.append = body.appendChild;
// html.add = html.append ? html.append : html.append = html.appendChild;

const createElement = addTag = addElement = tagName => document.createElement(tagName);

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



/** 判断当前URL内是否包含匹配的字符串 */
const currentUrlIncludes = (...searchString) => window.location.href.contains(...searchString);
const currentUrlContain = currentUrlContains = currentUrlIncludes;
const currentUrl = location.href;


const hostname = location.hostname;
/** 判断域名内是否包含匹配字符串 */
const hostnameContains = (...matchs) => hostname.containsIgnoreCase(...matchs);
const hostnameHas = hostnameContains;
const hostnameIs = (...hostnames) => {
    for (let host of hostnames) {
        if(host.toLowerCase() === hostname.toLowerCase()) return true;
    }
    return false;
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

/** 选择对象如果存在，执行指定函数 */
function selectorRunIfExist(obj, func){
    if(!obj) return false;
    if(!isFunction(func)){
        throw new TypeError('func must be a function');
    }
    if('string' === typeof obj){
        obj = $qs(obj);
    }
    if(obj) func(obj);
    return obj;
}

/** 选择对象存在时执行click() */
function selectorClick(_selector){
    if('string' !== typeof _selector){
        throw new TypeError('_selector must be a string');
    }
    return selectorRunIfExist( _selector, function(s){
        s.click();
        log('执行了点击操作', _selector);
    });
}
const clickSelector = selectorClick;
const clickSelectors = selectorsClick = (...selectors) => selectors.forEach(selector => selectorClick(selector));

/** 选择器，存在时移除指定的class */
function selectorRemoveClass(_selector, ...removeClasses){
    if('string' !== typeof _selector){
        throw new TypeError('_selector must be a string');
    }
    return selectorRunIfExist(_selector, function(selector){
        // removeClasses.forEach(_class => {
        for(let _class of removeClasses){
            if(typeof _class === 'string'){
                // if(selector.classList.contains(_class))
                selector.classList.remove(_class);
            }
            else log("a parameter 'removeClasses', not type string  ", _class);
        }
    });
}


/**
 * 执行方法并捕获异常
 * @param func      执行方法
 * @param err_tip0  异常提示
 * @param tip       执行完成的提示
 * @param err_tip1  异常额外的提示
 */
function run(func, err_tip0, tip, err_tip1) {
    if(!isFunction(func)){
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
    if(!isFunction(callback)){
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
    if(!isFunction(func)){
        throw new TypeError('func must be a function');
    }
    setTimeout(function () {
        func();
    }, 0);
}
const runAtLast = taskLast = functionLast = funcLast = runLast;


/** 以插入style标签的形式，向head内添加样式
 * @deprecated 用 GM_addStyle() 啊
 */
function addStyleTagByCSS(css) {
    if('string' !== typeof css){
        throw new TypeError('parameter "css" must be a string');
    }
    if (!document.head) return;
    let style = createElement('style');
    style.innerHTML = css;
    head.add(style);
    return style;
}

/** 添加新的link标签 */
function addLinkTag(linkHref, linkType='text/css', linkRel='stylesheet') {
    if('string' !== typeof linkHref){
        throw new TypeError('parameter "css" must be a string');
    }
    if (!document.head) return;
    let link = createElement('link');
    link.type = linkType;
    link.rel = linkRel;
    link.href = linkHref;
    head.add(link);
    return link;
}

/** 以插入script标签的形式，向页面body内插入新的脚本引用 */
function addScriptTag(jslocation){
    if('string' !== typeof jslocation){
        throw new TypeError('parameter "jslocation" must be a url string');
    }
    let script = createElement('script');
    // script.type = "text/javascript";
    script.src = jslocation;
    head.add(script);
    return script;
}

/** 以插入script标签的形式，向页面body内插入新的脚本代码 */
function addScriptByCode(jscode, mainLocation=document.body){
    if(typeof mainLocation === 'string'){
        switch (mainLocation){
            case 'body':
                mainLocation = body;
                break;
            case 'head':
                mainLocation = head;
                break;
            default:
                mainLocation = $qs(mainLocation);
        }
    }

    let script = createElement('script');
    script.type = "text/javascript";
    script.innerHTML = jscode;
    mainLocation.appendChild(script);
    return script;
}

const addHeadScriptByCode = jscode => addScriptByCode(jscode, head);
const addBodyScriptByCode = jscode => addScriptByCode(jscode, body);
const addScript = addScriptByCode;

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

/** 判断是否最终节点 */
function isLeafNode(element) {
    if (!element || !element.nodeType || 'number' !== typeof element.nodeType){
        log('parameter not a element object', element);
        return false;
    }
    const childNodes = element.childNodes;
    if (childNodes.length > 0) {
        for (const childNode of childNodes) {
            if (childNode.nodeType === 1 || childNode.nodeType === 3)
                return false;
        }
    }
    return true;
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
        throw new TypeError('not a object');
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
const deleteElements = deleteAllElements = removeAllElements = removeElements;

function removeIfTextContrains(obj, ...strs){
    if('object' !== typeof obj){
        throw new TypeError('obj must be a object');
    }
    function _remove(o){
        if(o && o.isNode()){
            for (const s in strs) {
                if(s && o.textContent.contains(s.toString())){
                    o.remove();
                }
            }
            return;
        }
        log('无法操作非节点对象', o);
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

/** 隐藏单个指定的标签（返回被隐藏的标签对象） */
function hideElement(_selector) {
    let ele = $qs(_selector);
    if (ele) {
        if (ele.style) log("元素 " + _selector + " 隐藏前样式：" + toJson(ele.style).slice(0,100));
        setStyleHidden(ele);
    }
    return ele;
}
/** 隐藏每个选择器的一个标签 */
const hideElements = (...selectors) => selectors.forEach(hideElement);

/** 隐藏每个选择器的所有标签 */
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
// 尝试禁用页面刷新
window.location.reload = ()=>log('页面刷新已被禁用');

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


/**
 * 油猴-加载新脚本
 * @deprecated 跨域问题无法解决
 */
function evalScript(jsurl){
    xmlHttpRequest(jsurl, eval, 'GET');
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
    let bodyText = document.body.textContent;
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


// 一些需要留意的，非常同名的函数名称重定向
Document.prototype.add = Document.prototype.append ? Document.prototype.append : Document.prototype.append = Document.prototype.appendChild;
Element.prototype.add = Element.prototype.append ? Element.prototype.append : Element.prototype.append = Element.prototype.appendChild;
const remove = removeElement;
const removeAll = removeElements;
const hide = hideElement;
const hides = hideElements;
const hideAll = hideAllElements;
const add = create = createElement;
const click = selectorClick;


log("------=======****** common.user.js loaded ******=======------");