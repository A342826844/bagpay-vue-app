<template>
    <div class="set-payment-add">
        <TitleHeader :title="$t('payment.addAddress')" />
        <form class="set-payment-add-form app-padding40">
            <div class="form-item">
                <div class="lable" v-t="'payment.choiceAddress'"></div>
                <div @click="$router.push(`/choisesymbol?symbol=${symbol}`)" class="form-item-select app-padding40 flex-between-c">
                    <div>
                        <icon-img class="app-img-50" :symbol="symbol"></icon-img>
                        <span class="select-symbol vertical-m">{{symbol.toUpperCase()}}</span>
                    </div>
                    <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                </div>
            </div>
            <div class="form-item form-item-card">
                <div class="lable" v-t="'payment.chequesAddr'"></div>
                <Inputs v-model="form.address" :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`">
                    <img class="app-img-50" src="../../assets/img/common/qrcode1.png" alt="">
                </Inputs>
            </div>
            <div class="form-item form-item-card" v-show="needMede === '1'">
                <div class="lable" v-t="'payment.memoAddr'"></div>
                <Inputs v-model="form.memoAddr" :placeholder="`${symbol.toUpperCase()} ${$t('payment.memoAddr')}`">
                    <img class="app-img-50" src="../../assets/img/common/qrcode1.png" alt="">
                </Inputs>
            </div>
            <div class="form-item">
                <div class="lable" v-t="'common.name'"></div>
                <Inputs v-model="form.remark" maxlength="10" :placeholder="$t('payment.remark')"></Inputs>
            </div>
        </form>
        <div class="lxa-footer-btn">
            <Button @click="saveHandle" v-t="'common.save'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    symbol: string;
    needMede: string;
    form: {
        address: string;
        memoAddr: string;
        remark: string;
    };
}

export default Vue.extend({
    name: 'SetPaymentAdd',
    data(): data {
        return {
            symbol: 'tusd',
            needMede: '',
            form: {
                address: '',
                memoAddr: '',
                remark: '',
            },
        };
    },
    mounted() {
        this.symbol = sessionStorage.getItem('symbol') as string;
        this.needMede = sessionStorage.getItem('needMede') as string;
    },
    methods: {
        saveHandle() {
            if (!this.form.address) {
                console.log('请填写地址');
            } else if (this.needMede === '1' && !this.form.memoAddr) {
                console.log('请填写附加地址');
            } else if (!this.form.remark) {
                console.log('请填写名称');
            } else {
                this.$api.addAddress({
                    coin: this.symbol,
                    remark: this.form.remark,
                    address: this.form.address,
                    // memo: this.form.memoAddr,
                }).then((res: any) => {
                    if (res.code === 0) {
                        this.$router.go(-1);
                    }
                });
            }
            /**
             * ```txt
coin: [string] 所属币种
protocol: [string] 所属协议,erc20,trc20,eos
remark: [string] 备注
address: [string] 地址
memo: [string] 地址附加信息
trust: [int] 是否是可信的

password: [string] 可选, 密码
pay_password: [string] 可选, 支付密码
sms_code: [string] 可选,短信验证码
email_code: [string] 可选,邮箱验证码
ga_code: [string] 可选,google验证码
```
             */
        },
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.set-payment-add{
    height: 100%;
    font-size: 34px;
    &-form{
        margin-top: 58px;
        text-align: left;
        .form-item{
            margin-top: 76px;
            &-select{
                height: 99px;
                background: #F5F7F9;
                .select-symbol{
                    margin-left: 26px;
                }
            }
            .lable{
                margin-bottom: 43px;
            }
        }
    }
}
</style>
