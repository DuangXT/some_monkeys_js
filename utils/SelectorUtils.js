/** 工具类：DOM操作
 * @version 0.1.7
 */
const SelectorUtils = (function () {

    const __isString__ = s => '[object String]' === Object.prototype.toString.call(s);

    const __cleanCssSelectorHead__ = (s, subStr) => {
        s = s.trim();
        if (s.startsWith(subStr)) s = s.substring(1);
        return s;
    };

    const qs = document.querySelector.bind(document);
    const qsa = document.querySelectorAll.bind(document);
    const create = document.createElement.bind(document);
    const createElement = function (tagName_) {
        return create(tagName_)
    };
    const tagName = document.getElementsByTagName.bind(document);
    const getTagElements = function (tagName_) {
        return tagName(tagName_)
    };

    const body = document.body || document.getElementsByTagName('body')[0];
    const head = document.head || document.getElementsByTagName('head')[0];
    const html = document.html || document.documentElement || document.getElementsByTagName('html')[0];

    const getTagElement = function (tagName_, tagLocation = 0) {
        return tagName(tagName_)[tagLocation];
    };

    const tags = function (tagName_) {
        return tagName(tagName_ && __isString__(tagName_) ? tagName_ : '*')
    };

    const remove = function (...selectors) {
        for (const _selector of selectors) {
            let ele = __isString__(_selector) ? qs(_selector) : _selector;
            if (ele) {
                try {
                    ele.remove();
                } catch (e) {
                    console.error(e);
                }
                console.log("移除元素：", _selector);
            }
        }
    };

    const runIfExist = function (obj, func) {
        if (func && 'function' !== typeof func) {
            throw new TypeError('func must be a function');
        }
        if ('string' === typeof obj) {
            obj = qs(obj);
        }
        if (obj) func(obj);
        return obj;
    };

    const click = function (_selector) {
        if ('string' !== typeof _selector) {
            throw new TypeError('_selector must be a string');
        }
        let s;
        return runIfExist(s = qs(_selector), () => {
            s.click();
            console.log('执行了点击操作', _selector);
        });
    };

    const triggerClick = function (_docment) {
        if ('string' === typeof _docment) _docment = qs(_docment);
        if (!_docment) return _docment;
        // 事件视图
        const viewer = window.__POWERED_BY_QIANKUN__ ? window.rawWindow : _docment.ownerDocument.defaultView || window;
        // 模拟点击
        ['mousedown', 'mousemove', 'mouseup', 'click'].forEach(type => {
            _docment.dispatchEvent(new MouseEvent(type, {
                bubbles: true,  // 事件是否冒泡
                cancelable: false,  // 事件是否可以被取消
                view: viewer,
                button: 0  // 左键
            }));
        });
        // 模拟键盘回车
        ['keydown', 'keypress', 'keyup'].forEach(type => {
            _docment.dispatchEvent(new KeyboardEvent(type, {
                bubbles: true, cancelable: true,
                key: 'Enter', code: 'Enter',
                view: viewer
            }));
        });
        ['input', 'change',
            'focus', 'focusin', // 焦点
        ].forEach(type => {
            _docment.dispatchEvent(new Event(type, {
                bubbles: true, cancelable: true
            }));
        });
        return _docment;
    }

    const click2 = function (_selector_or_element) {
        let obj;
        if ('string' === typeof _selector) {
            obj = qs(_selector_or_element);
        }
        let s;

        const event = new MouseEvent("click", {
            bubbles: true,  // 事件是否冒泡
            cancelable: false,  // 事件是否可以被取消
            view: window,  // 事件的视图
            button: 0  // 0 代表左键
        });
        btn.dispatchEvent(event);
    }

    const removeAll = function (...selectors) {
        for (const _selector of selectors) {
            if (!__isString__(_selector))
                for (let ele of qsa(_selector)) {
                    ele.remove();
                    console.log("移除元素：", _selector, 'id=' + ele.id, 'class=' + ele.className);
                }
            else console.warn('参数不是字符串', _selector);
        }
    };

    const removeIfTextContains = function (obj, ...strs) {
        if (!obj) {
            console.log('空值传递', obj, ...strs);
            return;
        }
        if ('object' !== typeof obj) throw new TypeError('obj must be a object');

        let _isElementNode = node => node &&
            (node instanceof HTMLElement || (node.nodeType && 'number' === typeof node.nodeType));

        function _remove(o) {
            if (!o) return;
            if (_isElementNode(o)) {
                for (let s of strs) {
                    if (s && o.textContent.includes(s.toString())) {
                        o.remove();
                    }
                }
                return;
            }
            console.log('无法操作非节点对象', o);
        }

        if (Array.isArray(obj) || obj instanceof NodeList) {
            for (let o of obj) {
                _remove(__isString__(o) ? $qs(o) : o);
            }
            return obj;
        }
        _remove(obj);
        return obj;
    };

    const setStyleHidden = obj => {
        if (!obj || !(obj instanceof HTMLElement)) {
            throw new TypeError('obj must be a HTML Element Object');
        }
        obj.style.display = "none!important";
        obj.style.visibility = "hidden!important";
        obj.style.opacity = "0!important";
        obj.hidden = true;
        obj.style.cssText += "display:none!important;visibility:hidden!important;opacity:0!important;";
        return obj;
    };

    const setStyleShow = obj => {
        if (!obj || !(obj instanceof HTMLElement)) {
            throw new TypeError('obj must be a HTML Element Object');
        }
        obj.style.removeProperty('display');
        obj.style.display = '0!important';
        obj.style.visibility = 'visible';
        obj.style.opacity = '1';
        obj.style.transform = 'scale(1)';
        obj.style.transition = 'opacity 0.3s ease-in-out'; // 淡入
        obj.removeAttribute('hidden');
    }


    return {
        // ================ DOM选择器 ================
        qs,
        querySelector: function (s) {
            return qs(s)
        },
        $qs: function (s) {
            return qs(s)
        },
        $: function (s) {
            return qs(s)
        },


        querySelectorAll: function (s) {
            return qsa(s)
        },
        $qsa: function (s) {
            return qsa(s)
        },
        $all: function (s) {
            return qsa(s)
        },
        $$: function (s) {
            return qsa(s)
        },

        id: function (id) {
            return document.getElementById(__cleanCssSelectorHead__(id, "#"))
        },
        className: function (className) {
            return document.getElementsByClassName(__cleanCssSelectorHead__(className, "."))
        },

        /** 获取标签对象的集合 */
        tagName,
        getTagElements,

        /**
         * 获取一个指定的标签对象
         * @param tagName_     标签名
         * @param tagLocation  标签位置
         */
        getTagElement,
        tag: function (tagName_) {
            return getTagElement(tagName_)
        },

        /** 获取指定的全部标签对象，为空获取页面全部标签对象 */
        tags,
        allTag: function () {
            return tags(false)
        },
        allElements: function () {
            return tags(false)
        },
        // ================ DOM选择器 ================ End


        create,
        createElement,
        addElement: function (tagName_) {
            return create(tagName_)
        },
        addTag: function (tagName_) {
            return create(tagName_)
        },

        body,
        head,
        html,

        bodyText: function () {
            return body.textContent;
        },
        htmlText: function () {
            return html.textContent;
        },
        headText: function () {
            return head.textContent;
        },


        /**
         * 指定标签设置属性
         * @param tagName_     标签名
         * @param attrName     属性名
         * @param attrContent  属性内容
         * @param tagLocation  标签位置
         */
        setTagAttr: function (tagName_, attrName, attrContent, tagLocation = 0) {
            return getTagElement(tagName_, tagLocation).setAttribute(attrName, attrContent);
        },


        /**
         * 指定标签设置样式
         * @param tagName_     标签名
         * @param styleName    样式名
         * @param styleValue   样式值
         * @param tagLocation  标签位置
         */
        setStyle: function (tagName_, styleName, styleValue, tagLocation = 0) {
            getTagElements(tagName_)[tagLocation].style[styleName] = styleValue;
        },

        /** 设置文本自由复制 */
        setFreeText: function (css) {
            let htmlObject;
            if (css instanceof HTMLElement) htmlObject = css;
            else if ('string' === typeof css) {
                htmlObject = qs(css);
                switch (css.toUpperCase()) {
                    case 'HTML':
                    case 'HEAD':
                    case 'BODY':
                        htmlObject = document.getElementsByTagName(css)[0];
                        break;
                }
            } else throw new TypeError('parameter "css" must be a string or HTML Element');

            if (htmlObject) {
                let textImportant = "text!important";
                htmlObject.style.userSelect = textImportant;
                htmlObject.style['-webkit-user-select'] = textImportant;
                htmlObject.style['-moz-user-select'] = textImportant;
                htmlObject.style['-o-user-select'] = textImportant;
                htmlObject.style['-ms-user-select'] = textImportant;
                htmlObject.style['-khtml-user-select'] = textImportant;
                htmlObject.style['-webkit-touch-callout'] = 'default!important';
                return htmlObject;
            }

        },


        /** 移除每个指定的一个元素 */
        remove,
        delete: function (...selectors) {
            remove(...selectors)
        },

        /** 移除每个指定的所有元素 */
        removeAll,
        deleteAll: function (...selectors) {
            removeAll(...selectors)
        },

        removeIfTextContains,
        removeIfIncludesText: function (obj, ...strs) {
            return removeIfTextContains(obj, ...strs);
        },

        /** 将对象的属性设置为隐藏 */
        setStyleHidden,

        /** 隐藏单个指定的标签（返回被隐藏的标签对象） */
        hide: function (_selector) {
            let ele = __isString__(_selector) ? qs(_selector) : _selector;
            if (ele && 'object' === typeof ele) {
                if (ele.style) console.log("元素 " + _selector +
                    "隐藏前样式：" + JSON.stringify(ele.style).slice(0, 100));
                setStyleHidden(ele);
            } else console.log('隐藏失败! 参数并非字符串或者可操作对象:', _selector);
            return ele;
        },
        /** 隐藏每个选择器的一个标签 */
        hides: function (...selectors) {
            selectors.forEach(hide)
        },

        show: function (_selector) {
            let ele = __isString__(_selector) ? qs(_selector) : _selector;
            if (ele && 'object' === typeof ele) {
                if (ele.style) console.log("元素 " + _selector +
                    "显示前样式：" + JSON.stringify(ele.style).slice(0, 100));
                setStyleShow(ele);
            } else console.log('显示失败! 参数并非字符串或者可操作对象:', _selector);
            return ele;
        },
        shows: function (...selectors) {
            selectors.forEach(show)
        },


        /** 隐藏每个选择器的所有标签 */
        hideAll: function (...selectors) {
            for (const _selector of selectors) {
                for (let ele of qsa(_selector)) {
                    setStyleHidden(ele);
                }
            }
        },

        runIfExist,

        /** 选择对象存在时执行click() */
        click,
        clicks: function (...selectors) {
            selectors.forEach(selector => click(selector))
        },

        triggerClick,

        clickAll: function (...selectors) {
            for (const _selector of selectors) {
                for (const nodes of qsa(_selector)) {
                    nodes.forEach(node => {
                        node.click();
                        console.log('执行了点击操作', node);
                    });
                }
            }
        },

        /** 选择器，存在时移除指定的class */
        removeClass: function (_selector, ...removeClasses) {
            if (!__isString__(_selector)) {
                throw new TypeError('_selector must be a string');
            }
            let selector = qs(_selector);
            if (selector) {
                // removeClasses.forEach(_class => {
                for (let _class of removeClasses) {
                    if (typeof _class === 'string') {
                        // if(selector.classList.contains(_class))
                        selector.classList.remove(_class);
                    } else console.log("a parameter 'removeClasses', not type string  ", _class);
                }
            }
            return selector;
        },

        /** 添加新的link标签 */
        addLinkTag: function (linkHref, linkType = 'text/css', linkRel = 'stylesheet') {
            if (!__isString__(linkHref)) {
                throw new TypeError('parameter "css" must be a string');
            }
            if (!head) return;
            let link = createElement('link');
            link.type = linkType;
            link.rel = linkRel;
            link.href = linkHref;
            head.add(link);
            return link;
        },
    }
})();

var $dom = $dom ? $dom : SelectorUtils;
console.log("工具类：DOM操作 SelectorUtils");
