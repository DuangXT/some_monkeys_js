

String.prototype.equals = function(...string){
    for (const s of string) {
        if (this === s) return true;
    }
    return false;
}
String.prototype.equalsIgnoreCase = function(...string){
    for (const s of string) {
        if (this.toUpperCase() === s.toUpperCase())
            return true;
    }
    return false;
}

String.prototype.contains = function (...strings) {
    for (let s of strings) {
        s = s.toString();
        if(
            // this.indexOf(s) >= 0 // <ES6
            this.includes(s) // >=ES6
        ) return true;
    }
    return false;
}
String.prototype.notContains=(...s)=>!String.prototype.contains(...s);
String.prototype.containsIgnoreCase = function (...substrs){
    let newSubStrs = [];
    substrs.forEach(s=> newSubStrs.push(s.toString().toUpperCase()));
    return this.toUpperCase().contains(...newSubStrs);
}
String.prototype.notContainsIgnoreCase=(...s)=>!String.prototype.containsIgnoreCase(...s);

/** 当字符串包含指定的数组中的全部字符时返回true */
String.prototype.containsAll = function(...ss) {return ss.every(s => this.includes(s))};
String.prototype.containsAllIgnoreCase = function(...ss) {
    const str = this.toLowerCase();
    return ss.every(s => str.includes(s.toLowerCase()));
};



// Object.prototype.isString = function(){return '[object String]' === Object.prototype.toString.call(this)}




// @version: 0.0.12
const StringExtend = true;
console.log("属性扩展：字符串 StringExtend");

