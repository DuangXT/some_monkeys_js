// ==UserScript==
// @src_name     Micoua_谷歌访问助手首页跳转
// @name         流氓网站重定向
// @version      1.0.2
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
    /** 主入口 */
    function main() {
        gotoWeb(); // 跳转网页
    }

    /**  全局变量 */
    var currentURL = window.location.href; // 获取当前网页地址
    var domainURL = currentURL.split("//")[1].split("/")[0];

    /** 白名单网站 */
    var whitelist = {
        "whitelist":[
            "extension.ie.2345.com", // 2345的插件网站不进行跳转
            "www.gobaidugle.com", // 四方搜索，有百度内容，会造成页面内执行脚本而再度定向
        ]
    };
    whitelist = whitelist.whitelist;

    for (var i = 0; i < whitelist.length; i++) {
        if (domainURL.indexOf(whitelist[i]) != -1)
            return; // 当前链接在白名单内
    }

    /** 定义拦截站点 */
    var rogue_url = {
        "rogue_url": [
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
        ]
    };
    rogue_url = rogue_url.rogue_url;

    var searche_url = { // 定义跳转网页
        "searche_url": [
            //"http://www.chinaso.com/search/pagesearch.htm?q=", // 不好用
            //"https://hss3uro2hsxfogfq.onion.to/index.php?q=", // 无中文内容
            //"https://www.startpage.com/do/search?q=", // 被墙
            //"https://yippy.com/search?query=", // 被墙
            //"https://www.yahoo.com/search?fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8&p=", // 被墙
            //"https://www.ask.com/web?o=0&l=dir&qo=serpSearchTopBox&q=", // 被墙
            //"https://www.searx.me/?categories=general&language=zh&q=", // 被墙
            //"https://so.mezw.com", // 出现问题：重定向次数过多
            "https://www.gobaidugle.com/search4?one=bing&two=google&three=sogou&four=so&keyword=",
            "https://duckduckgo.com/?q=",
            "https://www.google.com/search?ie=utf-8&q=",
            "https://bing.com/search?q=",
            "https://lookao.com/search?q=",
            "https://mijisou.com/?q=",
            "https://www.qwant.com/?t=web&q=",
            "https://www.oscobo.com/search.php?q=",
            "https://gibiru.com/results.html?ie=UTF-8&q=",
            "https://www.ecosia.org/search?q=",
            "https://swisscows.com/web?query=",
            "https://www.discretesearch.com/search?eq=",
            // ”https://www.searchencrypt.com/search/suggest?q=", 网站做了限制，判断wd不存在再添加回去
            "https://www.dogedoge.com/results?q=",
            "https://mengso.com/search?q=",
            "https://yandex.com/search/?&text=",
            "https://peekier.com/#!",

            // 国内另外的大厂搜索引擎，自选
            //"https://www.so.com/s?ie=utf-8&q=", // 360搜索
            //"https://so.toutiao.com/search?keyword=", // 头条搜索
        ]
    };
    searche_url = searche_url.searche_url;

    /** 跳转网页 */
    gotoWeb = function() {

        // 百度的搜索文本
        var wd = "";
        var param = window.location.search.substr(1).match(new RegExp('(^|&)' + 'wd' + '=([^&]*)(&|$)'));
        if(param) wd = decodeURI(param[2]);//unescape(param[2]);
        if(!wd) searche_url[searche_url.length] = "https://www.searchencrypt.com";

        // 指向范围内的一个随机位置
        var j = Math.floor(Math.random() * searche_url.length + 1);

        /** 拦截网站并跳转 */
        for (var i = 0; i < rogue_url.length; i++) {
            if (domainURL.indexOf(rogue_url[i]) != -1) { // 当前链接在流氓名单内
                window.location.href = searche_url[j] + wd;
                return;
            }
        }
    };

    /** 加载完所有数据后进入主函数 */
    //if (true) //不等加载直接跳转
    main();
})();