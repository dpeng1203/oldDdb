<template>
    <div class="devicelist">
        <!-- <van-tabs v-model="active" @click="tabNav" sticky>
            <van-tab title="已分发"></van-tab>
            <van-tab title="未分发"></van-tab>
        </van-tabs> -->
        <div class="devicelist-top flex-space">
            <p>机器编号</p>
            <p>订单数量(总)</p>
            <p>订单总额(总)</p>
            <p>是否分发</p>
        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell-group>
        <div class="devicelist-content flex-space"  v-for="(item,index) in list" :key="index" :class="{hex: index%2 === 1}">
            <p>{{item.macEntity.macId}}</p>
            <!-- <p :class="{'spec-color': item.macOpenedStatus !== 2}">{{item.macOpenedStatus === 2 ? '开' : '关'}}</p> -->
            <p>{{item.orderCount}}</p>
            <p>{{item.orderCash}}</p>
            <p :class="{'spec-color': item.aCode === user.aCode}">{{item.macEntity.aCode !== user.aCode ? '已分发' : '未分发'}}</p>
        </div>
         </van-cell-group>

        </van-list>
    </div>
</template>
<script>
import app from '@/api/app.js'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {
            active: '未分发',
            user: JSON.parse(window.localStorage.getItem('user')),
            list: [],
            loading: false,
            finished: false,
            params: {
                // endTime: '',
                pageNum: 1,
                aCode: -1,
                pageSize: 20
            }
        }
    },
    methods: {
        formartTime (val) {
            return val.substring(0, val.length - 2)
        },
        tabNav (i) {
            console.log(i)
        },
        onLoad () {
            app.getMacList(this.params).then(res => {
                console.log(JSON.parse(window.localStorage.getItem('user')))
                console.log(res)
                this.list.push(...res.data)
                // 加载状态结束
                this.loading = false
                if (res.data.length < this.params.pageSize) {
                    this.finished = true
                }
                this.params.pageNum += 1
            }).catch(err => {
            // Toast.fail(err.msg)
                console.log(err)
                if (err.resultCode === -6) {
                    localStorage.clear('agentToken')
                    Dialog.alert({
                        message: err.msg
                    }).then(() => {
                        this.$router.replace({ name: 'login' })
                    })
                } else {
                    Toast.fail(err.msg)
                    this.loading = false
                    this.finished = true
                }
            })
        }
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.devicelist{
    .devicelist-top{
        // position: fixed;
        // top: 0;
        // width: 100%;
        background: #fff;
        padding: 0 20*@s;
        text-align: right;
        height: 82*@s;
        color: #666;
        font-size: 28.5*@s;
        // background: #f3f3f3;
        // margin-bottom: 82*@s;
        border-top: 22*@s solid #f2f2f2;
        border-bottom: 22*@s solid #f2f2f2;
        p{
           text-align: center;
           width: 33%;
           color: #000;
           font-weight: 550;
        }
        p:nth-child(1){
            text-align: center;
        }
    }
    .devicelist-content{

        padding: 0 30*@s;
        text-align: center;
        height: 100*@s;
        color: #666;
        font-size: 24*@s;
        p{
           width: 33%;
        }
        .spec-color{
            color: red
        }
        // border-bottom: 1px solid #f3f3f3;

    }
    .hex{
        background: rgba(192,224,241);
    }
}
</style>
