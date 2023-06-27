
const log = (...s)=>console.log.bind(console)(...s); // GM_log(...s); GM.log(...s);
log("函数扩展：控制台打印");
const logerror = (...s)=>console.error.bind(console)(...s);
const logwarn = (...s)=>console.warn.bind(console)(...s);
const loginfo = (...s)=>console.info.bind(console)(...s);
const logdebug = (...s)=>console.debug.bind(console)(...s);

