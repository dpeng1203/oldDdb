<template>
    <div class="production">
        <div class="production-top">
            <img src="./../../assets/img/production.png" alt="">
        </div>
        <div class="production-content">
            <p>DODO智能养生仪</p>
            <p>驱寒祛湿、疏通经络，打通气血循环</p>
            <p>8888.88</p>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
@s: 0.0133rem;
.production{
    .production-top{
        height: 429*@s;
        padding: 27*@s;

        img{
            width: 100%;
        }
    }
    .production-content{
        padding: 27*@s;
        font-size: 36*@s;
        font-weight: bold;
        border-bottom: 10px solid #f2f2f2;
        p{
            padding-top:10px;
        }
        p:nth-child(3){
            color: #DE2E2E;
            &::before{
                content: "￥";

            }
        }
    }
}
</style>
