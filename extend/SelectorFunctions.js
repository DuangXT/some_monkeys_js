console.log("扩展函数：标签选择器");
// @version 0.0.5

const $qs = document.querySelector.bind(document); // s => document.querySelector(s);
const $qsa = $all = $$ = document.querySelectorAll.bind(document); // s => [...document.querySelectorAll(s)];
// const querySelector = $qs;
// const querySelectorAll = $qsa;
// const $ = querySelector; // 不建议，容易引起冲突

const getTagElements = (tagName) => document.getElementsByTagName(tagName);
/**
 * 指定标签对象
 * @param tagName      标签名
 * @param tagLocation  标签位置
 */
const getTagElement = (tagName, tagLocation=0) => getTagElements(tagName)[tagLocation];

const tags = allTag = allElements = () => document.querySelectorAll('*');