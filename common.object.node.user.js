// ==UserScript==
// @name         常用油猴脚本方法：节点对象
// @description
// @version      0.0.1.5
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


Object.prototype.isNode = Object.prototype.isNode ? Object.prototype.isNode : function(){return this instanceof HTMLElement;}

Node.prototype.nodeNameIs = function(...nodeNames){return this.nodeName.containsIgnoreCase(...nodeNames);}


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
