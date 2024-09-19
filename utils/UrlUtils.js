/** 工具类：URL
 * @version 0.0.11
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/UrlFunctions.js
 */
const UrlUtils = (function () {
    if(!UrlFunctions){
        console.error("缺少依赖！！！", "工具类：UrlUtils", "UrlFunctions");
        return {};
    }

    /**
     * 获取查询参数
     * //by http://stackoverflow.com/a/1099670
     */
    const getQueryParams = function (qs = document.location.search) {
        qs = qs.split('+').join(' ');
        let params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
        while ((tokens = re.exec(qs))) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    };

    const searchParamsContains = function (...paramNames) {
        let params = getQueryParams();
        for (let paramName of paramNames) {
            if (params[paramName]) return true;
        }
        return false;
    }

    return {

        getQueryParams,

        /** 如果主站点匹配则执行动作 */
        runIfHostIs: function () {
            if (arguments.length < 2) {
                throw new TypeError('参数应至少传递两位，且最后一位为执行函数');
            }
            let callback = arguments[arguments.length - 1];
            if (!callback || 'function' !== typeof callback) {
                throw new TypeError('参数错误！最后一位参数应为执行函数');
            }
            let hosts = Array.prototype.slice.call(arguments);
            hosts.splice(hosts.length - 1, 1);
            if (hostnameIs(hosts)) {
                callback();
            }
        },

        searchParamsContains,
        queryParamsContains: searchParamsContains,


        /** 获取当前页面链接上的url参数对象 */
        getLocationQueryVariables: function () {
            let query = location.search.substring(1),
                vars = query.split("&"), params = {};
            vars.forEach(var1 => {
                let pair = var1.split("=");
                params[pair[0]] = pair[1];
            });
            return params;
        },

        getQueryParam: function (name) {
            return getQueryParams()[name]
        },
    }

})();
console.log("工具类：UrlUtils");

