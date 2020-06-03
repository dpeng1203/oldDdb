<template>
    <div class="recommened-page">
        <div class="pay-result" v-if="success">
            <img src="./../../assets/img/success.png" alt="">
            <p>操作成功~</p>
            <p>感谢您的支持!</p>
            <button @click="goHome">返回首页</button>
        </div>
        <div class="pay-result" v-else>
            <img src="./../../assets/img/failed.png" alt="">
            <p>操作失败哦~</p>
            <p>{{text}} <br>
                    请重新操作~</p>
            <!-- <button>重新支付</button> -->
        </div>
    </div>
</template>
<script>
import { fetchPost } from '@utils/axios'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {
            success: false,
            text: '操作失败，网络开小差了'
        }
    },
    methods: {
        goHome () {
            this.$router.push({ name: 'home' })
        }
    },
    beforeRouteEnter (to, from, next) {
        let reAType = to.query.aType
        let xryTokenId = window.localStorage.agentToken
        let recACode = to.query.aCode

        if (xryTokenId) {
            let params = {
                opType: 110,
                xry_token_id: xryTokenId,
                recACode,
                aCode: JSON.parse(window.localStorage.user).aCode
            }
            fetchPost('/zqxry/bizedt/service', params).then(res => {
                console.log(params)
                next(vm => {
                    vm.success = true
                })
            }).catch(err => {
                // Toast.fail(err.msg)
                if (err.resultCode === -6) {
                    localStorage.clear('agentToken')
                    Dialog.alert({
                        message: err.msg
                    }).then(() => {
                        next({ name: 'login' })
                    })
                } else {
                    Dialog.alert({
                        message: err.msg
                    }).then(() => {
                        next(vm => {
                            vm.success = true
                        })
                    })
                }
            })
        } else {
            next({ name: 'register', query: { recACode, reAType} })
            // if (reAType < 2) {
            //     next(vm => {
            //         vm.text = '需先注册或者扫区代及以下角色噢'
            //     })
            // } else {
            //     console.log(111)
            //     next({ name: 'register', query: { recACode, reAType} })
            // }
        }
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.recommened-page{
    height: 680*@s;
    margin: 0 52*@s 0;
    background: #fff;
    border-radius: 20*@s;
    text-align: center;
    img{
        margin-top: 118*@s;
    }
    p:nth-child(2){
        font-size: 36*@s;
        color: #fc6168;
        margin-top: 50*@s;
        letter-spacing: 8px;
    }
    p:nth-child(3){
        font-size: 26*@s;
        color: #999;
        margin-top: 26*@s;
        letter-spacing: 4px;
    }
    button{

        border: none;
        border-radius: 20*@s;
        height: 80*@s;
        color: #fff;
        font-size: 32*@s;
        outline: none;
        background: -moz-linear-gradient(left,#4eb4f7,#2e97de);
        background: linear-gradient(left,#4eb4f7,#2e97de);
        background: -webkit-linear-gradient(left,#4eb4f7,#2e97de);

        width: 240*@s;
        margin-top: 100*@s;
    }
}
</style>
