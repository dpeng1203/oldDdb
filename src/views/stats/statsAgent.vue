<template>
    <div class="agent">
        <div class="time">
            <input type="text" v-model="start" placeholder="开始时间" readonly @click="handStart">
            <img src="../../assets/img/rili.png" alt="">
            <input type="text" v-model="end" placeholder="结束时间" readonly @click="handEnd">
            <span @click="check">查询</span>
        </div>
        <div class="tabs">
            <div :class="{active: active == 0}" @click="active = 0">查看代理</div>
            <div :class="{active: active == 1}" @click="active = 1">查看订单</div>
        </div>
        <div class="list" v-if="active == 0">
            <div class="item title">
                <div class="name">代理商名称</div>
                <div class="name">机器台数</div>
                <div class="name" >下级代理</div>
            </div>
            <div class="item" v-for="item in list" :key="item.aCode">
                <div class="name">{{item.a_name}}</div>
                <div class="name">{{item.a_count}}</div>
                <div class="name next" @click="checkAgent(item)">查看下级</div>
            </div>
            <div class="foot" v-show="showTip1">暂无数据</div>
        </div>
        <div class="list" v-if="active == 1">
            <div class="item title">
                <div class="name">代理商名称</div>
                <div class="name">订单量</div>
                <div class="name">交易金额</div>
                <div class="name">下级代理</div>
            </div>
            <div class="item" v-for="item in orderList" :key="item.aCode">
                <div class="name">{{item.a_name}}</div>
                <div class="name">{{item.a_count}}</div>
                <div class="name">{{item.pc_sum}}</div>
                <div class="name next" @click="checkAgent(item)">查看下级</div>
            </div>
            <div class="foot" v-show="showTip2">暂无数据</div>
        </div>
        <van-popup v-model="show" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @cancel="show = false"
                @confirm="confirm"
                :max-date="maxDate"
            />
        </van-popup>
        <van-popup v-model="showEnd" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @cancel="showEnd = false"
                @confirm="confirmEnd"
                :max-date="maxDate"
                :min-date="minDate"
            />
        </van-popup>
    </div>
</template>

<script>
import { DatetimePicker, Popup, Toast } from 'vant'
import api from '@api/app'
export default {
    data () {
        return {
            active: 0,
            start: '',
            end: '',
            show: false,
            showEnd: false,
            currentDate: new Date(),
            maxDate: new Date(),
            minDate: '',
            list: [],
            orderList: [],
            showTip1: false,
            showTip2: false,
            data: {
                aCode: '',
                start: '',
                end: ''
            }
        }
    },
    methods: {
        handStart () {
            this.show = true
        },
        handEnd () {
            this.showEnd = true
        },
        checkAgent (item) {
            if (item.a_type >= 4) {
                Toast('无下一级')
                return
            }
            this.data.aCode = item.a_code
            if (this.active == 0) {
                this.getStatsAgentList()
            }else {
                this.getStatsAgentDetail()
            }
        },
        confirm (value) {
            this.minDate = value
            this.start = this.getFormatDate(value)
            this.show = false
        },
        confirmEnd (value) {
            this.end = this.getFormatDate(value)
            this.showEnd = false
        },
        getFormatDate (date) {
            var seperator1 = '-';
            var seperator2 = ':';
            var month = date.getMonth() + 1
            var strDate = date.getDate()
            if (month >= 1 && month <= 9) {
                month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate

            return currentdate

        },
        check () {
            if (this.active == 0) {
                this.getStatsAgentList()
            } else if (this.active == 1) {
                this.getStatsAgentDetail()
            }
        },
        getStatsAgentList () {
            if (!this.start) {
                Toast('请选择开始时间')
                return
            }
            if (!this.end) {
                Toast('请选择结束时间')
                return
            }
            this.data.start = this.start + ' ' + '00:00:00'
            this.data.end = this.end + ' ' + '23:59:59'
            api.statsAgentList(this.data).then(res => {
                console.log(res)
                this.list = res
                if (res.length == 0) {
                    this.showTip1 = true
                    console.log(this.showTip)
                }else {
                    this.showTip1 = false
                }
            })
        },
        getStatsAgentDetail () {
            if (!this.start) {
                Toast('请选择开始时间')
                return
            }
            if (!this.end) {
                Toast('请选择结束时间')
                return
            }
            this.data.start = this.start + ' ' + '00:00:00'
            this.data.end = this.end + ' ' + '23:59:59'
            api.statsAgentDetail(this.data).then(res => {
                console.log(res)
                this.orderList = res
                if (res.length == 0) {
                    this.showTip2 = true
                    console.log(this.showTip)
                } else{
                    this.showTip2 = false
                    this.orderList.forEach(ele => {
                        ele.pc_sum = Number(ele.pc_sum).toFixed(2)
                    })
                }
            })
        }
    },
    mounted () {
        this.data.aCode = JSON.parse(localStorage.user).aCode

    }
}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.agent{
    font-size: 28*@s;
    min-height: calc(100vh);
    background: #f2f2f2;
    .time{
        display: flex;
        background: #fff;
        align-items: center;
        padding: 20*@s;
        img{
            flex-shrink: 0;
            margin: 0 20*@s;
            width: 36*@s;
        }
        input{
            border: 1px solid #ccc;
            text-align: center;
            width: 200*@s;
            flex: 1;
            line-height: 1;
            padding: 8*@s 0;
        }
        span{
            font-size: 28*@s;
            width: 114*@s;
            line-height: 54*@s;
            background: #46BDAE;
            text-align: center;
            color: #fff;
            margin-left: 20*@s;
            flex-shrink: 0;
        }
    }
    .tabs{
        font-size: 32*@s;
        font-weight: 500;
        display: flex;
        align-items: center;
        background: #fff;
        margin-top: 10*@s;
        div{
            flex: 1;
            text-align: center;
            border-bottom: 4*@s solid #fff;
            padding: 11*@s 0;
        }
        .active{
            border-bottom: 4*@s solid #46BDAE;
        }
    }
    .list{
        margin-top: 10*@s;
        background: #fff;
        font-size: 28*@s;
        padding: 0 20*@s;
        .item{
            display: flex;
            align-items: center;
            height: 80*@s;
            border-bottom: 1px solid #f2f2f2;
            .name{
                flex: 1;
                text-align: center;
            }
            .next{
                color: #00A0E9;
            }
        }
        .title{
            font-size: 28*@s;
            font-weight: 500;
        }
        .foot{
            text-align: center;
            color: #ccc;
            line-height: 88*@s;
        }
    }
}
</style>
