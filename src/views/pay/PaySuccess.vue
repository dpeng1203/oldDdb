<template>
    <div>
        <div class="pay-result">
            <img src="./../../assets/img/success.png" alt="">
            <p>支付成功~</p>
            <p>感谢您的体验!</p>
            <button>好的</button>
        </div>
        <footer class="flex-center pay-footer">
            <img src="./../../assets/img/logo.png" alt="">
            <p>芯能量生命之光 科技成就养生梦想</p>
        </footer>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
@s: 0.0133rem;
.pay-result{
    height: 680*@s;
    margin: 152*@s 52*@s 0;
    background: #fff;
    border-radius: 20*@s;
    text-align: center;
}
.pay-result img{
    margin-top: 118*@s;
}
.pay-result p:nth-child(2){
    font-size: 36*@s;
    color: #fc6168;
    margin-top: 50*@s;
    letter-spacing: 8px;
}
.pay-result p:nth-child(3){
    font-size: 26*@s;
    color: #999;
    margin-top: 26*@s;
    letter-spacing: 4px;
}
.pay-result button{

    border: none;
    border-radius: 20*@s;
    height: 80*@s;
    color: #fff;
    font-size: 32*@s;
    outline: none;
    background: -moz-linear-gradient(left,#4eb4f7,#2e97de);
    background: linear-gradient(left,#4eb4f7,#2e97de);
    background: -webkit-linear-gradient(left,#4eb4f7,#2e97de);

    width: 192*@s;
    margin-top: 100*@s;
}
.pay-footer{
    position: absolute;
    bottom: 76*@s;

    color: #808080;
    width: 100%;
    word-spacing: 8*@s;
    letter-spacing: 4px;
}
.pay-footer img{
    width: 40*@s;
    margin-right: 24*@s;
}
.pay-footer p{
    font-size: 24*@s;
}
</style>
