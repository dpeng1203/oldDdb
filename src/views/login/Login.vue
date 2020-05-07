<template>
    <div class="login">
        <!-- <van-cell-group> -->
            <div class="login-img">
                <img src="../../assets/img/login_bc.png" alt="">
                <img src="../../assets/img/login_ddb.png" alt="" class="ddb">
            </div>
            <div class="cont">
                <van-field
                    ref="phone"
                    v-model="mobile"
                    center
                    clearable
                    placeholder="请输入手机号码"
                    :border="false"
                    type="number"
                    :error-message="errorMessage.mobile"
                    style="border:none;border-bottom: 1px solid #e9e9e9"
                />
                <template v-if="verifyLoad">
                    <van-field
                        v-model="sms"
                        :border="false"
                        :error-message="errorMessage.sms"
                        center
                        clearable
                        type="number"
                        placeholder="请输入验证码"
                        style="margin-top:24px;border-bottom: 1px solid #e9e9e9"
                    >
                        <van-button slot="button" size="small" type="primary" style="border-radius:4px">发送验证码</van-button>
                    </van-field>
                </template>
                <template v-else>
                    <van-field
                        ref="pwd"
                        v-model="pwd"
                        :border="false"
                        :error-message="errorMessage.password"
                        center
                        clearable
                        placeholder="请输入密码"
                        type="password"
                        style="margin-top:24px;border-bottom: 1px solid #e9e9e9"
                    >
                    </van-field>
                </template>
                <div  @click="toFindPwd" class="forgetPwd">忘记密码？</div>
                <!-- <div @click="verifyLoad = !verifyLoad" class="tabLoad">{{verifyLoad ? '账号密码登录' : '验证码登录'}}</div> -->
                <van-button round type="primary" size="large" class="btn" @click="submit">登录</van-button>
                <!-- <div v-if="!verifyLoad" @click="toFindPwd" class="forgetPwd">忘记密码？</div> -->
                <div  @click="toReg" class="forgetPwd reg">注册</div>
            </div>
            
        <!-- </van-cell-group> -->
    </div>
</template>
<script>
import api from '@api/app'
import { Toast } from 'vant'
export default {
    data () {
        return {
            verifyLoad: false,
            mobile: '',
            sms: '',
            pwd: '',
            routerName: '',
            errorMessage: { mobile: '', sms: '', password: '' }
        }
    },
    methods: {
        submit () {
            console.log(this.$refs)
            if (this.mobile === '') {
                this.errorMessage.mobile = '手机号不能为空'
                return false
            }
            let params = {
                mobile: this.mobile,
                pwd: this.pwd
            }
            api.login(params).then(res => {
                this.$refs.phone.$refs.input.blur()
                this.$refs.pwd.$refs.input.blur()
                console.log(this.$refs.phone)
                window.localStorage.agentToken = res
                api.getUser().then(re => {
                    console.log(re)
                    console.log(this.routerName)
                    window.localStorage.user = JSON.stringify(re.member)
                    if (this.routerName && this.routerName !== 'setting' && this.routerName !== 'login' && this.routerName !== 'register' && this.routerName !== 'findPwd') {
                        // this.$router.back()
                        this.$router.push({ name: this.routerName })
                    } else {
                        this.$router.push({ name: 'home' })
                    }
                }).catch(err => Toast.fail(err.msg))
            }).catch(err => Toast.fail(err.msg))
        },
        toFindPwd () {
            this.$router.push({ name: 'findPwd' })
        },
        toReg() {
            this.$router.push({ name: 'register' })
        }
    },
    beforeRouteEnter (to, from, next) {
        if(localStorage.agentToken) {
            next(vm =>{
                vm.$router.push({ name: 'home' })
            })
        }else{
            next(vm => {
                vm.routerName = from.name
            })
        }
        
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.login{
    // margin-top: 120*@s;
    // padding: 0 66*@s;
    background: #fff;
    .login-img{
        text-align: center;
        .ddb{
            width: 265*@s;
            margin-top: 22*@s;
        }
    }
    .cont{
        padding: 90*@s 80*@s 0;
    }
    .btn{
        margin-top:100*@s;
        background: #3FC7C7;
        height: 76*@s;
        line-height: 76*@s;
    }
    .tabLoad{
        text-align: right;
        font-size: 24*@s;
        color: #00A0E9;
        line-height: 44px;
    }
    .forgetPwd{
        text-align: right;
        font-size: 25*@s;
        color: #3FC7C7;
        line-height: 54px;
    }
    .reg{
        text-align: center;
    }
}
</style>
