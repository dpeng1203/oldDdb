<template>
<div id="order">
    <van-list
   v-model="loading"
   :finished="finished"
   finished-text="没有更多了"
   @load="onLoad"
   >
    <div class="order-c" v-for="item of recomendList" :key="item.orderId">
      <div class="order-color-w top">
         <img class="timetb" src="../../assets/img/time.png" alt="">
         <p class="timeYear">{{item.createTime}}</p >
         <p class="timeNow" v-if="item.oPayStatus == 2">支付成功</p>
         <p class="timeNow" v-else>支付失败</p>
      </div>
      <div class="order-color-g"></div>
      <div class="order-color-w center" >
        <img class="order-img" :src="imgsrc" alt="">
        <div class="order-content">
           <p class="order-title">{{title}}</p>
           <p class="order-price">{{item.oPayCash}}</p>
           <p class="order-quantity">数量：{{item.oCount}}</p>
        </div>
      </div>
      <div class="order-color-g"></div>
      <div class="order-color-w floot">
         <p class="orderId">订单号： {{item.orderId}}</p>
     </div>
   </div>
   </van-list>
</div>
</template>
<script>
import app from '@/api/app.js'
export default {
    data () {
        return {
            imgsrc: require('../../assets/img/orderxry.png'),
            title: '养生仪',
            recomendList: [],
            list: [],
            loading: false,
            finished: false,
            params: {
                pageNum: 1,
                pageSize: 20,
                oPayStatus: -1
            }

        }
    },

    methods: {
        times (s) {
            return s.substring(0, 10)
        },
        timesN (s) {
            return s.substring(11, 16)
        },
        getfindOrder () {
            var that = this
            app.getfindOrder(this.params).then(res => {
                var data = res.data
                that.recomendList.push(...data)
            })
        },
        onLoad () {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1)
                }
                // 加载状态结束
                this.loading = false

                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true
                }
            }, 500)
        }
    },
    mounted () {
        this.getfindOrder()
    }
}
</script>

<style lang="less" scoped>
   @s: 0.0133rem;
     #order{
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        .order-c{
          background:#fff;
          width: 100%;
          height: 400*@s;
          margin-bottom: 10px;
            .top{
               overflow: hiddle;
               z-index: 99;
               width: 100%;
               height: 80*@s;
               background: #fff;
               font-size: 35*@s;
               overflow: hidden;
               font-family:"SourceHanSansCN-Medium";
               .timetb{
                 float: left;
                 height: 33*@s;
                 width: 33*@s;
                 margin: 33*@s 0*@s 13*@s 20*@s;
               }
               .timeYear{
                  float: left;
                  font-size: 25*@s;
                  color:#333;
                  margin: 30*@s 0*@s 13*@s 20*@s;
               }
               .timeNow{
                  float: right;
                  font-size: 25*@s;
                  color:rgb(230, 18, 18);
                  margin: 30*@s 25*@s 13*@s 0*@s;
               }
            }
            .floot{
               overflow: hiddle;
               z-index: 99;
               width: 100%;
               height: 100*@s;
               background: #fff;
               font-size: 35*@s;
               font-family:"SourceHanSansCN-Medium";
               .orderId{
                  float: right;
                  color: #00a0e9;
                  font-size:28*@s;
                  margin: 30*@s 25*@s 0*@s 0*@s;
               }
            }
            .center{
               position: relative;
               overflow: hiddle;
               z-index: 99;
               width: 100%;
               height: 220*@s;
               background: #fff;
               font-size: 35*@s;
               font-family:"PingFang-SC-Medium";
               .order-img{
                  float: left;
                  width: 205*@s;
                  height: 180*@s;
                  margin-top: 15*@s;
                  margin-left: -4*@s;
               }
               .order-content{
                  float: right;
                  color:#333;
                  .order-title{
                     position:absolute;
                     top: 30*@s;
                     left:200*@s;
                  }
                  .order-quantity{
                     position:absolute;
                     top: 120*@s;
                     left:200*@s;
                     font-size: 30*@s;
                  }
                  .order-price{
                     position:absolute;
                     top: 30*@s;
                     right:24*@s;
                  }
               }
            }
            .order-color-g{
               z-index: 99;
               width: 94%;
               height: 3*@s;
               margin: 0*@s 10*@s 0*@s 10*@s;
               background: #f3f3f3;
               margin: 0 auto;
            }

       }

     }
</style>
