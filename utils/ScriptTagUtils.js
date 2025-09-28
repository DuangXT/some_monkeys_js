/** 工具类：脚本标签
 * @version 0.0.8
 */
const ScriptTagUtils = (function () {

    const __createScriptTagAndAppend__ = (targetNode, jslocation, jscode) => {
        let script = document.createElement('script');
        script.type = "application/javascript"; // "text/javascript";

        if (jscode) script.textContent = jscode; // script.innerText = jscode;
        if (jslocation) script.src = jslocation;

        targetNode.appendChild(script);
        return script;
    };

    /** 以插入script标签的形式，向页面body内插入新的脚本代码 */
    const addScriptByCode = (jscode, mainLocation = document.body) => {
        if (typeof mainLocation === 'string') {
            switch (mainLocation) {
                case 'body':
                    mainLocation = document.body;
                    break;
                case 'head':
                    mainLocation = document.head;
                    break;
                default:
                    mainLocation = document.querySelector(mainLocation);
            }
        }

        return __createScriptTagAndAppend__(mainLocation, null, jscode);
    };

    /** 向head插入js代码 */
    const addHeadScriptByCode = jscode => addScriptByCode(jscode, document.head);
    /** 向body插入js代码 */
    const addBodyScriptByCode = jscode => addScriptByCode(jscode, document.body);


    /** 删除页面上已有的重定向代码，用来阻止部分潜在的恶意重定向 */
    const disbledReload = ()=>{
        // window.location.reload = ()=> log('location.reload has been disabled');
        for (const script of document.getElementsByTagName('script')) {
            script.textContent = script.textContent
                // .replaceAll("setTimeout('window.location.reload();',1000);", "")
                .replaceAll("window.location.reload", "")
                .replaceAll("location.reload", "")
        }
    }

    const fetchScript = (url) => {
        if('undefined' !== typeof GM_xmlhttpRequest){
            GM_xmlhttpRequest({method: "GET", url: url,
                onload: function(r) {
                    addHeadScriptByCode(r.responseText);
            }});
        }
        // 现代浏览器安全政策无法发起请求
        else fetch(url).then(r => addHeadScriptByCode(r.text()));
    };

    return {
        /** 以插入script标签的形式，向页面body内插入新的脚本引用 */
        addScriptTag: jslocation => {
            if ('string' !== typeof jslocation || !jslocation.startsWith("http")) {
                throw new TypeError('parameter "jslocation" must be a url string');
            }
            return __createScriptTagAndAppend__(document.head, jslocation);
        },

        addScriptByCode,
        addScript: addScriptByCode,

        addHeadScriptByCode,
        addBodyScriptByCode,

        fetchScript,

        /** 一次性加载脚本，脚本加载完即刻删除。适合只需要运行一次的脚本。 */
        burnAfterscripting: (jscode, timeout = 1000) => {
            let script = addBodyScriptByCode(jscode);
            setTimeout(() => document.body.removeChild(script), timeout);
        }
    }

})();
console.log("工具类：脚本标签 ScriptTagUtils");
