String.prototype.contain = function (string) {
    return this.indexOf(string) >= 0;
}
String.prototype.contains = (...strings) => {
    for (let string of strings) {
        if(this.contains(string)) return true;
    }
    return false;
}

const StringUtils = {
    /** 查找字符串中是否包含指定字符 */
    strContains: (str, match) => str.indexOf(match) >= 0,
}
