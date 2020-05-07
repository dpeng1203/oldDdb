<template>
    <div class="pay">
        <van-steps
            :active="active"

            active-color="#38f"
            >
            <van-step>说明</van-step>
            <van-step>支付</van-step>
            <van-step>理疗</van-step>
        </van-steps>
        <template v-if="active === 0">
            <div class="pay-title">
                <p>确认身上金属制品是否摘除</p>
                <p>将患处靠近消融仪，距消融仪五厘米左右</p>
            </div>
            <div class="pay-img">
                <img src="./../../assets/img/device-img.png" alt="">
            </div>
            <div class="pay-options">
                <div>
                    <img src="./../../assets/img/options.png" alt="">
                </div>
                <div>
                    <p>（1）体内安装心脏支架、起搏器者不宜；</p>
                    <p>（2）孕妇及小孩不宜；</p>
                    <p>（3）有体内手术伤口以及放疗、化疗者不宜；  </p>
                    <p>（4）体内装有金属者不宜；</p>
                    <p>（5）血压高于190以上者不宜；</p>
                    <p>（6）眼睛与心脏部位禁止照射；</p>
                    <p>（7）女性生理期不宜,体内有美容假体者不宜；</p>
                    <p>（8）使用前后需大量饮用不低于1.5升左右饮用水；</p>
                    <p>（9）身上不得佩戴或藏有金属配饰。</p>
                </div>
            </div>
            <div class="pay-footer">
                <button @click="toNext">下一步</button>
            </div>
        </template>
        <template v-if="active === 1">
            <div class="pay-title">
                <p>确认支付开启消融仪</p>
                <p>驱寒祛湿 疏通经络 改善气血循环</p>
            </div>
            <div class="pay-money flex-space">
                <p>{{at}}号消融仪</p>
                <p>{{money}}元</p>
            </div>
            <div class="pay-type">
                <p>支付方式</p>
                <van-radio-group v-model="payRadio">
                    <van-cell-group>
                        <van-cell title="微信/支付宝" @click="payRadio = 'wx'" icon="wechat" title-class="pay-cell">
                            <div slot="icon" style="padding:0 10px;">
                                <img src="./../../assets/img/pay-type.png" alt="">
                            </div>
                            <van-radio slot="right-icon" name='wx' />
                        </van-cell>
                        <!-- <van-cell title="单选框 2"  @click="payRadio = '2'">
                            <van-radio slot="right-icon" name="2" />
                        </van-cell> -->
                    </van-cell-group>
                </van-radio-group>
                <!-- <div class="flex-spa">
                    <div class="flex-start">
                        <van-icon name="wechat" />
                        <p>微信</p>
                    </div>
                </div> -->
            </div>
            <div class="pay-footer flex-center pay-footer-step2">
                <button @click="goBack">上一步</button>
                <button @click="paySubmit">立即启动</button>
            </div>
        </template>
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
            active: 0,
            params: {
                factSum: 10,
                at: '',
                sid: '',
                pcode: 1,
                barcode: ''
            },
            productList: [],
            barcode: '',
            at: '',
            pcode: '',
            ptime: '',
            pprice: 0,
            payRadio: 'wx'
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
        toNext () {
            this.active = 1
        },
        goBack () {
            this.active = 0
        },
        chooseItem (val) {
            this.params.factSum = val.price
            this.params.pcode = val.pcode
        },
        paySubmit () {
            // let barcode = 'f4f2e65f83f0f73f316911c684233224' //
            // let at = 2 // mac_id
            // let pcode = this.params.pcode // mac_code
            // window.location.href = 'http://xrybiz.tsw202.com/zqxry/pay?barcode=' + this.barcode + '&pcode=' + this.pcode + '&at=' + this.at
            // http://xrybiz.tsw202.com/zqxry/pay?barcode=f4f2e65f83f0f73f316911c684233224&factSum=0.01&pcode=1&at=2
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
    beforeRouteEnter (to, from, next) {
        // let monitCode = to.query.id
        let barcode = to.query.barcode
        let at = to.query.at
        let pcode = to.query.pcode
        // let params = {
        //     barcode
        // }
        Promise.all([
            fetchPost('/zqxry/bizqry/getProducts', { pcode }),
            fetchPost('/zqxry/bizqry/getPrice', { barcode })
        ]).then(res => {
            next(vm => {
                console.log(res)
                vm.productList = res[0]
                vm.barcode = barcode
                vm.at = at
                vm.pcode = res[0][0].pCode
                vm.ptime = res[0][0].pTime
                vm.pprice = +res[1]
            })
        })
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.pay{
    padding: 0 30*@s;
    padding-top: 44*@s;
    padding-bottom: 110*@s;
    background: #f2f2f2;
    height: 100%;
    // position: relative;
    .van-steps{
        background: #f2f2f2;
        .van-step__title{
            font-size: 14px;
        }
        .van-step__circle-container{
            background: #f2f2f2;
            top: 22px;
            padding: 0;
            i{
                font-size: 14px;
            }
            .van-step__circle{
                width: 14px;
                height: 14px;
            }
        }
        .van-step__line{
                top: 26px;
                width: 100%;
                height: 6px;
        }
    }
    &-title{
        text-align: center;
        p:nth-child(1){
            font-size: 50*@s;
            font-weight: bold;
        }
        p:nth-child(2){
            margin-top: 10*@s;
            font-size: 32*@s;
        }
    }
    &-img{
        margin-top: 50*@s;
        height: 480*@s;
        width: 100%;
        text-align: center;
        img{
            height: 100%;
        }
    }
    &-options{
        padding-left: 10*@s;
        div:nth-child(1){

            img{
                width: 106*@s;
            }
        }
        div:nth-child(2){
            font-size: 16*@s;
            padding:20*@s 0;
            padding-left: 35*@s;
            background: #fff;
            p{
                padding:2px 0;
                letter-spacing: 2px;
            }
        }
    }
    &-footer{
        border-top: 2px solid #f2f2f2;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 100*@s;
        margin-left: -30*@s;
        text-align: center;
        background: #fff;
        font-size: 32*@s;
        button{
            width: 80%;
            height: 80*@s;
            margin-top: 10*@s;
            background:#46BDAE;
            border: none;
            color: #fff;
            border-radius: 10px;
        }
    }
    &-money{
        margin-top: 92*@s;
        border-top: 2px solid #f2f2f2;
        padding: 48*@s 32*@s;
        background: #fff;
        border-bottom: 2px solid #f2f2f2;
        font-size: 48*@s;
        border-radius: 10px;
        p:nth-child(2){
            color: #FF0303;
        }
    }
    &-type{
        margin-top: 60*@s;
        .van-cell{
            border-radius:10px;
        }
        p:nth-child(1){
            font-size: 32*@s;
            color: #333;
            margin-bottom: 20*@s;
        }
    }
    .van-cell{
        .van-icon-wechat{
            color: #19be6b;
            font-size: 50*@s;
        }
    }
    &-cell{
        font-size: 40*@s;
        color: #111111;

    }
    &-footer-step2{
        background: #fff;
        button{
            width: 40%;
            height: 80*@s;
            margin-top: 10*@s;
            background:#00A0E9;
            border: none;
            color: #fff;
            border-radius: 10px;
        }
        button:nth-child(1){
            margin-right: 5%;
        }
        button:nth-child(2){
            margin-left: 5%;
            background: #46BDAE;
        }
    }
}
</style>
