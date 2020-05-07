<template>
    <div class="agent">
        <div class="time">
            <van-cell-group @click="handStart">
                <van-field v-model="start" placeholder="开始时间" readonly input-align="center" />
            </van-cell-group>
            <span>至</span>
            <van-cell-group @click="handEnd">
                <van-field v-model="end" placeholder="结束时间" readonly input-align="center"/>
            </van-cell-group>
            <van-icon name="close" size=".5rem" @click="start = '',end = ''"/>
            <span @click="getStatsAgentDetail">查询</span>
        </div>
        <div class="list">
            <div class="item title">
                <div class="name">代理商名称</div>
                <div class="name">订单量</div>
                <div class="name">交易金额</div>
                <div class="name"></div>
            </div>
            <div class="item" v-for="item in list" :key="item.aCode">
                <div class="name">{{item.a_name}}</div>
                <div class="name">{{item.a_count}}</div>
                <div class="name">{{item.pc_sum}}</div>
                <div class="name" @click="checkAgent(item)">查看下级</div>
            </div>
            <div class="foot" v-show="showTip">暂无数据</div>
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
    </div>
</template>

<script>
import { Field, DatetimePicker, Popup, Toast, Icon } from 'vant'
import api from '@api/app'
export default {
    data () {
        return {
            active: 1,
            start: '',
            end: '',
            show: false,
            currentDate: new Date(),
            maxDate: new Date(),
            list: [],
            showTip: false,
            data: {
                aCode: '',
                start: '',
                end: ''
            }
        }
    },
    methods: {
        handStart () {
            this.active = 1,
            this.show = true
        },
        handEnd () {
            this.active = 2,
            this.show = true
        },
        checkAgent (item) {
            if (item.a_type >= 4) {
                Toast('无下一级')
                return
            }
            this.data.aCode = item.a_code
            this.getStatsAgentDetail()
        },
        confirm (value) {
            if (this.active == 1) {
                this.start = this.getFormatDate(value)
            } else if (this.active == 2) {
                this.end = this.getFormatDate(value)
            }
            this.show = false
        },
        checkOrder () {
            this.$router.push('/statsDetail')
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
                this.list = res
                if (res.length == 0) {
                    this.showTip = true
                    console.log(this.showTip)
                }else {
                    this.list.forEach(ele => {
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
        text-align: center;
        span{
            flex-shrink: 0;
            margin: 0 20*@s;
        }
    }
    .list{
        margin-top: 20*@s;
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
        }
        .title{
            font-size: 30*@s;
            font-weight: bold;
        }
        .foot{
            text-align: center;
            color: #ccc;
            line-height: 88*@s;
        }
    }
}
</style>
