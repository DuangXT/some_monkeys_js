/** 工具类：样式标签
 * @version 0.0.2
 */
const StyleTagUtils = {

    /** 以插入style标签的形式，向head内添加样式。
     * 油猴应该使用 GM_addStyle() */
    addStyleTagByCSS: css => {
        if('string' !== typeof css){
            throw new TypeError('parameter "css" must be a string');
        }
        if (!document.head) return false;
        let style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
        return style;
    },

    addStyleLink: url => {
        if('string' !== typeof url){
            throw new TypeError('parameter "url" must be a string');
        }
        if (!document.head) return false;
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
        return link;
    }

}
console.log("工具类：样式标签 StyleTagUtils");

