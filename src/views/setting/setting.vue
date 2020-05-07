<template>
    <div class="set">
        <div class="item" @click="$router.push('/myDeal')" v-if="aType == 3 || aType == 4 || aType == 5">
            <img src="../../assets/img/set_1.png" alt="" class="pw">
            <span>我的协议</span>
        </div>
        <div class="btn" @click="out">
            退出登录
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            aType: null
        }
    },
    methods: {
        out() {
            localStorage.clear()
            this.$router.push('/')
        },
    },
    mounted() {
        let user = JSON.parse(localStorage.user)
        this.aType = user.aType
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.set{
    // padding-top: 150*@s;
    background: #ddd;
    height: 100vh;
    .item{
        border-bottom: 1px solid #F7F7F7;
        height: 108*@s;
        display: flex;
        align-items: center;
        color: #44444E;
        background: #fff;
        padding: 0 20*@s;
        // margin-top: 50*@s;
        span{
            flex: 1;
            margin-left: 30*@s;
            font-size: 24*@s;
            color: #7E7D7D;
            font-weight: bold;
        }
        p{
            color: #ddd;
        }
        .pw{
            width: 32*@s;
        }
    }
    .btn{
        position: fixed;
        bottom: 550*@s;
        left: 110*@s;
        width: 530*@s;
        background: #CB78BD;
        line-height: 78*@s;
        text-align: center;
        color: #fff;
        font-size: 34*@s;
        font-weight: bold;
        border-radius: 20*@s;
    }
}
</style>