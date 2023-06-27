
/**
 * 通用工具类
 * @version 0.0.1
 */
const CommonUtils = {


    /**
     * 格式化金额
     * @param account
     * @param symbol
     * @returns {string}
     */
    formatCurrency: function (account, symbol = '¥') {
        if (this.isBlank(account)) {
            return symbol + '0.00';
        }
        let str = this.formatNumber(account) + '';
        let intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
        let dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
        let ret = intSum + dot;
        return symbol + ret;
    },

    /** 转换成小数 */
    formatNumber: function (x) {
        x = Number(parseFloat(x).toFixed(3).slice(0, -1));
        let f = parseFloat(x);
        if (isNaN(f)) {return false;}
        f = Math.round(x * 100) / 100;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },


    /** 反转义HTML转义符 */
    htmlDecode: function (text) {
        let temp = document.createElement("div");
        temp.innerHTML = text;
        return temp.innerText || temp.textContent;
    },



    /** 补0操作 */
    getzf: function (num) {
        if (parseInt(num) < 10)
            num = '0' + num;
        return num;
    },

    /** 格式化日期    格式(yyyy-MM-dd hh:mm:ss) */
    formatDate: function (fmt, date) {
        if (this.isBlank(date))
            date = new Date();
        date = new Date(date);
        let o = {
            "M+": date.getMonth() + 1,                      // 月份
            "d+": date.getDate(),                           // 日
            "h+": date.getHours(),                          // 小时
            "m+": date.getMinutes(),                        // 分
            "s+": date.getSeconds(),                        // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3),    // 季度
            "S": date.getMilliseconds()                     // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substring(4 - RegExp.$1.length));
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (1 === RegExp.$1.length) ? (o[k]) : (("00" + o[k]).substring(("" + o[k]).length)));
        }
        return fmt;
    },

    /** 时间计算 */
    dateCalculate: function (date, num) {
        if (this.isBlank(date)) {
            date = new Date();
        }
        let a = new Date(date);
        a = a.valueOf();
        a = a - num * 24 * 60 * 60 * 1000;
        a = new Date(a);
        return this.formatDate("yyyy-MM-dd hh:mm:ss", a);
    },

    /**
     * 距离当前时间差
     * @param date1
     * @returns {String}
     */
    timeToNow: function (date1) {
        //兼容微信浏览器,主动格式化时间字符串
        let arr1 = date1.split(" ");
        let sdate = arr1[0].split('-');
        let sTime = arr1[1].split(':');
        let date = new Date(sdate[0], sdate[1] - 1, sdate[2], sTime[0], sTime[1], sTime[2]);
        let setTime = new Date(date).getTime();
        let timer = null;
        let nowTime = new Date().getTime(),
            leftTime = 0,
            d = 0, h = 0, m = 0, s = 0;
        leftTime = Math.ceil((nowTime - setTime) / 1000);

        if (nowTime >= setTime) {
            d = ~~(leftTime / 86400);
            h = ~~(leftTime % 86400 / 3600);
            m = ~~(leftTime % 86400 % 3600 / 60);
            s = ~~(leftTime % 86400 % 3600 % 60);
        }
        if ((h + '').length === 1)
            h = '0' + h;
        if ((m + '').length === 1)
            m = '0' + m;
        if ((s + '').length === 1)
            s = '0' + s;
        return d + '天 ' + h + '时' + m + '分';
    },

};

// $c = CommonUtils;
