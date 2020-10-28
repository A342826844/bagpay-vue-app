<template>
    <Popup
        v-model="show"
        position="bottom">
        <div class="safe-veirfy">
            <div class="safe-verify-h">
                <span v-text="$t('common.safeVeirfy')"></span>
                <img @click="show=false" src="@/assets/img/common/close.png" alt/>
            </div>
            <Inputs
                v-if="sendType.indexOf(4) !== -1"
                class="safe-verify-item"
                :placeholder="$t('login.vCode')"
                v-model="phoneCode"
                type="number">
                <span slot="start" class="auth_label" v-text="formatName(phoneNum)"></span>
                <Code :phone="phoneNum" :type="verifyType"></Code>
            </Inputs>
            <Inputs
                v-if="sendType.indexOf(3) !== -1"
                class="safe-verify-item"
                :placeholder="$t('common.enterEmailCode')"
                v-model="emailCode"
                type="number">
                <span slot="start" class="auth_label" v-text="formatName(email || _userInfo.email)"></span>
                <Code :phone="email || _userInfo.email" :type="verifyType"></Code>
            </Inputs>
            <Inputs
                v-if="sendType.indexOf(5) !== -1"
                class="safe-verify-item"
                :placeholder="$t('common.enterGoogleCode')"
                v-model="googleCode"
                type="number">
                <span slot="start" class="auth_label" v-text="formatName(google || _userInfo.ga)"></span>
                <Code :phone="google || _userInfo.ga" :type="verifyType"></Code>
            </Inputs>
            <Inputs
                v-if="sendType.indexOf(2) !== -1"
                class="safe-verify-item"
                :placeholder="$t('common.enterPayCode')"
                v-model="payPwd"
                type="password">
                <span slot="start" class="auth_label" v-text="$t('login.payPassword')"></span>
            </Inputs>
            <Inputs
                v-if="sendType.indexOf(1) !== -1"
                class="safe-verify-item"
                :placeholder="$t('common.enterPwdCode')"
                v-model="loginPwd"
                type="password">
                <span slot="start" class="auth_label" v-text="$t('login.password')"></span>
            </Inputs>
            <div @click="handleEnterOut"
                 :class="['safe-verify-enter', {'active-safe-verify-enter': true}]"
                 v-text="$t('common.ok')"></div>
        </div>
    </Popup>
</template>

<script lang="ts">
import Vue from 'vue';
import { Popup } from 'vant';
import Code from '@/components/code/index.vue';
import { normalToast } from '@/commons/dom';
/**
 * 安全认证方式
 * 1 //密码
 * 2 //支付密码
 * 3 //邮件
 * 4 //手机
 * 5 //google验证码
 */

export default Vue.extend({
    components: {
        Popup,
        Code,
    },
    props: {
        value: Boolean,
        /*
            1 //修改密码
            2 //忘记密码
            3 //修改支付密码
            4 //忘记支付密码
            5 //添加收款方式
            6 //添加提币地址
            7 //添加可信提币地址
            8 //提币
            9 //可信地址提币
            10 //场外卖出
            11 //绑定邮箱
            12 //绑定手机号
            13 //绑定google验证器
        */
        type: Number,
        phone: String,
        email: String,
        google: String,
    },
    data() {
        return {
            show: false,
            verifyType: 0,
            phoneNum: '',
            sendType: [], // 短信验证码类型 0 =>不需要验证  1 => 密码  2 => 支付密码  3 => 邮件  4 => 手机  5 => google验证码
            phoneCode: '',
            emailCode: '',
            googleCode: '',
            payPwd: '',
            loginPwd: '',
        };
    },
    methods: {
        init() {
            this.phoneCode = '';
            this.emailCode = '';
            this.googleCode = '';
            this.payPwd = '';
            this.loginPwd = '';
            this.phoneNum = this.phone || this._getPhone;
            switch (this.type) {
            case 1: // 修改密码
                this.verifyType = 4;
                break;
            case 2: // 忘记密码
                this.verifyType = 5;
                break;
            case 3: // 修改支付密码
                this.verifyType = 6;
                break;
            case 4: // 忘记支付密码
                this.verifyType = 7;
                break;
            case 5: // 添加收款方式
                this.verifyType = 14;
                break;
            case 6: // 添加提币地址
                this.verifyType = 15;
                break;
            case 7: // 添加可信提币地址
                this.verifyType = 16;
                break;
            case 8: // 提币
                this.verifyType = 17;
                break;
            case 10: // 场外卖出
                this.verifyType = 10;
                break;
            default:
                this.verifyType = 0;
                break;
            }
            this.$api.getOption({
                operate: this.type,
            }).then((res: any) => {
                if (res.code === 0) {
                    if (!res.data) {
                        this.show = false;
                        this.$emit('save', {});
                    } else {
                        this.sendType = res.data;
                    }
                }
            });
        },
        open() {
            if (this._userInfo.pay_password !== '1' && this.type !== 3) {
                this.$dialog.confirm({
                    message: `${this.$t('mine.payPwd')}`,
                    className: 'confirm_34',
                    beforeClose: (action: any, done: any) => {
                        if (action === 'confirm') {
                            this.$router.push('/mine/safepass');
                        }
                        done();
                    },
                });
            } else {
                this.init();
                this.show = true;
            }
        },
        formatName(str: string) {
            const res = `${str.slice(0, 3)}***${str.slice(-3, str.length)}`;
            return res;
        },
        handleEnterOut() {
            // 短信验证码类型 0 =>不需要验证  1 => 密码  2 => 支付密码  3 => 邮件  4 => 手机  5 => google验证码
            const pwdObj: any = {};
            let isVerfiy = true;
            for (let i = 0; i < this.sendType.length; i++) {
                const item: number = this.sendType[i];
                switch (item) {
                case 1:
                    if (this.loginPwd) {
                        pwdObj.password = this.$md5(`${this.loginPwd}bagpaysol`);
                    } else {
                        isVerfiy = false;
                        normalToast(this.$t('common.enterPwdCode'));
                        return;
                    }
                    break;
                case 2:
                    if (this.payPwd) {
                        pwdObj.pay_password = this.$md5(`${this.payPwd}bagpaysol`);
                    } else {
                        isVerfiy = false;
                        normalToast(this.$t('common.enterPayCode'));
                        return;
                    }
                    break;
                case 3:
                    if (this.emailCode) {
                        pwdObj.email_code = this.emailCode;
                    } else {
                        isVerfiy = false;
                        normalToast(this.$t('common.enterEmailCode'));
                        return;
                    }
                    break;
                case 4:
                    if (this.phoneCode) {
                        pwdObj.sms_code = this.phoneCode;
                    } else {
                        isVerfiy = false;
                        normalToast(this.$t('common.enterPhoneCode'));
                        return;
                    }
                    break;
                case 5:
                    if (this.googleCode) {
                        pwdObj.ga_code = this.googleCode;
                    } else {
                        isVerfiy = false;
                        normalToast(this.$t('common.enterGoogleCode'));
                        return;
                    }
                    break;
                default:
                    break;
                }
            }
            if (isVerfiy === true) {
                this.show = false;
                this.$emit('save', pwdObj);
            }
        },
    },
});
</script>

<style lang="less" scoped>
.safe-veirfy {
    padding: 0 40px;
    padding-bottom: 28px;
    width: 100%;
    background-color: #fff;
    .auth_label{
        margin-right: 30px;
    }
    .safe-verify-h {
    display: flex;
    padding: 50px 25px 32px;
    margin-bottom: 20px;
    & > span {
        flex-grow: 1;
        height: 50px;
        line-height: 50px;
        color: #262626;
        font-size: 50px;
        vertical-align: middle;
        text-align: left;
    }
    & > img {
        width: 31px;
        height: 31px;
        vertical-align: middle;
    }
    }
    .safe-verify-item {
        margin-bottom: 30px;
    }
    .safe-verify-enter {
        margin: 60px 0px 0;
        height: 90px;
        line-height: 90px;
        background-color: #bfbfbf;
        border-radius: 10px;
        font-size: 34px;
        color: #fff;
        text-align: center;
    }
    .active-safe-verify-enter {
        background-color: #5894EE;
        color: #fff;
    }
}
</style>
