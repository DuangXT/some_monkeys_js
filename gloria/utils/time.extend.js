/** gloria任务脚本使用的工具类：日期时间处理 */
class TimeExtend {

    /** 当前时间 */
    nowTime = new Date();
    /** 今天开始时的时间 */
    todayTime = new Date(this.nowTime.getFullYear(), this.nowTime.getMonth(), this.nowTime.getDate()).getTime();
    /** 今年 */
    thisYear = this.nowTime.getFullYear() + '';
    /** 明年 */
    nextYear = this.nowTime.getFullYear() + 1 + '';
    thisMonth = this.nowTime.getMonth() + 1;
    getThisMonth = () => this.thisMonth < 10 ? '0' + this.thisMonth : this.thisMonth + '';
    today = this.nowTime.getDate();
    getToday = () => this.today < 10 ? '0' + this.today : this.today + '';
    /** 小时字符串（M-D H）*/
    thisHours = this.nowTime.getMonth() + 1 + '-' + this.nowTime.getDate() + ' ' + this.nowTime.getHours() + 'h';

    /** 比对时间间距（毫秒） */
    diffTime = (diffTime1, diffTime2 = this.nowTime) => new Date(diffTime1).getTime() - diffTime2.getTime();

    diffSecond = (diffTime1, diffTime2) => Math.floor(this.diffTime(diffTime1, diffTime2) / 1000);
    diffMinute = (diffTime1, diffTime2) => Math.floor(this.diffSecond(diffTime1, diffTime2) / 60);
    diffHours = (diffTime1, diffTime2) => Math.floor(this.diffMinute(diffTime1, diffTime2) / 60);
    diffDays = (diffTime1, diffTime2) => Math.floor(this.diffHours(diffTime1, diffTime2) / 24);

    timeIsOut = (time, timeLimit) => {
        if (timeLimit) {
            return this.diffTime(time) * -1 > timeLimit;
        }
        return false;
    }

}