/** 工具类：特殊字符串校验
 * @version 0.0.6
 * @return [true|false, "错误信息"]
 */
class StringValidateUtils {

    /** 校验手机号码 */
    mobile = value => /^(?:1\d\d)-?\d{5}(\d{3}|\*{3})$/.test(value) ? [true] : [false, "手机号码不正确"];

    email= value => /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        .test(value) ? [true] : [false, "邮箱格式不正确"];

    length = (value, minLimit, maxLimit) => {
        let message = "长度必须在在" + minLimit + "与" + maxLimit + "之间";
        if (value.length >= minLimit && value.length <= maxLimit)
            return [true];
        return [false, message];
    };

    QQ = value => /^[1-9]\d{4,10}$/.test(value) ? [true] :[false, "QQ号码不正确"];
    qq = this.QQ;

    ZIP = value => /^[0-9]\d{5}$/.test(value) ? [true] : [false, '邮政编码不存在'];
    zip = this.ZIP;


    isIpv4Address = ipAddress =>
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            .test(ipAddress) ? [true] : [false, '字符串内容不是IPv4格式！'];
    ipv4 = this.isIpv4Address;

    /**
     * 10.0.0.0 - 10.255.255.255
     * 172.16.0.0 - 172.31.255.255
     * 192.168.0.0 - 192.168.255.255
     * 100.64.0.0 - 100.127.255.255
     * @param ipAddress
     * @returns [boolean, string]
     */
    isPrivateIpv4Address = ipAddress =>
        // /^(10|172\.(1[6-9]|2[0-9]|3[01])|192\.168)\.\d{1,3}\.\d{1,3}$/
        /^(10\.)|(172\.(1[6-9]|2[0-9]|3[0-1])\.)|(192\.168\.)|(100\.(6[4-9]|7[0-9]|12[0-7])\.)/
            .test(ipAddress) ? [true] : [false, '字符串内容不是内网IPv4格式！'];

    /** 判断这个imei是否是正确的 正确返回ture 错误返回false */
    isImei = imeiString => {
        if('number' === typeof imeiString){
            imeiString = imeiString.toLocaleString('fullwide', { useGrouping: false });
        }

        if('' !== imeiString.replaceAll(/\d/g, ''))
            return false; // imei值必须是纯数字
        let i = 0;
        let vl_Sum1 = 0, vl_Sum2 = 0, vl_Total = 0;
        let vl_Temp = 0;

        for (i = 0; i < 14; i++) {
            /* (1)将奇数位数字相加(从1开始计数) */
            if ((i % 2) === 0) {
                vl_Sum1 = vl_Sum1 + parseInt(imeiString[i]);
            } else {
                /* (2)将偶数位数字分别乘以2,分别计算个位数和十位数之和(从1开始计数) */
                vl_Temp = (parseInt(imeiString[i])) * 2;
                if (vl_Temp < 10) {
                    vl_Sum2 = vl_Sum2 + vl_Temp;
                } else {
                    vl_Sum2 = vl_Sum2 + 1 + vl_Temp - 10;
                }
            }
        }
        /* (1)+(2) */
        vl_Total = vl_Sum1 + vl_Sum2;
        /* 如果得出的数个位是0则校验位为0,否则为10减去个位数 */
        if ((vl_Total % 10) === 0) {
            if(imeiString[14] === '0'){
                return true;
            }
        } else {
            if((10 - (vl_Total % 10)).toString() === imeiString[14] ){
                return true;
            }
        }
        return false;
    }

}
console.log("工具类：特殊字符串校验 StringValidateUtils");
