// ==UserScript==
// @name         常用油猴脚本方法：文档元素
// @description
// @version      0.0.2
// @author       DuangXT
// @grant unsafeWindow
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.user.js

// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.function.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.style.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.json.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.selector.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.create.user.js

// @match *
// @include *
// ==/UserScript==

// common level 2

gmlog('公共库：文档元素');

Element.prototype.tagNameIs = function(...tagNames){return this.tagName.containsIgnoreCase(...tagNames);}

const getTagElements = (tagName) => document.getElementsByTagName(tagName);
/**
 * 指定标签对象
 * @param tagName      标签名
 * @param tagLocation  标签位置
 */
const getTagElement = (tagName, tagLocation=0) => getTagElements(tagName)[tagLocation];

/** 移除指定的每个元素 */
function removeElement(...selectors) {
    selectors.forEach((selector)=>{
        let ele;
        if('string' === typeof selector) ele = $qs(selector);
        else ele = selector;
        if (ele) {
            try{
                ele.remove();
            }catch (e){
                logerror(e);
            }
            log("移除元素：", selector);
        }
    });
}
const deleteElement = removeElement;

/** 移除指定的所有元素 */
const removeElements = (...selectors) => {
    selectors.forEach((selector)=>{
        if('string' === typeof selector)
        for (let ele of $qsa(selector)) {
            ele.remove();
            log("移除元素：", selector, 'id=' + ele.id, 'class=' + ele.className);
        }
        else logwarn('参数不是字符串', selector);
    });
};
const deleteElements = deleteAllElements = removeAllElements = removeElements;

Element.prototype.removeIfIncludesText = function(...strs){
    for (const s in strs) {
        if(s && this.textContent.contains(s.toString())){
            this.remove();
        }
    }
}
function removeIfTextContrains(obj, ...strs){
    if('object' !== typeof obj){
        throw new TypeError('obj must be a object');
    }
    function _remove(o){
        if(o && o.isNode()){
            for (const s in strs) {
                if(s && o.textContent.contains(s.toString())){
                    o.remove();
                }
            }
            return;
        }
        log('无法操作非节点对象', o);
    }
    if(Array.isArray(obj)){
        for (let o of obj) {
            _remove(o);
        }
        return obj;
    }
    _remove(obj);
    return obj;
}
const removeIfIncludesText = removeIfTextContrains;

/** 隐藏单个指定的标签（返回被隐藏的标签对象） */
function hideElement(_selector) {
    let ele = $qs(_selector);
    if (ele) {
        if (ele.style) log("元素 " + _selector + " 隐藏前样式：" + toJson(ele.style).slice(0,100));
        setStyleHidden(ele);
    }
    return ele;
}
/** 隐藏每个选择器的一个标签 */
const hideElements = (...selectors) => selectors.forEach(hideElement);

/** 隐藏每个选择器的所有标签 */
function hideAllElements(...selectors){
    selectors.forEach((selector)=>{
        for (let ele of $qsa(selector)) {
            setStyleHidden(ele);
        }
    });
}

/** 选择对象存在时执行click() */
function selectorClick(_selector){
    if('string' !== typeof _selector){
        throw new TypeError('_selector must be a string');
    }
    return selectorRunIfExist( _selector, function(s){
        s.click();
        log('执行了点击操作', _selector);
    });
}
const clickSelector = selectorClick;
const clickSelectors = selectorsClick = (...selectors) => selectors.forEach(selector => selectorClick(selector));

/** 选择器，存在时移除指定的class */
function selectorRemoveClass(_selector, ...removeClasses){
    if('string' !== typeof _selector){
        throw new TypeError('_selector must be a string');
    }
    return selectorRunIfExist(_selector, function(selector){
        // removeClasses.forEach(_class => {
        for(let _class of removeClasses){
            if(typeof _class === 'string'){
                // if(selector.classList.contains(_class))
                selector.classList.remove(_class);
            }
            else log("a parameter 'removeClasses', not type string  ", _class);
        }
    });
}

/** 选择对象如果存在，执行指定函数 */
function selectorRunIfExist(obj, func){
    if(!obj) return false;
    if(!isFunction(func)){
        throw new TypeError('func must be a function');
    }
    if('string' === typeof obj){
        obj = $qs(obj);
    }
    if(obj) func(obj);
    return obj;
}


/**
 * 指定标签设置属性
 * @param tagName      标签名
 * @param attrName     属性名
 * @param attrContent  属性内容
 * @param tagLocation  标签位置
 */
function setTagAttr(tagName, attrName, attrContent, tagLocation = 0) {
    getTagElement(tagName, tagLocation).setAttribute(attrName, attrContent);
}


/** 添加新的link标签 */
function addLinkTag(linkHref, linkType='text/css', linkRel='stylesheet') {
    if('string' !== typeof linkHref){
        throw new TypeError('parameter "css" must be a string');
    }
    if (!head) return;
    let link = createElement('link');
    link.type = linkType;
    link.rel = linkRel;
    link.href = linkHref;
    head.add(link);
    return link;
}

const html = html ? html : document.html || getTagElement('html');
const body = body ? body : document.body || getTagElement('body');
const head = head ? head : document.head || getTagElement('head');
const cookie = cookie ? cookie : document.cookie;
const tags = allTag = allElements = () => $qsa('*');
// head.add = head.append ? head.append : head.append = head.appendChild;
// body.add = body.append ? body.append : body.append = body.appendChild;
// html.add = html.append ? html.append : html.append = html.appendChild;

// 一些需要留意的，非常同名的函数名称重定向
Document.prototype.add = Document.prototype.add ? Document.prototype.add :
    Document.prototype.append ? Document.prototype.append : Document.prototype.append = Document.prototype.appendChild;
Element.prototype.add = Element.prototype.add ? Element.prototype.add :
    Element.prototype.append ? Element.prototype.append : Element.prototype.append = Element.prototype.appendChild;
const remove = remove ? remove : removeElement;
const removeAll = removeAll ? removeAll : removeElements;
const hide = hide ? hide : hideElement;
const hides = hideElements;
const hideAll = hideAllElements;
const click = click ? click : selectorClick;