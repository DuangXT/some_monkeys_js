// ==UserScript==
// @name         常用油猴脚本方法：对象节点
// @description
// @version      0.0.1
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/common.object.node.user.js
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @match *
// @include *
// @run-at document-start
// @grant none
// @grant unsafeWindow
// ==/UserScript==

gmlog('公共库：对象节点');


Object.prototype.isNode = function(){return this instanceof HTMLElement;}

/** 判断是否最终节点 */
function isLeafNode(element) {
    if (!element || !element.nodeType || 'number' !== typeof element.nodeType){
        log('parameter not a element object', element);
        return false;
    }
    const childNodes = element.childNodes;
    if (childNodes.length > 0) {
        for (const childNode of childNodes) {
            if (childNode.nodeType === 1 || childNode.nodeType === 3)
                return false;
        }
    }
    return true;
}
