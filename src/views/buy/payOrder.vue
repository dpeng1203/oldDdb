<template>
    <div class="pay-order">

        <div class="qr">
             <div class="qr-top">
              <div class="item">
                <div class="imgbg">
                 <vue-qr
                    :size="180"
                    :margin="0"
                    :auto-color="true"
                    :dot-scale="0.6"
                    :text="appSrc"
                    :logoScale="30"
                    :logo-src="logoSrc"/>
                  </div>
                 <p>提示：微信支付请长按二维码</p>
               </div>
            <!-- <div class="item">
                <img src="../../assets/img/wx_qr.png" alt="">
                <p>微信支付</p>
            </div> -->
            </div>
        </div>

          <div class="qr-bottom">
            <van-button to="home" class="btn left" plain>返回首页</van-button>
            <van-button to="orderQuery" class="btn right" plain>我的订单</van-button>
          </div>

        <div class="order">
            <div class="title">
                <img src="../../assets/img/order_detail.png" alt="">
                <span>订单详情</span>
            </div>
            <div class="item">订单号：{{orderNum}}</div>
            <div class="item">订单时间：{{time}}</div>
        </div>
        <div class="tip">
            <div class="title">
                <p></p>
                <span>注意</span>
                <p></p>
            </div>
            <div class="cont">
                <!-- <p>1、请在支付时写上订单编号；</p> -->
                <p>1、完成支付后请与多多邦公司联系哦，公司会尽快安排发货。</p>
                <p>2、联系电话：</p>
                <p class="p-left"> 总部热线：400-999-8212；</p>
                <p class="p-left">  严先生：18357173428。</p>
            </div>

        </div>
    </div>
</template>

<script>
import vueQr from 'vue-qr'
import app from '@/api/app.js'
export default {
    components: {
        vueQr
    },
    data () {
        return {
            orderNum: '',
            time: '',
            logoSrc: require('../../assets/img/zhengmoney.png'),
            appSrc: '',
            payInfo: {},
            isError: false

        }
    },
    methods: {
        getNowFormatDate () { // 获取当前时间
            var date = new Date()
            var seperator1 = '-';
            var seperator2 = ':';
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1):date.getMonth() + 1
            var strDate = date.getDate() < 10 ? '0' + date.getDate():date.getDate()
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                    ' ' + date.getHours() + seperator2 + date.getMinutes() +
                    seperator2 + date.getSeconds()
            this.time = currentdate
        },
        getUrl () {
            // app.getQrUrl({ barcode: this.orderNum }).then(res => {
            //     console.log(res)
            //     this.appSrc = res.msg
            // })
            app.getQrRandUrl({ barcode: this.orderNum }).then(res => {
                console.log(res.msg)
                let msg = JSON.parse(res.msg)
                console.log(msg)
                this.appSrc = msg.data.qraddress
            })
        }

    },
    mounted () {
        this.orderNum = this.$route.query.orderNum
        // this.appSrc = 'http://xrybiz.tsw202.com/zqxry/payMachine?barcode=' + this.orderNum
        this.getNowFormatDate()
        // async getDetails(params) {
        //     try {
        //         const { data } = await app.getQrUrl({barcode: this.orderNum})
        //         console.log(data)
        //         // this.payInfo = data;
        //         // this.appSrc = data.payUrl;
        //         // this.logoSrc = providerIconMap[data.supplierCode];
        //     } catch (err) {
        //         // if (err.code !== 1) {
        //         //   this.isError = true;
        //         // }
        //     }
        //     }
        this.getUrl()
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.pay-order{
    height: calc(100vh);
    background: #f2f2f2;
    .qr{
        position: relative;
        // background: #fff;
        // padding: 40*@s 60*@s;
        display: flex;
        align-items: center;
        // background-image: url(../../assets/img/payOrderbg.png);
        // background-size: 100% 100%;

        background: palevioletred;
       .qr-top{
           width: 100%;
           height: 323*@s;
        //    background-image: url(../../assets/img/payOrderbg.png);
        //    background-size: 100% 100%;
           background: #46BDAE;

        .item{
            z-index: 100;
            flex: 1;text-align: center;
            margin-top:86*@s;
            .imgbg{
               width: 400*@s;
               height: 400*@s;
               margin: 0 auto;
               background: #fff;
               border-radius:15*@s;
               box-shadow: 0px 2.5px 2.5px rgb(192, 192, 192);
            img{
                margin-top: 30*@s;
                width: 340*@s;
            }
          }
            p{
                font-size: 28*@s;
                margin-top: 20*@s;
            }
        }
       }
    }
    .qr-bottom{
        width: 100%;
        height: 360*@s;
        background:#FFFFFF ;
        .changeColor{
            color: pink;
        }
        .btn{
          font-size:28*@s;
          width: 290*@s;
          height: 70*@s;
          border-radius:12*@s;
          line-height: 12*@s;
          color: #686868;

        }

        .left{
          position: absolute;
          top: 560*@s;
          left: 100*@s;
          margin-left: -45*@s;
          color: #FF90B0;
          border: 1px solid #FF90B0;
        }
        .right{
          position: absolute;
          top:560*@s;
          left: 400*@s;
          margin-left: 5*@s;
          border: 1px solid #ddd;
        }
    }
    .order{
        margin-top: 10*@s;
        background: #fff;
        font-size: 28*@s;
        font-weight: 500;
        padding: 0 40*@s;
        .title{
            line-height: 76*@s;
            font-size: 30*@s;
            border-bottom: 1px solid #F4F4F4;
            img{
                width: 38*@s;
                margin: 20*@s 20*@s 0 0;
            }
        }
        .item{
            line-height: 66*@s;
            border-bottom: 1px solid #F4F4F4;
        }
    }
    .tip{
        padding: 0 40*@s;
        margin-top: 10*@s;
        background: #fff;
        font-size: 28*@s;
        .title{
            height: 66*@s;
            border-bottom: 1px solid #F4F4F4;
            display: flex;
            align-items: center;
            justify-content: center;
            p{
               width: 26*@s;
               height: 4*@s;
               background: #000;
            }
            span{
                font-size: 28*@s;
                margin: 0 24*@s;
            }
        }
        .cont{
            padding: 20*@s 0;
            .p-left{
                margin-left: 45*@s;
            }
        }
    }
}
</style>
