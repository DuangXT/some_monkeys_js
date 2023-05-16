String.prototype.contains = function (...strings) {
    for (let string of strings) {
        if(this.indexOf(string) >= 0) return true;
    }
    return false;
}

const StringUtils = {
    /** 查找字符串中是否包含指定字符 */
    strContains: (str, ...substrs) => {
        if(!str || 'string' !== typeof str || substrs.length<1) return false;
        for (let substr of substrs) {
            if(str.indexOf(substr) >= 0) return true;
        }
        return false;
    },

}
