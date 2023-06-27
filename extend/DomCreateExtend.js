console.log("扩展：创建新的文档元素");
// @version 0.0.5.2

const createElement = addTag = addElement = document.createElement.bind(document);
var create = create ? create : createElement;
var add = add ? add : create;
Document.prototype.create = Document.prototype.create ? Document.prototype.create
    : function(tagName){this.appendChild(document.createElement(tagName));}
Element.prototype.create = Element.prototype.create ? Element.prototype.create
    : function(tagName){this.appendChild(document.createElement(tagName));}