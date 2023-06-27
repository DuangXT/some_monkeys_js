// ==UserScript==
// @name 常用油猴脚本方法：函数方法
// @version 0.0.4-deprecated
// @author DuangXT
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/common.log.user.js
// @grant unsafeWindow
// ==/UserScript==
// common level 0

gmlog('公共库：函数方法');

let isFunction = func => func && 'function' === typeof func;

/**
 * 执行方法并捕获异常
 * @param func      执行方法
 * @param err_tip0  异常提示
 * @param tip       执行完成的提示
 * @param err_tip1  异常额外的提示
 */
function run(func, err_tip0, tip, err_tip1) {
    if(!isFunction(func)){
        throw new TypeError('func must be a function');
    }
    try {
        func();
        if (tip) log("[tip] " + tip);
    } catch (e) {
        if (err_tip0) log(err_tip0);
        console.error(e);
        if (err_tip1) log(err_tip1);
    }
}

/** 函数加入等待队列 */
function runLast(func){
    if(!isFunction(func)){
        throw new TypeError('func must be a function');
    }
    setTimeout(function () {
        func();
    }, 0);
}
const runAtLast = taskLast = functionLast = funcLast = runLast;



