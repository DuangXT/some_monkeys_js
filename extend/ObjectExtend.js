console.log("属性扩展：对象操作");
// @version 0.0.1

Object.prototype.containsKey = Object.prototype.containsKey ? Object.prototype.containsKey
    : function(...keys){
        for (let key of keys) {
            if(key in this) return this[key];
        }
        return false;
    };
Object.prototype.containsValue = Object.prototype.containsValue ? Object.prototype.containsValue
    : function(...values){
        let arr = Object.values(this);
        return values.every(value => arr.includes(value));
    };
Object.prototype.contains = Object.prototype.contains ? Object.prototype.contains
    : function(...substrs){
        return this.containsKey(substrs) || this.containsValue(substrs);
    };
// Object.prototype.toJson = function(){return JSON.stringify(this);}
// Object.prototype.isNode = function(){return this instanceof Node;}