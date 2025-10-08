
Array.prototype.contains = Array.prototype.contains ? Array.prototype.contains
    : function(...values){return values.every(value=>this.includes(value));}

Array.prototype.random = Array.prototype.random ? Array.prototype.random
    : function(){ return (this.length > 0) ? this[Math.floor(Math.random() * this.length)] : undefined; }

// @version 0.0.3
const ArrayExtend = true;
console.log("属性扩展：数组 ArrayExtend");