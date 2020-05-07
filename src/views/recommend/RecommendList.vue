<template>
    <div class="agentlist">
        <!-- <van-tabs v-model="active" @click="tabNav" sticky>
            <van-tab title="已分发"></van-tab>
            <van-tab title="未分发"></van-tab>
        </van-tabs> -->
        <div class="agentlist-top flex-space">
            <p>序号</p>
            <p>姓名</p>
            <!-- <p>操作</p> -->
        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <div class="agentlist-content flex-space"  v-for="(item,index) in list" :key="index" :class="{hex: index%2 === 1}">
            <p>{{++index}}</p>
            <p>{{item.aName}}</p>
            <!-- <p :class="{'spec-color': item.macOpenedStatus !== 2}">{{item.macOpenedStatus === 2 ? '开' : '关'}}</p> -->
            <!-- <p :class="{'spec-color': item.aCode === user.aCode}">{{item.aCode !== user.aCode ? '已分发' : '未分发'}}</p> -->
            <!-- <button @click="toShareDevice(item.aCode)">分发设备</button> -->
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
            active: '未分发',
            user: JSON.parse(window.localStorage.getItem('user')),
            list: [],
            loading: false,
            finished: false,
            params: {
                // endTime: '',
                pageNum: 1,
                // aCode: -1,
                pageSize: 20
            }
        }
    },
    methods: {
        formartTime (val) {
            return val.substring(0, val.length - 2)
        },
        toShareDevice (i) {
            this.$router.push({ name: 'shareDevice', query: { aCode: i } })
        },
        onLoad () {
            app.getRecommendList(this.params).then(res => {
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
.agentlist{
    .agentlist-top{
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;

        height: 82*@s;
        color: #666;
        font-size: 29*@s;
        // background: #f3f3f3;
        // margin-bottom: 82*@s;
        border-top: 22*@s solid #f2f2f2;
        border-bottom: 22*@s solid #f2f2f2;
        p{
            width: 33%;
           color: #000;
           font-weight: 600;
           padding: 10px 15px;
        }
    }
    .van-list{
        margin-top: 122*@s;

    }
    .agentlist-content{

        // padding: 0 30*@s;
        // text-align: center;

        height: 100*@s;
        color: #666;
        font-size: 24*@s;
        p{
           width: 33%;
           padding: 10px 15px;
        }
        .spec-color{
            color: red
        }
        // border-bottom: 1px solid #f3f3f3;
        button{
            border: none;
            color: #fff;
            border-radius: 5px;
            width: 33%;
            height: 70%;
            background: rgba(110, 172, 243, 1);
            margin-right: 15px;
        }

    }
    .hex{
        background: rgba(110, 172, 243, 0.05);
    }
}
</style>
