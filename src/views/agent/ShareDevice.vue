<template>
    <div class="devicelist1">
        <!-- <van-tabs v-model="active" @click="tabNav" sticky>
            <van-tab title="已分发"></van-tab>
            <van-tab title="未分发"></van-tab>
        </van-tabs> -->
        <div class="devicelist-top flex-space">

            <p>机器编号</p>
            <!-- <p>选择</p> -->
            <van-checkbox v-model="checked" @click="chooseAll"></van-checkbox>
        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <!-- <div class="devicelist-content flex-space"  v-for="(item,index) in list" :key="index" :class="{hex: index%2 === 1}">
            <p>{{item.macId}}</p>
            <p :class="{'spec-color': item.macOpenedStatus !== 2}">{{item.macOpenedStatus === 2 ? '开' : '关'}}</p>
            <p :class="{'spec-color': item.aCode === user.aCode}">{{item.aCode !== user.aCode ? '已分发' : '未分发'}}</p>
        </div> -->
        <van-checkbox-group v-model="result" @change="change">
            <van-cell-group>
                <van-cell
                v-for="(item, index) in list"
                :key="index"
                :title="`设备${item.macEntity.macId}`"
                @click="toggle(item.macEntity.macId)"
                :class="{hex: index%2 === 1}"
                >
                <van-checkbox
                    :name="item.macEntity.macId"
                    ref="checkboxes"
                    slot="right-icon"
                />
                </van-cell>
            </van-cell-group>
            </van-checkbox-group>
        </van-list>
        <div class="share-bottom">
            <van-button type="primary" size="large" @click="toShare" class="btn">确定分发</van-button>
        </div>
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
                aCode: JSON.parse(window.localStorage.getItem('user')).aCode,
                pageSize: 20
            },
            result: [],
            checked: false
        }
    },
    methods: {
        chooseAll () {
            console.log(this.checked)
            if (!this.checked) {
                this.result = this.list.map((item, idx) => {
                    return item.macEntity.macId
                })
            } else {
                this.result = []
            }
        },
        change (val) {
            // console.log(this.result)
            if (this.result.length === this.list.length) {
                this.checked = true
            } else {
                this.checked = false
            }

            // console.log(val)
        },
        toggle (index) {
            // this.$refs.checkboxes[index].toggle()
            // console.log(this.result)

            // console.log(index)
        },
        formartTime (val) {
            return val.substring(0, val.length - 2)
        },
        tabNav (i) {
            console.log(i)
        },
        onLoad () {
            app.getMacList(this.params).then(res => {
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
        },
        toShare () {
            let param = {
                aCode: this.$route.query.aCode,
                macIdStr: this.result.join()
            }
            console.log(param)
            app.updateMacListAgent(param).then(res => {
                Dialog.alert({
                    message: '操作成功'
                }).then(() => {
                    this.$router.replace({ name: 'agent' })
                })
            }).catch(err => {
            // Toast.fail(err.msg)
                if (err.resultCode === -6) {
                    localStorage.clear('agentToken')
                    Dialog.alert({
                        message: err.msg
                    }).then(() => {
                        this.$router.replace({ name: 'login' })
                    })
                } else {
                    Toast.fail(err.msg)
                }
            })
        }
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.devicelist1{
    .devicelist-top{
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
           color: #000;
           font-weight: 600;
           padding: 10px 15px;
        }
        .van-checkbox{
            padding: 10px 15px;
        }
    }
    .van-list{
        margin-top: 122*@s;
        margin-bottom: 80px;

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
        background: rgba(62,148,244,.05);
    }
    .share-bottom{
        position: fixed;
        height: 80*@s;
        margin-bottom: 25*@s;
        bottom: 0;
        left: 0;
        width: 100%;
        .btn{
            background: #46BDAE;
        }
    }
}
</style>
