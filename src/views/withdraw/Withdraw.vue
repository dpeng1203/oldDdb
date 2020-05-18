<template>
    <div class="draw">
        <div class="cash">
            <p>可提现金额：</p><span>{{bounsAcct.bcAbleTakeAmount}}元</span>
        </div>
        <div class="cash">
            <p>提现金额：</p>
            <input type="number" v-model="money" placeholder="请输入提现金额">
        </div>
        <div class="cash">
            <p>提现至：</p>
            <span>
                <img src="../../assets/img/zfb.png" alt=""> 支付宝支付
            </span>
        </div>
        <div class="cash">
            <p>提现账号：</p>
            <span>{{user.aTakeAccount?user.aTakeAccount:'请点击右侧输入支付宝账号'}}</span>
            <img src="../../assets/img/edit.png" alt="" @click="show = true">
        </div>
        <div class="btn" @click="submit">立即提现</div>
        <van-dialog
            v-model="show"
            title="提现账号"
            show-cancel-button
            @confirm="updateAccount"
        >
            <van-field
                v-model="user.aTakeAccount"
                center
                clearable
                placeholder="请输入支付宝账号"
                style="border-bottom:1px solid #8EBBFF;"
            />
        </van-dialog>
        <!-- <section>
            <van-field
                v-model="money"
                center
                clearable
                label="￥"
                label-width="18px"
                type="number"
                placeholder="请输入提现金额"
                style="margin-top:24px;border-bottom:2px solid #8EBBFF;"
                class="withdraw-money"
            >
                <div slot="button" class="withdraw-money-btn" @click="money=bounsAcct.bcAbleTakeAmount">全部提现</div>
            </van-field>
        </section> -->
        <!-- <section>
            <p>提现方式</p>
            <div>
                <img src="./../../assets/img/paytype.png" alt="">
                <van-icon name="alipay" color="#00aaef" style="font-size:50px"/>
            </div>
        </section> -->
        <!-- <section>
            <p>提现账号</p>
            <div>
                <img src="./../../assets/img/paytype.png" alt="">
                <van-field
                    v-model="user.aTakeAccount"
                    center
                    placeholder="请点击右侧输入支付宝账号"
                    style="border-bottom:2px solid #8EBBFF;"
                    class="withdraw-money"
                    readonly
                    right-icon="edit"
                    @click-right-icon="show=true"
                >
                <div slot="button" class="withdraw-money-btn">修改账号</div>
            </van-field>
            </div>
            <van-dialog
                v-model="show"
                title="提现账号"
                show-cancel-button
                @confirm="updateAccount"
            >
                <van-field
                    v-model="user.aTakeAccount"
                    center
                    clearable
                    placeholder="请输入支付宝账号"
                    style="border-bottom:2px solid #8EBBFF;"
                />
            </van-dialog>
        </section> -->
        <!-- <section>
            <van-button round type="info" size="large" class="btn" @click="submit" :disabled="!dis">提现</van-button>
        </section> -->
    </div>
</template>
<script>
import api from '@api/app'
import { fetchPost } from '@utils/axios'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {
            show: false,
            money: '',
            account: '',
            bounsAcct: {},
            user: {}
        }
    },
    computed: {
        dis () {
            return this.user.aTakeAccount && this.money
        }
    },
    methods: {
        updateAccount () {
            let params = {
                account: this.user.aTakeAccount
            }
            if (!this.user.aTakeAccount) return Toast.fail('账号不能为空')
            api.updateAccount(params).then(res => {
                console.log(res)
                Toast.success('操作成功')
            }).catch(err => {
            // Toast.fail(err.msg)
                if (err.resultCode === -6) {
                    localStorage.clear('agentToken')
                    Dialog.alert({
                        message: err.msg
                    }).then(() => {
                        this.$router.push({ name: 'login' })
                    })
                } else {
                    Toast.fail(err.msg)
                }
            })
        },
        submit () {
            if(!this.money) {
                Toast('请输入提现金额！')
                return
            }
            if(!this.user.aTakeAccount) {
                Toast('请输入提现账号！')
                return
            }
            let restMoney = Number(this.bounsAcct.bcAbleTakeAmount) - Number(this.money)
            if (restMoney < 0) {
                return Toast.fail('金额不能超可提现金额!')
            }
            let params = {
                takeAmount: this.money
            }
            // this.bounsAcct.bcAbleTakeAmount = restMoney
            api.takeCash(params).then(res => {
                Toast.success('提现申请成功')
                this.money = ''
                this.$router.push('/home')
            }).catch(err => {
            // Toast.fail(err.msg)
                if (err.resultCode === -6) {
                    localStorage.clear('agentToken')
                    Dialog.alert({
                        message: err.msg
                    }).then(() => {
                        this.$router.replace({ name: 'login' })
                    })
                } else {
                    Toast.fail(err.msg)
                }
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        let params = {
            opType: 202,
            xry_token_id: window.localStorage.agentToken
        }
        fetchPost('/zqxry/bizqry/service', params).then(res => {
            console.log(res)
            next(vm => {
                vm.bounsAcct = res.bounsAcct
                vm.user = res.user
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
                Toast.fail(err.msg)
            }
        })
    }
}
</script>
<style lang="less" scoped>
@s: 0.0133rem;
.draw{
    padding: 32*@s;
    .cash{
        font-size: 30*@s;
        color: #0C0C0C;
        padding: 30*@s 0;
        border-bottom: 1px solid #F1F1F1;
        display: flex;
        align-items: center;
        line-height: 1;
        p{

            font-weight: 500;
        }
        span{
            flex: 1;
            text-align: right;
            color: #999999;
            img{
                width: 30*@s;
            }
        }
        input{
            flex: 1;
            text-align: right;
        }
        img{
            width: 30*@s;
            margin-left: 20*@s;
        }
    }
    .btn{
        margin-top: 90*@s;
        line-height: 80*@s;
        border-radius: 40*@s;
        background: #46BDAE;
        text-align: center;
        font-size: 28*@s;
        color: #fff;
    }
    // background: #fff;
    // height: 100%;
    // section:nth-child(1){
    //     p{
    //         font-size: 26*@s;
    //         color: #A6ABB5;
    //         span{
    //             color: #0494FF;
    //             font-size: 36*@s;
    //             &::after{
    //                 content: "元";
    //                 font-size: 26*@s;
    //                 color: #A6ABB5;
    //             }
    //         }
    //     }
    // }
    // section:nth-child(2){
    //     .withdraw-money{
    //         font-size: 40*@s;
    //         color: #565D69;
    //         span{
    //             font-size: 28*@s;
    //         }
    //         .withdraw-money-btn{
    //             font-size: 28*@s;
    //             color: #565D69;
    //         }
    //     }
    // }
    // section:nth-child(3){
    //     padding-bottom: 20px;
    //     border-bottom:2px solid #8EBBFF;
    //     p{
    //         font-size: 34*@s;
    //         color: #0D0C0C;
    //         padding: 39*@s 0;
    //     }
    //     div{
    //         padding-left: 30px;
    //         width: 282*@s;
    //         height: 90*@s;
    //         img{
    //             width: 100%;
    //         }
    //     }
    // }
    // section:nth-child(4){
    //     p{
    //         font-size: 34*@s;
    //         color: #0D0C0C;
    //         padding: 39*@s 0;
    //     }
    //     .withdraw-money{

    //         color: #565D69;
    //         span{
    //             font-size: 28*@s;
    //         }
    //         .withdraw-money-btn{
    //             font-size: 28*@s;
    //             color: #565D69;
    //         }
    //     }
    // }
    // section:nth-child(5){
    //     margin-top: 90*@s;
    // }
}
</style>
