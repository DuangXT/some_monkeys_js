// ==UserScript==
// @name 常用油猴脚本方法：文档元素选择器
// @version 0.0.2
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @grant unsafeWindow
// ==/UserScript==
// common level 0

gmlog('公共库：文档元素选择器');

const $qs = document.querySelector.bind(document); // s => document.querySelector(s);
const $qsa = $all = $$ = document.querySelectorAll.bind(document); // s => [...document.querySelectorAll(s)];
// const querySelector = $qs;
// const querySelectorAll = $qsa;
// const $ = querySelector; // 不建议，容易引起冲突
Document.prototype.$qs = Document.prototype.querySelector;
Element.prototype.$qs = Element.prototype.querySelector;
Document.prototype.$qsa = Document.prototype.$all = Document.prototype.querySelectorAll;
Element.prototype.$qsa = Element.prototype.$all = Element.prototype.querySelectorAll;
