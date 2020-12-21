<template>
    <div class="home">
       <div class="home-top">
           <div class="top">
                <p>{{sumAmount}}</p>
                <p>总计收益（元）</p>
        </div>
       </div>
       <div class="p-top">
            <div class="left">
               <p>康美仪收益</p>
                <p class="income-money">{{kmSumAmount}}<span> 元</span></p>
              
            </div>
            <div class="right">
              <p>养生仪收益</p>
                <p class="income-money">{{ysSumAmount}}<span> 元</span></p>
            </div>
          </div>

      <!-- <div class="flex-space income">
            <div class="left-border">
                <p>昨日收益</p>
                <p class="income-money">{{memberInfo.lastDayAmount? memberInfo.lastDayAmount : 0}}<span>元</span></p>
            </div>
            <div>
                <p>本月收益</p>
                <p class="income-money">{{memberInfo.lastMonthAmount? memberInfo.lastMonthAmount : 0}}<span>元</span></p>
            </div>
        </div> -->
       <van-button class="benefitsBtn" type="primary" size="large" @click="turnTo('kmyBonusList')">康美仪收益明细</van-button>
       <van-button class="benefitsBtn benefitsBtn2" type="primary" size="large" @click="turnTo('bonusList')">养生仪收益明细</van-button>
    </div>
</template>

<script>
import { fetchPost } from '@utils/axios'
import { Toast, Dialog } from 'vant'
export default {
    name: 'withdrawMybenefits',
    data () {
        return {
            memberInfo: '',
            member: '',
            kmSumAmount: 0,
            ysSumAmount: 0,
            sumAmount: 0
        }
    },
    methods: {
        turnTo (routerName) {
            this.$router.push({ name: routerName })
        }
    },
    beforeRouteEnter (to, from, next) {
        // console.log(from)
        let params = {
            opType: 201,
            xry_token_id: window.localStorage.agentToken

        }
        fetchPost('/zqxry/bizqry/service', params).then(res => {
            // console.log(res)
            next(vm => {
                vm.memberInfo = res
                vm.kmSumAmount = res.km.sumAmount || 0
                vm.ysSumAmount = res.ys.sumAmount || 0
                vm.sumAmount = vm.kmSumAmount +  vm.ysSumAmount
                vm.member = res.member
                window.localStorage.user = JSON.stringify(res.member)
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
.home{
  position: relative;
  min-height: 100%;
  padding-bottom: 120*@s;
  box-sizing: border-box;
  background: #f2f2f2;
.home-top{
      width: 100%;
      height: 300*@s;
      background-image: url(../../assets/img/home.png);
      background-size: 100% 100%;
      .top{
          color: #FFFFFF;
          padding-top: 80*@s;
        p:nth-child(1){
            font-family: "PingFang-SC-Medium";
            line-height:100*@s;
            font-size: 50*@s;
            font-weight: bold;
            text-align: center
        }
        p:nth-child(2){
            font-family: "PingFang-SC-Regular";
            // line-height:0*@s;
            font-size: 30*@s;
            text-align: center
        }
    }
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
        p{
            margin-bottom: 10*@s;
            
            span{
                color:gray;
                font-size: 30*@s;
                color:rgba(0,0,0,0.5);
            }
        }
        .income-money{
            font-weight: bold;
            font-size: 40*@s;
            color:#F66161;
        }
        img{
            width: 60*@s;
            margin-top: 20*@s;
        }
    }
    .left{
        border-right: 2px solid #3FC7C7;
    }
}
.benefitsBtn{
  display: block;
  position: absolute;
  top: 600*@s;
  left: 15.55*@s;
  width: 95%;
  height: 100*@s;;
  background: #46BDAE;
  border-radius:90*@s;
  border: #FFFFFF;
}
.benefitsBtn2{
    top: 750*@s;
}
.income{
        text-align: center;
        // background: #fff;
        padding: 10px 0;
        font-size: 30*@s;
        margin: -10*@s 110*@s 0*@s 110*@s;
        color:rgba(85,85,85,0.9);
       .income-money{
          font-weight:lighter;
          font-size: 40*@s;
          color:rgba(255,133,144,1);
       }
       span{
         color:gray;
         font-size: 30*@s;
         color:rgba(0,0,0,0.5);
       }
       .left-border{
           padding-right: 120*@s;
           border-right: 1*@s  rgba(238, 238, 238, 1) solid;
       }
  }

}

</style>
