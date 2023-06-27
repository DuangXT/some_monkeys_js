console.log("工具类：重定向");

// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/UrlFunctions.js
/** 工具类：重定向
 * @version 0.0.1
 */
const RedirectUtils = {

    /** 当域名匹配时，询问是否跳转到目标地址 */
    askRedirect: (wasHost, targetUrl, targetInfo) => {
        function jump(host){
            if(host && 'string' === typeof host){
                if(hostnameHas(host)){
                    let confText = "您是否想访问【 " + targetUrl +" 】？";
                    if(targetInfo) confText += "\n\n    " + targetInfo;
                    if(confirm(confText)){
                        refesh(targetUrl, true);
                        return;
                    }
                }
            }
            else console.log('askRedirect(wasHost): 域名对象不是字符串', host);
        }
        if(Array.isArray(wasHost)){
            wasHost.forEach(host => {
                jump(host);
            });
        }
        else jump(wasHost);
    },
    wantRedirect: this.askRedirect,

}