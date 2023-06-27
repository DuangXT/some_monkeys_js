console.log("工具类：字符串");

/** 工具类：DOM操作
 * @version 0.0.10
 */
const StringUtils = {

    isString: (s)=> '[object String]' === Object.prototype.toString.call(s),

    equals: (s1, s2, ignoreCase = false) =>
        ignoreCase && s1 && s2 ? s1.toUpperCase() === s2.toUpperCase() : s1 === s2,
    equalsIgnoreCase: function(s1, s2){this.equals(s1, s2, true)},

    /** 查找目标字符串中是否包含指定字符 */
    contains: (targetStr, ...substrs) => {
        if(!targetStr && !substrs) return true; // 两个都是无效值
        if(!targetStr || !substrs || 'string' !== typeof targetStr || substrs.length<1) return false;
        for (let substr of substrs) {
            if(targetStr.indexOf(substr.toString()) >= 0) return true;
        }
        return false;
    },
    /** 检查目标字符串中不包含指定字符 */
    notContain: !this.contains,

    containsIgnoreCase: (str, ...substrs) => {
        let newSubStrs = [];
        substrs.forEach(s=> newSubStrs.push(s.toLowerCase()));
        return this.contains(str.toLowerCase(), ...newSubStrs);
    },
    notContainsIgnoreCase: !this.containsIgnoreCase,


    /**
     * 获取随机字符串
     * @param str 随机字符候选组，字符重复越多权重越高
     * @param len 得到随机字符的长度
     * @returns {string}
     */
    getRandStr: (str, len)=>{
        let ret = '';
        while (len--) {
            ret += str[parseInt(Math.random() * str.length + '')];
        }
        return ret;
    },

    /** 检查ip字符串是否内网ip地址 */
    isLocalIp: ip=>{
        function is172(ip){
            let ip2 = 1 * ip.split('.')[1];
            return ip2 > 15 && ip2 < 32;
        }
        return ip.startsWith('10.') || ip.startsWith('192.168.') || is172(ip);
    }

}
