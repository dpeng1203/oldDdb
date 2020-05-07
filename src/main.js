import Vue from 'vue'
import App from './App.vue'
import Vant, { List, Row, Col, Button, Popup } from 'vant'

import 'vant/lib/index.css'
import './assets/style/reset.css'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(List)
Vue.use(Vant)
Vue.use(Row).use(Col)
Vue.use(Button)
Vue.use(Popup)

// const LOGIN_PAGE_NAME = 'login'
// const homeName = 'home'
// const FIND_PWD_PAGE = 'findPwd'
// const REGISTER_PAGE = 'register'
// router.beforeEach((to, from, next) => {
//     console.log(222222222222)
//     const token = localStorage.getItem('agentToken')
//     console.log(to.name)
//     if (to.name === FIND_PWD_PAGE) {
//         next()
//     } else if (to.name === REGISTER_PAGE) {
//         next()
//     } else if (to.name === 'qrRecommend') {
//         next()
//     } else if (to.name === 'buyDeal') {
//         next()
//     }else if (to.name === 'pay') {
//         next()
//     } else if (to.name === 'payNext') {
//         next()
//     } else if (to.name === 'using') {
//         next()
//     } else if (token && to.name === LOGIN_PAGE_NAME) {
//         // 已登录且要跳转的页面是登录页
//         next({
//             name: homeName // 跳转到homeName页
//         })
//     }else if (token && to.name === null) {
//         // 已登录且要跳转的页面是登录页
//         next({
//             name: homeName // 跳转到homeName页
//         })
//     } else if (!token && to.name !== LOGIN_PAGE_NAME) {
//         // 未登录且要跳转的页面不是登录页
//         next({
//             name: LOGIN_PAGE_NAME // 跳转到登录页
//         })
//     } else if (!token && to.name === LOGIN_PAGE_NAME) {
//         // 未登陆且要跳转的页面是登录页
//         next() // 跳转
//     } else {
//         // if (store.state.user.hasGetInfo) {
//         //     turnTo(to, store.state.user.access, next)
//         // } else {
//         //     store.dispatch('getUserInfo').then(user => {
//         //         // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
//         //         turnTo(to, user.access, next)
//         //     }).catch(() => {
//         //         setToken('')
//         //         next({
//         //             name: 'login'
//         //         })
//         //     })
//         // }
//         next()
//     }
// })
router.afterEach(to => {
    window.document.title = to.meta.title
    // console.log(to)
    // iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
