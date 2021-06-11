// ==UserScript==
// @name         尽可能将预览图替换为高清图
// @namespace    https://github.com/DuangXT/some_monkeys_js
// @version      0.0.2
// @author       DuangXT
// @match        www.4kbizhi.com/wallpaper/*
// @match        www.pixiv.net/artworks/*
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/source_picture.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/source_picture.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// @grant        unsafeWindow
// ==/UserScript==

/** 查找url中是否包含指定字符 */
function urlMatching(url, match){
    return url.indexOf(match) > 0;
}

function bizhi(link){
    // "http://www.4kbizhi.com/d/file/2020/09/04/small103707vtWKg1599187027.jpg"
    var small = link.split("small");
    return small[0] + small[1].substring(0, 11) + ".jpg";
}

(function() {
    window.onload = function(){
        var $ = s => document.querySelector(s);
        var $$ = s => [...document.querySelectorAll(s)];

        // 4kbizhi.com
        if(urlMatching(window.location.href, "4kbizhi.com")){

            // 隐藏傻逼登录框
            $("#loginpop").removeAttribute("style");
            $("#loginpop").setAttribute("style",style_hidden);

            if(urlMatching(window.location.href, "4kbizhi.com/wallpaper")){
                var link = document.getElementsByClassName("view-wallpaper")[0].getElementsByTagName("img")[0].src;
                link = bizhi(link);
                document.getElementsByClassName("view-wallpaper")[0].getElementsByTagName("img")[0].src = link;
                document.getElementsByClassName("view-wallpaper")[0].getElementsByTagName("img")[0].style = "max-width:100%;margin:0px auto 20px;";
            }else{
                var els = $$("div[class=col]>ul>li>a");
                for (const a of els) {
                    const p = a.querySelector('p');
                    const img = a.querySelector('img');
                    const src1080p = bizhi(img.src);

                    img.setAttribute("onclick", "window.open('" + src1080p + "');");
                    img.setAttribute("style", "cursor:pointer;display:block;");
                    img.setAttribute("alt", "点击直接下载1080P的壁纸：【" + img.alt + "】");

                    p.setAttribute("onclick", "window.open('" + a.href + "');");
                    p.setAttribute("style", "cursor:pointer;display:block;");

                    a.removeAttribute("href");
                    a.setAttribute("style","width:0px;height:0px;");
                }
            }
        }

        /**
         * Pixiv 替换为高画质原图<br/>
         * 原作者停更了，但是pixiv更新了链接，如果不使用本脚本，在原脚本添加
         *      // @match www.pixiv.net/artworks/*
         * 即可。
         * @author       maple3142
         * @namespace    https://blog.maple3142.net/
         */
        if(urlMatching(window.location.href, "pixiv.net/artworks")){
            function onDomChange(cb) {
                new MutationObserver(() => setTimeout(cb, 50)).observe(document.body, { childList: true });
            };
            function replaceImage() {
                var els = $$('div[role=presentation]>a');
                for (var a of els) {
                    const image = a.querySelector('img');
                    image.src = a.href;
                    image.srcset = '';
                }
            };
            onDomChange(replaceImage);
        }
    };
})();