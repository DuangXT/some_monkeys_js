// ==UserScript==
// @name         解决网站部分限制
// @description  包括【取消全部网站蒙灰】、【允许网页内文本选择】
// @version      0.0.2
// @author       DuangXT
// @namespace    https://github.com/DuangXT/some_monkeys_js
// @match        *
// @include      *
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
                "html{" + style_fullcolor + style_freetext + "} " +
                "body{" + style_fullcolor + style_freetext + "}";
            document.body.appendChild(new_style);

            // 设置页面自由滚动 // 只设置第一个html和body
            setTagAttr("html", "style", style_overflow);
            setTagAttr("body", "style", style_overflow);
        }catch (e){
            console.log("[解决网站部分限制]添加样式时异常：");
            console.log(e);
        }
    };
})();
