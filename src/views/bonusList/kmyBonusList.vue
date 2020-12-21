<template>
    <div class="bonuslist">
        <div class="bonuslist-top">
            <div class="flex-center search-time">
                <div class="search-content" style="margin-right:20px">
                    <input type="text" v-model="params.startTime" placeholder="请选择开始时间" readonly @click="showStart=true">
                </div>
                <van-icon name="notes-o" size=".8rem"/>
                <div class="search-content" style="margin-left:20px">
                    <input type="text" v-model="params.endTime" placeholder="请选择结束时间" readonly @click="showEnd=true">
                </div>
            </div>
            <div class="flex-center search-text" style="margin-top:10px">
                <div class="search-text-content">
                    <input type="text" v-model="params.macId" placeholder="请输入设备编号">
                </div>
                <button @click="search">搜索</button>
            </div>
            <div class="money-text" style="">
                <p>收益总计：{{totalMoney}}元</p>
            </div>
        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
         <van-cell-group>
        <div class="bonuslist-content flex-space"  v-for="(item,index) in list" :key="index" :class="{hex: index%2 === 1}">
            <div>
                <p>{{item.bounsTypeName}}</p>
                <p>{{formartTime(item.createTime)}}</p>
            </div>
            <div style="text-align:right">
                <p class="bonus-money">{{item.bBonus}}</p>
                <p>{{item.bType === 0 ? '服务消费' : item.tStatus === 1? '出售机器':'未知'}}</p>
            </div>

        </div>
         </van-cell-group>
        </van-list>

        <van-popup v-model="showStart" position="bottom ">
            <van-datetime-picker
                v-model="startTimePick"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="getTime('start', arguments[0])"
                @cancel="showStart=false"
            />
        </van-popup>
        <van-popup v-model="showEnd" position="bottom ">
            <van-datetime-picker
                v-model="endTimePick"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="getTime('end', arguments[0])"
                @cancel="showEnd=false"
            />
        </van-popup>
    </div>
</template>
<script>
import app from '@/api/app.js'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            maxDate: new Date(),
            minDate: new Date(2019, 5, 1),
            showEnd: false,
            showStart: false,
            startTimePick: new Date(),
            endTimePick: new Date(),
            params: {
                pageNum: 1,
                pageSize: 10,
                opType: 204,
                macId: '',
                startTime: '',
                endTime: ''
            },
            totalMoney: 0
        }
    },
    methods: {
        formartTime (val) {
            return val.substring(0, val.length - 2)
        },
        formart (val) {
            if (val >= 10) return val
            else return '0' + val
        },
        getTime (type, time) {
            console.log(type)
            console.log(time.getFullYear() + '-' + this.formart((time.getMonth() + 1)) + '-' + this.formart(time.getDate()))
            this.params[type + 'Time'] = time.getFullYear() + '-' + this.formart((time.getMonth() + 1)) + '-' + this.formart(time.getDate())
            // if (this.params.startTime > this.params.endTime) {
            //     Toast.fail('开始时间不能大于结束时间')
            // } else {
            this.showEnd = false
            this.showStart = false
            // this.list = []
            // this.params.pageNum = 1
            // this.getBonusList()
            // }
        },
        onLoad () {
            this.getBonusList()
        },
        getBonusList () {
            app.getKmyBonusList(this.params).then(res => {
                console.log(res)
                res.data.forEach(element => {
                    if(element.bBonus > 100) {
                        element.bounsTypeName = '辅机补贴'
                    }else{
                        element.bounsTypeName = `收益补贴 (机器编号：${element.macId})`
                    }
                });
                this.list.push(...res.data)
                console.log(this.params)
                app.getKmyBonusMoneySum(this.params).then(rest => {
                    console.log(rest)
                    this.totalMoney = typeof rest === 'number' ? rest : 0
                })
                // 加载状态结束
                this.loading = false
                if (res.data.length < this.params.pageSize) {
                    this.finished = true
                }
                this.params.pageNum += 1
            }).catch(err => {
            // Toast.fail(err.msg)
                // if (err.resultCode === -6) {
                //     localStorage.clear('agentToken')
                //     Dialog.alert({
                //         message: err.msg
                //     }).then(() => {
                //         this.$router.replace({ name: 'login' })
                //     })
                // } else {
                Toast.fail(err.msg)
                this.loading = false
                this.finished = true
                // }
            })
        },
        search () {
            this.list = []
            this.params.pageNum = 1
            this.loading = true
            this.finished = false
            this.getBonusList()
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            const end = new Date()
            vm.params.endTime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
            end.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
            vm.params.startTime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        })
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.bonuslist{
    .bonuslist-top{
        padding: 20*@s 0;
        text-align: right;
        // height: 82*@s;
        color: #666;
        font-size: 29*@s;
        // border: 4px solid #f2f2f2;
        div{

            // padding: 10*@s;
            // border-radius: 5px;

            input{
                // height: 47*@s;
                border: 1px solid #ccc;
                // border: none;
                color: #969799;
                line-height: 47*@s;
                width: 100%;
                text-align: center;
                border-radius: 5*@s;
            }
        }
        .search-content{
            width: 70%;

        }
        .search-time{
            padding:20*@s 12% 5*@s;
            border: 0;
        }
        .search-text{
            border: 0;
            border-top: 1px  solid #e6e6e6;
            border-bottom: 1px  solid #e6e6e6;
            padding: 10*@s 5%;
            background: #fafafa;

            &-content{
                width: 70%;
                margin-right: 5*@s;
                border-radius: 5px;
                box-sizing: border-box;
                input{
                    // height: 50*@s;
                    // line-height: 50*@s;
                    text-align: left;
                    padding: 5*@s 20*@s;
                    border-radius: 5*@s;
                    box-sizing: border-box;
                }
            }

        }
        button{
                height: 61*@s;
                color: #fff;
                border: none;
                background: #46BDAE;
                border-radius: 5px;
                width: 20%;
                margin-left: 5*@s;
            }
        .money-text{
            padding: 0 30*@s;
            border: 0;
            border-bottom: 1px  solid #e6e6e6;
            height: 46*@s;
            font-size: 24*@s;
            color: #808080;
            text-align: right;
            line-height: 46*@s;
        }

    }
    .bonuslist-content{
        padding: 0 30*@s;
        text-align: right;
        height: 100*@s;
        color: #666;
        font-size: 24*@s;
        div{
           width: 60%;
           text-align: left;
           p{
               padding:5px;
           }
        }
        .bonus-money{
        //    width: 30%;
            color: #46BDAE;
        }
        // border-bottom: 1px solid #f3f3f3;

    }
    .hex{
        background: rgba(62,148,244,.05);
    }
}
</style>
