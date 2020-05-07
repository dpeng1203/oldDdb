<template>
    <div class="send-prom">
        <van-field
                v-model="promCode"
                center
                clearable
                placeholder="请输入授权码"
                :border="false"
                type="number"
                style="border:none;border-bottom:2px solid #e9e9e9"
        />
        <van-button round type="primary" size="large" class="btn" :disabled="!dis" @click="sendSms">提交升级</van-button>
    </div>
</template>

<script>
import api from '@api/app'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {
            promCode: ''
        }
    },
    computed: {
        dis () {
            return /^\d{8}$/.test(this.promCode)
        }
    },
    methods: {
        sendSms () {
            let params = {
                promCode: this.promCode
            }
            api.agentUp(params).then(res => {
                // Toast.success('操作成功')
                // this.promCode = ''
                Dialog.alert({
                    message: '操作成功'
                }).then(() => {
                    this.$router.replace({ name: 'home' })
                })
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
        background: #46BDAE;
    }
}
</style>
