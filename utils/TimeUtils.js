console.log("工具类：时间");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/ValidateUtils.js
/**
 * 工具类：时间
 * @version 0.0.1
 */
class TimeUtils {

    /**
     * 距离当前时间差
     * @param date1
     * @returns {String}
     */
    timeToNow = date1 => {
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
    };
}