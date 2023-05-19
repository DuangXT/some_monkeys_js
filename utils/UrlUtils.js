
const originalOpen = XMLHttpRequest.prototype.open;

const UrlUtils = {

    /** 刷新页面至指定链接 */
    refesh: (url=location.href, replace) => {
        if(!url.startsWith("http")) url = 'https://' + url;
        if(replace || location.href !== url){
            location.replace(url);
            return;
        }
        location.href = url;
    },

    /** 匹配当前URL规则 */
    currentUrlIncludes: function(...searchString){
        for (let ss of searchString) {
            if(document.URL.includes(ss)) return true;
        }
        return false;
    },

    /** 判断域名内是否包含匹配字符串 */
    hostnameContains: function (...matchs) {
        for (let match of matchs) {
            if (StringUtils.strContainsIgnoreCase(location.hostname, match)) return true;
        }
        return false;
    },
    hostnameHas: this.hostnameContains,

    /** 判断链接内是否包含匹配字符串 */
    currentUrlContains: function(...matchs){
        for (let match of matchs) {
            if(StringUtils.strContains(location.href, match)) return true;
        }
        return false;
    },
    currentUrlContain: this.currentUrlContains,

    searchParamsContains: function(...paramNames){
        let params = this.getQueryParams();
        for (let paramName of paramNames) {
            if(params[paramName]) return true;
        }
        return false;
    },
    queryParamsContains: this.searchParamsContains,


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

    getQueryParam: (name) => this.getQueryParams()[name],

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
    setQueryParams: this.setSearchParams,

    /** 添加一个查询参数 */ // setSearchParam
    addSearchParam: (paramName, paramValue) => this.setSearchParams({paramName: paramValue}),

    /** 当域名匹配时，询问是否跳转到目标地址 */
    askRedirect: (wasHost, targetUrl, targetInfo) => {
        if (this.hostnameHas(wasHost)) {
            let confText = "您是否想访问【 " + targetUrl + " 】？";
            if (targetInfo) confText += "\n\n    " + targetInfo;
            if (confirm(confText)) {
                refesh(targetUrl, true);
            }
        }
    },
    wantRedirect: this.askRedirect,


};

