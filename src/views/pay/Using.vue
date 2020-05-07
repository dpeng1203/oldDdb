<template>
    <div class="using">
        <div class="using-top">
            <div class="wrap">
                <van-circle
                    v-model="currentRate"
                    color="#46BDAE"
                    size="5.38rem"
                    layer-color="#E7F7FF"
                    fill="#fff"
                    :rate="rate"
                    :speed="100"
                    :stroke-width="50"
                >
                </van-circle>
                <div class="clock">
                    <van-count-down :time="time">
                        <template v-slot="timeData">
                            <span class="item" v-if="timeData.minutes<10">{{ '0' + timeData.minutes }}</span>
                            <span class="item" v-else>{{ timeData.minutes }}</span>
                            <span class="symbal">:</span>
                            <span class="item" v-if="timeData.seconds<10">{{ '0' + timeData.seconds }}</span>
                            <span class="item" v-else>{{ timeData.seconds }}</span>
                        </template>
                    </van-count-down>
                </div>
            </div>
            <div  class="using-top-tip">
                <p>离开时请带好您的随身物品</p>
            </div>
        </div>
        <div class="using-order">
            <p class="using-order-title">订单信息</p>
            <div class="flex-space">
                <p class="name">机器编号：</p>
                <p >{{at}}</p>
            </div>
            <div class="flex-space">
                <p class="name">服务时间：</p>
                <p>{{serviceTime}}</p>
            </div>
            <div class="flex-space">
                <p class="name">已支付：</p>
                <p>{{money}}</p>
            </div>
        </div>
        <div class="tip">
            <div class="using-desc">
                <img src="./../../assets/img/sun.png" alt="">
                <div class="desc">
                    <p>在理疗过程中</p>
                    <p>局部会出现灼热的刺痛感</p>
                </div>
            </div>
            <div class="using-desc">
                <img src="./../../assets/img/cup.png" alt="" class="teacup">
                <div class="desc">
                    <p>在理疗过程中</p>
                    <p>需要多喝温水来补充身体的水分</p>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import {
    fetchPost
} from '@/utils/axios'
import api from '@api/app'
import { Toast  } from 'vant'
export default {
    data () {
        return {
            currentRate: 0,
            rate: 0,
            text: '启动中……',
            textShow: true,
            barcode: '',
            at: 0,
            pcode: '',
            ptime: 0,
            pprice: 0,
            serviceTime: '设备启动中……',
            orderId: '',
            status: 0,
            orderInfo: {},
            useText: '理疗中...',
            time: 0,
            timeData: {
                minutes: 0,
                seconds: 0,

            }
        }
    },
    computed: {
        money () {
            return this.pprice.toFixed(2)
        }
    },
    mounted () {
        let _self = this
        this.$nextTick(function () {
            if (!_self.orderInfo.oMacStartStatus) {
                let statusTimer = setInterval(function () {
                    _self.getOrderInfo(_self.orderId)
                    if (_self.orderInfo.oMacStartStatus === 1) {
                        _self.serviceTime = _self.orderInfo.oMacStart
                        _self.ptime = _self.orderInfo.pTime
                        _self.time = _self.orderInfo.pTime * 1000
                        _self.timeData.minutes = Math.floor(_self.ptime / 60)
                        _self.timeData.seconds = _self.ptime % 60
                        
                        let goTime = 0
                        setInterval(function() {
                            goTime++
                            if(goTime >= _self.ptime) {
                                _self.currentRate = 100
                                _self.useText = '理疗结束'
                            }else{
                                _self.currentRate = (goTime / _self.ptime) * 100
                            }
                            
                        },1000)
                        clearInterval(statusTimer)
                        // _self.countDown()
                    }
                }, 2000)
            } else {
                // this.countDown(_self)
            }
            // let day = new Date()
            // _self.serviceTime = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' ' + day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds()
        })
    },
    methods: {
        formart (val) {
            if (val >= 10) return val
            else return '0' + val
        },
        getOrderInfo (orderId) {
            api.getOrderInfo({ orderId }).then(res => {
                this.orderInfo = res[0]
                this.pprice = this.orderInfo.oPayCash
                this.at = this.orderInfo.macId
            }).catch(err => Toast.fail(err.msg))
        },
        countDown () {
            // 倒计时
            let _self = this
            let count = 0
            let min = Math.floor(_self.ptime / 60)
            let sec = _self.ptime % 60
            if (!sec) {
                min = Math.floor(_self.ptime / 60) - 1
            }
            _self.timer = setInterval(function () {
                if (sec === 0) {
                    sec = 60
                }
                sec--
                count++
                min = Math.floor((_self.ptime - count) / 60)
                _self.rate = (count / _self.ptime) * 100
                _self.currentRate = (count / _self.ptime) * 100
                if (count === _self.ptime) {
                    _self.useText = '理疗结束'
                    clearInterval(_self.timer)
                }
                _self.text = _self.formart(min) + ' : ' + _self.formart(sec)
            }, 1000)
        }
    },
    beforeRouteEnter (to, from, next) {
        let orderId = to.query.orderid
        // let barcode = to.query.barcode
        // let at = to.query.at
        // let pcode = to.query.pcode
        // fetchPost('/zqxry/bizqry/getProducts', { pcode }).then(res => {
        next(vm => {
            vm.orderId = orderId
            vm.getOrderInfo(orderId)
            // console.log(res[0].pTime)
            // vm.barcode = barcode
            // vm.at = at
            // vm.pcode = res[0].pCode
            // vm.ptime = res[0].pTime
            // vm.pprice = res[0].pPrice
        })
        // })
    },
    destroyed () {
        // clearInterval(this.timer)
        // clearInterval(this.statusTimer)
    }
}
</script>
<style lang="less" >
@s: 0.0133rem;
.using{
    background: #f7f7f7;
    min-height: calc(100vh);
    .using-top{
        height: 650*@s;
        text-align: center;
        padding-top: 56*@s;
        background: #46BDAE;
        box-sizing: border-box;
        position: relative;
        .wrap{
            width: 489*@s;
            height: 489*@s;
            background: #E7F7FF;
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            .clock{
                position: absolute;
                top: 275*@s;
                left: 0;
                right: 0;
                text-align: center;
                .item {
                    display: inline-block;
                    color: #000;
                    font-size: 80*@s;
                    text-align: center;
                    background-color: rgba(0,0,0,0);
                }
                .symbal{
                    color: #000;
                    // margin: 0 5*@s;
                    font-size: 80*@s;
                }
            }
        }
        .using-top-tip{
            margin-top: 36*@s;
            color: #fff;
            font-size: 30*@s;
            line-height: 1;
        }
    }
    .using-order{
        font-size: 30*@s;
        text-align: center;
        padding: 25*@s 60*@s 30*@s;
        margin: 20*@s 30*@s;
        border-radius: 30*@s;
        color: #333;
        background: #fff;
        &-title{
            line-height: 1;
            margin-bottom: 20*@s;
            &::before{
                content: ' ';
                height: 0px;
                display: inline-block;
                border-top: 2*@s solid #B5B5B5;
                width: 75*@s;
                vertical-align: middle;
                margin-right: 12*@s;
            }
            &::after{
                content: ' ';
                height: 0px;
                display: inline-block;
                border-top: 2*@s solid #B5B5B5;
                width: 75*@s;
                vertical-align: middle;
                margin-left: 12*@s;
            }
        }
        .flex-space{
            display: flex;
            align-items: center;
            p{
                line-height: 1;
                margin-top: 15*@s;
                font-weight: bold;
            }
            .name{
                flex: 1;
                text-align: left;
                font-weight: normal;
            }
            
        }
    }
    .tip{
        padding: 0 50*@s;
        margin: 20*@s 30*@s;
        border-radius: 30*@s;
        color: #333;
        background: #fff;
        .using-desc{
            display: flex;
            align-items: center;
            font-size: 24*@s;
            border-bottom: 5*@s solid #f2f2f2;
            padding: 30*@s 0;
            .desc{
                flex: 1;
                text-align: center;
                color: #333;
                font-weight: normal;
            }
            p{
                text-align: center;
                line-height: 2;
                // margin-top: 20*@s;
            }
            img{
                width: 107*@s;
            }
            .teacup{
                width: 98*@s;
            }
            &:last-child{
                border-bottom: 0
            }
        }
    }
    
    
}
</style>
