<template>
    <div class="pay">
        <div class="step">
            <div class="num active">1</div>
            <div class="line active"></div>
            <div class="num active">2</div>
            <div class="line"></div>
            <div class="num">3</div>
        </div>
        <div class="tip">确认支付开启消融仪</div>
        <p>驱寒祛湿 疏通经络 改善气血循环</p>
        <div class="xry">{{at}}号消融仪 <span>{{money}}元</span></div>
        <div class="pay-type">
            <div class="title">支付方式</div>
            <div class="item">
                <img src="../../assets/img/pay-type.png" alt="">
                <span>微信/支付宝</span>
                <img src="../../assets/img/choose.png" alt="" class="choose">
            </div>
        </div>
        <div class="foot">
            <div class="btn" @click="paySubmit">马上启用</div>
        </div>
    </div>
</template>

<script>
import {
    fetchPost
} from '@/utils/axios'
import api from '@api/app'
import { Toast } from 'vant'
export default {
    data () {
        return {
            at: '',
            barcode: '',
            pcode: '',
            // active: 0,
            params: {
                factSum: 10,
                at: '',
                sid: '',
                pcode: 1,
                barcode: ''
            },
            productList: [],
            pcode: '',
            ptime: '',
            pprice: 0
            // payRadio: 'wx'
        }
    },
    computed: {
        money () {
            return this.pprice.toFixed(2)
        },
        time () {
            return this.ptime / 60
        }
    },
    methods: {
        paySubmit () {
            let param = {
                barcode: this.barcode,
                at: this.at,
                pcode: this.pcode
            }
            api.pay(param).then(res => {
                console.log(res)
                window.location.href = res.msg
            }).catch(err => Toast.fail(err.msg))
        }
    },
    mounted () {
        let barcode = this.$route.query.barcode
        let at = this.$route.query.at
        let pcode = this.$route.query.pcode
        Promise.all([
            fetchPost('/zqxry/bizqry/getProducts', { pcode }),
            fetchPost('/zqxry/bizqry/getPrice', { barcode })
        ]).then(res => {
            console.log(res)
            this.productList = res[0]
            this.barcode = barcode
            this.at = at
            this.pcode = res[0][0].pCode
            this.ptime = res[0][0].pTime
            this.pprice = +res[1]
        })
    }
    // beforeRouteEnter (to, from, next) {
    //     // let monitCode = to.query.id
    //     let barcode = to.query.barcode
    //     let at = to.query.at
    //     let pcode = to.query.pcode
    //     // let params = {
    //     //     barcode
    //     // }
    //     Promise.all([
    //         fetchPost('/zqxry/bizqry/getProducts', { pcode }),
    //         fetchPost('/zqxry/bizqry/getPrice', { barcode })
    //     ]).then(res => {
    //         next(vm => {
    //             console.log(res)
    //             vm.productList = res[0]
    //             vm.barcode = barcode
    //             vm.at = at
    //             vm.pcode = res[0][0].pCode
    //             vm.ptime = res[0][0].pTime
    //             vm.pprice = +res[1]
    //         })
    //     })
    // }
}
</script>

<style lang="less" scoped>
	@s: 0.0133rem;
    .pay{
        text-align: center;
        font-size: 28*@s;
        background: #f7f7f7;
        height: calc(100vh);
        .step{
            padding-top: 70*@s;
            display: flex;
            align-items: center;
            margin-left: 117*@s;
            .num{
                width: 44*@s;
                line-height: 44*@s;
                border-radius: 50%;
                background: #D2D2D2;
                color: #fff;
            }
            .line{
                width: 190*@s;
                height: 10*@s;
                background: #D2D2D2;
            }
            .active{
                background: #00A0E9;
            }
        }
        .tip{
            font-size: 36*@s;
            font-weight: bold;
            margin-top: 40*@s;
            line-height: 1;

        }
        p{
            font-size: 24*@s;
            font-weight: 500;
            margin-top: 20*@s;
            line-height: 1;
        }
        .xry{
            font-size: 36*@s;
            font-weight: 500;
            line-height: 130*@s;
            border-radius: 20*@s;
            background: #fff;
            padding: 0 40*@s;
            text-align: left;
            margin: 90*@s 30*@s;
            span{
                font-size: 48*@s;
                font-weight: bold;
                float: right;
                color: #FF0303;
            }
        }
        .pay-type{
            margin: 60*@s 30*@s;
            text-align: left;
            .item{
                background: #fff;
                padding: 20*@s;
                display: flex;
                align-items: center;
                border-radius: 20*@s;
                margin-top: 10*@s;
                img{
                    width: 55*@s;
                }
                span{
                    flex: 1;
                    margin-left: 20*@s;
                }
                .choose{
                    width: 30*@s;
                }
            }
        }
        .foot{
            padding: 20*@s 75*@s;
            background: #fff;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            .btn{
                width: 600*@s;
                line-height: 80*@s;
                background: #00A0E9;
                color: #fff;
                border-radius: 15*@s;
            }
        }
    }
</style>
