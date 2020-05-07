<template>
  <div class="home">
        <div class="home-top">
          <div class="t-top">
            <img class="profilePicture" src="./../assets/img/logo_1.png" alt="">
            <div class="info">
              <p class="minM vipId">会员ID： {{member.aCode}}</p>
              <p class="minM vipName">会员名： {{member.aName}}-{{role}}</p>
            </div>
          </div>
          <div class="p-top">
            <div class="left">
              <p class="top-tubiaowz center" >提现</p>
              <img class="top-tubiao" src="./../assets/img/home_cash.png" @click="turnTo('withdraw')" alt="">
              
            </div>
            <div class="right">
              <router-link is-link to="withdrawMybenefits">
                <div>
                  <p class="top-tubiaowz right" >我的收益</p>
                  <img class="top-tubiao" src="./../assets/img/home_myMoney.png" alt="">
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <!-- <van-row type="flex" justify="space-around" class="b-top">
          <van-col span="6">
            <div>
              <img class="top-tubiao" src="./../assets/img/yue.png" alt="">
              <p class="top-tubiaowz left" >我的余额</p>
            </div>
          </van-col>
          <van-col span="6">
            <div>
             
            </div>
            </van-col>

          <van-col span="6">
            
          </van-col>
        </van-row> -->

        <div class="home-bottom">
          <div class="tubiaodiv" v-for="(item, index) in fileMsgListCom"
          :title="item.title"
          :key="index"
          >

           <router-link is-link :to="item.to" >
            <div class="home-bottom-imgdiv" >
               <transition name="fade">
             <img class="home-bottom-img" :src="item.imgSrc" alt="">
              </transition>
            </div>
           </router-link>

            <p class="home-bottom-desc">{{item.title}}</p>
          </div>
        </div>

      <!-- <div class="home-logout">
            <van-button type="danger" size="large" @click="logout">退出</van-button>
        </div> -->
    </div>
</template>

<script>
import { fetchPost } from '@utils/axios'
import { Toast, Dialog } from 'vant'

import deviceIcon from './../assets/img/home_cont_1.png'
import agentIcon from './../assets/img/home_cont_3.png'
import stats from './../assets/img/home_cont_5.png'
import qrIcon from './../assets/img/home_cont_10.png'
import agentUpIcon from './../assets/img/home_cont_8.png'
import recommendIcon from './../assets/img/home_cont_2.png'
import shop from './../assets/img/home_cont_4.png'
import promIcon from './../assets/img/home_cont_11.png'
import order from './../assets/img/home_cont_6.png'
import macPriceIcon from './../assets/img/home_cont_7.png'
import setting from './../assets/img/home_cont_9.png'
import rechargeMoney from './../assets/img/home_cont_12.png'

export default {
    name: 'home',
    data () {
        return {
            list: [],
            memberInfo: '',
            member: '',
            code: this.code
        }
    },
    computed: {
        menuList () {
            return [
                { imgSrc: deviceIcon, title: '我的设备', to: { name: 'device' }, show: this.isInArray([1, 2, 3, 4,5], this.member.aType) },
                { imgSrc: qrIcon, title: '我的二维码', to: { name: 'qrcode' }, show: this.isInArray([1, 2, 3, 4], this.member.aType) },
                { imgSrc: agentIcon, title: '我的代理', to: { name: 'agent' }, show: this.isInArray([1, 2, 3,4], this.member.aType) },
                { imgSrc: recommendIcon, title: '我的推荐', to: { name: 'recommendList' }, show: this.isInArray([1, 2, 3, 4,5], this.member.aType) },
                { imgSrc: stats, title: '申领设备', to: { name: 'buy' }, show: this.isInArray([1, 2, 3, 4,5], this.member.aType) },
                { imgSrc: shop, title: '报表查询', to: { name: 'statsAgent' }, show: this.isInArray([1, 2, 3, 4,5], this.member.aType) },
                { imgSrc: order, title: '订单查询', to: { name: 'orderQuery' }, show: this.isInArray([1, 2, 3, 4,5], this.member.aType) },
                { imgSrc: macPriceIcon, title: '设备价格', to: { name: 'devicePrice' }, show: this.isInArray([5], this.member.aType) },
                { imgSrc: agentUpIcon, title: '升级运营', to: { name: 'agentUp' }, show: this.isInArray([5], this.member.aType) },
                { imgSrc: promIcon, title: '授权码', to: { name: 'sendProm' }, show: this.isInArray([1], this.member.aType) },
                { imgSrc: rechargeMoney, title: '充值', to: { name: 'recharge' }, show: this.isInArray([1], this.member.roleType) },
                { imgSrc: setting, title: '设置', to: { name: 'setting' }, show: this.isInArray([1, 2, 3, 4,5], this.member.aType) }
            ]
        },
        fileMsgListCom() {
          return this.menuList.filter(item => {
            return item.show;
          });
        },
        role () {
            let type = this.member.aType
            let text
            if (type === 1) {
                text = '总部'
            } else if (type === 2) {
                text = ' 特许经营商' // '市代'
            } else if (type === 3) {
                text = '全国运营商' // '区代'
            } else if (type === 4) {
                text = '联合运营商' // '商户'
            } else if (type === 5) {
                text = '商家' // '商户'
            }
            return text
        }
    },
    methods: {
        turnTo (routerName) {
            this.$router.push({ name: routerName })
        },
        logout () {
            localStorage.clear('agentToken')
            this.$router.replace({ name: 'login' })
        },
        // 根据atype判断菜单权限
        isInArray (arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (value === arr[i]) {
                    return true
                }
            }
            return false
        },
        //授权
        accredit() {
          let url = window.location.href.split('#')[0]
          fetchPost('/zqxry/agentAuthorization', {url}).then(res => {
            console.log(res)
              window.location.href = res
          })
        },
    },
    // beforeRouteEnter (to, from, next) {
    //     // console.log(from)
    //     let url = window.location.href.split('#')[0]
    //     let code
    //     if(url.indexOf('?code') > -1) {
    //       let search = url.split('?')[1]
    //       code = search.split('&')[0]
    //       code = code.split('=')[1]
    //     }else{
    //       // this.accredit()
    //       // let url = window.location.href
    //       // this.$api.wx.memberAuthorization({url}).then(res => {
    //       //   if(res.resultCode === 1) {
    //       //     window.location.href = res.data
    //       //   }
    //       // })
    //       fetchPost('/zqxry/agentAuthorization', {url}).then(res => {
    //         console.log(res)
    //         if(res.resultCode === 1) {
    //             window.location.href = res.data
    //         }
    //         // console.log(res)
    //         // next(vm => {
    //         //     vm.memberInfo = res
    //         //     vm.member = res.member
    //         //     window.localStorage.user = JSON.stringify(res.member)
    //         // })
    //       })
    //     }
    //     let params = {
    //         opType: 201,
    //         xry_token_id: window.localStorage.agentToken,
    //         code: code
    //     }
    //     fetchPost('/zqxry/bizqry/service', params).then(res => {
    //         // console.log(res)
    //         next(vm => {
    //             vm.memberInfo = res
    //             vm.member = res.member
    //             window.localStorage.user = JSON.stringify(res.member)
    //         })
    //     }).catch(err => {
    //         // Toast.fail(err.msg)
    //         if (err.resultCode === -6) {
    //             localStorage.clear('agentToken')
    //             Dialog.alert({
    //                 message: err.msg
    //             }).then(() => {
    //                 next({ name: 'login' })
    //             })
    //         } else {
    //             Toast.fail(err.msg)
    //         }
    //     })
    // },
    mounted() {
      let url = window.location.href.split('#')[0]
        let code
        if(url.indexOf('code') > -1) {
          let search = url.split('?')[1]
          let keyVal = search.split('#')[0]
          let arr = keyVal.split('&')
          arr.forEach(ele => {
            if(ele.indexOf('code') > -1) {
              code = ele.split('=')[1]
            }
          })
        }else{
          this.accredit()
        }
        let params = {
            opType: 201,
            xry_token_id: window.localStorage.agentToken,
            code: code
        }
        fetchPost('/zqxry/bizqry/service', params).then(res => {
            // console.log(res)
            this.memberInfo = res
            this.member = res.member
            window.localStorage.user = JSON.stringify(res.member)
        }).catch(err => {
            // Toast.fail(err.msg)
            if (err.resultCode === -6) {
                localStorage.clear('agentToken')
                Dialog.alert({
                    message: err.msg
                }).then(() => {
                  this.$router.push({ name: 'login' })
                    // next({ name: 'login' })
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
.home{
  // min-height: 100%;
  // padding-bottom: 120*@s;
  // box-sizing: border-box;
  background: #f2f2f2;
  // overflow-x:hidden;
  .home-top{
    .t-top{
      overflow: hidden;
      width: 100%;
      height: 300*@s;
      background-image: url(../assets/img/home.png);
      background-size: 100% 100%;
      
      // text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .profilePicture{
        width: 140*@s;
        height: 140*@s;
        // margin: 68*@s 0*@s 0*@s 22*@s;
        margin-right: 20*@s;
        // border-radius: 50%;
      }
      .minM{
        color: #FFFFFF;
        font-size: 24*@s;
        font-family:"PingFang-SC-Regular";
      }
      // .vipId{
      //   position: absolute;
      //   top: 102*@s;
      //   left:200*@s
      // }
      // .vipName{
      //   position: absolute;
      //   top: 150*@s;
      //   left: 200*@s
      // }
    }
    .p-top{
      display: flex;
      align-items: center;
      padding: 50*@s 0 40*@s;
      background: #fff;
      box-sizing: border-box;
      width: 700*@s;
      border-radius: 20*@s;
      margin: 0 auto;
      margin-top: -30*@s;
      .left, .right{
        flex: 1;
        text-align: center;
        font-size: 28*@s;
        color: #000;
        img{
          width: 60*@s;
          margin-top: 20*@s;
        }
      }
      .left{
        border-right: 2px solid #3FC7C7;
      }
    }
    // .b-top{
    //   position: relative;
    //   width: 100%;
    //   height: 95*@s;
    //   // margin: 40*@s 0*@s 0*@s 60*@s;
    //   border: 1px solid red;
    //   .top-tubiao{
    //     // margin-top: -30*@s;
    //     width: 54*@s;
    //     height: 54*@s;
    //   }
    //   .top-tubiaowz{
    //     color: #000000;
    //     font-size: 24*@s;
    //     font-family:"PingFang-SC-Medium";
    //   }
    //   // .left{
    //   //   position: absolute;
    //   //   top: 80*@s;
    //   //   left: 15*@s;
    //   // }
    //   .center{
    //     position: absolute;
    //     top: 45*@s;
    //     left: 100*@s;
    //   }
    //   .right{
    //     position: absolute;
    //     top:45*@s;
    //     right: 205*@s;
    //   }
    //  }
  }
  .home-bottom{
    margin-top: 64*@s;
    width: 100%;
    background: #fff;
    // overflow: hidden;
    padding: 70*@s 0 10*@s;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    .tubiaodiv{
      // float: left;
      width: 33%;
      text-align: center;
      margin-bottom: 60*@s;
      font-size: 28*@s;
      .home-bottom-img{
        width: 91*@s;
        margin-bottom: 20*@s;
      }
    }
  }

}
    //  .home-logout{
    //    overflow: hidden;
    //     margin-top: 10*@s;
    //     position:fixed;
    //     bottom: 0;
    //     left: 0;
    //     width: 100%;
    // }

::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;

}

.fade-enter-active{

  transition: opacity 20s;
}
.fade-enter {
  opacity: 0;
}


</style>
