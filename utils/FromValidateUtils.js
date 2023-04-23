/** 表单校验
 * return true || false,  "错误信息"
 */
const FromValidateUtils= {

    //校验手机号码
    mobile: function (value, param) {
        return [/^(?:1\d\d)-?\d{5}(\d{3}|\*{3})$/.test(value), "手机号码不正确"]
    },

    email: function (value, param) {
        return [/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value), "邮箱格式不正确"];
    },

    length: function (value, param) {
        var message = "长度必须在在" + param[0] + "与" + param[1] + "之间";
        if (value.length >= param[0] && value.length <= param[1]) {
            return [true]
        } else {
            return [false, message]
        }
    },

    QQ: function (value, param) {
        return [/^[1-9]\d{4,10}$/.test(value), "QQ号码不正确"];
    },

    ZIP: function (value, param) {
        return [/^[0-9]\d{5}$/.test(value), '邮政编码不存在'];
    },
}