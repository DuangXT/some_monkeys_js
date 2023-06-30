console.log("工具类：金钱货币");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/MathUtils.js
/**
 * 工具类：金钱货币
 * @version 0.0.3
 */
const CurrencyUtils = {

    /**
     * 格式化金额
     * @param account
     * @param symbol
     * @returns {string}
     */
    format: function (amount, symbol = '¥') {
        if (StringUtils.isBlank(amount)) {
            return symbol + '0.00';
        }
        let str = MathUtils.parseDecimal(amount) + '';
        let intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
        let dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
        let ret = intSum + dot;
        return symbol + ret;
    },
    formatCNY: function(amount){return this.format(amount)},
    formatRMB: function(amount){return this.formatCNY(amount)},
    formatDollar: function(amount){return this.format(amount, "$")},
    formatUSD: function(amount){return this.formatDollar(amount)},

}