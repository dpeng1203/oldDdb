<template>
    <div class="agentlist">
        <div class="agentlist-top flex-space">
            <p>姓名</p>
            <p>设备（台）</p>
            <p>分发操作</p>
        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <div class="agentlist-content flex-space"  v-for="(item,index) in list" :key="index" :class="{hex: index%2 === 1}">
            <p>{{item.name}}</p>
           <p type="primary" @click="showPopup(index)">
            {{item.macEntityList.length}}
            </p>

            <van-popup v-model="show">
                 <div class="flex-space">
                    <p>序号</p>
                    <p>机器编号</p>
                 </div>

             <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
            <van-cell-group>
                <van-cell
                v-for="(item, index) in macCodeList"
                :key="index"
                >
               <div class="agentlist-content flex-space" :class="{hex: index%2 === 1}">
                 <p class="right">{{index + 1}}</p>
                 <p> {{item.macId}}</p>
               </div>
                </van-cell>
            </van-cell-group>
        </van-list>

         </van-popup>

        <button @click="toShareDevice(item.code)">分发设备</button>

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
            result: '',
            active: '未分发',
            user: JSON.parse(window.localStorage.getItem('user')),
            list: [],
            loading: false,
            finished: false,
            show: false,
            params: {
                // endTime: '',
                pageNum: 1,
                // aCode: -1,
                pageSize: 20
            },
            macCodeList: [] // 你给变量赋值，起码要声明一个吧?
        }
    },
    methods: {
        formartTime (val) {
            return val.substring(0, val.length - 2)
        },
        toShareDevice (i) {
            this.$router.push({ name: 'shareDevice', query: { aCode: i } })
        },
        showPopup (index) {
            this.show = true
            this.macCodeList = this.list[index].macEntityList
        },

        onLoad () {
            app.getAgentList(this.params).then(res => {
                this.list.push(...res)
                console.log(res)
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
           padding: 15px 15px;
        }
    }
    .van-list{
        margin-top: 110*@s;

    }

    .van-popup{
        width: 550*@s;
        height: 550*@s;
        .flex-space{
            margin-top: 10*@s;

            .right{
                padding-left: 10*@s;
            }
        }

    }
    button{
        margin-left: 70*@s;
    }
    .agentlist-content{

        height: 100*@s;
        color: #666;
        font-size: 24*@s;
        p{
           width: 33%;
           padding: 20*@s 20*@s;
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
