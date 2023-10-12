console.log("工具类：模拟动作");
/** 工具类：模拟动作
 * @version 0.0.8
 */
class SimulateUtils {

    /** 随机生成鼠标移动事件 */
    simulateMouseMove(element = document) {
        element.dispatchEvent(new MouseEvent('mousemove', {
            bubbles: true, cancelable: true, // view: window,
            clientX: Math.random() * window.innerWidth,
            clientY: Math.random() * window.innerHeight
        }));
        console.log('模拟了鼠标移动');
    }

    /** 随机生成鼠标点击 */
    simulateMouseClick(element=document.body) {
        element.dispatchEvent(new MouseEvent('click', {
            bubbles: true, cancelable: true, // view: window,
        }));
        console.log('模拟了鼠标点击');
    }

    /** 随机生成键盘按下事件 */
    simulateKeyPress(key, element=document) {
        if(!key) key = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        element.dispatchEvent(new KeyboardEvent('keydown', {key: key}));
    }

    /** 随机生成键盘输入 */
    simulateKeyboardInput(element, text='asdzxcasdfg') {
        element.focus();

        for (let i = 0; i < text.length; i++) {
            element.dispatchEvent(new KeyboardEvent('keydown', {
                key: text[i],
                // bubbles: true, cancelable: true, view: window,
                // code: `Key${text[i].toUpperCase()}`
            }));
            element.dispatchEvent(new KeyboardEvent('keyup', {
                key: text[i],
                // bubbles: true, cancelable: true, view: window,
                // code: `Key${text[i].toUpperCase()}`
            }));
        }
        console.log('模拟了键盘输入');
    }

    /** 随机生成滚动事件 */
    simulateScroll(element = document) {
        element.dispatchEvent(new Event('scroll'));
        console.log('模拟了页面滚动');
    }

    /** 每隔一段时间模拟移动一下鼠标或者按下一个无意义的按键以达到欺骗页面仍然有人在活动的效果 */
    simulationHuman = (second=30) =>{
        let timeout = 1000 * second;
        this.simulateMouseMove();
        this.simulateScroll();
        setTimeout(this.simulationHuman, timeout+1000);
    }

}