
console.log("属性扩展：数组");
// @version 0.0.1

Array.prototype.contains = Array.prototype.contains ? Array.prototype.contains
    : function(...values){return values.every(value=>this.includes(value));}