const UrlUtils = {

    /** 查找url中是否包含指定字符 */
    urlMatching: (url, match) => url.indexOf(match) > 0,


    /** 获取当前页面链接上的url参数对象 */
    getLocationQueryVariables: function (){
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        let params = {};
        for (let i=0; i<vars.length; i++) {
            let pair = vars[i].split("=");
            params[pair[0]] = pair[1]
        }
        return params;
    },

    /** 获取url中的参数对象 */
    getURLParams:function (url){
        if(!url){
            console.log("没有指定url，获取当前页面url的参数集");
            return getLocationQueryVariables();
        }

        let pattern = /(\w+)=(\w+)/ig;
        let params = {};

        url.replace(pattern, ($, $1, $2) => {
            params[$1] = $2;
        });
        return params;
    },

    /** 从url中获取一个指定的参数 */
    getUrlParam: function (name, url){
        let params = getURLParams(url);
        return params[name];
    },


};

