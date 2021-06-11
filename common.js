// ==UserScript==
// @name         个人常用js脚本方法、参数
// @description  避免总是复制粘贴的东西
// @version      0.0.1
// @author       DuangXT
// @grant        none
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// ==/UserScript==

// 样式
/** 隐藏元素 */
const style_hidden = "display:none;visibility:hidden!important;";
/** 彩色页面 */
const style_fullcolor = "filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=0);filter:grayscale(0%)!important;-webkit-filter:grayscale(0%)!important;-moz-filter:grayscale(0%)!important;-ms-filter:grayscale(0)!important;-o-filter:grayscale(0%)!important;";
/** 自由滚动 */
const style_overflow = "overflow:auto!important;";
/** 文本选择 */
const style_freetext = "user-select:text!important;-webkit-user-select:text!important;-moz-user-select:text!important;-o-user-select:text!important;-ms-user-select:text!important;";


/** 查找url中是否包含指定字符 */
function urlMatching(url, match){
    return url.indexOf(match) > 0;
}

/**
 * 执行方法
 * @param func 执行方法
 * @param err_tip0 异常提示
 * @param tip 执行完成的提示
 * @param err_tip1 异常额外的提示
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