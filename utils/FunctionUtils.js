/** 工具类：函数
 * @version 0.0.12
 */
const FunctionUtils= (function (){

    const isFunction = func => func && 'function' === typeof func;
    const sleep = (ms = 1000) => new Promise(() => setTimeout(()=>{}, ms));

    const runLast = function (func) {
        if (!isFunction(func)) {
            throw new TypeError('func must be a function');
        }
        setTimeout(func, 0);
    }

    return {

        isFunction,

        sleep,
        wait: sleep,

        /**
         * 执行方法并捕获异常
         * @param func      执行方法
         * @param err_tip0  异常提示
         * @param tip       执行完成的提示
         * @param err_tip1  异常额外的提示
         */
        run: function (func, err_tip0, tip, err_tip1) {
            if (!isFunction(func)) {
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
        runLast,
        runAtLast: runLast,
        taskLast: runLast,

    }
});
console.log("工具类：函数 FunctionUtils");
