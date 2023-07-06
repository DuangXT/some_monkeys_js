console.log("工具类：DOM操作");


/** 工具类：DOM操作
 * @version 0.0.16
 */
const SelectorUtils = {

  __isString__: s => '[object String]' === Object.prototype.toString.call(s),
  __cleanCssSelectorHead__: (s, subStr) => {
    s = s.trim();
    if(s.startsWith(subStr)) s = s.substring(1);
    return s;
  },

  qs: document.querySelector.bind(document),
  querySelector: function(s){return this.qs(s)},
  $qs: function(s){return this.qs(s)},
  $: function(s){return this.qs(s)},

  qsa: document.querySelectorAll.bind(document),
  querySelectorAll: function(s){return this.qsa(s)},
  $qsa: function(s){return this.qsa(s)},
  $all: function(s){return this.qsa(s)},
  $$: function(s){return this.qsa(s)},

  id: function(id){return document.getElementById(this.__cleanCssSelectorHead__(id, "#"))},
  className: function(className){return document.getElementsByClassName(this.__cleanCssSelectorHead__(className, "."))},

  /** 获取标签对象的集合 */
  tagName: document.getElementsByTagName.bind(document),
  getTagElements: function(tagName){return this.tagName(tagName)},

  /**
   * 获取一个指定的标签对象
   * @param tagName      标签名
   * @param tagLocation  标签位置
   */
  getTagElement: function(tagName, tagLocation=0){
    return this.tagName(tagName)[tagLocation];
  },
  tag: function(tagName){return this.getTagElement(tagName)},

  create: document.createElement.bind(document),
  createElement: function(tagName){return this.create(tagName)},
  addElement: function(tagName){return this.create(tagName)},
  addTag: function(tagName){return this.create(tagName)},


  body: document.body || document.getElementsByTagName('body'),
  head: document.head || document.getElementsByTagName('head'),
  html: document.html || document.documentElement || document.getElementsByTagName('html'),

  /** 获取指定的全部标签对象，为空获取页面全部标签对象 */
  tags: function(tagName){return this.tagName(tagName && this.__isString__(tagName) ? tagName : '*')},
  allTag: function(){return this.tags(false)},
  allElements: function(){return this.tags(false)},


  /**
   * 指定标签设置属性
   * @param tagName      标签名
   * @param attrName     属性名
   * @param attrContent  属性内容
   * @param tagLocation  标签位置
   */
  setTagAttr: function(tagName, attrName, attrContent, tagLocation = 0){
      return this.getTagElement(tagName, tagLocation).setAttribute(attrName, attrContent);
  },


  /**
   * 指定标签设置样式
   * @param tagName      标签名
   * @param styleName    样式名
   * @param styleValue   样式值
   * @param tagLocation  标签位置
   */
  setStyle: function(tagName, styleName, styleValue, tagLocation = 0) {
    this.getTagElements(tagName)[tagLocation].style[styleName] = styleValue;
  },


  /** 移除每个指定的一个元素 */
  remove: function(...selectors){
    selectors.forEach( _selector => {
      let ele;
      if(this.__isString__(_selector)) ele = this.qs(_selector);
      else ele = _selector;
      if (ele) {
        try{
          ele.remove();
        } catch (e){
          console.error(e);
        }
        console.log("移除元素：", _selector);
      }
    });
  },
  delete: function(...selectors){this.remove(...selectors)},

  /** 移除每个指定的所有元素 */
  removeAll: function (...selectors) {
    selectors.forEach( _selector => {
      if(!this.__isString__(_selector))
      for (let ele of this.qsa(_selector)) {
        ele.remove();
        console.log("移除元素：", _selector, 'id=' + ele.id, 'class=' + ele.className);
      }
      else console.warn('参数不是字符串', _selector);
    });
  },
  deleteAll: function(...selectors){this.removeAll(...selectors)},

  removeIfTextContains: function(obj, ...strs){
    if('object' !== typeof obj){
      throw new TypeError('obj must be a object');
    }

    let _isElementNode = node => node &&
        (node instanceof HTMLElement || (node.nodeType && 'number' === typeof node.nodeType));
    function _remove(o){
      if(_isElementNode(o)){
        for (let s of strs) {
          if(s && o.textContent.includes(s.toString())){
            o.remove();
          }
        }
        return;
      }
      console.log('无法操作非节点对象', o);
    }
    if(Array.isArray(obj) || obj instanceof NodeList){
      for (let o of obj) {
        _remove(this.__isString__(o) ? $qs(o) :o);
      }
      return obj;
    }
    _remove(obj);
    return obj;
  },
  removeIfIncludesText: function(obj, ...strs){
    return this.removeIfTextContains(obj, ...strs);
  },

  /** 将对象的属性设置为隐藏 */
  setStyleHidden: obj => {
    if(!obj || 'object' !== typeof obj){
      throw new TypeError('obj must be a object');
    }
    obj.style.display = "none!important";
    obj.style.visibility = "hidden!important";
    return obj;
  },

  /** 隐藏单个指定的标签（返回被隐藏的标签对象） */
  hide: function (_selector) {
    let ele = this.__isString__(_selector) ? this.qs(_selector) : _selector;
    if (ele && 'object' === typeof ele) {
      if (ele.style) console.log("元素 " + _selector +
          "隐藏前样式：" + JSON.stringify(ele.style).slice(0,100));
      this.setStyleHidden(ele);
    }
    else console.log('隐藏失败! 参数并非字符串或者可操作对象:', _selector);
    return ele;
  },
  /** 隐藏每个选择器的一个标签 */
  hides: function(...selectors) {selectors.forEach(this.hide)},


  /** 隐藏每个选择器的所有标签 */
  hideAll: function (...selectors) {
    selectors.forEach((selector)=>{
      for (let ele of this.qsa(selector)) {
        this.setStyleHidden(ele);
      }
    });
  },

  runIfExist: function (obj, func) {
    if(func && 'function' !== typeof func){
      throw new TypeError('func must be a function');
    }
    if('string' === typeof obj){
      obj = this.qs(obj);
    }
    if(obj) func(obj);
    return obj;
  },


  /** 选择对象存在时执行click() */
  click: function(_selector){
    if('string' !== typeof _selector){
      throw new TypeError('_selector must be a string');
    }
    let s;
    return this.runIfExist( s = this.qs(_selector), ()=>{
      s.click();
      console.log('执行了点击操作', _selector);
    });
  },
  clicks: function(...selectors) {selectors.forEach(selector => this.click(selector))},

  clickAll: function(...selectors) {
    selectors.forEach(_selector => {
      for (const nodes of this.qsa(_selector)) {
        nodes.forEach(node => {
          node.click();
          console.log('执行了点击操作', node);
        });
      }
    });
  },

  /** 选择器，存在时移除指定的class */
  removeClass: function (_selector, ...removeClasses) {
    if(!this.__isString__(_selector)){
      throw new TypeError('_selector must be a string');
    }
    let selector = this.qs(_selector);
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

  /** 添加新的link标签 */
  addLinkTag:function(linkHref, linkType='text/css', linkRel='stylesheet'){
    if(!this.__isString__(linkHref)){
      throw new TypeError('parameter "css" must be a string');
    }
    if (!this.head) return;
    let link = this.createElement('link');
    link.type = linkType;
    link.rel = linkRel;
    link.href = linkHref;
    this.head.add(link);
    return link;
  },

};
var $dom = $dom ? $dom : SelectorUtils;