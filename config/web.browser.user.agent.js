/** 浏览器User-Agent标识串收集 v2023-06-10 */
const webBrowserUserAgent = {

    foreach: (obj) => {
        let l = [];
        for (let key in obj) {
            l.push(obj[key]);
        }
        return l;
    },

// 桌面端UA ===============================================================

    msie: {
        "ie": "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:12.0) like Gecko",
        "ie6": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)",
        "ie7": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
        "ie8": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
        "ie9": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.2; Trident/5.0;",
        "ie10": "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.3; Trident/6.0)" + " SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)",
        "ie11": "Mozilla/5.0 (Windows NT 6.4; WOW64; Trident/7.0; rv:11.0) like Gecko",
    },
    msie_list: this.foreach(this.msie),

    msedge_uwp: {},
    msedge_chromium: {
        "edge_91_windows_x64": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
        "edge_97_macos": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55",
    },
    /** 大于v110的edge才能使用 new bing */
    msedge_chromium_bing: {
        "edge_111_linux": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54",
        "edge_113_linux": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35",
        "edge_113_macos": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; en-us) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Chrome/113.0.0.0 Safari/605.1.15 Edg/113.0.1774.42",
    },
    msedge_uwp_list: this.foreach(this.msedge_uwp),
    msedge_chromium_bing_list: this.foreach(this.msedge_chromium_bing),
    msedge_chromium_list: this.foreach(this.msedge_chromium).concat(this.msedge_chromium_bing_list),
    msedge_list: [].concat(this.msedge_uwp_list).concat(this.msedge_chromium_list),


    google_chrome: {
        "chrome_113_windows_x64": "Mozilla/5.0 (Windows NT 12.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "chrome_98_chromeos": "Mozilla/5.0 (X11; CrOS x86_64 14388.27.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.51 Safari/537.36", // Chrome OS
        "chrome_86_raspberry_pi_4": "Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.197 Safari/537.36", // Raspberry Pi 4
        "chrome_88_fuchsiaos": "Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.109 Safari/537.36 CrKey/1.54.248666", // Fuchsia OS
        "chrome_67_macos": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/67.0.963.56 Safari/535.11",
    },
    google_chrome_list: this.foreach(this.google_chrome),

    apple_safari: {
        "safari_534_macos": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
        "safari_605_macos": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; en-us) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15",
    },
    apple_safari_list: this.foreach(this.apple_safari),


    opera_presto: {},
    opera_blink: {},
    opera_chromium: {
        "opera_97_macos": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5641.208 Safari/537.36 OPR/97.0.3881.167"
    },
    opera_presto_list: this.foreach(this.opera_presto),
    opera_blink_list: this.foreach(this.opera_blink),
    opera_chromium_list: this.foreach(this.opera_chromium),
    opera_list: [].concat(this.opera_presto_list).concat(this.opera_blink_list).concat(this.opera_chromium_list),


    firefox_gecko: {},
    firefox_quantum: {
        "firefox_97_windows_x64": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0",
    },
    firefox_gecko_list: this.foreach(this.firefox_gecko),
    firefox_quantum_list: this.foreach(this.firefox_quantum),
    firefox_list: [].concat(this.firefox_gecko_list).concat(this.firefox_quantum_list),

    qihoo_360se: {
        "360se": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)"
    },
    qihoo_360chrome: {
        "360chrome": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360Chrome)",
        "360chrome_48_win7": "Mozilla/5.0 (Windows NT 6.1 AppleWebKit/535.19 KHTML, like Gecko) Chrome/48.0.1025.168 Safari/535.19 QIHU 360EE",
        "360chrome_108_win10": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.95 Safari/537.36 QIHU 360SE",
    },
    qihoo_360chromex: {},
    qihoo_360se_list: this.foreach(this.qihoo_360se),
    qihoo_360chrome_list: this.foreach(this.qihoo_360chrome),
    qihoo_360chromex_list: this.foreach(this.qihoo_360chromex),
    qihoo_360browser_list: [].concat(this.qihoo_360se_list).concat(this.qihoo_360chrome_list).concat(this.qihoo_360chromex_list),

    liebao: {
        "liebao_39_win7": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36 LBBROWSER",
    },
    liebao_list: this.foreach(this.liebao),

    uc: {
        "uc5_win7": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 UBrowser/5.1.2238.18 Safari/537.36",
    },
    uc_list: this.foreach(this.uc),

    sogou: {
        "sogou_35_win7": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36 SE 2.X MetaSr 1.0",
        "sogou_49_win7": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0",
    },
    sogou_list: this.foreach(this.sogou),

    maxthon_trident: {
        "maxthon2_winxp": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)"
    },
    maxthon_trident_list: this.foreach(this.maxthon_trident),
    maxthon_webkit_trident: {},
    maxthon_webkit_trident_list: this.foreach(this.maxthon_webkit_trident),
    maxthon_webkit_blink: {
        "maxthon5_win7": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/5.0.3.4000 Chrome/47.0.2526.73 Safari/537.36",
    },
    maxthon_webkit_blink_list: this.foreach(this.maxthon_webkit_blink),
    maxthon_list: [].concat(this.maxthon_trident_list).concat(this.maxthon_webkit_blink_list).concat(this.maxthon_webkit_trident_list),

    baidu: {
        "baidu_7_win7": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 BIDUBrowser/7.5 Safari/537.36",
        "baidu_simple_": // 百度简单搜索浏览器，访问百度无广告
            "Mozilla/5.0 (Linux; Android 8.0; MI 6 Build/OPR1.170623.027; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.116 Mobile Safari/537.36 T7/10.3 SearchCraft/2.6.3 (Baidu; P1 8.0.0)",
    },
    qq_browser: {
        "qqbrowser9_chrome43_win7": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36 QQBrowser/9.0.2229.400",
        "qqbrowser9_chrome53_win7": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.2669.400 QQBrowser/9.6.10990.400",
    },

// 移动端UA: ==============================================================
    google_android: {
        "nexus6p_chrome58_android5": "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36",
        "nexus5x_chrome58_android6": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36",
        "chrome98_android12": "Mozilla/5.0 (Linux; Android 12; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.101 Mobile Safari/537.36",
    },

    amazon_kindle: {
        "kindle": "Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+",
    },

    apple_iphone: {
        "iphone_safari": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
        "iPhone6": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    },
    apple_ipad: {
        "ipad_safari_ios9": "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "iPad_chrome_ios15": "Mozilla/5.0 (iPad; CPU OS 15_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/96.0.4664.116 Mobile/15E148 Safari/604.1",
        "iPad_safari_ios10": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
    },

    samsung_galaxy: {
        "Galaxy": "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36",
    },


// 软件UA: ================================================================

    taobao: {
        "taobao_iphone8_ios13": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Taobao(TBW63;4.7;iOS13.2.3;394;iPhone8,1)",
        "taobao_iphone_ios13": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    },

    baidu_netdisk: {
        "baidu_netdisk5_win": "netdisk;5.5.1;PC;PC-Windows;6.2.9200;WindowsBaiduYunGuanJia",
        "baidu_netdisk7_win10": "netdisk;7.27.1.5;PC;PC-Windows;10.0.19045",
    },

// 硬件设备UA ==============================================================

    nokia_symbian: {
        "symbian": "Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba",
    },

    list: {
        "qiyu": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36 Qiyu/2.1.1.2",
        "2345": "",
        "centbrowser": "",
    },

}

