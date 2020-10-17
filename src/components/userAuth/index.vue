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
                class="safe-verify-item"
                :placeholder="$t('common.enterPhoneCode')"
                v-model="SMSCode"
                autocomplete="current-password"
                type="password">
                <span slot="start" v-text="phoneNumber"></span>
                <Code :phone="phone" :type="verifyType"></Code>
            </Inputs>
            <Inputs
                class="safe-verify-item"
                :placeholder="$t('common.enterEmailCode')"
                v-model="emailCode"
                autocomplete="current-password"
                type="number">
                <span slot="start" v-text="emailNumber"></span>
                <Code :phone="phone" :type="verifyType"></Code>
            </Inputs>
            <Inputs
                class="safe-verify-item"
                :placeholder="$t('common.enterGoogleCode')"
                v-model="googleCode"
                autocomplete="current-password"
                type="number">
                <span slot="start" v-text="googleNumber"></span>
                <Code :phone="phone" :type="verifyType"></Code>
            </Inputs>
            <Inputs
                class="safe-verify-item"
                :placeholder="$t('common.enterPayCode')"
                v-model="password"
                autocomplete="current-password"
                type="password">
                <span slot="start" v-text="$t('login.payPassword')"></span>
            </Inputs>
            <Inputs
                class="safe-verify-item"
                :placeholder="$t('common.enterPwdCode')"
                v-model="loginPassword"
                autocomplete="current-password"
                type="password">
                <span slot="start" v-text="$t('login.password')"></span>
            </Inputs>
            <div @click="handleEnterOut"
                 :class="['safe-verify-enter', {'active-safe-verify-enter': verifyEnter}]"
                 v-text="$t('common.ok')"></div>
        </div>
    </Popup>
</template>

<script lang="ts">
import Vue from 'vue';
import { Popup } from 'vant';
import Code from '@/components/code/index.vue';
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
            phoneNumber: '', // 手机
            emailNumber: '', // 邮箱
            googleNumber: '', // 谷歌
            sendType: [1, 2, 3, 4, 5], // 短信验证码类型 0 =>不需要验证  1 => 密码  2 => 支付密码  3 => 邮件  4 => 手机  5 => google验证码
            SMSCode: '',
            emailCode: '',
            googleCode: '',
            password: '',
            loginPassword: '',
            phoneinterval: null,
            emailinterval: null,
            googleinterval: null,
            phonecountDown: 60,
            emailcountDown: 60,
            googlecountDown: 60,
            verifyEnter: false,
        };
    },
    methods: {
        init() {
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
            default:
                this.verifyType = 0;
                break;
            }
            this.$api.getOption({
                operate: this.type,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.sendType = res.data;
                }
            });
        },
        open() {
            this.init();
            this.show = true;
        },
        formatName(str: string) {
            const res = `${str.slice(0, 3)}***${str.slice(-3, str.length)}`;
            return res;
        },
        handleEnterOut() {
            this.show = false;
        },
    },
});
</script>

<style lang="less" scoped>
.safe-veirfy {
    padding: 0 15px;
    padding-bottom: 28px;
    width: 100%;
    background-color: #fff;
    .safe-verify-h {
    display: flex;
    padding: 50px 25px 32px;
    border-bottom: solid 1px #dcdcdc;
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
        margin-bottom: 10px;
    }
    .safe-verify-enter {
        margin: 50px 70px 0;
        width: 580px;
        height: 90px;
        line-height: 90px;
        background-color: #bfbfbf;
        border-radius: 10px;
        font-size: 34px;
        color: #fff;
    }
    .active-safe-verify-enter {
        background-color: #333333;
        color: #E1BF81;
    }
}
</style>
