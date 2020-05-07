<template>
    <div class="device-qr">
        <p>我的二维码</p>
        <div class="box">
            <div class="border">
                <div class="wrap">
                    <qrcode :url="qrText" :iconurl="imageUrl" :wid="150" :hei="150" :imgwid="25" :imghei="25"></qrcode>
                </div>
            </div>
            
        </div>
        
        
    </div>
</template>
<script>
// import VueQr from 'vue-qr'
// import logoimg from './../../assets/img/logo.jpg'
import qrcode from 'vue_qrcodes'
export default {
    components: {
        // VueQr,
        qrcode
    },
    data () {
        return {
            imageUrl: require('../../assets/img/logo.jpg'),
            qrText: ''
        }
    },
    // computed: {
    //     qrText () {
    //         return 'http://xry.dodohz.com/ddbxry/index.html#/user/qrRecommend?aCode=' +
    //         JSON.parse(window.localStorage.user).aCode + '&aType=' + JSON.parse(window.localStorage.user).aType
    //     }
    // },
    created() {
        this.qrText = 'http://xry.dodohz.com/ddbxry/index.html#/user/qrRecommend?aCode=' +
            JSON.parse(window.localStorage.user).aCode + '&aType=' + JSON.parse(window.localStorage.user).aType
            // alert(this.qrText)
    }
}
</script>
<style lang="less">
@s: 0.013rem;
.device-qr{
    height: 100%;
    text-align: center;
    background-color: #fff;
    .box{
        // background: url(../../assets/img/qr_bg.png) no-repeat;
        // background-size: 100% 100%;
        border-radius: 20px;
        background: #5fd1c2;
        margin: .4rem;
        // padding-top: 20*@s;
        height: 690*@s;
        display: flex;
        align-items: center;
        justify-content: center;
        .border{
            height: 490*@s;
            width: 490*@s;
            border-radius: 40*@s;
            border: 6px solid #fff;
            background: #5fd1c2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .wrap{
            padding: 20*@s 20*@s 0;
            background-color: #fff;
        }
    }
    p{
        padding-top: 2rem;
        font-size: .6rem;
        font-weight: bold;
    }
}
</style>
