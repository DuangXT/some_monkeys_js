/** 工具类：无效页面判断
 * @version 0.0.2
 */
const InvalidPageUtils = (function () {

    const __contains__ = (targetStr, ...substrs) => {
        if (!targetStr && !substrs) return true; // 两个都是无效值
        if (!targetStr || !substrs || 'string' !== typeof targetStr || substrs.length < 1) return false;
        for (let substr of substrs) {
            if (targetStr.toUpperCase().indexOf(substr.toString().toUpperCase()) >= 0) return true;
        }
        return false;
    }


    return {
        verify: html => {
            if (html instanceof Element) html = html.textContent;
            if ('[object String]' === Object.prototype.toString.call(html)) {
                throw new TypeError('parameter "html" must be a string or HTMLElement');
            }

            return __contains__(html, '404 Not Found', '404 NotFound', '403 Forbidden',
                'Directory Listing Denied', 'Welcome to nginx!',
                '无法找到该页', 'HTTP 错误 404',
                '文件或目录未找到'
            );
        }

    }
})();
console.log("工具类：无效页面判断 InvalidPageUtils");
