console.log("属性扩展：节点");
// @version 0.0.2

Node.prototype.nodeNameIs = function(...nodeNames){return this.nodeName.containsIgnoreCase(...nodeNames);}

// Object.prototype.isNode = Object.prototype.isNode ? Object.prototype.isNode : function(){return this instanceof HTMLElement;}