// ==UserScript==
// @name         隐藏网站干扰项
// @description  包括【自动跳过bilibili充电鸣谢】、【自动隐藏bilibili大会员解锁高画质弹窗】、【自动隐藏CSDN登录弹窗】、【自动隐藏知乎登录弹窗】
// @version      0.0.4
// @author       DuangXT
// @namespace    https://github.com/DuangXT/some_monkeys_js
// @match        *://*.bilibili.com/*
// @match        *://*.zhihu.com/*
// @match        *://*.csdn.net/*
// @match        *://jamcz.com/*
// @match        *://dl.3dmgame.com/patch/*
// @match        *://mod.3dmgame.com/mod/*
// @match        *://blzxteam.com/*
// @match        *://*.jianshu.com/p/*
// @match        fanyi.baidu.com
// @include      *
// @homepageURL  https://github.com/DuangXT/some_monkeys_js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/hide_popup.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/hide_popup.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// @grant        none
// ==/UserScript==

(function() {
    window.onload = function(){
        let style_hidden = "display:none;visibility:hidden!important;";
        function urlMatching(url, match){
            return url.indexOf(match) > 0;
        }
        function run(func, err_tip0, tip, err_tip1){
            try {
                func();
                if(tip) console.log("[tip] " + tip);
            }catch (e){
                if(err_tip0) console.log(err_tip0);
                console.log(e);
                if(err_tip1) console.log(err_tip1);
            }
        }
        function removeElement(s){
            let ele = document.querySelector(s);
            if(ele) ele.remove();
        }
        function hideElement(s){
            let ele = document.querySelector(s);
            if(ele) {
                if(ele.style) console.log("元素 " + s + "隐藏前样式：" + ele.style);
                ele.setAttribute("style", style_hidden);
            }
        }

        let href = window.location.href; // 获取当前网页地址
        console.log("[隐藏网站干扰项]开始，当前页面链接：" + href);

        if(urlMatching(href, "fanyi.baidu.com")){
            removeElement(".desktop-guide");
        }

        if(urlMatching(href, "jamcz.com/")){
            let ass = document.querySelectorAll("a[target=_blank]");
            for (let a of ass) {
                if(a.innerText.indexOf("网盘") >=0 && a.onclick)
                    a.onclick = a.onclick.replace('jq(','window.open(');
            }
        }

        if(urlMatching(href, "dl.3dmgame.com/patch/")){ // 3DM资源下载
            removeElement("#layui-layer-shade1");
            let els = document.querySelectorAll('.dllist>a');
            for (let a of els) {
                a.href = a.dataset.href;
                a.removeAttribute("onclick");
            }
        }
        if(urlMatching(href, "mod.3dmgame.com/mod/")){ // 3DM模组下载
            document.querySelector('.not-ad.mod-download-btn.openBox')
                .setAttribute("onclick", "window.open('" +
                    document.querySelector('.mod-download-btn.col-xs-12>a').href + "');");
            removeElement('.mod-download-window');
        }

        if(urlMatching(href, "blzxteam.com")){ // 深海迷航社区
            // 删除公告窗
            run(function(){
                removeElement("#layui-layer1.layui-layer.layui-layer-dialog");
                removeElement("#layui-layer-shade1.layui-layer-shade");
            },"删除弹窗公告时发生异常：");
            // 暂停音乐，删除音乐窗
            run(function(){
                document.querySelector(".pause.fa.fa-pause-circle").click();
                removeElement("#myhkplayer.playing");
            },"暂停音乐并删除音乐窗时发生异常：",false,
                "如果仍然存在播放请手动暂停,没有音乐窗请禁音标签页");
        }

        if(urlMatching(href, ".acfun.cn/")){
            removeElement(".app-guide"); // A站底部登录提示+app二维码
            removeElement(".app-download");// A站顶部app二维码
        }

        if(urlMatching(href, "bilibili.com")){
            removeElement('#van-popover-7919'); // B站顶部APP下载二维码
            removeElement("#van-popover-2420"); // 未登录的登录提示
            removeElement("#van-popover-3759"); // 大会员精彩内容提示
        }

        if(urlMatching(href, ".bilibili.com/video/")){
            run(function(){
                document.querySelector('video').onended=()=>{
                    document.querySelector('.bilibili-player-electric-panel-jump-content').click();
                }
            }, "自动点击跳过【充电鸣谢】时异常：", "已自动跳过【充电鸣谢】");

            run(function(){
                if ("成为大会员" == document.querySelector(".bili-dialog-m > .bili-dialog-bomb > .q1080p > .title").innerHTML)
                    hideElement(".bili-dialog-m");
            },"隐藏【大会员解锁高清画质】时异常：", "已隐藏【大会员解锁高清画质】", "此异常一般可忽略……");

            run(function(){
                hideElement(".bilibili-player-video-popup");
            }, "隐藏播放中在视频内弹出的 +关注、投票 等功能按钮 时发生异常：", "已隐藏视频中高级功能按钮");
        }

        if(urlMatching(href, ".zhihu.com/")){
            run(function(){
                hideElement(".Modal-wrapper"); // 隐藏登录框
            }, "隐藏【知乎登录弹框】时异常：", "已隐藏【知乎登录弹框】");
        }

        if(urlMatching(href, ".csdn.net/")){
            run(function(){
                removeElement('#csdn-redpack');
            }, "删除【CSDN活动全屏】时异常：", "已删除【CSDN活动全屏】");

            run(function(){
                hideElement('.login-mark');
                hideElement('#passportbox');
            }, "隐藏【CSDN登录弹框】时异常：", "已隐藏【CSDN登录弹框】");
        }

        if(urlMatching(href, ".jianshu.com/p/")){
            hideElement('._1aCo37-mask'); // 简书页面一个奇怪的抽奖广告
            hideElement('._27yofX');
        }

    };
})();