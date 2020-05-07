<template>
    <div class="payTest">
        <div class="pay-top">
            <img src="./../../assets/img/pay_title.png" alt="">
        </div>
        <div class="pay-content">
            <p>芯能量消融仪</p>
            <div @click="paySubmit">
                <img src="./../../assets/img/pay.png" alt="">
            </div>

        </div>
        <div class="pay-footer1">
            <p>温馨提示</p>
            <p>（1）本服务为有偿服务，每次{{money}}元，可享受{{time}}分钟消融仪理疗。</p>
            <p>注意事项</p>
            <p>（1）体内安装心脏支架、起搏器者不宜；</p>
            <p>（2）孕妇及小孩不宜；</p>
            <p>（3）有体内手术伤口以及放疗、化疗者不宜；  </p>
            <p>（4）体内装有金属者不宜；</p>
            <p>（5）血压高于190以上者不宜；</p>
            <p>（6）眼睛与心脏部位禁止照射；</p>
            <p>（7）女性生理期不宜,体内有美容假体者不宜；</p>
            <p>（8）使用前后需大量饮用不低于1.5升左右饮用水；</p>
            <p>（9）身上不得佩戴或藏有金属配饰；</p>
        </div>
        <!-- <div class="pay">
            <div class="pay-title">选择体验时间</div>
            <div class="flex-space pay-type">
                <div v-for="item in specs" :key="item.price" class="pay-div" :class="{checked:item.price == params.factSum}" @click="chooseItem(item)">
                    <p>{{item.price}}元</p>
                    <p>{{item.time}}分钟</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="pay-bottom">
            <p>共计：<span class="total-money">{{params.factSum}}元</span></p>
            <button class="pay-submit" @click="paySubmit">支付</button>
        </div>
        <footer class="flex-center pay-footer">
            <img src="./../../assets/img/logo.png" alt="">
            <p>芯能量生命之光 科技成就养生梦想</p>
        </footer> -->
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
            specs: [
                { price: 10, time: 5, pcode: 1 },
                { price: 20, time: 10, pcode: 2 }
            ],
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
            pprice: 0
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
        fetchPost('/zqxry/bizqry/getProducts', { pcode }).then(res => {
            next(vm => {
                console.log(res)
                vm.productList = res
                vm.barcode = barcode
                vm.at = at
                vm.pcode = res[0].pCode
                vm.ptime = res[0].pTime
                vm.pprice = res[0].pPrice
            })
        })
    }
}
</script>
<style lang="less">
/* 支付页面 */
@s: 0.0133rem;
.payTest{
    // padding-left:52*@s;
    .pay-top{
        height: 300*@s;
        // padding-top: 20*@s;
        img{width: 100%}
    }
    .pay-content{
        p{
            font-size: 32*@s;
            font-weight: 500;
            padding: 40*@s 20*@s;
        }
        div{
            width: 256*@s;
            height: 323*@s;
            margin-left: calc(50% - 256*@s/2);
            img{
                width: 100%;
            }
        }
    }
    .pay-footer1{
        background-image: url('./../../assets/img/pay_footer.png');
        font-size: 18*@s;
        width: 100%;
        // padding-left: 20*@s;
        line-height: 20px;
        position: absolute;
        background-size: 100% 100%;
        bottom: 0;
        p{
            padding-left: 20*@s;
        }
        // p:nth-child(2){
        //     // color: red;
        //     padding-left: 38*@s;
        // }
    }
    .pay-title{
    line-height: 128*@s;
    padding-top: 40*@s;
    font-size: 36*@s;
    font-weight: 500;
}
.pay-div{
    border-radius: 20*@s;
    width: 300*@s;
    height: 128*@s;
    text-align: center;
    border: 1px solid #2e97de;
    margin-bottom: 104*@s;
}
.pay-div:nth-child(2){
    margin-right: 52*@s;
}
.pay-div p:nth-child(1){
    font-size: 32*@s;
    // line-height: 10*@s;
    // padding-top: .1*@s;
}
.pay-div p:nth-child(2){
    font-size: 24*@s;
    // padding-top: .01*@s;
    // line-height: 10*@s;
    color: #F34747
}
.checked{
    color: #fff;
    background: linear-gradient(left,#4eb4f7,#2e97de);
    background: -webkit-linear-gradient(left,#4eb4f7,#2e97de);
    background: -moz-linear-gradient(left,#4eb4f7,#2e97de);
}
.checked p:nth-child(2){
    color: #fff;

}
.pay-bottom{
    padding: 0 52*@s;
}
.pay-bottom p, span{
    margin-top: 20*@s;
    font-size: 40*@s;
    text-align: right;
    font-weight: 600;
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
}
.pay-submit{
    width: 100%;
    margin-top: 96*@s;

}
.pay-footer{
    position: absolute;
    bottom: 76*@s;

    color: #808080;
    width: 100%;
    word-spacing: 8px;
    letter-spacing: 4px;
}
.pay-footer img{
    width: 40*@s;
    margin-right: 24*@s;
}
.pay-footer p{
    font-size: 24*@s;
}
}

</style>
