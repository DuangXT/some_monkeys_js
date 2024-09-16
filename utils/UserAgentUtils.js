/** 工具类：UserAgent
 * @version 0.0.4
 */
const UserAgentUtils = {

    /** 只读引用 */
    getUserAgent: ()=>navigator.userAgent.toString(),

    /** 设置浏览器UA标识 */
    setUserAgent: userAgent => Object.defineProperty(navigator,
        "userAgent",{value:userAgent,writable:false,configurable:false,enumerable:true}),
}
console.log("工具类：UserAgentUtils");
