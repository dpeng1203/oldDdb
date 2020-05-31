<template>
    <div class="order-detail">
        <div class="contact">
            <img src="../../assets/img/address.png" alt="">
            <div class="info">
                <div class="phone">{{item.daMobile}}</div>
                <div class="name">收货人：{{item.daName}}</div>
                <p>收货地址：{{item.aAddress}}</p>
            </div>
        </div>
        <div class="cont" >
            <img :src="item.productInfo.pMainPic" alt />
            <div class="info">
                <div class="title">{{item.productInfo.pName}}</div>
                <div class="desc">{{item.desc}}</div>
                <div class="pro-price">
                <!-- <span class="ori-price">￥{{item.pPrice2}}</span> -->
                <span class="price">￥{{item.price}}</span>
                <span class="num">x {{item.pCount}}</span>
                </div>
            </div>
        </div>
        <!-- <div class="sum">
            <div class="item">
                <div class="name">订单总结</div>
            </div>
            <div class="item">
                <div class="name">商品价格</div>
                <div class="value" >￥{{(item.pPrice2*pCount).toFixed(2)}}</div>
            </div>
            <div class="item">
                <div class="name">优惠金额</div>
                <div class="value" >- ￥{{item.f_price}}</div>
            </div>
            <div class="item">
                <div class="name">运费</div>
                <div class="value">￥0.00</div>
            </div>
            <div class="item total">
                <div class="name"></div>
                <div class="value">总价：<span>￥{{(item.pPrice3*pCount).toFixed(2)}}</span></div>
            </div>
        </div> -->
        <div class="dropdown">
            <span>创建时间：</span>
            <p>{{item.createTime}}</p>
        </div>
        <div class="dropdown">
            <span>订单号：</span>
            <p>{{item.pbCode}}</p>
        </div>
        <div class="dropdown" v-if="item.pbType == 0">
            <span>快递类型：</span>
            <van-dropdown-menu active-color="#ee0a24">
                <van-dropdown-item v-model="value1" :options="option1" />
            </van-dropdown-menu>
        </div>
        <div class="dropdown" v-if="item.pbType == 0">
            <span>快递公司：</span>
            <van-dropdown-menu active-color="#ee0a24">
                <van-dropdown-item v-model="value2" :options="option2" />
            </van-dropdown-menu>
        </div>
        <div class="dropdown" v-if="item.pbType == 0">
            <span>快递编号：</span>
            <p>{{code}}</p>
        </div>
        <van-goods-action v-if="item.pbType == 0">
            <van-goods-action-button type="warning" text="扫一扫录入快递号" @click="onClickScan"/>
            <van-goods-action-button
                type="danger"
                text="发货"
                @click="onClickSend"
            />
        </van-goods-action>
    </div>
</template>

<script>
import { SubmitBar,Icon, Toast, DropdownMenu, DropdownItem,GoodsAction,GoodsActionButton } from 'vant';
import app from '@/api/app.js'
import wx from 'weixin-js-sdk'; 
export default {
    components: {
        [SubmitBar.name]: SubmitBar,
        [Icon.name]: Icon,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [GoodsActionButton .name]: GoodsActionButton,
        [GoodsAction.name]: GoodsAction
    },
    data() {
        return{
            pbCode: '',
            status: '',
            daName: '',
            daMobile: '',
            aAddress: '',
            pCount: '',
            price: '',
            item: {},
            value1: 1,
            option1: [
                { text: '常用快递', value: 1 },
                { text: '国内快递', value: 2 },
                { text: '国外快递', value: 3 },
            ],
            value2: -1,
            option2: [
                { text: '请选择', value: -1 }
                
            ],
            code: ''
        }
    },
    methods: {
        onClickScan() {
            this.scan()
            // let parms = {
            //     priceType: 0,
            //     pbCode: this.pbCode
            // }
            // this.$api.mall.orderPay(parms).then(res => {
            //     if(res.resultCode ===1) {
            //         window.location.href = res.msg
            //     }
            // })
        },
        onClickSend() {
            if(this.value2 == -1) {
                Toast('请选择快递公司！')
                return
            }
            if(!this.code) {
                Toast('请扫码获取快递单号！')
                return
            }
            let parms = {
                edSend: thsi.value2,
                daExCode: this.code,
                pbCode: this.item.pbCode
            }
            app.edSend(parms).then(res => {
                Toast('已录快递单号，请尽快发货！')
            })
        },
        scanStart() {
            let url = window.location.href.split('#')[0]
            let data = {
                url: url
            }
            app.sign(data).then( res => {
                console.log(res)
                wx.config({
                    debug: false,
                    appId: res.appId,
                    timestamp: res.timestamp,
                    nonceStr: res.noncestr,
                    signature: res.signature,
                    jsApiList: [
                        // 所有要调用的 API 都要加到这个列表中
                        'checkJsApi',
                        'scanQRCode', // 微信扫一扫接口
                    ]
                });

                wx.ready( () => {
                    wx.checkJsApi({
                        jsApiList : ['scanQRCode'],
                        success: function (res) {
                            // console.log(success11111111111111111)
                            // alert(JSON.stringify(res));
                            // alert(JSON.stringify(res.checkResult.getLocation));
                            // if (res.checkResult.getLocation == false) {
                            //     alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                            //     return;
                            // }
                        }
                    }); 
                    wx.error(function(res) {
                        alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                    });
                    
                });
            })
        },
        scan() {
            // if(this.item.actPosAssignedCount == this.item.actSignCount) {
            //     Toast('店主已全部签到！')
            //     return
            // }
            wx.scanQRCode({
                needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType : [ "qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success : (res) => {
                    // var result;
                    // if(/,/.test(res.resultStr)){
                    //     result = res.resultStr.split(',')[1]; // 当needResult 为 1 时，扫码返回的结果
                    // }else{
                    //     result = resultStr;
                    // }
                    // alert(res.resultStr)
                    this.code = res.resultStr.split(',')[1]
                    // this.actSign()
                },
                fail : function(){
                    console.log('出错了');
                }
            });
        },
        getEdCode() {
            app.edCode().then(res => {
                this.option2 = res.filter(ele => {
                    ele.text = ele.edCompanyName
                    ele.value = ele.edCode
                    return ele.edType = this.value1
                })
                this.option2.push({ text: '请选择', value: -1 })
            })
        }
    },
    mounted() {
        this.item = this.$route.query.item
        // this.status = this.$route.query.status
        // this.getDetail(this.pbCode)
        this.scanStart()
        this.getEdCode()
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.order-detail{
    font-size: 28*@s;
    background: #f2f2f2;
    min-height: 100vh;
    .contact{
        padding: 50*@s 36*@s 35*@s 30*@s;
        display: flex;
        align-items: flex-start;
        // background: #F7F7F7;
        img{
            width: 20*@s;
            margin-top: 28*@s;
            margin-right: 15*@s;
        }
        .info{
            margin-left: 16*@s;
            color: #333;
            overflow: hidden;
            width: 610*@s;
            
            .name, .phone{
                font-size: 30*@s;
                font-weight: bold;
            }
            .phone{
                float: right;
            }
            p{
                font-size: 24*@s;
                color: #808080;
                margin-top: 10*@s;
            }
        }
        .right{
            margin-left: 20*@s;
            margin-top: 30*@s;
            color: #808080;
        }
    }
    .cont{
        // padding-top: 18*@s;
        padding: 30 * @s;
        display: flex;
        align-items: center;
        background: #fff;
        img {
            width: 160 * @s;
            height: 160 * @s;
        }
        .info {
            flex: 1;
            margin-left: 30 * @s;
            .desc {
                color: #808080;
                margin-top: 10 * @s;
                font-size: 24 * @s;
                margin-bottom: 10 * @s;
            }
            .ori-price {
                font-size: 28 * @s;
                margin-right: 10 * @s;
                text-decoration: line-through;
            }
            .price {
                color: #ed0c17;
                font-size: 32 * @s;
                font-weight: bold;
            }
            .pro-price{
                display: flex;
                align-items: center;
                .price{
                    flex: 1
                }
                .num{
                    font-size: 22*@s;
                    color: #999;
                }
            }
        }
    }
    .sum{
        padding: 0 40*@s;
        font-size: 24*@s;
        background: #fff;
        margin-top: 30*@s;
        .item{
            display: flex;
            align-items: center;
            font-weight: bold;
            height: 80*@s;
            // padding-top: 35*@s;
            .name{
                flex: 1;
            }
            input{
                width: 490*@s;
                flex-shrink: 0;
            }
            span{
                font-weight: bold;
                color: #FF0101;
            }
            .right{
                margin-left: 15*@s;
                color: #333;
            }
            &:first-child{
                border-top: 1px solid #C8C8C8;
                font-size: 26*@s;
            }
        }
        .total{
            border-top: 1px solid #C8C8C8;
            padding-top: 30*@s;
        }
    }
    .dropdown{
        margin-top: 20*@s;
        display: flex;
        align-items: center;
        padding: 0 40*@s;
        background: #fff;
        height: 100*@s;
        span{
            flex: 1;
            font-size: 28*@s;
        }
        p{
            font-size: 28*@s;
        }
    }
    .van-goods-action{
        padding: 15*@s 30*@s;
    }
    
}
</style>