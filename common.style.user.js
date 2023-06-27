// ==UserScript==
// @name 常用油猴脚本方法：样式
// @version 0.0.3
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StyleTagUtils.js
// @grant GM_addStyle
// @grant GM.addStyle
// @grant unsafeWindow
// ==/UserScript==
// common level 0
gmlog('公共库：样式');

/** 隐藏元素css */
const style_hidden = ";display:none;visibility:hidden!important;";
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
    return StyleTagUtils.addStyleTagByCSS(css);
}
