// ==UserScript==
// @src_name     Micoua_谷歌访问助手首页跳转
// @name         流氓网站重定向
// @version      1.0.3
// @src_author   micoua
// @author       DuangXT
// @src_namespace    https://greasyfork.org/zh-CN/users/162781
// @namespace    https://github.com/DuangXT/some_monkeys_js
// @match        www.baidu.com/*
// @match        123.hao245.com/*
// @match        360.hao245.com/*
// @match        hao123.com/*
// @match        2345.com/*
// @match        hao.360.cn/*
// @match        hao360.com/*
// @match        www.hao360.com/*
// @match        hao.360.com/*
// @match        hao.qq.com/*
// @match        cn.hao123.com/*
// @match        123.sogou.com/*
// @match        www.sogou.com/*
// @match        daohang.qq.com/*
// @include      *
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/ban_rouge_url.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/ban_rouge_url.js
// @description  将一些流氓网站重定向到另一些干净的搜索引擎.
// @src_description  将谷歌访问助手强制要求首页设置修改为自定义首页
// @grant        unsafeWindow
// ==/UserScript==

(function() {

    /** 白名单网站 */
    const whitelist = [
            "extension.ie.2345.com", // 2345的插件网站不进行跳转
            "www.gobaidugle.com", // 四方搜索，有百度内容，会造成页面内执行脚本而再度定向
        ];

    /** 定义拦截站点 */
    const rogue_url = [
            "www.baidu.com", // 阻止手贱，强行跳转其它搜索引擎
            "123.hao245.com",
            "360.hao245.com",
            "hao123.com",
            "2345.com",
            "hao.360.cn",
            "hao360.com",
            "www.hao360.com",
            "hao.360.com",
            "hao.qq.com",
            "cn.hao123.com",
            "123.sogou.com",
            "www.sogou.com", // 搜狗搜索
            "daohang.qq.com"
        ];

    let searche_url = [
            "https://www.google.com/search?ie=utf-8&q=",
            "https://duckduckgo.com/?q=",
            "https://bing.com/search?q=",
            "https://mijisou.com/?q=",
            "https://mengso.com/search?q=",
            "https://yandex.com/search/?&text=",
            "https://peekier.com/#!",
            "https://www.gobaidugle.com/search4?one=bing&two=google&three=sogou&four=so&keyword=",
            "https://gibiru.com/results.html?ie=UTF-8&q=",
            "https://www.oscobo.com/search.php?q=",
            "https://swisscows.com/web?query=",

            // 国内另外的大厂搜索引擎，自选
            // "https://www.so.com/s?ie=utf-8&q=", // 360搜索
            // "https://so.toutiao.com/search?keyword=", // 头条搜索
            // "http://www.chinaso.com/search/pagesearch.htm?q=", // 中国搜索 内容太局限

            // "https://www.yahoo.com/search?fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8&p=", // 被墙
            // "https://www.ask.com/web?o=0&l=dir&qo=serpSearchTopBox&q=", // 被墙
            // "https://www.qwant.com/?t=web&q=", // 部分地区停止服务

            // 没有中文内容
            // "https://www.discretesearch.com/search?eq=",
            // "https://www.searchencrypt.com/search/suggest?q=", 网站做了限制，判断wd不存在再添加回去
        ];

    // 存放没有搜索内容时不会跳转回主站的
    const homesite_searche_url = [
            "https://www.searchencrypt.com",
            "https://www.ecosia.org",
            "https://www.startpage.com",
    ];

    window.onload = function(){
        let hostname = window.location.hostname;

        for (let i = 0; i < whitelist.length; i++) {
            if (hostname == whitelist[i]) return; // 当前链接在白名单内
        }

        // 百度的搜索文本
        let wd = "";
        let param = window.location.search.substr(1).match(new RegExp('(^|&)' + 'wd' + '=([^&]*)(&|$)'));
        if(param) wd = decodeURI(param[2]);//unescape(param[2]);
        if(!wd) searche_url = searche_url.concat(homesite_searche_url);

        // 指向范围内的一个随机位置
        let j = Math.floor(Math.random() * searche_url.length + 1);

        // 拦截网站并跳转
        for (let i = 0; i < rogue_url.length; i++) {
            if (hostname == rogue_url[i]) { // 当前链接在流氓名单内
                window.location.href = searche_url[j] + wd;
                return;
            }
        }
    };
})();