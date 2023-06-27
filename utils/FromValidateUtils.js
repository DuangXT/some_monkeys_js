console.log("工具类：表单校验");
/** 工具类：表单校验
 * @version 0.0.2
 * @return true || false,  "错误信息"
 */
class FromValidateUtils {

    /** 校验手机号码 */
    mobile = value => /^(?:1\d\d)-?\d{5}(\d{3}|\*{3})$/.test(value) ? [true] : [false, "手机号码不正确"];

    email= value => /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
        ? [true] : [false, "邮箱格式不正确"];

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
}