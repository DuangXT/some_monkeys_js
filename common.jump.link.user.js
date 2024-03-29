// ==UserScript==
// @name 常用油猴脚本方法：跳转链接
// @version 0.0.3-deprecated
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.function.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.style.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.json.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.url.link.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.selector.user.js
// ==/UserScript==
// common level 3
gmlog('公共库：跳转链接');

/** 循环获取a标签元素的href，直到元素及href存在并跳转 */
function selectorUrlAlwaysJump(_selector, _property='href', timeout=3000, flag=true){
    let alink = 'string' === typeof _selector ? $qs(_selector) : _selector;
    let url; // url重定向
    if(alink && alink[_property]) url = alink[_property];
    log(alink);
    if(!url){
        log('未获取到标签或链接，%s毫秒后重试', timeout);
        setTimeout(function(){
            selectorUrlAlwaysJump(_selector, _property, timeout, flag); // 每n秒循环直到成功跳转
        }, timeout);
        return;
    }
    log('即将跳转到链接', url);
    if(flag) refesh(url);
    else window.open(url);
}
const selectorUrlAlwaysRedirect = selectorUrlAlwaysJump;
const selectorUrlAlwaysJumpOpen = (_selector, _property='href', timeout=3000) =>
    selectorUrlAlwaysJump(_selector, _property, timeout, false);

/** 当域名匹配时，询问是否跳转到目标地址 */
function askRedirect(wasHost, targetUrl, targetInfo) {
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
        else log('askRedirect(wasHost): 域名对象不是字符串', host);
    }
    if(Array.isArray(wasHost)){
        wasHost.forEach(host => {
            jump(host);
        });
    }
    else jump(wasHost);
}
const wantRedirect = askRedirect;