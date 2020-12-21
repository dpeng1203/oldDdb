import { fetchPost, fetchGet } from '@/utils/axios'
import config from '@/utils/config'
const { jsonConfig } = config
export default {
    // 支付
    pay ({ barcode, pcode, at } = {}) {
        let url = '/zqxry/pay'
        let params = { barcode, pcode, at }
        return fetchGet(url, params)
    },
    // 登录
    login ({ mobile, pwd } = {}) {
        let url = '/zqxry/login'
        let params = { mobile, pwd }
        return fetchPost(url, params)
    },
    // 获取用户信息
    getUser () {
        let url = '/zqxry/bizqry/service'
        let params = {
            opType: 201,
            xry_token_id: window.localStorage.agentToken
        }
        return fetchPost(url, params)
    },
    // 发短信
    sendSms ({ mobile, type } = {}) {
        let url = '/zqxry/bizedt/sendCertCode'
        let params = { mobile, type }
        return fetchPost(url, params)
    },
    // 注册
    register ({ mobile, certCode, promCode, aName, pwd, provinceCode, cityCode, areaCode, recACode, aAddress,aType } = {}) {
        let url
        let params
        if (promCode) {
            // 授权码方式注册
            url = '/zqxry/bizedt/register'
            params = { mobile, certCode, promCode, aName, pwd, provinceCode, cityCode, areaCode, aAddress,aType }
        } else {
            // 扫码注册（被扫码人员只能是atype大于2的）
            url = '/zqxry/bizedt/registerQR'
            params = { mobile, certCode, aName, pwd, provinceCode, cityCode, areaCode, pACode: +recACode, aAddress,aType }
        }

        return fetchPost(url, params, jsonConfig)
    },
    // 找回密码
    findpwd ({ mobile, certCode, pwd } = {}) {
        let url = '/zqxry/bizedt/findpwd'
        let params = { mobile, certCode, pwd }
        return fetchPost(url, params)
    },
    /**
     * 授权码
     * @param {mobile, opType, xry_token_id}
     */
    // eslint-disable-next-line camelcase
    sendProm ({ mobile, opType, xry_token_id } = {}) {
        let url = '/zqxry/bizedt/service'
        let params = { mobile, opType, xry_token_id }
        return fetchPost(url, params)
    },
    // 修改提现账号
    // eslint-disable-next-line camelcase
    updateAccount ({ account, opType = 105, xry_token_id = window.localStorage.agentToken } = {}) {
        let url = '/zqxry/bizedt/service'
        let params = { account, opType, xry_token_id }
        return fetchPost(url, params)
    },
    // 提现列表
    // eslint-disable-next-line camelcase
    getTakeList ({ aCode, tCode, pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        // if (!tCode) {
        //     tCode = -1
        // }
        const data = {
            opType: 207,
            xry_token_id: window.localStorage.agentToken,
            // tCode,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },
    // 收益列表
    // eslint-disable-next-line camelcase
    getBonusList ({ startTime, endTime, macId, pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        if (!macId) {
            macId = 0
        }
        startTime = startTime + ' 00:00:00'
        endTime = endTime + ' 23:59:59'
        const data = {
            opType: 204,
            xry_token_id: window.localStorage.agentToken,
            startTime,
            endTime,
            macId,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },
    // 相应条件下的总收益
    // eslint-disable-next-line camelcase
    getBonusMoneySum ({ startTime, endTime, macId, pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        if (!macId) {
            macId = 0
        }
        startTime = startTime + ' 00:00:00'
        endTime = endTime + ' 23:59:59'
        const data = {
            opType: 212,
            xry_token_id: window.localStorage.agentToken,
            startTime,
            endTime,
            macId,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },

    // 收益列表
    // eslint-disable-next-line camelcase
    getKmyBonusList ({ startTime, endTime, macId, pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        if (!macId) {
            macId = 0
        }
        startTime = startTime + ' 00:00:00'
        endTime = endTime + ' 23:59:59'
        const data = {
            opType: 244,
            xry_token_id: window.localStorage.agentToken,
            startTime,
            endTime,
            macId,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },
    // 相应条件下的总收益
    // eslint-disable-next-line camelcase
    getKmyBonusMoneySum ({ startTime, endTime, macId, pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        if (!macId) {
            macId = 0
        }
        startTime = startTime + ' 00:00:00'
        endTime = endTime + ' 23:59:59'
        const data = {
            opType: 245,
            xry_token_id: window.localStorage.agentToken,
            startTime,
            endTime,
            macId,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },

    // 提现
    // eslint-disable-next-line camelcase
    takeCash ({ takeAmount, opType = 104, xry_token_id = window.localStorage.agentToken } = {}) {
        let url = '/zqxry/bizedt/service'
        let params = { takeAmount, opType, xry_token_id }
        return fetchPost(url, params)
    },
    // 使用设备时的订单信息
    getOrderInfo ({ orderId } = {}) {
        let url = '/zqxry/bizqry/getOrderInfo'
        let params = { orderId }
        return fetchGet(url, params)
    },
    // 设备列表
    getMacList ({ aCode, macId, pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        if (!aCode) {
            aCode = -1
        }
        if (!macId) {
            macId = -1
        }
        const data = {
            opType: 208,
            xry_token_id: window.localStorage.agentToken,
            aCode,
            macId,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },
    // 代理列表
    getAgentList ({ recommendACode = -1, pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        // let url = '/zqxry/memedt/getUnderAgentMac'
        const data = {
            opType: 210,
            xry_token_id: window.localStorage.agentToken,
            recommendACode,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },
    // 代理列表
    getRecommendList ({ aCode = -1, pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        const data = {
            opType: 211,
            xry_token_id: window.localStorage.agentToken,
            aCode,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },
    /**
     * 设备分发
     * @param {*} param0
     */
    updateMacListAgent ({ aCode, macIdStr }) {
        let url = '/zqxry/bizedt/service'
        const data = {
            opType: 107,
            xry_token_id: window.localStorage.agentToken,
            aCode,
            macIdStr
        }
        return fetchPost(url, data)
    },
    /**
     * 改价列表
     */
    getMacListForPrice ({ pageNum, pageSize }) {
        let url = '/zqxry/bizqry/service'
        // if (!aCode) {
        //     aCode = -1
        // }
        // if (!macId) {
        //     macId = -1
        // }
        const data = {
            opType: 213,
            xry_token_id: window.localStorage.agentToken,
            pageNum,
            pageSize
        }
        return fetchPost(url, data)
    },
    /**
     * 改价
     */
    updateMacPrice ({ macId, price }) {
        let url = '/zqxry/bizedt/service'
        // if (!aCode) {
        //     aCode = -1
        // }
        // if (!macId) {
        //     macId = -1
        // }
        const data = {
            opType: 111,
            xry_token_id: window.localStorage.agentToken,
            macId,
            price
        }
        return fetchPost(url, data)
    },

    /**
     * 商户升级成区代
     */
    agentUp ({ promCode }) {
        let url = '/zqxry/bizedt/service'
        // if (!aCode) {
        //     aCode = -1
        // }
        // if (!promCode) {
        //     promCode = -1
        // }
        const data = {
            opType: 114,
            xry_token_id: window.localStorage.agentToken,
            promCode
        }
        return fetchPost(url, data)
    },

    /**
     * 增加订单
     */
    addOrder ({ addr, icount }) {
        let url = '/zqxry/bizedt/service'
        const data = {
            opType: 116,
            xry_token_id: window.localStorage.agentToken,
            addr,
            icount
        }
        return fetchPost(url, data)
    },
    /**
     *
     */
    getLoginInfo () {
        let url = '/zqxry/bizqry/service'
        const data = {
            opType: 216,
            xry_token_id: window.localStorage.agentToken

        }
        return fetchPost(url, data)
    },
    getProPrice () {
        let url = '/zqxry/bizqry/service'
        const data = {
            opType: 217,
            xry_token_id: window.localStorage.agentToken

        }
        return fetchPost(url, data)
    },
    /**
     * @description 代理机器台数
     * @param {aCode, start, end} {代理code，开始时间，结束时间}
     */
    statsAgentList ({ aCode, start, end }) {
        let url = '/zqxry/bizqry/service'
        const data = {
            opType: 218,
            xry_token_id: window.localStorage.agentToken,
            aCode,
            start,
            end
        }
        return fetchPost(url, data)
    },
    /**
     * @description 代理详细的订单量以及订单金额
     * @param {aCode, start, end} {代理code，开始时间，结束时间}
     */
    statsAgentDetail ({ aCode, start, end }) {
        let url = '/zqxry/bizqry/service'
        const data = {
            opType: 219,
            xry_token_id: window.localStorage.agentToken,
            aCode,
            start,
            end
        }
        return fetchPost(url, data)
    },
    /**
     * @description 购机订单
     * @param {pageNum, pageSize, oPayStatus} {页码，一页多少记录，支付状态}
     */
    getfindOrder ({ pageNum, pageSize, oPayStatus }) {
        let url = '/zqxry/bizqry/service'
        const data = {
            opType: 220,
            xry_token_id: window.localStorage.agentToken,
            pageNum,
            pageSize,
            oPayStatus
        }
        return fetchPost(url, data)
    },
    /**
     * 获取支付二维码连接
     */
    getQrUrl ({ barcode } = {}) {
        let url = '/zqxry/payMachine'
        let params = { barcode }
        return fetchGet(url, params)
    },
    /**
     * 获取支付动态二维码连接
     */
    getQrRandUrl ({ barcode } = {}) {
        let url = '/zqxry/payRandMachine'
        let params = { barcode }
        return fetchGet(url, params)
    },
    /**
     * 给用户充值
     */
    recharge ({ memCode,price } = {}) {
        let url = '/zqxry/bizedt/service'
        const data = {
            opType: 122,
            xry_token_id: window.localStorage.agentToken,
            memCode,
            price
        }
        return fetchPost(url, data)
    },
    //商家订单管理
    manageOrderList ({ prdStatus,pageNum,pageSize } = {}) {
        let url = '/zqxry/bizqry/service'
        const data = {
            opType: 239,
            xry_token_id: window.localStorage.agentToken,
            pageNum,
            pageSize,
            prdStatus
        }
        return fetchPost(url, data)
    },
    //微信签名
    sign ({ url } = {}) {
        let baseUrl = '/ddbxry/ddbWx/jsSign'
        const data = {
            url
        }
        return fetchPost(baseUrl, data)
    },
    // 获取快递公司code
    edCode () {
        let url = '/zqxry/bizqry/service'
        const data = {
            opType: 238,
            xry_token_id: window.localStorage.agentToken
        }
        return fetchPost(url, data)
    },
    // 商家发货
    edSend ({ pbCode,daExCode,edCode } = {}) {
        let url = '/zqxry/bizedt/service'
        const data = {
            opType: 131,
            xry_token_id: window.localStorage.agentToken,
            pbCode,
            daExCode,
            edCode
        }
        return fetchPost(url, data)
    },
}
