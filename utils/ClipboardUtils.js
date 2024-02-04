console.log("工具类：剪贴板操作");

/** 工具类：剪贴板操作
 * @version 0.0.1
 */
class ClipboardUtils {
    copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function () {
            console.log('复制成功！', text);
        }, function (err) {
            console.error('复制失败: ', err, text);
        });
    }

    copyTextToClipboardByCommand(text) {
        let textArea = document.createElement("textarea");
        textArea.value = text;

        // 避免在屏幕上显示textarea
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const msg = document.execCommand('copy') ? '成功' : '失败';
            console.log('Fallback: 复制 ' + msg);
        } catch (err) {
            console.error('Fallback: 无法复制', err);
        }

        document.body.removeChild(textArea);
    }

    copyText(text) {
        if (navigator.clipboard) {
            this.copyTextToClipboard(text);
        } else {
            this.copyTextToClipboardByCommand(text);
        }
    }


}