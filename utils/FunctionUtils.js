console.log("工具类：函数");

/** 工具类：函数
 * @version 0.0.7
 */
const FunctionUtils={

    isFunction: func => func && 'function' === typeof func,

    sleep: (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout)),

    /**
     * 执行方法并捕获异常
     * @param func      执行方法
     * @param err_tip0  异常提示
     * @param tip       执行完成的提示
     * @param err_tip1  异常额外的提示
     */
    run: function(func, err_tip0, tip, err_tip1) {
        if(!this.isFunction(func)){
            throw new TypeError('func must be a function');
        }
        try {
            func();
            if (tip) console.log("[tip] " + tip);
        } catch (e) {
            if (err_tip0) console.log(err_tip0);
            console.error(e);
            if (err_tip1) console.log(err_tip1);
        }
    },

    /** 函数加入等待队列 */
    runLast: function(func){
        if(!this.isFunction(func)){
            throw new TypeError('func must be a function');
        }
        setTimeout(func, 0);
    },
    runAtLast: this.runLast, taskLast: this.runLast,

}