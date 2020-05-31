<template>
    <div class="order">
        <van-tabs v-model="active" @change="handChange">
             <!-- <van-tab title="全部"></van-tab> -->
            <!-- <van-tab title="待付款"></van-tab> -->
            <van-tab title="待发货"></van-tab>
            <van-tab title="已发货"></van-tab>
        </van-tabs>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <div class="list" v-for="item in list" :key="item.pbCode">
                <div class="list-title">
                    <span class="name">优选专区</span>
                    <span class="icon"><van-icon name="arrow" color="#666" /></span>
                    <span class="state" v-if="item.status === 0 || item.status === 3">待付款</span>
                    <span class="state" v-if="item.status === 2 && item.pbType === 0">待发货</span>
                    <span class="state" v-if="item.status === 2 && item.pbType === 1">待收货</span>
                    <span class="state" v-if="item.status === 2 && item.pbType === 2">已签收</span>
                </div>
                <div class="cont" >
                    <img :src="item.productInfo.pMainPic" alt />
                    <div class="info">
                        <div class="title">{{item.productInfo.pName}}</div>
                        <div class="desc">{{item.desc}}</div>
                        <div class="pro-price">
                        <!-- <span class="ori-price">￥{{item.pPrice}}</span> -->
                        <span class="price">￥{{item.price}}</span>
                        <span class="num">x {{item.pCount}}</span>
                        </div>
                    </div>
                </div>
                <div class="wrapper">
                    共{{item.pCount}}件商品&nbsp;&nbsp;合计：<span>￥ {{item.tatol}}</span> (含运费￥0.00)
                </div>
                <div class="foot" >
                    <!-- <div class="btn" v-if="item.status === 0 || item.status === 3" @click="toDetail(item.pbCode,item.status)">去付款</div> -->
                    <div class="btn" v-if="item.status === 2 && item.pbType == 0" @click="toDetail(item)">去发货</div>
                    <div class="btn" v-if="item.status === 2 && item.pbType > 0" @click="toDetail(item)">查看详情</div>
                    <!-- <div class="btn" v-if="item.status === 1">去付款</div> -->
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
import { Tab, Tabs, Icon, List } from 'vant';
import app from '@/api/app.js'
export default {
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Icon.name]: Icon,
        [List.name]: List
    },
    data() {
        return{
            loading: false,
            finished: false,
            active: 0,
            oStatus: 0,
            item: {

            },
            parms: {
                pageNum: 0,
                pageSize: 10,
                prdStatus: 0
            },
            list: []
        }
    },
    methods: {
        handChange(name,title) {
            if(name === 0) {
                this.parms.prdStatus = 0
                this.parms.pageNum = 0
                this.finished = false
                this.list = []
            }else if(name === 1) {
                this.parms.prdStatus = 1
                this.parms.pageNum = 0
                this.finished = false
                this.list = []
            }
            // else if(name === 2) {
            //     this.parms.prdStatus = 0
            //     this.parms.pageNum = 0
            //     this.finished = false
            //     this.list = []
            // }else if(name === 3) {
            //     this.parms.prdStatus = 1
            //     this.parms.pageNum = 0
            //     this.finished = false
            //     this.list = []
            // }
        },
        onLoad() {
            setTimeout(() => {
                this.parms.pageNum ++
                this.getList()
            }, 1000);
        },
        getList() {
            app.manageOrderList(this.parms).then( res => {
                // 加载状态结束
                this.loading = false;
                if(res.data.length != 0) {
                    res.data.forEach(ele => {
                        if(ele.productInfo.pDesc) {
                            ele.desc = JSON.parse(ele.productInfo.pDesc)[0].desc
                        }
                        ele.tatol = (ele.price * ele.pCount).toFixed(2)
                    })
                }
                if(this.parms.pageNum == 1) {
                    this.list = res.data
                }else{
                    this.list = [...this.list,...res.data]
                }
                console.log(this.list)
                // 数据全部加载完成
                if (this.list.length >= res.total) {
                    this.finished = true;
                }
            })
        },
        toDetail(item) {
            this.$router.push({path: '/orderDetail',query: {item}})
        },
        // toLog(pbCode) {
        //     this.$router.push({path: '/logSteps',query: {pbCode}})
        // }
    },
    mounted() {
        // let prdStatus = this.$route.query.id
        // this.parms.prdStatus = prdStatus
        // this.getList()
        // if(prdStatus == -1) {
        //     this.active = 0
        // }else if(prdStatus == 99) {
        //     this.active = 1
        // }else if(prdStatus == 0) {
        //     this.active = 2
        // }else if(prdStatus == 1) {
        //     this.active = 3
        // }
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.order{
    font-size: 28*@s;
    .list{
        margin-top: 20*@s;
        background: #fff;
        padding: 0 30*@s;
        .list-title{
            display: flex;
            align-items: center;
            height: 88*@s;
            color: #666;
            span{
                color: #666;
                margin-left: 20*@s;
            }
            .icon{
                flex: 1;
                padding-top: 8*@s;
                margin-left: 35*@s;
            }
            .state{
                color: #ED0C17;
            }
        }
        .cont{
            padding-top: 18*@s;
            // padding: 30 * @s;
            display: flex;
            align-items: center;
            img {
                width: 160 * @s;
                height: 160 * @s;
            }
            .info {
                flex: 1;
                margin-left: 30 * @s;
                .desc {
                    color: #808080;
                    margin-top: 10 * @s;
                    font-size: 24 * @s;
                    margin-bottom: 10 * @s;
                }
                .ori-price {
                    font-size: 28 * @s;
                    margin-right: 10 * @s;
                    text-decoration: line-through;
                }
                .price {
                    color: #ed0c17;
                    font-size: 32 * @s;
                    font-weight: bold;
                }
                .pro-price{
                    display: flex;
                    align-items: center;
                    .price{
                        flex: 1
                    }
                    .num{
                        font-size: 22*@s;
                        color: #999;
                    }
                }
            }
        }
        .wrapper{
            text-align: right;
            line-height: 87*@s;
            border-bottom: 1px solid #f2f2f2;
            font-size: 24*@s;
            color: #666;
            span{
                font-size: 32*@s;
                color: #000;
            }
            .dis-price{
                color: #ED0C17;
            }
        }
        .foot{
            text-align: right;
            line-height: 88*@s;
            .btn{
                font-size: 24*@s;
                display: inline-block;
                width: 160*@s;
                line-height: 54*@s;
                color: #D11529;
                border: 1px solid #D11529;
                border-radius: 27*@s;
                text-align: center;
                margin-left: 20*@s;
            }
            .active{
                color: #ED0C17;
                border: 1px solid #ED0C17;
            }
        }
    }
    .tip{
        line-height: 88*@s;
        color: #999;
        text-align: center;
    }
}
</style>