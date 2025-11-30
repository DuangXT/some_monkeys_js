const IpAddressUtils = (function () {

    const isIpv4Address = ipAddress =>
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            .test(ipAddress.trim());
    const ipv4 = this.isIpv4Address;

    /**
     * 10.0.0.0 - 10.255.255.255
     * 172.16.0.0 - 172.31.255.255
     * 192.168.0.0 - 192.168.255.255
     * 100.64.0.0 - 100.127.255.255
     * @param ipAddress
     * @returns boolean
     */
    const isPrivateIpv4Address = ipAddress =>
        // /^(10|172\.(1[6-9]|2[0-9]|3[01])|192\.168)\.\d{1,3}\.\d{1,3}$/
        /^(10\.)|(172\.(1[6-9]|2[0-9]|3[0-1])\.)|(192\.168\.)|(100\.(6[4-9]|7[0-9]|12[0-7])\.)/
            .test(ipAddress.trim());



    /**
     * 将IPv4地址转换为32位无符号整型数值
     * @param {string} ip - IPv4地址字符串 (如: "192.168.1.1")
     * @returns {number} - 转换后的整型数值 (如: 3232235777)
     * @throws {Error} - IP格式无效时抛出错误
     */
    const toInt = function(ip){
        // 1. 输入验证
        if (typeof ip !== 'string' || !ip.trim()) {
            throw new Error('IP地址必须为字符串');
        }

        const parts = ip.trim().split('.');

        // 2. 检查是否为4段
        if (parts.length !== 4) {
            throw new Error(`无效的IPv4地址: ${ip} (必须为4段)`);
        }

        // 3. 转换并验证每个部分
        const nums = parts.map((part, index) => {
            // 检查是否为纯数字
            if (!/^\d+$/.test(part)) {
                throw new Error(`第${index + 1}段 "${part}" 不是有效数字`);
            }

            const num = parseInt(part, 10);

            // 检查范围 (0-255)
            if (num < 0 || num > 255) {
                throw new Error(`第${index + 1}段 ${num} 超出范围(0-255)`);
            }

            return num;
        });

        // 4. 使用位运算转换为32位无符号整数
        // 公式: (a << 24) + (b << 16) + (c << 8) + d
        // >>> 0 确保结果是无符号整数
        return ((nums[0] << 24) >>> 0) + (nums[1] << 16) + (nums[2] << 8) + nums[3];
    }

    // 整形数据转换回ipv4地址
    const toIpv4 = int => {
        if (!Number.isInteger(int) || int < 0 || int > 4294967295) {
            throw new Error('无效的整型数值 (必须为0-4294967295)');
        }

        return [
            (int >>> 24) & 255,
            (int >>> 16) & 255,
            (int >>> 8) & 255,
            int & 255
        ].join('.');
    }

    /** 特殊转换，仅仅去掉了点
     * 192.168.1.1 -> 192168001001
     **/
    const toIntByNoDot = ipv4 =>{

    }



    return {
        isIpv4Address, isPrivateIpv4Address,

        toInt, toIpv4

    }

})();
