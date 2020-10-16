<template>
    <Popup
        v-model="show"
        position="bottom"
        >
        <!-- <div class="safe-veirfy">
            <div class="safe-verify-h">
                <span v-text="$t('assets.safeVeirfy.title')"></span>
                <img @click="show=false" src="../../assets/img/assets/close.png" alt/>
            </div>
            <div v-if="this.sendType.indexOf(4) !== -1" class="safe-verify-item">
                <span v-text="phoneNumber"></span>
                <input :placeholder="$t('assets.safeVeirfy.SMSHint')" v-model="SMSCode" type="number"/>
                <span @click="handleSendCode('phone')" v-text="phoneinterval ? phonecountDown + 'S' : $t('assets.safeVeirfy.send')"></span>
            </div>
            <div v-if="this.sendType.indexOf(3) !== -1" class="safe-verify-item">
                <span v-text="emailNumber"></span>
                <input :placeholder="$t('assets.safeVeirfy.SMSHintEmail')" v-model="emailCode" type="number"/>
                <span @click="handleSendCode('email')" v-text="emailinterval ? emailcountDown + 'S' : $t('assets.safeVeirfy.send')"></span>
            </div>
            <div v-if="this.sendType.indexOf(5) !== -1" class="safe-verify-item">
                <span v-text="googleNumber"></span>
                <input :placeholder="$t('assets.safeVeirfy.SMSHintGoogle')" v-model="googleCode" type="number"/>
                <span @click="handleSendCode(3)" v-text="googleinterval ? googlecountDown + 'S' : $t('assets.safeVeirfy.send')"></span>
            </div>
            <div v-if="this.sendType.indexOf(2) !== -1" class="safe-verify-item">
                <span v-text="$t('assets.safeVeirfy.password')"></span>
                <input type="password" :placeholder="$t('assets.safeVeirfy.passwordPoptip')" v-model="password"/>
            </div>
            <div v-if="this.sendType.indexOf(1) !== -1" class="safe-verify-item">
                <span v-text="$t('assets.safeVeirfy.loginPassword')"></span>
                <input type="password" :placeholder="$t('assets.safeVeirfy.loginPassword')" v-model="loginPassword"/>
            </div>
            <div @click="handleEnterOut"
                 :class="['safe-verify-enter', {'active-safe-verify-enter': verifyEnter}]"
                 v-text="$t('assets.safeVeirfy.enter')"></div>
        </div> -->
    </Popup>
</template>

<script lang="ts">
import Vue from 'vue';
import { Popup } from 'vant';
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
        };
    },
    methods: {
        formatName(str: string) {
            const res = `${str.slice(0, 3)}***${str.slice(-3, str.length)}`;
            return res;
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
    padding: 79px 25px 32px;
    border-bottom: solid 1px #dcdcdc;
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
        height: 120px;
        line-height: 120px;
        border-bottom: solid 1px #dcdcdc;
        text-align: left;
        & > span:nth-child(1) {
            display: inline-block;
            margin-left: 30px;
            width: 170px;
            font-size: 28px;
            color: #575757;
        }
        & > span:nth-child(3) {
            display: inline-block;
            width: 60px;
            font-size: 24px;
            color: #3e80ca;
        }
        & > input {
            width: 440px;
            font-size: 24px;
            color: #aaa;
            border: none;
        }
        & > input:focus {
            outline: none;
        }
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
