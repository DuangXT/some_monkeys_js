// ==UserScript==
// @name         解决网站部分限制
// @description  包括【取消全部网站蒙灰】、【允许网页内文本选择】
// @version      0.0.3
// @author       DuangXT
// @namespace    https://github.com/DuangXT/some_monkeys_js/page_plus.js
// @match        *
// @include      *
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/page_plus.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/page_plus.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/page_plus.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// @require
// @grant        none
// ==/UserScript==

(function() {
    window.onload = function(){

        try{ // 添加样式
            let new_style = document.createElement("style");
            new_style.innerHTML =
                "*{" + style_freetext + "} " +
                "html{" + style_fullcolor + "} "
                // "body{" + style_fullcolor + style_freetext + "}"
            ;
            console.log("解除文本复制限制和彩色限制:");
            console.log(new_style);
            document.body.appendChild(new_style);

            console.log("设置页面自由滚动"); // 只设置第一个html和body
            // setTagAttr("body", "style", style_overflow);
            let htmlEle = document.getElementsByTagName("html")[0];
            htmlEle.style.overflow = 'visible';
            let bodyEle = document.getElementsByTagName("body")[0];
            bodyEle.style.overflow = 'auto';
            console.log("已尝试添加解除限制的样式");
        }catch (e){
            console.log("[解决网站部分限制]添加样式时异常：");
            console.log(e);
        }
    };
})();
