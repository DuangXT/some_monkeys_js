/**
 * 工具类：时间
 * @version 0.0.5
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/ValidateUtils.js
 */
const TimeUtils = (function() {
    if(!ValidateUtils){
        console.error("缺少依赖！！！", "工具类：时间 TimeUtils", "ValidateUtils");
        return {};
    }

    const timeSizeValue = {
        "year": 0, "month":0, "week":0, "day":0,
        "hours":0, "minute":0, "second":0, "millisecond":0
    };

    const timeSizeValueToChineseString = timeSizeValue => {
        let s ='';

        if (timeSizeValue.year !== 0)
            s += timeSizeValue.year + "年 ";

        if (timeSizeValue.month !== 0)
            s += timeSizeValue.month + "个月 ";

        if (timeSizeValue.week !== 0)
            s += timeSizeValue.week + "个星期 ";

        if (timeSizeValue.day !== 0) {
            if((timeSizeValue.day + '').length === 1)
                timeSizeValue.day = '0' + timeSizeValue.day;
            s += timeSizeValue.day + "天 ";
        }

        if (timeSizeValue.hours !== 0) {
            if((timeSizeValue.hours + '').length === 1)
                timeSizeValue.hours = '0' + timeSizeValue.hours;
            s += timeSizeValue.hours + "时 ";
        }

        if (timeSizeValue.second !== 0) {
            if((timeSizeValue.second + '').length === 1)
                timeSizeValue.second = '0' + timeSizeValue.second;
            s += timeSizeValue.second + "秒 ";
        }

        if (timeSizeValue.millisecond !== 0)
            s += timeSizeValue.millisecond + "毫秒 ";

        return s;

    }

    return {
        /** 时间大小对象 */
        timeSizeValue,

        /** 将时间大小对象输出为中文内容 */
        timeSizeValueToChineseString,

        /**
         * 计算date与当前时间的时间差
         * @param dateTimeString {String} yyyy-MM-dd HH:mm:ss
         * @returns {String}
         */
        differenceCurrentTime: dateTimeString => {
            // 兼容微信浏览器,主动格式化时间字符串
            let arr1 = dateTimeString.split(" ");
            let sdate = arr1[0].split('-');
            let sTime = arr1[1].split(':');
            let date1 = new Date(sdate[0], sdate[1] - 1, sdate[2], sTime[0], sTime[1], sTime[2]);
            let setTime = new Date(date1).getTime();
            // let timer = null;
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

            let timeSizeValue = this.timeSizeValue;
            timeSizeValue.day = d;
            timeSizeValue.hours = h;
            timeSizeValue.minute = m;
            timeSizeValue.second = s;

            return this.timeSizeValueToChineseString(timeSizeValue);
        }
    }

})();
console.log("工具类：时间 TimeUtils");