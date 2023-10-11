console.log("工具类：重定向");

/** 工具类：重定向
 * @version 0.0.6
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/UrlFunctions.js
 */
const RedirectUtils = {

    /** 当域名匹配时，询问是否跳转到目标地址 */
    askRedirect: (host, targetUrl, targetInfo) => {
        function jump(_host){
            if(_host && 'string' === typeof _host){
                if(hostnameHas(_host)){
                    let confText = "您是否想访问【 " + targetUrl +" 】？";
                    if(targetInfo) confText += "\n\n    " + targetInfo;
                    if(confirm(confText)){
                        redirect(targetUrl, true);
                        return;
                    }
                }
            }
            else console.log('askRedirect(wasHost): 域名对象不是字符串', _host);
        }
        if(Array.isArray(host)){
            host.forEach(_host => jump(_host));
        }
        else jump(host);
    },
    wantRedirect: function(...args){return this.askRedirect(...args)},

}