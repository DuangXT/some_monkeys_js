
console.log("工具类：脚本标签");
/** 工具类：脚本标签
 * @version 0.0.3
 */
class ScriptTagUtils {

    /** 以插入script标签的形式，向页面body内插入新的脚本引用 */
    addScriptTag = jslocation => {
        if('string' !== typeof jslocation){
            throw new TypeError('parameter "jslocation" must be a url string');
        }
        let script = document.createElement('script');
        // script.type = "text/javascript";
        script.src = jslocation;
        document.head.append(script);
        return script;
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
                    mainLocation = $qs(mainLocation);
            }
        }

        let script = $dom.create('script');
        script.type = "application/javascript";
        // script.innerText = jscode;
        script.textContent = jscode;
        mainLocation.appendChild(script);
        return script;
    };
    addScript = this.addScriptByCode;

    addHeadScriptByCode = jscode => this.addScriptByCode(jscode, document.head);
    addBodyScriptByCode = jscode => this.addScriptByCode(jscode, document.body);

    /** 一次性加载脚本，脚本加载完即刻删除。适合只需要运行一次的脚本。 */
    burnAfterscripting = (jscode, timeout=1000)=>{
        let script = this.addBodyScriptByCode(jscode);
        setTimeout(()=>document.body.removeChild(script), timeout);
    }

}