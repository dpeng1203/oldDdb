import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/user/login',
            // meta: { title: '登录' },
            // component: () => import('./views/login/Login.vue')
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                hideInMenu: true,
                title: '个人中心',
                notCache: true,
                icon: 'md-home'
            },
            component: () => import('@/views/Home.vue')
        },
        // {
        //     path: '/',
        //     name: 'home',
        //     redirect: '/home',
        //     component: Home,
        //     meta: {
        //         hideInMenu: true,
        //         notCache: true
        //     },
        //     children: [{
        //         path: '/home',
        //         name: 'home',
        //         meta: {
        //             hideInMenu: true,
        //             title: '个人中心',
        //             notCache: true,
        //             icon: 'md-home'
        //         },
        //         component: () => import('@/views/Home.vue')
        //     }]
        // },
        // {
        //     path: '/user',
        //     name: 'loginNav',
        //     component: () => import('./components/LoginNav.vue'),
        //     children: [
        //         {
        //             path: 'login',
        //             name: 'login',
        //             meta: { title: '登录' },
        //             component: () => import('./views/login/Login.vue')
        //         },
        //         {
        //             path: 'register',
        //             name: 'register',
        //             meta: { title: '注册' },
        //             component: () => import('./views/register/Register.vue')
        //         }
        //     ]
        // },
        {
            path: '/user/login',
            name: 'login',
            meta: { title: '登录' },
            component: () => import('./views/login/Login.vue')
        },
        {
            path: '/user/register',
            name: 'register',
            meta: { title: '注册' },
            component: () => import('./views/register/Register.vue')
        },
        {
            path: '/user',
            name: 'withdrawNav',
            component: () => import('./views/withdraw/WithdrawNav.vue'),
            children: [
                {
                    path: 'withdraw',
                    name: 'withdraw',
                    meta: { title: '提现' },
                    component: () => import('./views/withdraw/Withdraw.vue')
                },
                {
                    path: 'withdrawList',
                    name: 'withdrawList',
                    meta: { title: '提现记录' },
                    component: () => import('./views/withdraw/WithdrawList.vue')
                }

            ]
        },
        {
            path: '/user/deviceList',
            name: 'device',
            meta: { title: '我的设备' },
            component: () => import('./views/device/deviceList.vue')
        },
        {
            path: '/user/agent',
            name: 'agent',
            meta: { title: '我的代理' },
            component: () => import('./views/agent/AgentList.vue')
        },
        {
            path: '/user/agentUp',
            name: 'agentUp',
            meta: { title: '升级运营' },
            component: () => import('./views/agent/agentUp.vue')
        },
        {
            path: '/user/devicePrice',
            name: 'devicePrice',
            meta: { title: '设备价格' },
            component: () => import('./views/device/devicePrice.vue')
        },
        {
            path: '/user/shareDevice',
            name: 'shareDevice',
            meta: { title: '设备分发' },
            component: () => import('./views/agent/ShareDevice.vue')
        },
        {
            path: '/user/findPwd',
            name: 'findPwd',
            meta: { title: '忘记密码' },
            component: () => import('./views/findPwd/findPwd.vue')
        },
        {
            path: '/user/sendProm',
            name: 'sendProm',
            meta: { title: '授权码' },
            component: () => import('./views/sendPromCode/sendPromCode.vue')
        },
        {
            path: '/user/recommend',
            name: 'recommend',
            meta: { title: '推荐码' },
            component: () => import('./views/recommend/Recommend.vue')
        },
        {
            path: '/user/recommendList',
            name: 'recommendList',
            meta: { title: '推荐列表' },
            component: () => import('./views/recommend/RecommendList.vue')
        },
        {
            path: '/user/qrcode',
            name: 'qrcode',
            meta: { title: '二维码' },
            component: () => import('./views/qrcode/Qrcode.vue')
        },
        {
            path: '/user/qrRecommend',
            name: 'qrRecommend',
            meta: { title: '推荐' },
            component: () => import('./views/qrcode/QrRecommend.vue')
        },
        {
            path: '/user/bonusList',
            name: 'bonusList',
            meta: { title: '收益明细' },
            component: () => import('./views/bonusList/bonusList.vue')
        },
        {
            path: '/user/production',
            name: 'production',
            meta: { title: '产品详情' },
            component: () => import('./views/production/production.vue')
        },
        {
            path: '/user/pay',
            name: 'pay',
            meta: { title: 'DODO智能养生仪' },
            component: () => import('./views/pay/Pay.vue')
        },
        {
            path: '/user/pay1',
            name: 'pay1',
            meta: { title: 'DODO智能养生仪' },
            component: () => import('./views/pay/Pay1.vue')
        },
        {
            path: '/user/payNext',
            name: 'payNext',
            meta: { title: 'DODO智能养生仪' },
            component: () => import('./views/pay/PayNext.vue')
        },
        {
            path: '/user/payTest',
            name: 'payTest',
            meta: { title: '支付(Test)' },
            component: () => import('./views/pay/PayTest.vue')
        },
        {
            path: '/user/paySuccess',
            name: 'paySuccess',
            meta: { title: '支付成功' },
            component: () => import('./views/pay/PaySuccess.vue')
        },
        {
            path: '/user/payFailed',
            name: 'payFailed',
            meta: { title: '支付失败' },
            component: () => import('./views/pay/PayFailed.vue')
        },
        {
            path: '/user/using',
            name: 'using',
            meta: { title: '使用中' },
            component: () => import('./views/pay/Using.vue')
        },
        {
            path: '/buyDeal',
            name: 'buyDeal',
            meta: { title: '购机协议' },
            component: () => import('./views/buy/buyDeal.vue')
        },
        {
            path: '/payOrder',
            name: 'payOrder',
            meta: { title: '支付订单' },
            component: () => import('./views/buy/payOrder.vue')
        },
        {
            path: '/buy',
            name: 'buy',
            meta: { title: '申领设备' },
            component: () => import('./views/buy/buy.vue')
        },
        {
            path: '/statsAgent',
            name: 'statsAgent',
            meta: { title: '查看代理' },
            component: () => import('./views/stats/statsAgent.vue')
        },
        {
            path: '/statsDetail',
            name: 'statsDetail',
            meta: { title: '代理明细' },
            component: () => import('./views/stats/statsDetail.vue')
        },
        {
            path: '/orderQuery',
            name: 'orderQuery',
            meta: { title: '订单查询' },
            component: () => import('./views/order/orderQuery.vue')
        },
        {
            path: '/withdrawMybenefits',
            name: 'withdrawMybenefits',
            meta: { title: '我的收益' },
            component: () => import('./views/myBenefits/withdrawMybenefits.vue')
        },
        {
            path: '/recharge',
            name: 'recharge',
            meta: { title: '指定用户充值' },
            component: () => import('./views/recharge/recharge.vue')
        },
        {
            path: '/setting',
            name: 'setting',
            meta: { title: '设置' },
            component: () => import('./views/setting/setting.vue')
        },
        {
            path: '/regDeal',
            name: 'regDeal',
            component: () => import('./views/register/regDeal.vue')
        },
        {
            path: '/myDeal',
            name: 'myDeal',
            meta: { title: '我的协议' },
            component: () => import('./views/register/myDeal.vue')
        }
    ]
})
