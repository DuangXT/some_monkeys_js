// ==UserScript==
// @name 常用油猴脚本方法：创建新的文档元素
// @version 0.0.5.1
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @grant unsafeWindow
// ==/UserScript==
// common level 0

gmlog('公共库：创建新的文档元素');

const createElement = addTag = addElement = tagName => document.createElement(tagName);
var create = createElement;
var add = add ? add : create;
Document.prototype.create = Document.prototype.create ? Document.prototype.create
    : function(tagName){this.appendChild(create(tagName));}
Element.prototype.create = Element.prototype.create ? Element.prototype.create
    : function(tagName){this.appendChild(create(tagName));}