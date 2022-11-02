const HtmlUtils = {

    // 全局元素
    (){
        let $doc = s => document;
        let $qs = s => $doc.querySelector(s);
        let $qsa = s => [...$doc.querySelectorAll(s)];
    }

    /** 向head内添加样式 */
    addStyle: function(css) {
        if (!$doc.head) return;
        let style = $doc.createElement('style');
        style.innerHTML = css;
        $doc.head.appendChild(style);
    }

    /**
     * 指定标签对象
     * @param tagName      标签名
     * @param tagLocation  标签位置
     */
    getTagElem:function (tagName, tagLocation){
        return $doc.getElementsByTagName(tagName)[tagLocation];
    }

    /**
     * 指定标签设置属性
     * @param tagName      标签名
     * @param attrName     属性名
     * @param attrContent  属性内容
     * @param tagLocation  标签位置
     */
    setTagAttr:function (tagName, attrName, attrContent, tagLocation = 0) {
        getTagElem(tagName, tagLocation).setAttribute(attrName, attrContent);
    }
    /**
     * 指定标签设置样式
     * @param tagName      标签名
     * @param styleName    样式名
     * @param styleValue   样式值
     * @param tagLocation  标签位置
     */
    setStyle:function (tagName, styleName, styleValue, tagLocation = 0){
        getTagElem(tagName, tagLocation).style[styleName] = styleValue;
    }

    /** 尝试移除单个指定的元素 */
    removeElement:function (s) {
        console.log("移除元素：" + s);
        let ele = $qs(s);
        if (ele) ele.remove();
    }

    /** 尝试隐藏单个指定的元素 */
    hideElement:function (s) {
        let ele = $qs(s);
        if (ele) {
            if (ele.style) console.log("元素 " + s + "隐藏前样式：" + ele.style);
            ele.setAttribute("style", style_hidden);
        }
    }

};

