// ==UserScript==
// @name         常用油猴脚本方法：样式
// @description
// @version      0.0.1.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.style.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.style.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// @run-at document-start
// @grant GM_addStyle
// @grant GM.addStyle
// @grant unsafeWindow
// ==/UserScript==

// common level 0
gmlog('公共库：样式');

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


/** 以插入style标签的形式，向head内添加样式
 * @deprecated 用 GM_addStyle() 啊
 */
function addStyleTagByCSS(css) {
    if('string' !== typeof css){
        throw new TypeError('parameter "css" must be a string');
    }
    if(GM_addStyle) return GM_addStyle(css);
    if(GM.addStyle) return GM.addStyle(css);
    if (!document.head) return;
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.add(style);
    return style;
}

/**
 * 指定标签设置样式
 * @param tagName      标签名
 * @param styleName    样式名
 * @param styleValue   样式值
 * @param tagLocation  标签位置
 */
function setStyle(tagName, styleName, styleValue, tagLocation = 0){
    document.getElementsByTagName(tagName)[tagLocation].style[styleName] = styleValue;
}
