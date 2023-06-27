// ==UserScript==
// @name 常用油猴脚本方法：文档元素
// @version 0.0.5
// @author DuangXT
// @grant unsafeWindow

// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/extend/SelectorFunctions.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/SelectorUtils.js
// ==/UserScript==

gmlog('公共库：文档元素');

var html = html ? html : document.html || getTagElement('html');
var body = body ? body : document.body || getTagElement('body');
var head = head ? head : document.head || getTagElement('head');
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