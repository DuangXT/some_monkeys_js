String.prototype.contains = function (...strings) {
    for (let string of strings) {
        if(this.indexOf(string.toString()) >= 0) return true;
    }
    return false;
}
String.prototype.notContains = !String.prototype.contains;
String.prototype.containsIgnoreCase = function (...substrs){
    let newSubStrs = [];
    substrs.forEach(s=> newSubStrs.push(s.toUpperCase()));
    return this.toLowerCase().contains(...newSubStrs);
}
String.prototype.NotContainsIgnoreCase = !String.prototype.containsIgnoreCase;

const StringUtils = {
    /** 查找字符串中是否包含指定字符 */
    strContains: (str, ...substrs) => {
        if(!str && !substrs) return true; // 两个都是无效值
        if(!str || !substrs || 'string' !== typeof str || substrs.length<1) return false;
        for (let substr of substrs) {
            if(str.indexOf(substr.toString()) >= 0) return true;
        }
        return false;
    },
    strNotContain: !strContains,

    strContainsIgnoreCase: (str, ...substrs) => {
        let newSubStrs = [];
        substrs.forEach(s=> newSubStrs.push(s.toLowerCase()));
        return strContains(str.toLowerCase(), ...newSubStrs);
    },
    strNotContainsIgnoreCase: !strContainsIgnoreCase,

}
