console.log("工具类：日期");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/ValidateUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/TimeUtils.js
/**
 * 工具类：日期
 * @version 0.0.1
 */
class DateUtils extends TimeUtils {

    /** 格式化日期    格式(yyyy-MM-dd hh:mm:ss) */
    formatDate = (fmt, date) => {
        if (ValidateUtils.isBlank(date))
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
    };

    /** 时间计算 */
    dateCalculate = function (date, num) {
        if (this.isBlank(date)) {
            date = new Date();
        }
        let a = new Date(date);
        a = a.valueOf();
        a = a - num * 24 * 60 * 60 * 1000;
        a = new Date(a);
        return this.formatDate("yyyy-MM-dd hh:mm:ss", a);
    };

}