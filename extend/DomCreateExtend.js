

const createElement = addTag = addElement = document.createElement.bind(document);
var create = 'undefined' !== typeof create ? create : createElement;
var add = 'undefined' !== typeof add ? add : create;
Document.prototype.create = Document.prototype.create ? Document.prototype.create
    : function(tagName){
    let newEle = document.createElement(tagName);
    this.appendChild(newEle);
    return newEle;
}
Element.prototype.create = Element.prototype.create ? Element.prototype.create
    : function(tagName) {
        let newEle = document.createElement(tagName);
        this.appendChild(newEle);
        return newEle;
}




// @version 0.0.5.5
const DomCreateExtend = true;
console.log("扩展：创建新的文档元素 DomCreateExtend");
