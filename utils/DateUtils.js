console.log("工具类：日期");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/TimeUtils.js
/**
 * 工具类：日期
 * @version 0.0.3
 */
class DateUtils extends TimeUtils {

    __invalidDateToNormalValue__ = date => {
        if(StringUtils.isBlank(date)) {
            date = new Date();
        }
        if(StringUtils.isString(date)){
            date = new Date(date);
        }
        return date instanceof Date ? date : new Date();
    };

    /** 格式化日期    格式(yyyy-MM-dd hh:mm:ss) */
    formatDate = (fmt, date) => {
        date = this.__invalidDateToNormalValue__(date);
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
    };

    /** 获取距离 date 日期时间 ±num天的时间（正数：之后num天；负数：之前num天） */
    dateCalculate = function (date, num) {
        date = this.__invalidDateToNormalValue__(date);
        date = date.valueOf();
        date = date + Math.floor(num * 24 * 60 * 60 * 1000);
        date = new Date(date);
        return this.formatDate("yyyy-MM-dd hh:mm:ss", date);
    };

    diffToday = function(diffDate){
        let today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        let specifiedDate = new Date(diffDate).getTime();
        let timeDiff = specifiedDate - today;
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    };

}