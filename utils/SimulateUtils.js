console.log("工具类：模拟动作");
/** 工具类：模拟动作
 * @version 0.0.4
 */
class SimulateUtils {

    /** 随机生成鼠标移动事件 */
    simulateMouseMove(element = document) {
        const event = new MouseEvent('mousemove', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: Math.random() * window.innerWidth,
            clientY: Math.random() * window.innerHeight
        });
        element.dispatchEvent(event);
    }

    /** 随机生成鼠标点击 */
    simulateMouseClick(element=document.body) {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
    }

    /** 随机生成键盘按下事件 */
    simulateKeyPress(key, element=document) {
        if(!key) key = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        element.dispatchEvent(new KeyboardEvent('keydown', {key: key}));
    }

    /** 随机生成键盘输入 */
    simulateKeyboardInput(element) {
        const text = 'asdzxcasdfg';
        element.focus();

        for (let i = 0; i < text.length; i++) {
            // const keyCode = text.charCodeAt(i);
            const event = new KeyboardEvent('keydown', {
                view: window,
                bubbles: true,
                cancelable: true,
                key: text[i],
                code: `Key${text[i].toUpperCase()}`
            });
            element.dispatchEvent(event);

            const event2 = new KeyboardEvent('keyup', {
                view: window,
                bubbles: true,
                cancelable: true,
                key: text[i],
                code: `Key${text[i].toUpperCase()}`
            });
            element.dispatchEvent(event2);
        }
    }

    /** 随机生成滚动事件 */
    simulateScroll(element = document) {
        element.dispatchEvent(new Event('scroll'));
    }

    /** 每隔一段时间模拟移动一下鼠标或者按下一个无意义的按键以达到欺骗页面仍然有人在活动的效果 */
    simulationHuman = (second=30) =>{
        let timeout = 1000 * second;
        this.simulateMouseMove();
        this.simulateScroll();
        setTimeout(this.simulationHuman, timeout+1000);
    }

}