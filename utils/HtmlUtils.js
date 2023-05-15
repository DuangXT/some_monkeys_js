
Document.prototype.$qs = Document.prototype.querySelector;
Element.prototype.$qs = Element.prototype.querySelector;
Document.prototype.$qsa = Document.prototype.$all = Document.prototype.querySelectorAll;
Element.prototype.$qsa = Element.prototype.$all = Element.prototype.querySelectorAll;

const HtmlUtils = {

  // 全局元素
  querySelector: document.querySelector.bind(document),
  querySelectorAll: document.querySelectorAll.bind(document),
  qs: this.querySelector, $qs: this.qs, $: this.qs,
  qsa: this.querySelectorAll, $qsa: this.qsa, $all: this.qsa, $$: this.qsa,
  id: s => document.getElementById(s),
  className: s => document.getElementsByClassName(s),
  tagName: s => document.getElementsByTagName(s),
  createElement: tagName => document.createElement(tagName),
  create: this.createElement, addElement: this.create, addTag: this.create,

  /** 隐藏元素 */
  style_hidden: ";display:none;visibility:hidden!important;",

  /** 向head内添加样式 */
  addStyleTag: function (css) {
    if('string' !== typeof css){
      throw new TypeError('parameter "css" must be a string');
    }
    if (!document.head) return;
    let style = this.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    return style;
  },


  /** 以插入script标签的形式，向页面body内插入新的脚本引用 */
  addScriptTag: function (jslocation) {
    if('string' !== typeof jslocation){
      throw new TypeError('parameter "jslocation" must be a url string');
    }
    let script = this.createElement('script');
    // script.setAttribute("src", jslocation);
    script.src = jslocation;
    document.body.appendChild(script);
    return script;
  },

  /** 以插入script标签的形式，向页面body内插入新的脚本代码 */
  addScript: function (jscode) {
    let script = this.createElement('script');
    script.innerHTML = jscode;
    document.body.appendChild(script);
    return script;
  },

  /**
   * 指定标签对象
   * @param tagName      标签名
   * @param tagLocation  标签位置
   */
  getTagElements: (tagName) => document.getElementsByTagName(tagName),
  getTagElement: (tagName, tagLocation=0) => this.getTagElements(tagName)[tagLocation],
  getTagElem: this.getTagElement, // 兼容以前用这个名字的脚本

  /**
   * 指定标签设置属性
   * @param tagName      标签名
   * @param attrName     属性名
   * @param attrContent  属性内容
   * @param tagLocation  标签位置
   */
  setTagAttr: function (tagName, attrName, attrContent, tagLocation = 0) {
    this.getTagElement(tagName, tagLocation).setAttribute(attrName, attrContent);
  },

  /**
   * 指定标签设置样式
   * @param tagName      标签名
   * @param styleName    样式名
   * @param styleValue   样式值
   * @param tagLocation  标签位置
   */
  setStyle: function (tagName, styleName, styleValue, tagLocation = 0) {
    this.getTagElement(tagName, tagLocation).style[styleName] = styleValue;
  },

  /** 尝试移除单个指定的元素 */
  removeElement: (...s) => {
    s.forEach(() => {
      let ele = this.$qs(s);
      if (ele) {
        ele.remove();
        console.log("移除元素：", s);
      }
    });
  },
  deleteElement: removeElement,

  /** 删除全部匹配的selector */
  removeElements: (...s) => {
    s.forEach(() => {
      let eles = this.$qsa(s);
      if (eles.length > 0) {
        for (let ele of eles) {
          ele.remove();
          console.log("移除元素：", s);
        }
      }
    });
  },
  deleteElements: removeElements,

  /** 尝试隐藏单个指定的元素 */
  hideElement: function (s) {
    let ele = this.$qs(s);
    if (ele) {
      if (ele.style) console.log("元素 " + s + "隐藏前样式：" + ele.style);
      // ele.setAttribute("style", thisstyle_hidden);
      ele.style.cssText += this.style_hidden;
    }
    return ele;
  },
  hideElements: (...s) => s.forEach(hideElement),

  selectorRunIfExist: function (obj, func) {
    if('function' !== typeof func){
      throw new TypeError('func must be a function');
    }
    if('string' === typeof obj){
      obj = this.$qs(obj);
    }
    if(obj) func(obj);
    return obj;
  },

  /** 选择器，存在时执行click() */
  selectorClick: function (_selector) {
    if('string' !== typeof _selector){
      throw new TypeError('_selector must be a string');
    }
    let s;
    this.selectorRunIfExist( s = $qs(_selector), function(){
      s.click();
      console.log('执行了点击操作', _selector);
    });
    return s;
  },
  clickSelector: this.selectorClick,
  selectorsClick: (...selectors) => selectors.forEach(selector => this.selectorClick(selector)),
  clickSelectors: this.selectorsClick,

  /** 选择器，存在时移除指定的class */
  selectorRemoveClass: function (_selector, ...removeClasses) {
    if('string' !== typeof _selector){
      throw new TypeError('_selector must be a string');
    }
    let selector = this.$qs(_selector);
    if(selector) {
      // removeClasses.forEach(_class => {
      for(let _class of removeClasses){
        if(typeof _class === 'string'){
          // if(selector.classList.contains(_class))
          selector.classList.remove(_class);
        }
        else console.log("a parameter 'removeClasses', not type string  ", _class);
      }
    }
    return selector;
  },

};

