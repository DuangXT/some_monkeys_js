// ==UserScript==
// @name         解决网站部分限制
// @description  包括【取消全部网站蒙灰】、【允许网页内文本选择】
// @version      0.0.1
// @author       DuangXT
// @match        *
// @include      *
// @require
// @grant        none
// ==/UserScript==

/** 彩色页面 */
var style_fullcolor = "filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=0);filter:grayscale(0%)!important;-webkit-filter:grayscale(0%)!important;-moz-filter:grayscale(0%)!important;-ms-filter:grayscale(0)!important;-o-filter:grayscale(0%)!important;";
/** 自由滚动 */
var style_overflow = "overflow:auto!important;";
/** 文本选择 */
var style_freetext = "user-select:text!important;-webkit-user-select:text!important;-moz-user-select:text!important;-o-user-select:text!important;-ms-user-select:text!important;";

(function() {
    window.onload = function(){
        try{ // 添加样式
            var new_style = document.createElement("style");
            new_style.innerHTML =
                "*{" + style_fullcolor + style_freetext + "} " +
                "html{" + style_fullcolor + style_freetext + "} " +
                "body{" + style_fullcolor + style_freetext + "}";
            document.body.appendChild(new_style);

            // 设置页面自由滚动 // 只设置第一个html和body
            document.getElementsByTagName("html")[0].setAttribute("style",style_overflow);
            document.getElementsByTagName("body")[0].setAttribute("style",style_overflow);
        }catch (e){
            console.log("[解决网站部分限制]添加样式时异常：");
            console.log(e);
        }
    };
})();
