
console.log("工具类：脚本标签");
/** 工具类：脚本标签
 * @version 0.0.4
 */
class ScriptTagUtils {

    __createScriptTagAndAppend__ = (targetNode, jslocation, jscode)=>{
        let script = document.createElement('script');
        script.type = "application/javascript"; // "text/javascript";

        if(jscode) script.textContent = jscode; // script.innerText = jscode;
        if(jslocation) script.src = jslocation;

        targetNode.appendChild(script);
        return script;
    };

    /** 以插入script标签的形式，向页面body内插入新的脚本引用 */
    addScriptTag = jslocation => {
        if('string' !== typeof jslocation || !jslocation.startsWith("http")){
            throw new TypeError('parameter "jslocation" must be a url string');
        }
        return this.__createScriptTagAndAppend__(document.head, jslocation);
    }

    /** 以插入script标签的形式，向页面body内插入新的脚本代码 */
    addScriptByCode = (jscode, mainLocation=document.body) => {
        if(typeof mainLocation === 'string'){
            switch (mainLocation){
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

        return this.__createScriptTagAndAppend__(mainLocation, null, jscode);
    };
    addScript = this.addScriptByCode;

    /** 向head插入js代码 */
    addHeadScriptByCode = jscode => this.addScriptByCode(jscode, document.head);
    /** 向body插入js代码 */
    addBodyScriptByCode = jscode => this.addScriptByCode(jscode, document.body);

    /** 一次性加载脚本，脚本加载完即刻删除。适合只需要运行一次的脚本。 */
    burnAfterscripting = (jscode, timeout=1000)=>{
        let script = this.addBodyScriptByCode(jscode);
        setTimeout(()=>document.body.removeChild(script), timeout);
    }

}