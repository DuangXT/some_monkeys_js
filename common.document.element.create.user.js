// ==UserScript==
// @name         常用油猴脚本方法：创建新的文档元素
// @description
// @version      0.0.3
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.create.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.document.element.create.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// @grant unsafeWindow
// ==/UserScript==

// common level 0

gmlog('公共库：创建新的文档元素');

const createElement = addTag = addElement = tagName => document.createElement(tagName);
const add = create = createElement;
Document.prototype.create = Document.prototype.create ? Document.prototype.create : function(tagName){
    this.appendChild(create(tagName));
}
Element.prototype.create = Element.prototype.create ? Element.prototype.create : function(tagName){
    this.appendChild(create(tagName));
}