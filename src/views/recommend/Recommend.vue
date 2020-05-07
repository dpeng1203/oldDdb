<template>
    <div class="send-prom">
        <van-field
                v-model="mobile"
                center
                clearable
                placeholder="请输入手机号码"
                :border="false"
                type="number"
                style="border:none;border-bottom:2px solid #e9e9e9"
        />
        <van-button round type="info" size="large" class="btn" :disabled="!dis" @click="sendSms">发送推荐码</van-button>
    </div>
</template>

<script>
import api from '@api/app'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {
            mobile: ''
        }
    },
    computed: {
        dis () {
            return /^1\d{10}$/.test(this.mobile)
        }
    },
    methods: {
        sendSms () {
            let params = {
                mobile: this.mobile,
                opType: 108,
                xry_token_id: window.localStorage.agentToken
            }
            api.sendProm(params).then(res => {
                Toast.success('正在发送')
                this.mobile = ''
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
.send-prom{
    // padding-top: 120
    padding: 120*@s 66*@s;
    .btn{
        margin-top:100*@s;
    }
}
</style>
