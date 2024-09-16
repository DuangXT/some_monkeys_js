
Array.prototype.contains = Array.prototype.contains ? Array.prototype.contains
    : function(...values){return values.every(value=>this.includes(value));}





// @version 0.0.2
const ArrayExtend = true;
console.log("属性扩展：数组 ArrayExtend");