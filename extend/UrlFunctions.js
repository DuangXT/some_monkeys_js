
const currentUrl = location.href.toString();
const hostname = location.hostname.toString();

/** 页面重定向至指定链接 */
const redirect = (url=currentUrl, replace=false) => {
    if(!url) url = currentUrl;
    if(!url.startsWith("http")) url = 'https://' + url;
    if(replace && currentUrl !== url){
        console.log('替换链接为：', url);
        location.replace(url);
        return;
    }
    console.log('跳转链接：', url);
    location.href = url;
}
/** 单纯刷新页面 */
const refesh = ()=> redirect(currentUrl);
// 尝试禁用页面刷新
window.location.reload = ()=>console.log('页面刷新已被禁用');

/** 判断当前URL内是否包含匹配的字符串 */
const currentUrlIncludes = (...searchString) => currentUrl.contains(...searchString);
const currentUrlContain = currentUrlContains = currentUrlIncludes;

/** 判断域名内是否包含匹配字符串 */
const hostnameContains = (...matchs) => hostname.containsIgnoreCase(...matchs);
const hostnameHas = hostnameContains;
const hostnameIs = (...hostnames) => hostname.equalsIgnoreCase(...hostnames);



// @version 0.0.7.3
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js
const UrlFunctions = true;
console.log("扩展函数：UrlFunctions");


