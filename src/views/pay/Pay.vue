<template>
    <div class="pay">
        <div class="step">
            <div class="num active">1</div>
            <div class="line"></div>
            <div class="num">2</div>
            <div class="line"></div>
            <div class="num">3</div>
        </div>
        <div class="tip">确认身上金属制品是否摘除</div>
        <p>将患处靠近养生仪，距养生仪五厘米左右</p>
        <img src="../../assets/img/device-img.png" alt="">
        <div class="rule">
            <img src="../../assets/img/options.png" alt="" class="people">
            <!-- <img src="../../assets/img/rule.png" alt=""> -->
            <div class="rule-text">
                <p>1、体内有金属及美容假体等异物部位不宜直接照射；</p>
                <p>2、女性生理期间、开放性伤口未止血状态不宜；</p>
                <p>3、对温度不敏感者、孕妇及儿童不宜；  </p>
                <p>4、重症——包含癌症及其他病情严重者、身体极度虚弱者不宜；</p>
                <p>5、服用抗血栓药物（如阿司匹林、银杏产品等）者不宜；</p>
                <p>6、头部与心脏不宜直接照射；</p>
                <p>7、血压高于180以上者不宜；</p>
                <p>8、癫痫患者及精神异常者不宜；</p>
                <p>9、男性阴囊（睾丸）不能直接照射，照射前列腺时，如果疼痛感强烈，可用手适当遮挡禁忌部位；</p>
                <p>10、使用期间需补充不低于1.5L饮用水；</p>
                <p>11、同一部位每天照射不得超过两次；</p>
            </div>

        </div>
        <div class="foot">
            <div class="btn" @click="toNext">下一步</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            barcode: '',
            at: '',
            pcode: ''
        }
    },
    methods: {
        toNext () {
            this.$router.push({ path: '/user/payNext', query: { barcode: this.barcode, at: this.at, pcode: this.pcode } })
        }
    },
    mounted () {
        this.barcode = this.$route.query.barcode
        this.at = this.$route.query.at
        this.pcode = this.$route.query.pcode
    }
}
</script>

<style lang="less" scoped>
	@s: 0.0133rem;
    .pay{
        font-size: 28*@s;
        text-align: center;
        min-height: calc(100vh);
        background: #f7f7f7;
        .step{
            padding-top: 70*@s;
            display: flex;
            align-items: center;
            margin-left: 117*@s;
            .num{
                width: 44*@s;
                line-height: 44*@s;
                border-radius: 50%;
                background: #D2D2D2;
                color: #fff;
            }
            .line{
                width: 190*@s;
                height: 10*@s;
                background: #D2D2D2;
            }
            .active{
                background: #46BDAE;
            }
        }
        .tip{
            font-size: 36*@s;
            font-weight: bold;
            margin-top: 40*@s;
            line-height: 1;

        }
        p{
            font-size: 24*@s;
            font-weight: 500;
            margin-top: 20*@s;
            line-height: 1;
        }
        img{
            width: 393*@s;
            margin-top: 120*@s;
        }
        .rule{
            background: #fff;
            position: relative;
            text-align: left;
            margin-top: 80*@s;
            padding: 30*@s;
            margin-bottom: 130*@s;
            .rule-text{
                font-size: 30*@s;
                height: 350*@s;
                overflow: auto;
                p{
                    line-height: 1.5;
                    margin-top: 0;
                    font-size: 28*@s;
                }
            }
            .people{
                position: absolute;
                top: -200*@s;
                left: 20*@s;
                width: 106*@s;
            }
        }
        .foot{
            padding: 20*@s 75*@s;
            background: #fff;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            .btn{
                width: 600*@s;
                line-height: 80*@s;
                background: #46BDAE;
                color: #fff;
                border-radius: 15*@s;
            }
        }
    }
</style>
