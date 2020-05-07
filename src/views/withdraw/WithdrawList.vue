<template>
    <div class="withdrawlist">
        <div class="withdrawlist-top flex-space">
            <p>时间</p>
            <p>金额</p>
            <p>状态</p>
        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <div class="withdrawlist-content flex-space"  v-for="(item,index) in list" :key="index" :class="{hex: index%2 === 1}">
            <p>{{formartTime(item.createTime)}}</p>
            <p>{{item.tcSum}}</p>
            <p>{{item.tcStatus === 1 ? '成功' : item.tcStatus === 2? '失败':'提现中'}}</p>
        </div>
        </van-list>
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
            params: {
                tCode: '',
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
        onLoad () {
            app.getTakeList(this.params).then(res => {
                console.log(res)
                this.list.push(...res)
                // 加载状态结束
                this.loading = false
                if (res.length < this.params.pageSize) {
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
.withdrawlist{
    .withdrawlist-top{
        padding: 0 50*@s;
        text-align: right;
        height: 82*@s;
        color: #666;
        font-size: 29*@s;
        background: #f3f3f3;
        p{
           text-align: right;
           width: 33%;
        }
        p:nth-child(1){
            text-align: center;
        }
    }
    .withdrawlist-content{
        padding: 0 30*@s;
        text-align: right;
        height: 100*@s;
        color: #666;
        font-size: 24*@s;
        p{
        //    width: 33%;
        }
        // border-bottom: 1px solid #f3f3f3;

    }
    .hex{
        background: rgba(62,148,244,.05);
    }
}
</style>
