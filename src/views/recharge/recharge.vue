<template>
    <div class="send-prom">
        <van-field
                v-model="id"
                center
                clearable
                placeholder="请输入用户ID"
                :border="false"
                type="number"
                style="border:none;border-bottom:2px solid #e9e9e9"
        />
        <van-field
                v-model="money"
                center
                clearable
                placeholder="请输入充值金额"
                :border="false"
                type="number"
                style="border:none;border-bottom:2px solid #e9e9e9"
        />
        <van-button round type="primary" size="large" class="btn"  @click="sendSms">充值</van-button>
    </div>
</template>

<script>
import api from '@api/app'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {
            id: null,
            money: null
        }
    },
    methods: {
        sendSms () {
            let params = {
                memCode: this.id,
                price: this.money
            }
            api.recharge(params).then(res => {
                Toast.success('操作成功')
                // this.promCode = ''
            })
        }
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.send-prom{
    // padding-top: 120
    padding: 120*@s 66*@s;
    .btn{
        margin-top:100*@s;
        background: #46BDAE;
    }
}
</style>
