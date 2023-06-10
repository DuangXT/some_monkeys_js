/** 明星名字合集 */
const celebrityName = ["张子豪","杨紫","汤晶媚","任敏","宋雨琦","侯明昊","刘亦菲","林志颖","陈乔恩","王鹤棣","李荣浩",
    "孟子义","林一文","TFboys","王源","易烊千玺","赵薇","章子怡","周迅","徐静蕾","黄圣依","王珞丹","杨幂","顺子","汪小菲",
    "迪丽热巴","古力娜扎","刘诗诗","高圆圆","杨颖","唐嫣","关晓彤","赵丽颖","吴倩","李沁","倪妮","鞠婧祎","张馨予","龚俊",
    "孙红雷","王一博","王凯","王俊凯","严屹宽","叶晞月","于晓光","陈都灵","成毅","邓伦","董璇","郭涛","黄健翔","乔振宇","葛斯齐",
    "秦俊杰","蒋梦婕","谭松韵","佟丽娅","李一桐","陈晓","李兰迪","林永健","陆毅","黄俊鹏","牛骏峰","彭小苒","吴磊","肖恩","王智",
    "张艺兴","张嘉倪","张婧仪","张雪迎","杜海涛","黄海波","田亮","钟汉良","李毅","吴奇隆","柳岩","郭德纲","黄奕","李湘","张凌赫",
    "刘德华","赵又廷","宋茜","周杰伦","黄贯中","陈若仪","叶一茜","林心如","朱茵","张杰","成龙","刘涛","谢霆锋","范冰冰","刘嘉玲",
    "龚叶轩","黄渤","武艺","陈翔","李霄云","冯绍峰","陈坤","李纬","孙俪","胡歌","陈思成","周冬雨","窦骁","李晟","郭碧婷",
    "郁可唯","李宇春","许嵩","井柏然","付辛博","江映蓉","王菲","炎亚纶","吴尊","汪东城","辰亦儒","梁心颐","修杰楷","贺军翔",
    "田馥甄","杨丞琳","罗志祥","林宥嘉","邓紫棋","容祖儿","蔡卓妍","五熊","陈德修","阿信","胡夏","郭品超","陈怡蓉","陈意涵",
    "舒淇","阮经天","金城武","蔡依林","王力宏","黄立行","房思瑜","喻虹渊","陈楚生生","俞灏明","张远","吉杰","魏晨","章若楠",
    "吴建飞","郭敬明","马天宇","薛之谦","李亚鹏","王啸坤","S.H.E","王心凌","许巍","光良","张学友","张韶涵","孙燕姿","刀郎",
    "任贤齐","刘若英","梁静茹","周笔畅","羽泉","王蓉","庞龙","F.I.R","水木年华","beyond","张信哲","潘玮柏","郑源","孙怡",
    "张靓颖","周华健","伍佰","陶喆","周传雄","胡彦斌","邓丽君","张惠妹","孙楠","韩红","张含韵","吴克群庆雀","陈小春","小虎队",
    "稻草人兵团","阿桑","王杰","南拳妈妈","萧亚轩","后弦","韩雪","黎明","动力火车","信乐团","游鸿明","陈慧琳","黄家驹","何洁",
    "莫文蔚","1983组合","安又琪","朴树","汪峰","张宇","田震","郑智化","金海心","萧萧","蔡琴","那英","张卫健","杨坤","金珉锡",
    "张振宇","侧田","范玮琪","张国荣","陈奕迅","香香","梅艳芳","齐秦","南合文斗","郭富城","张敬轩","张震岳","Twins","古天乐",
    "哈狗帮","谭咏麟","刘欢","罗大佑","孙悦","迪克牛仔","古巨基","孟庭苇","梁咏琪","郑秀文","许慧欣","零点乐队","张雨生","王一栩",
    "屠洪刚","爱乐团","李克勤","宋祖英","陈好","张栋梁","杜德伟","黄义达","腾格尔","曹格","无印良品","陈慧娴","郭美美","赵传",
    "罗百吉","林忆莲","李圣杰","苏有朋","品冠","陈旭","陈冠希","金莎","郑中基","可米小子","韩磊","戴佩妮","姜育恒","温岚",
    "江涛","江美琪","高胜美","麻吉弟弟","张柏芝","童安格","迟志强","韩宝仪","陈百强","小雪","李习安","孙兴","赵露思","王濛",
    "沙宝亮","陶晶莹","黄品源","布仁巴雅尔","陈绮贞","费玉清","陈晓东","东来东往","徐怀钰","周渝民","黄轩","宋丹丹","刘敏涛",
    "许美静","郑伊健","李玲玉","卓依婷","纪敏佳","杨千嬅","许志安","郑钧","毛阿敏","柯有伦","邰正宵","弦子","林志炫","黄安",
    "陈星","范晓萱","张瑶","崔健","亮亮","萧潇","李宗盛","柯以敏","誉晌早","许茹芸","郭峰","马郁","2moro","黄征","曹方",
    "李冰冰","蒋欣","宋佳","谢娜","杨超越","姚晨","袁姗姗","陈钰琪","陈紫函","邓家佳","高露","胡冰卿","胡静","霍思燕","袁宏",
    "吉克隽逸","贾玲","江疏影","蒋勤勤","蒋依依","江一燕","金晨","景甜","佟大为","王宝强","吴京","小沈阳","肖战","徐峥","杨洋",
    "岳云鹏","张翰","张一山","赵文卓","郑恺","朱一龙","艾伦","白敬亭","白举纲","陈赫","邓超","杜淳","黄磊","黄晓明","黄子韬",
    "贾乃亮","李晨","李现","李易峰","林更新","鹿晗","靳东","刘昊然","刘烨","罗晋","沈腾","安琥","林依轮","保剑锋","梁永斌",
    "刀狼","黄觉","林俊杰","花儿乐队","沈月","本兮","吴彦祖","彭于晏","梁朝伟","关礼杰","郑少秋","周润发","张智霖","明道",
    "欧豪","秦昊","金东","张涵予","叶祖新","马可","杨乐","刘青云","张丹凤","李连杰","张译","刘浩然","陈学东","杨硕","黄志忠",
    "张国立","朱亚文","陈建斌","张睿","梁家辉","王耀庆","于震","张嘉译","杨佑宁","林俊贤","陈晓旭","周慧敏","王祖贤","林青霞",
    "赵雅芝","巩俐","包贝尔","何润东","李治廷","陈柏霖","董成鹏","尹正","于和伟","杜江","张鲁一","甄子丹","张晋","毛子俊",
    "任嘉伦","韩庚","郑凯","王祖兰","张若昀","刘恺威","王嘉尔","霍建华","陈伟霆","angelababy","秦岚","殷桃","万茜","陈数",
    "海清","张小斐","马丽","张雨绮","张晚意","白宇","魏翔","张嘉益","段奕宏","葛优","廖凡","白百何","文淇","宋轶","黄尧",
    "陈小纭","贾青","赵涛","焦俊艳","李梦","汤梦佳","常远","白客","蔡徐坤","陈若轩","陈学冬","大张伟","董子健","高伟光","华晨宇",
    "高云翔","郭京飞","郭晓东","韩栋","韩东君","尤勇","潘斌龙","付辛傅","张殿菲","罗中旭","景岗山","陈宝国","周杰","毛宁",
    "费翔","赵本山","王铮亮","何政军","沙溢","陈龙","王志文","姜文","毛孩","范明","范伟","洪剑涛","胡军","满文军","刘威",
    "何炅","李金斗","肖剑","胡彦祖","达达乐队","修庆","戴军","解小东阿里郎","胡兵","胡东","张铁林","王刚","张国力","张默",
    "黄维德","黄海冰","王学兵","王斑","陈健斌","郭达","黄宏","李雪健","濮存昕","宋晓波","李学庆","贾一平","杨俊毅","于波",
    "黄栎鑫","郭彪","李维嘉","周路明","李宗翰","丁海峰","刘小峰","黄格选","释小龙","曹骏","刘冠翔","张晓晨","陈道明","李咏",
    "杨议","杨少华","夏雨","任泉","师洋","尤皓然","张国强","刘翔","盛超","孙小宝","刘刚", "麦浚龙","郑嘉颖","林峰","房祖名",
    "周星驰","王绍伟","黄家强","冯德伦","谢祖武","郑元畅","张智成","李威","范逸臣","吴宗宪","邱泽","余文乐","贾静雯","金钟大",
    "吴建豪","黄秋生","庾澄庆","方力申","伦永亮","莫少聪","林家栋","黄宗泽","吴卓羲","关德辉","杜汶泽","罗嘉良","梁浩贤",
    "梁振宇","陈庆祥","周俊伟","张震","B.A.D","王喜","钟镇涛","陈司翰","宋岳庭","叶世荣","唐宸禹","黄日华","袁弘","边伯贤",
    "任达华","刘锡明","萧正楠","张洪量","邓健泓","黄耀明","刘德凯","温兆伦","陈浩民","林佑威","潘安邦","吴健","沈晓海",
    "聂远","杨俊逸","吴越","李智楠","于小伟","任程伟","陈楚生","印小天","吴亦凡","蒋劲夫","王祖蓝","吴秀波","陈秀波","秦霄贤",
    "米莉·波比·布朗","刘雯","文君竹","祝绪丹","王霏霏","周密","金希澈","朱正廷","张峻豪",'张新成','黄旭熙', "肖春生","郑秀妍",
    "郭俊辰","张彬彬","朴灿烈","侯明昊","盖玥希","严浩翔","高瀚宇","尉迟泽",'欧阳娜娜'];
// console.log(JSON.stringify([...new Set(celebrityName)]));

// 黑鸭子   F4   5566  阿杜  五月天  阿牛  白雪  艾伦  海陆  中国娃娃 老狼  俊辉  阿宝  清醒  文章