
console.log("属性扩展：DOM选择器");
// @version 0.0.2

const $qs = document.querySelector.bind(document); // s => document.querySelector(s);
const $qsa = $all = $$ = document.querySelectorAll.bind(document); // s => [...document.querySelectorAll(s)];
// const querySelector = $qs;
// const querySelectorAll = $qsa;
// const $ = querySelector; // 不建议，容易引起冲突

Document.prototype.$qs = Document.prototype.querySelector;
Element.prototype.$qs = Element.prototype.querySelector;
Document.prototype.$qsa = Document.prototype.$all = Document.prototype.querySelectorAll;
Element.prototype.$qsa = Element.prototype.$all = Element.prototype.querySelectorAll;
// Document.prototype.isNode = Document.prototype.isNode ? Document.prototype.isNode : function(){return this instanceof HTMLElement;}
// Element.prototype.isNode = Element.prototype.isNode ? Element.prototype.isNode : function(){return this instanceof HTMLElement;}


Document.prototype.add = Document.prototype.add ? Document.prototype.add :
    Document.prototype.append ? Document.prototype.append : Document.prototype.append = Document.prototype.appendChild;
Element.prototype.add = Element.prototype.add ? Element.prototype.add :
    Element.prototype.append ? Element.prototype.append : Element.prototype.append = Element.prototype.appendChild;


/** 自身标签名与任意参数匹配时 true */
Element.prototype.tagNameIs = function(...tagNames){return this.tagName.equalsIgnoreCase(...tagNames);}


/** 移除指定的class */
Element.prototype.removeClass = function(...className){
    className.forEach(classname=>this.classList.remove(classname));}
/** 移除指定的class */
Document.prototype.removeClass = function(...className){
    className.forEach(classname=>this.classList.remove(classname));}

/** 当元素内文本包含指定内容时删除自身 */
Element.prototype.removeIfIncludesText = function(...strs){
    for (const s in strs) {
        if(s && this.textContent.contains(s.toString())){
            this.remove();
        }
    }
}

