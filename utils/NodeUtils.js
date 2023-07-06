console.log("工具类：节点");

/** 工具类：节点
 * @version 0.0.1.12
 */
const NodeUtils = {

    isElementNode: node => node &&
        (node instanceof HTMLElement || (node.nodeType && 'number' === typeof node.nodeType)),

    isNodeList: nodeList => nodeList instanceof NodeList,

    /** 判断是否最终节点 */
    isLeafNode: function(element) {
        if (!this.isElementNode(element)) {
            console.log('parameter not a element object', element);
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
    },

    /** 获取当前元素节点下面的最大节点长度（包括当前节点自身）
     * 0：对象不是元素；1：元素是最终节点，没有任何子节点；n-1：元素下面最长的子节点长度
     */
    getMaxChildNodeLength: function(element){
        if (!this.isElementNode(element)){
            console.log('parameter invalid', element);
            return 0;
        }
        let maxLen = 0;
        Array.from(element.childNodes).forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) { // 判断是否为元素节点
                const len = this.getMaxChildNodeLength(node);
                maxLen = Math.max(maxLen, len);
            }
        });
        return maxLen + 1;
    }

}

