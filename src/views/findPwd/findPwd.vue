<template>
    <div class="findpwd">
        <!-- <header class="header-nav-wrap">
            <div tag="div" class="load-active load-link" >忘记密码</div>
        </header> -->
        <div class="login-img">
            <img src="../../assets/img/login_bc.png" alt="">
            <img src="../../assets/img/login_ddb.png" alt="" class="ddb">
        </div>
        <div class="login">
        <!-- <van-cell-group> -->
            
            <van-field
                v-model="mobile"
                center
                clearable
                placeholder="请输入手机号码"
                :border="false"
                type="number"
                style="border:none;border-bottom:1px solid #e9e9e9"
            />
            <van-field
                v-model="certCode"
                :border="false"
                center
                clearable
                type="number"
                placeholder="请输入验证码"
                style="margin-top:14px;border-bottom:1px solid #e9e9e9"
            >
                <van-button slot="button" size="small" type="primary" style="border-radius:4px;background:#46BDAE;font-size:14px;" @click="sendSms">发送验证码</van-button>
            </van-field>
            <van-field
                v-model="pwd"
                :border="false"
                center
                required
                clearable
                placeholder="请输入密码:6-20字符"
                type="password"
                style="border-bottom:1px solid #e9e9e9"
            >
            </van-field>
            <van-field
                v-model="repeatPwd"
                :border="false"
                center
                required
                clearable
                placeholder="请再次输入密码"
                type="password"
                style="border-bottom:1px solid #e9e9e9"
            >
            </van-field>

            <van-button round type="primary" size="large" class="btn" @click="submit" :disabled="!dis">完成</van-button>
        <!-- </van-cell-group> -->
        </div>
    </div>
</template>
<script>
import api from '@api/app'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {
            mobile: '',
            certCode: '',
            pwd: '',
            repeatPwd: ''
        }
    },
    computed: {
        dis () {
            return /^1\d{10}$/.test(this.mobile) && this.pwd.length >= 6 &&
                    /^\d{4}$/.test(this.certCode) && this.repeatPwd === this.pwd
        }
    },
    methods: {
        submit () {
            let params = {
                mobile: this.mobile,
                pwd: this.pwd,
                certCode: this.certCode
            }
            api.findpwd(params).then(res => {
                console.log(res)
                // if (res === 'success') {
                Dialog.alert({
                    message: '修改成功'
                }).then(() => {
                    // on close
                    this.$router.replace({ name: 'login' })
                }) // .then(() => this.$router.replace({ name: 'login' }))
                // this.$router.replace({ name: 'login' }
                // }
            }).catch(err => Toast.fail(err.msg))
        },
        sendSms () {
            let params = {
                mobile: this.mobile,
                type: 'findpwd'
            }
            api.sendSms(params).then(res => {
                Toast.success('正在发送')
            }).catch(err => Toast.fail(err.msg))
        }
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.findpwd{
    .login-img{
        text-align: center;
        .ddb{
            width: 265*@s;
            margin-top: 22*@s;
        }
    }
    .header-nav-wrap{
        text-align: center;
        padding-top: 146*@s;
        width: 40%;
        padding-left: 30%;
        .load-active{
            color: #46BDAE;
            border-bottom: 2px solid #46BDAE;
        }
    }

    .login{
        margin-top: 90*@s;
        padding: 0 80*@s;
        .btn{
            margin-top:100*@s;
        }
    }
}

</style>
