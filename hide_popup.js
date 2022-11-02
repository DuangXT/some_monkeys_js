// ==UserScript==
// @name         隐藏网站干扰项
// @description  详细内容看源码内注释
// @version      0.0.8
// @author       DuangXT
// @namespace    https://github.com/DuangXT/some_monkeys_js/hide_popup.js
// @match        *://*.bilibili.com/*
// @match        *://*.zhihu.com/*
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @match        *://*.csdn.net/*
// @match        *://jamcz.com/*
// @match        *://*.jamcz.com/*
// @match        *://dl.3dmgame.com/patch/*
// @match        *://mod.3dmgame.com/mod/*
// @match        *://blzxteam.com/*
// @match        *://*.jianshu.com/p/*
// @match        *://fanyi.baidu.com
// @match        *://fanyi.baidu.com/*
// @homepageURL  https://github.com/DuangXT/some_monkeys_js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/hide_popup.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/hide_popup.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.js
// @grant        none
// ==/UserScript==

(function() {

/*
 - 百度翻译删除客户端下载弹窗
 - A站移除顶部、底部的app二维码
 - B站移除app二维码、登录提示、大会员精彩提示
 - B站视频播放完后默认跳过充电鸣谢
 - B站视频移除大会员解锁高清画质弹窗
 - B站视频播放中隐藏高级弹幕（+关注、投票 等）
 - B站视频相关推荐显示全部标题文字，移除播放量弹幕量文字
 - 知乎隐藏登录弹窗
 - 简书移除抽奖广告
 - CSDN博客移除登录弹窗、全屏活动
 - 3DM资源下载按钮提权
 - 3DM模组下载按钮提权
 - 晨钟酱主页下载按钮提权
 - 碧蓝之星删除公告栏弹窗
 - 碧蓝之星默认暂停音乐、移除音乐窗
 */

    const href = window.location.href; // 获取当前网页地址
    window.onload = function(){
        console.log("[隐藏网站干扰项]开始，当前页面链接：" + href);

        if(urlMatching(href, "fanyi.baidu.com")){
            removeElement(".desktop-guide");
        }

        if(urlMatching(href, "jamcz.com/")){
            let ass = $qsa("a[target=_blank]");
            for (let a of ass) {
                if(a.innerText.indexOf("网盘") >=0 && a.onclick)
                    a.onclick = a.onclick.replace('jq(','window.open(');
            }
        }

        if(urlMatching(href, "dl.3dmgame.com/patch/")){ // 3DM资源下载
            removeElement("#layui-layer-shade1");
            let els = $qsa('.dllist>a');
            for (let a of els) {
                a.href = a.dataset.href;
                a.removeAttribute("onclick");
            }
        }
        if(urlMatching(href, "mod.3dmgame.com/mod/")){ // 3DM模组下载
            $qs('.not-ad.mod-download-btn.openBox')
                .setAttribute("onclick", "window.open('" +
                    $doc('.mod-download-btn.col-xs-12>a').href + "');");
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
                $qs(".pause.fa.fa-pause-circle").click();
                removeElement("#myhkplayer.playing");
            },"暂停音乐并删除音乐窗时发生异常：",false,
                "如果仍然存在播放请手动暂停,没有音乐窗请禁音标签页");
        }

        if(urlMatching(href, ".acfun.cn/")){
            removeElement(".app-guide"); // A站底部登录提示+app二维码
            removeElement(".app-download");// A站顶部app二维码
        }

        if(urlMatching(href, ".bilibili.com/video/")){

            run(function(){
                addStyle(".video-page-card .card-box .info .title{height:54px;}");
                let els = $qsa('.card-box>.info');
                for (let info of els) {
                    info.querySelector("a>.title").setAttribute("style", "height:54px;");
                    let playCount = info.querySelectorAll(".count")[1];
                    playCount.setAttribute("style", style_hidden);
                    info.title = playCount.innerText;
                }
            });

            run(function(){
                $qs('video').onended=()=>{
                    $qs('.bilibili-player-electric-panel-jump-content').click();
                }
            }, "自动点击跳过【充电鸣谢】时异常：", "已自动跳过【充电鸣谢】");

            run(function(){
                if ("成为大会员" == $qs(".bili-dialog-m > .bili-dialog-bomb > .q1080p > .title").innerText)
                    hideElement(".bili-dialog-m");
            },"隐藏【大会员解锁高清画质】时异常：", "已隐藏【大会员解锁高清画质】", "此异常一般可忽略……");

            run(function(){
                hideElement(".bilibili-player-video-popup");
            }, "隐藏播放中在视频内弹出的 +关注、投票 等功能按钮 时发生异常：", "已隐藏视频中高级功能按钮");
        }

        if(urlMatching(href, ".zhihu.com/")){
            console.log("知乎！！！");
            run(function(){
                // 隐藏登录框
                hideElement(".Modal-wrapper");
                hideElement(".Modal-wrapper.Modal-enter-done");
                // 移除登录框遮罩层
                removeElement(".Modal.Modal--default.signFlowModal");
                removeElement(".Modal-backdrop");

                // 右上角登录按钮弹出提示
                removeElement(".css-1hwwfws");
                removeElement(".css-ysn1om");

                // 右侧下载客户端二维码卡片
                hideElement(".Card.AppBanner");

                // 右侧广告
                hideElement(".Card > .Pc-card.Card > .Banner-link");
                removeElement(".Card > .Pc-card.Card > .Banner-link");

                // 右下角浮动登录提示
                removeElement(".css-1ynzxqw");
                removeElement(".css-1izy64v");

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

        if(urlMatching(href, "bilibili.com")){

            /*setTimeout(
                run(function(){
                    removeElement(".login-tip");

                    let els = document.querySelectorAll(".van-popover.van-popper[role=tooltip]");
                    for (let el of els) {
                        if(el.querySelector(".title"))
                            if(el.querySelector(".title").innerText.indexOf("登录后你可以：") >= 0)
                                el.remove();

                        if(el.querySelector(".txt"))
                            if(el.querySelector(".txt").innerText.indexOf("扫码下载手机客户端") >= 0)
                                el.remove();

                        if(el.querySelector(".vip-m>.bubble-traditional>.recommand>.title"))
                            if(el.querySelector(".vip-m>.bubble-traditional>.recommand>.title").innerText.indexOf("精彩推荐") >= 0)
                                el.remove();
                    }
                })
                , 5000);*/
        }

    };
})();