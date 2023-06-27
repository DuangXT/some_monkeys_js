console.log("扩展函数：标签选择器");
// @version 0.0.4.7

const getTagElements = (tagName) => document.getElementsByTagName(tagName);
/**
 * 指定标签对象
 * @param tagName      标签名
 * @param tagLocation  标签位置
 */
const getTagElement = (tagName, tagLocation=0) => getTagElements(tagName)[tagLocation];

const tags = allTag = allElements = () => document.querySelectorAll('*');