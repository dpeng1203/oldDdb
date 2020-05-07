<template>
    <div class="devicelist-price">
        <!-- <van-tabs v-model="active" @click="tabNav" sticky>
            <van-tab title="已分发"></van-tab>
            <van-tab title="未分发"></van-tab>
        </van-tabs> -->
        <div class="devicelist-top flex-space">
            <p>机器编号</p>
            <p>价格</p>
            <p>操作</p>
        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <div class="devicelist-content flex-space"  v-for="(item,index) in list" :key="index" :class="{hex: index%2 === 1}">
            <div>
                <p>{{item.macCode}}</p>
            </div>

            <!-- <van-field v-model="item.macPrice" /> -->
            <div>
                <input type="text" v-model="item.macPrice" :readonly="editIndex !== index">
            </div>

            <!-- <p>{{item.macPrice || 0}}</p> -->
            <div v-if="editIndex === index">
                <Button @click="handleSave(item, index)" style="color:#fff;background:#19be6b">保存</Button>
                <Button @click="editIndex = -1">取消</Button>
            </div>
            <div v-else>
                <Button @click="handleEdit(index)" style="color:#fff;background:#5cadff">修改</Button>
            </div>
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
            editIndex: -1,
            params: {
                // endTime: '',
                pageNum: 1,
                aCode: -1,
                pageSize: 20
            }
        }
    },
    methods: {
        handleEdit (index) {
            this.editIndex = index
        },
        handleSave (row, index) {
            let params = {
                macId: row.macId,
                price: row.macPrice
            }
            app.updateMacPrice(params).then(res => {
                console.log(res)
                Dialog.alert({
                    message: '操作成功'
                }).then(() => {
                    this.editIndex = -1
                })
            }).catch(err => {
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
        },
        formartTime (val) {
            return val.substring(0, val.length - 2)
        },
        tabNav (i) {
            console.log(i)
        },
        onLoad () {
            app.getMacListForPrice(this.params).then(res => {
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
.devicelist-price{
    .devicelist-top{
        // position: fixed;
        // top: 0;
        // width: 100%;
        background: #fff;
        padding: 0 50*@s;
        text-align: right;
        height: 82*@s;
        color: #666;
        font-size: 29*@s;
        // background: #f3f3f3;
        // margin-bottom: 82*@s;
        border-top: 22*@s solid #f2f2f2;
        border-bottom: 22*@s solid #f2f2f2;
        p{
           text-align: center;
           width: 33%;
           color: #000;
           font-weight: 600;
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
        div{
           width: 33%;
        }
        .spec-color{
            color: red
        }
        input{
            width: 80%;
        }
        // border-bottom: 1px solid #f3f3f3;
        button{
            border: 0;
            border-radius: 5px;
            margin-left: 5px;
        }

    }
    .hex{
        background: rgba(62,148,244,.05);
    }
}
</style>
