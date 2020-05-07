import axios from 'axios'
import qs from 'qs'
import { Dialog } from 'vant'
import router from './../router'

axios.defaults.timeout = 10000 // 响应时间
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://xry.dodohz.com/' : '' // 配置接口地址 打包线上时用
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://dd2.dodohz.com/' : '' // 配置接口地址 打包线上时用
// axios.defaults.baseURL = ''

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
        if (config.headers.post['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data)
        }
    }
    return config
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    // 对响应数据做些事
    console.log(res.data)
    if (res.data.resultCode > 0) {
        if (res.data.data) {
            return Promise.resolve(res.data.data)
        } else {
            return Promise.resolve(res.data)
        }
    } else {
        if (res.data.msg) {
            if (res.data.resultCode === -6) {
                window.localStorage.clear('agentToken')
                Dialog.alert({
                    message: res.data.msg
                }).then(() => {
                    router.replace({ name: 'login' })
                })
            } else {
                return Promise.reject(res.data)
            }
        } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject({
                msg: '网络异常 ' + res.data.resultCode
            })
        }
    }
    // console.log(res.data)
    // return res;
}, (error) => {
    console.log(error)
    // return iView.Message.error('网络异常')
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
        msg: '网络异常'
    })
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: param
        })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
