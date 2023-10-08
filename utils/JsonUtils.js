console.log('工具类：JSON处理');

// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
/** 工具类：JSON处理
 * @version 0.0.2.4
 */
class JsonUtils{
    toJson = obj => {
        if('object' === typeof obj)
            obj = JSON.stringify(obj);
        if('function' === typeof obj && JSON.stringifyWithFunctions)
            obj = JSON.stringifyWithFunctions(obj);
        if('string' === typeof obj)
            return JSON.parse(obj); // eval('('+ obj +')'); 旧版本方法
        throw new TypeError('Not a type that can be converted to JSON');
    };
    parse = this.toJson;

    toCsv = obj => {
        if('object' === typeof obj) throw new TypeError('Invalid json object');
        return Object.keys(obj[0]).join(',') + '\n' // hedaer头，获取全部属性名单独列为一行
        + obj.map(item => Object.values(item).join(',')).join('\n');
    };

    /** like jQuery.$(selector).serializeArray() */
    __serializeArray__ = _selector => {
        let form = document.querySelector(_selector);
        let formData = [];
        let elements = form.elements;

        Array.from(elements).forEach(function(element) {
            if (element.name) {
                let value = element.value || '';
                formData.push({ name: element.name, value: value });
            }
        });

        return formData;
    };

    /** 拿取form表单数据转成json格式返回 */
    formToJson = _selector => {
        let arry = this.__serializeArray__(_selector);
        let data = {};
        for (const element of arry) {
            if (data[element.name])
                data[element.name] = data[element.name] + '$#' + element.value;
            else data[element.name] = element.value;
        }
        return data;
    };

    formToJsonNoNull = _selector => {
        let arry = this.__serializeArray__(_selector);
        let data = {};
        for (const element of arry) {
            if (StringUtils.isNotBlank(element.value))
                data[element.name] = element.value;
        }
        return data;
    };


}
