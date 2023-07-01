// ==UserScript==
// @name 常用油猴脚本方法：文档元素
// @version 0.0.6
// @author DuangXT
// @grant unsafeWindow

// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/StringExtend.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/SelectorUtils.js
// ==/UserScript==

gmlog('公共库：文档元素');

var html = html ? html : document.html || $dom.getTagElement('html');
var body = body ? body : document.body || $dom.getTagElement('body');
var head = head ? head : document.head || $dom.getTagElement('head');
var cookie = cookie ? cookie : document.cookie;

// 一些需要留意的，非常同名的函数名称重定向
var remove = remove ? remove : $dom.remove;
const removeAll = $dom.removeAll;
var hide = hide ? hide : $dom.hide;
const hideAll = $dom.hideAll;
var click = click ? click : obj=>{
    if(StringUtils.isString(obj)){
        return $dom.click(obj);
    }else if('object' === typeof obj){
        log("执行点击", obj);
        obj.click();
        return obj;
    }
    throw new Error("Invalid object");
}

/** 视频站选择清晰度专用 */
const clickIfNoLogin = (liSelector, liNoLoginSpan, spanText)=>{
    let length = $dom.qsa(liSelector).length;
    for(let i=0; i<length; i++){
        let loginSpan = $dom.qs(liSelector + ":nth-child(" + i + ") > " + liNoLoginSpan);
        if(loginSpan || loginSpan.textContent.containsIgnoreCase(spanText)){ // 存在说明未登录跳过下一个
            continue;
        }
        $dom.click(liSelector + ":nth-child(" + i + ")");
        return;
    }
}