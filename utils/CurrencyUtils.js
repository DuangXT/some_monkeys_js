/**
 * 工具类：金钱货币
 * @version 0.0.5
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/MathUtils.js
 */
const CurrencyUtils = (function (){

    if(!StringUtils || !MathUtils){
        console.error("缺少依赖！！！", "工具类：金钱货币 DateUtils", "StringUtils", "MathUtils");
        return {};
    }

    const format = function (amount, symbol = '¥') {
        if (StringUtils.isBlank(amount)) {
            return symbol + '0.00';
        }
        let str = MathUtils.parseDecimal(amount) + '';
        let intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
        let dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
        let ret = intSum + dot;
        return symbol + ret;
    };

    const formatCNY = function(amount){return format(amount)};

    const formatDollar = function(amount){return format(amount, "$")};

    return {
        /**
         * 格式化金额
         * @param account
         * @param symbol
         * @returns {string}
         */
        format,
        formatCNY: function(amount){return format(amount)},
        formatRMB: formatCNY,
        formatDollar: function(amount){return format(amount, "$")},
        formatUSD: formatDollar,
    }
});
console.log("工具类：金钱货币 DateUtils");