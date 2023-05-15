
const originalOpen = XMLHttpRequest.prototype.open;

const UrlUtils = {

    /** 刷新页面至指定链接 */
    refesh: (url=location.href) => location.href = url,

    /** 获取当前页面链接上的url参数对象 */
    getLocationQueryVariables: function (){
        let query = location.search.substring(1),
            vars = query.split("&"), params = {};
        vars.forEach(var1 => {
            let pair = var1.split("=");
            params[pair[0]] = pair[1];
        });
        return params;
    },

    /** 获取url中的参数对象 */
    @Deprecated
    getURLParams:function (url){
        if(!url){
            log("没有指定url，获取当前页面url的参数集");
            return this.getLocationQueryVariables();
        }

        let params = {}, pattern = /(\w+)=(\w+)/ig; // 表达式只用\w是有问题的
        url.replace(pattern, ($, $1, $2) => {
            params[$1] = $2;
        });
        return params;
    },

    /**
     * 获取查询参数
     * //by http://stackoverflow.com/a/1099670
     */
    getQueryParams: (qs = document.location.search) => {
        qs = qs.split('+').join(' ');
        let params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
        while ((tokens = re.exec(qs))) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    },

    getQueryPara: (name) => getQueryParams()[name],

    /** 从url中获取一个指定的参数 */
    @Deprecated
    getUrlParam: (name, url) => getURLParams(url)[name],

    /** 设置查询参数 */
    setSearchParams: (paramJson)=>{
        XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
            // 修改 GET 请求的参数
            if ('GET' === method) {
                const urlObj = new URL(url);
                for (const key in paramJson){
                    urlObj.searchParams.set(key, paramJson[key]);
                }
                url = urlObj.toString();
            }

            // 调用原始的 open 方法
            return originalOpen.apply(this, [method, url, async, user, password]);
        };
    },

    /** 添加一个查询参数 */ // setSearchParam
    addSearchParam: (paramName, paramValue) => setSearchParams({paramName: paramValue}),




};

