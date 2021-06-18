// ==UserScript==
// @name         个人常用js脚本方法、参数
// @description  避免总是复制粘贴的东西
// @version      0.0.2
// @author       DuangXT
// @grant        none
// @match        *
// @include      *
// @homepageURL  https://github.com/DuangXT/some_monkeys_js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// ==/UserScript==

// 样式
/** 隐藏元素 */
var style_hidden = "display:none;visibility:hidden!important;";
/** 彩色页面 */
var style_fullcolor = "filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=0);filter:grayscale(0%)!important;-webkit-filter:grayscale(0%)!important;-moz-filter:grayscale(0%)!important;-ms-filter:grayscale(0)!important;-o-filter:grayscale(0%)!important;";
/** 自由滚动 */
var style_overflow = "overflow:auto!important;";
/** 文本选择 */
var style_freetext = "user-select:text!important;-webkit-user-select:text!important;-moz-user-select:text!important;-o-user-select:text!important;-ms-user-select:text!important;";


/** 查找url中是否包含指定字符 */
function urlMatching(url, match){
    return url.indexOf(match) > 0;
}

/**
 * 执行方法并捕获异常
 * @param func      执行方法
 * @param err_tip0  异常提示
 * @param tip       执行完成的提示
 * @param err_tip1  异常额外的提示
 */
function run(func, err_tip0, tip, err_tip1){
    try {
        func();
        if(tip) console.log("[tip] " + tip);
    }catch (e){
        console.log(err_tip0);
        console.log(e);
        if(err_tip1) console.log(err_tip1);
    }
}

/** 向head内添加样式 */
function addStyle(css) {
    if (!document.head) return;
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}

/**
 * 指定标签设置属性
 * @param tagName      标签名
 * @param attrName     属性名
 * @param attrContent  属性内容
 * @param tagLocation  标签位置
 */
function setTagAttr(tagName, attrName, attrContent, tagLocation = 0){
    document.getElementsByTagName(tagName)[tagLocation].setAttribute(attrName,attrContent);
}

/** 设置浏览器UA标识 */
function setUserAgent(userAgent){
    Object.defineProperty(navigator, "userAgent",
        {value:userAgent, writable:false,configurable:false,enumerable:true}
    );
};

/**
 * 获取随机字符串
 * @param str 随机字符候选组，字符重复越多权重越高
 * @param len 得到随机字符的长度
 * @returns {string}
 */
function getRandStr(str, len) {
    let ret = '';
    while(len--) {
        ret += str[parseInt(Math.random() * str.length)];
    }
    return ret;
}