<template>
    <div class="login">
        <!-- <van-cell-group> -->
            <div class="login-img">
                <img src="../../assets/img/login_bc.png" alt="">
                <img src="../../assets/img/login_ddb.png" alt="" class="ddb">
            </div>
            <div class="cont">
                <van-field
                    v-model="aName"
                    center
                    required
                    clearable
                    placeholder="请输入用户名"
                    :border="false"
                    style="border:none;border-bottom:1px solid #e9e9e9"
                />
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
                <template v-if="recACode === 0">
                <van-field
                    v-model="promCode"
                    :border="false"
                    center
                    required
                    clearable
                    placeholder="请输入授权码"
                    type="number"
                    style="border-bottom:1px solid #e9e9e9"
                >
                </van-field>
                </template>
                <van-field
                    v-model="mobile"
                    :border="false"
                    center
                    required
                    clearable
                    placeholder="请输入手机号码"
                    type="number"
                    style="border-bottom:1px solid #e9e9e9"
                >
                </van-field>
                <van-field
                    v-model="certCode"
                    :border="false"
                    center
                    required
                    clearable
                    type="number"
                    placeholder="请输入验证码"
                    style="border-bottom:1px solid #e9e9e9"
                >
                    <van-button slot="button" size="small" type="primary" style="border-radius:4px;background:#46BDAE;font-size:14px;" @click="sendSms" >发送验证码</van-button>
                </van-field>
                <van-field
                    :border="false"
                    v-model="areaFullName"
                    center
                    required
                    clearable
                    placeholder="请选择地区"
                    style="border-bottom:1px solid #e9e9e9"
                    readonly
                    @click="show=true"
                >
                </van-field>
                <template v-if="recACode != 0 && reAType != 1">
                    <van-field
                        :border="false"
                        v-model="regType"
                        center
                        required
                        placeholder="注册类型："
                        readonly
                    >
                    </van-field>
                    <div class="radio">
                        <van-radio-group v-model="radio">
                            <van-radio-group v-model="radio">
                                <van-cell-group>
                                    <van-cell title="全国" clickable @click="radio = '3'">
                                        <van-radio slot="right-icon" name="3" checked-color="#3FC7C7"/>
                                    </van-cell>
                                    <van-cell title="联合" clickable @click="radio = '4'">
                                        <van-radio slot="right-icon" name="4" checked-color="#3FC7C7"/>
                                    </van-cell>
                                    <van-cell title="商家" clickable @click="radio = '5'">
                                        <van-radio slot="right-icon" name="5" checked-color="#3FC7C7"/>
                                    </van-cell>
                                </van-cell-group>
                            </van-radio-group>
                        </van-radio-group>
                    </div>
                </template>
                <van-popup v-model="show" position="bottom ">
                        <van-area :area-list="areaList" @confirm="getArea" @cancel="show=false"/>
                    </van-popup>
                <!-- <van-checkbox v-model="checked" checked-color="#07c160">
                    <div slot="default" class="contract" @click="contractShow = true">
                        我已阅读并同意《注册协议》
                    </div>
                </van-checkbox> -->
                <van-button round type="primary" size="large" class="btn" @click="submit" :disabled="!dis">注册</van-button>
            </div>
            
            <!-- <van-button round type="primary" size="large" class="btn" @click="submit" :disabled="!dis">注册</van-button> -->
            <van-dialog
                v-model="contractShow"
                show-cancel-button
                title="协议"
                confirmButtonText='同意'
                cancelButtonText='退出'
                @confirm='confirm'
            >
                <regDeal :type='radio'></regDeal>
            </van-dialog>
        <!-- </van-cell-group> -->
    </div>
</template>
<script>
import api from '@api/app'
import { Toast, Dialog,RadioGroup, Radio,Cell,CellGroup } from 'vant'
import area from '@utils/area'
import regDeal from './regDeal.vue'
export default {
    components: {
        regDeal
    },
    data () {
        return {
            regType: '注册类型：',
            dealIsOk: false,
            show: false,
            areaList: area,
            areaFullName: '',
            aName: '',
            mobile: '',
            promCode: '',
            certCode: '',
            pwd: '',
            repeatPwd: '',
            provinceCode: '', // 所属省
            cityCode: '', // 所属市
            areaCode: '', // 所属区
            aAddress: '',
            errorMessage: { mobile: '', certCode: '', pwd: '' },
            checked: false,
            contractShow: false,
            recACode: 0,
            reAType: 0,
            radio: '6'
        }
    },
    computed: {
        dis () {
            return /^1\d{10}$/.test(this.mobile) && this.aName !== '' &&
                    /^\d{4}$/.test(this.certCode) && this.areaFullName !== '' &&
                    this.repeatPwd === this.pwd && this.pwd.length >= 6 
        }
    },
    methods: {
        submit () {
            if(this.recACode == 0) {
                if(this.promCode.length != 8) {
                    Toast('请输入正确的授权码！')
                    return
                }
            }else{
                if(this.radio != 3 && this.radio != 4 && this.radio != 5) {
                    Toast('选择注册类型！')
                    return
                }
            }
            if(this.radio == 3 || this.radio == 4 || this.radio == 5) {
                if(!this.dealIsOk) {
                    this.contractShow = true
                    return
                }else{
                    this.contractShow = false
                }
            }
            
            let params = {
                mobile: this.mobile,
                pwd: this.pwd,
                aName: this.aName,
                promCode: this.promCode,
                certCode: this.certCode,
                provinceCode: this.provinceCode,
                cityCode: this.cityCode,
                areaCode: this.areaCode,
                recACode: this.recACode,
                aAddress: this.areaFullName,
                aType: this.radio
            }
            console.log(params)
            api.register(params).then(res => {
                console.log(res === 'success')
                // if (res === 'success') {
                // Toast.success('注册成功') // .then(() => this.$router.replace({ name: 'login' }))
                // this.$router.replace({ name: 'login' }
                // }
                Dialog.alert({
                    message: '注册成功'
                }).then(() => {
                    this.$router.replace({ name: 'login' })
                })
            }).catch(err => Toast.fail(err.msg))
        },
        toFindPwd () {
            this.$router.push({ name: 'findPwd' })
        },
        sendSms () {
            let params = {
                mobile: this.mobile,
                type: 'register'
            }
            api.sendSms(params).then(res => {
                Toast.success('正在发送')
            }).catch(err => Toast.fail(err.msg))
        },
        getArea (val) {
            console.log(val)
            this.show = false
            this.areaFullName = val[0].name + val[1].name + val[2].name
            this.provinceCode = val[0].code
            this.cityCode = val[1].code
            this.areaCode = val[2].code
        },
        confirm() {
            this.dealIsOk= true
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.recACode = to.query.recACode || 0
            console.log(vm.recACode)
            vm.reAType = to.query.reAType || 0
            if(vm.reAType == 1) {
                this.radio = 99
            }
        })
    }
}
</script>
<style lang="less">
@s: 0.0133rem;
.login{
    // margin-top: 120*@s;
    // padding: 0 66*@s;
    background: #fff;
    padding-bottom: 100*@s;
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
    .contract{
        font-size: 26*@s;
        text-decoration: underline;
    }
}
</style>
