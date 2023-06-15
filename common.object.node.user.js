// ==UserScript==
// @name         常用油猴脚本方法：节点对象
// @description
// @version      0.0.1.9
// @author       DuangXT
// @homepageURL  https://github.com/DuangXT/some_monkeys_js/
// @updateURL    https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @downloadURL  https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.object.node.user.js
// @require      https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.string.user.js
// @match *
// @include *
// @grant unsafeWindow
// ==/UserScript==

// common level 0
gmlog('公共库：节点对象');

Node.prototype.nodeNameIs = function(...nodeNames){return this.nodeName.containsIgnoreCase(...nodeNames);}

// Object.prototype.isNode = Object.prototype.isNode ? Object.prototype.isNode : function(){return this instanceof HTMLElement;}
function isElementNode(node){
    return node && (node instanceof HTMLElement || (node.nodeType && 'number' === typeof node.nodeType));
}

/** 判断是否最终节点 */
function isLeafNode(element) {
    if (!isElementNode(element)){
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

/** 获取当前元素节点下面的最大节点长度（包括当前节点自身）
 * 0：对象不是元素；1：元素是最终节点，没有任何子节点；n-1：元素下面最长的子节点长度
 */
function getMaxChildNodeLength(element) {
    if (!isElementNode(element)){
        log('parameter invalid', element);
        return 0;
    }
    let maxLen = 0;
    Array.from(element.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) { // 判断是否为元素节点
            const len = getMaxChildNodeLength(node);
            maxLen = Math.max(maxLen, len);
        }
    });
    return maxLen + 1;
}