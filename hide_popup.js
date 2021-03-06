// ==UserScript==
// @name         隐藏网站干扰项
// @description  包括【自动跳过bilibili充电鸣谢】、【自动隐藏bilibili大会员解锁高画质弹窗】、【自动隐藏CSDN登录弹窗】、【自动隐藏知乎登录弹窗】
// @version      0.0.3
// @author       DuangXT
// @namespace    https://github.com/DuangXT/some_monkeys_js
// @match        *.bilibili.com/video/*
// @match        *.zhihu.com/*
// @match        *.csdn.net/*
// @include      *
// @homepageURL  https://github.com/DuangXT/some_monkeys_js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/hide_popup.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/hide_popup.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// @grant        none
// ==/UserScript==

(function() {
    window.onload = function(){
        // 链接
        let currentURL = window.location.href; // 获取当前网页地址
        let domainURL = currentURL.split("//")[1].split("/")[0];
        let hostURL = domainURL.split('.').length == 3 ?
            domainURL.split('.')[1] + '.' + domainURL.split('.')[2]
            : domainURL; // 只处理两个根，其它多的不考虑

        console.log("[隐藏网站干扰项]开始，当前页面链接：" + currentURL);

        if(urlMatching(currentURL, "dl.3dmgame.com/patch/")){ // 3DM资源下载
            document.querySelector("#layui-layer-shade1").remove();
            let els = document.querySelectorAll('.dllist>a');
            for (let a of els) {
                a.href = a.dataset.href;
                a.removeAttribute("onclick");
            }
        }
        if(urlMatching(currentURL, "mod.3dmgame.com/mod/")){ // 3DM模组下载
            document.querySelector('.not-ad.mod-download-btn.openBox')
                .setAttribute("onclick", "window.open('" +
                    document.querySelector('.mod-download-btn.col-xs-12>a').href + "');");
            document.querySelector('.mod-download-window').remove();
        }

        if(urlMatching(currentURL, "blzxteam.com")){ // 深海迷航社区
            // 删除公告窗
            let w = document.querySelector("#layui-layer1.layui-layer.layui-layer-dialog");
            let s = document.querySelector("#layui-layer-shade1.layui-layer-shade");
            if(w) w.remove();
            if(s) s.remove();
            // 暂停音乐，删除音乐窗
            document.querySelector(".pause.fa.fa-pause-circle").click();
            document.querySelector("#myhkplayer.playing").remove();
        }

        if(urlMatching(currentURL, ".bilibili.com/video/")){
            run(function(){
                document.querySelector('video').onended=()=>{
                    document.querySelector('.bilibili-player-electric-panel-jump-content').click();
                }
            }, "自动点击跳过【充电鸣谢】时异常：", "已自动跳过【充电鸣谢】");

            run(function(){
                if ("成为大会员" == document.querySelector(".bili-dialog-m > .bili-dialog-bomb > .q1080p > .title").innerHTML)
                    document.querySelector(".bili-dialog-m").setAttribute("style", style_hidden);
            },"隐藏【大会员解锁高清画质】时异常：", "已隐藏【大会员解锁高清画质】", "此异常一般可忽略……");

            run(function(){
                document.querySelector(".bilibili-player-video-popup").setAttribute("style", style_hidden);
            }, "隐藏播放中在视频内弹出的 +关注、投票 等功能按钮 时发生异常：", "已隐藏视频中高级功能按钮");
        }

        if(urlMatching(currentURL, ".zhihu.com/")){
            run(function(){
                // 隐藏登录框
                if(document.querySelector(".Modal-wrapper"))
                    document.querySelector(".Modal-wrapper").setAttribute("style",style_hidden);
            }, "隐藏【知乎登录弹框】时异常：", "已隐藏【知乎登录弹框】");
        }

        if(urlMatching(currentURL, ".csdn.net/")){
            run(function(){
                if(document.querySelector('#csdn-redpack'))
                    document.querySelector('#csdn-redpack').remove();
            }, "删除【CSDN活动全屏】时异常：", "已删除【CSDN活动全屏】");

            run(function(){
                if(document.querySelector('.login-mark')){
                    document.querySelector('.login-mark').removeAttribute("style");
                    document.querySelector('.login-mark').setAttribute("style",style_hidden);
                }
                if(document.querySelector('#passportbox')){
                    document.querySelector('#passportbox').removeAttribute("style");
                    document.querySelector('#passportbox').setAttribute("style",style_hidden);
                }
            }, "隐藏【CSDN登录弹框】时异常：", "已隐藏【CSDN登录弹框】");
        }

        if(urlMatching(currentURL, ".jianshu.com/p/")){
            // 简书页面一个奇怪的抽奖广告
            if(document.querySelector('._1aCo37-mask')){
                document.querySelector('._1aCo37-mask').setAttribute("style",style_hidden);
                document.querySelector('._1aCo37-wrap').setAttribute("style",style_hidden);
            }
            if(document.querySelector("_27yofX"))
                document.querySelector('._27yofX').setAttribute("style",style_hidden);
        }

    };
})();