<template>
    <div class="buy">
        <div class="pro">
            <img src="../../assets/img/buy_pic.png" alt="">
            <p>DODO智能养生仪</p>
            <p class="desc">驱寒祛湿、疏通经络，打通气血循环</p>
            <div class="money">
                <div class="price">￥{{price}}</div>
                <img src="../../assets/img/redu.png" alt="" @click="reduct">
                <span>{{num}}</span>
                <img src="../../assets/img/add.png" alt="" @click="num++">
            </div>
            <div class="tip">
                <span>快递：0.00</span>
                <p>月销：102</p>
                <span>杭州</span>
            </div>
        </div>
        <div class="addr">
            <div class="title">
                <img src="../../assets/img/dizhi.png" alt="">
                <span>收货地址</span>
            </div>
            <div class="item">
                <div class="name">姓名</div>
                <div class="val">{{name}}</div>
            </div>
            <div class="item">
                <div class="name">电话</div>
                <div class="val">{{phone}}</div>
            </div>
            <div class="item">
                <div class="name">地址</div>
                <div class="val"><input type="text" placeholder="请输入地址" v-model="addr"></div>
            </div>
            <div class="deal" >
                <img src="../../assets/img/unsel.png" alt="" v-if="!showRead" @click="showRead = !showRead">
                <img src="../../assets/img/sel.png" alt="" v-else  @click="showRead = !showRead">
                <span>已阅读并同意协议</span>
                <p @click="$router.push('/buyDeal')">查看协议</p>
                <img src="../../assets/img/right.png" alt="" class="right">
            </div>
        </div>

        <div class="foot">
            <img src="../../assets/img/add_shop.png" alt="">
            <div class="count">{{num}}</div>
            <p>总价：￥{{allPrice}}</p>
            <div class="close-acc" @click="addOrder">生成订单</div>
        </div>
    </div>
</template>

<script>
import app from '@/api/app.js'
import { Toast } from 'vant'
export default {
    name: 'buy',
    data () {
        return {
            num: 1,
            price: 8800,
            addr: '',
            name: '',
            phone: '',
            showRead: false
        }
    },
    computed: {
        allPrice: function () {
            return (this.num * this.price).toFixed(2)
        }
    },
    methods: {
        reduct () {
            if (this.num > 1) {
                this.num--
            } else {
                Toast('最少一件产品！')
            }
        },
        addOrder () {
            if (this.showRead) {
                if (!this.addr) {
                    Toast('请输入地址')
                    return
                }
                let parms = {
                    addr: this.addr,
                    icount: this.num
                }
                app.addOrder(parms).then(res => {
                    this.$router.push({ path: '/payOrder', query: { orderNum: res.msg } })
                })
            } else {
                Toast('请阅读协议！')
            }
        },
        getLoginInfo () {
            app.getLoginInfo().then(res => {
                this.name = res.aName
                this.phone = res.mobile
            })
        },
        getProPrice () {
            app.getProPrice().then(res => {
                this.price = Number(res.msg).toFixed(2)
            })
        }
    },
    mounted () {
        this.getLoginInfo()
        this.getProPrice()
    }
    // activated() {
    //     if(this.$route.query.show) {
    //         this.show = true
    //     }else{
    //         this.show = false
    //     }
    //     console.log(this.show)
    // },
    // beforeRouteEnter(to, from, next) {
    //     next(vm => {
    //         if (from.name == 'home' || from.name == 'payOrder') {
    //             vm.show = false
    //         }
    //     })
    // },
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.buy{
    min-height: calc(100vh);
    background: #f2f2f2;
    padding-bottom: 150*@s;
    box-sizing: border-box;
    .pro{
        background: #fff;
        padding: 20*@s 30*@s 40*@s;
        p{
            font-size: 30*@s;
            color: #353535;
            font-weight: bold;
            margin-top: 20*@s;
        }
        .desc{
            margin-top: 0;
        }
        .money{
            display: flex;
            align-items: center;
            margin-top: 20*@s;
            .price{
                color: #DE2E2E;
                flex: 1;
                font-size: 36*@s;
                font-weight: bold;
            }
            img{
                width: 35*@s;
            }
            span{
                color: #929292;
                width: 50*@s;
                text-align: center;
                font-size: 30*@s;
            }
        }
        .tip{
            font-size: 26*@s;
            color: #999;
            margin-top: 30*@s;
            display: flex;
            align-items: center;
            p{
                flex: 1;
                margin-left: 175*@s;
                font-size: 26*@s;
                color: #999;
                font-weight: 400;
                margin-top: 0;
            }
        }
        .all{
            // color: #DE2E2E;
            font-size: 36*@s;
            font-weight: bold;
        }
    }
    .addr{
        padding: 0 30*@s 30*@s;
        background: #fff;
        margin-top: 20*@s;
        .title{
            font-size: 28*@s;
            font-weight: 500;
            border-bottom: 1px solid #F2F2F2;
            line-height: 77*@s;
            img{
                width: 30*@s;
                margin: 24*@s 10*@s 0 0;
            }
        }
        .item{
            border-bottom: 1px solid #F2F2F2;
            padding: 15*@s 0;
            font-size: 28*@s;
            display: flex;
            align-items: center;
            .name{
                width: 156*@s;
                flex-shrink: 0;
            }
        }
        .deal{
            margin-top: 20*@s;
            font-size: 28*@s;
            display: flex;
            align-items: center;
            span{
                margin-top: 10*@s;
                margin-left: 20*@s;
                flex: 1;
            }
            img{
                width: 40*@s;
                margin: 9*@s 0 0 5*@s;
            }
            p{

                 margin-top: 10*@s;
                 margin-right: 10*@s;
                color: #00A0E9;
            }
            .right{
                width: 16*@s;
            }
        }
        .btn{
            line-height: 80*@s;
            margin-top: 96*@s;
            background: #46BDAE;
            border-radius: 48*@s;
            text-align: center;
            color: #fff;
            font-size: 30*@s;
        }
    }

    .foot{
        display: flex;
        align-items: center;
        background: #fff;
        box-shadow: 0px 9px 32px 0px rgba(215,215,215,1);
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        img{
            width: 78*@s;
            margin: 0 35*@s 0 35*@s;
        }
        .count{
            font-size: 24*@s;
            position: absolute;
            top: 10*@s;
            left: 100*@s;
            background: #FF0000;
            color: #fff;
            padding: 0 8*@s;
            line-height: 32*@s;
            text-align: center;
            border-radius: 50%;
        }
        p{
            font-size: 28*@s;
            font-weight: bold;
            flex: 1;
        }
        .close-acc{
            width: 300*@s;
            background: #46BDAE;
            color: #fff;
            text-align: center;
            line-height: 100*@s;
            font-size: 30*@s;
        }
    }
}
</style>
