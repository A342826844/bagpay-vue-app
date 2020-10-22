<template>
    <div class="transfer-out">
        <TitleHeader :title="`${symbol.toUpperCase()} ${$t('payment.transferOut')}`">
            <!-- <img class="transfer-out-qrcode" slot="header" src="../../assets/img/common/qrcode1.png" alt=""> -->
            <form class="transfer-out-form app-padding40">
                <div class="form-item">
                    <div class="lable" v-t="'payment.chequesAddr'"></div>
                    <Inputs v-model="form.address" :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`">
                        <img class="transfer-out-assets"
                            src="@/assets/img/home/assets.png"
                            @click="$router.push({
                                path: 'addrList',
                                query: {
                                    symbol: symbol,
                                    needMemo: charge.need_memo
                                }
                            })" alt="">
                    </Inputs>
                </div>
                <div class="form-item" v-if="charge.need_memo === 1">
                    <div class="lable" v-t="'payment.memoAddr'"></div>
                    <Inputs v-model="form.memo" :placeholder="`${symbol.toUpperCase()} ${$t('payment.memoAddr')}`"></Inputs>
                </div>
                <div class="form-item">
                    <div class="lable" v-t="'payment.amount'"></div>
                    <Inputs class="amount-input" v-model="form.value" type="number" :decimal="charge.decimal" placeholder="0"></Inputs>
                </div>
                <!-- <div class="form-item">
                    <div class="lable" v-t="'payment.remark'"></div>
                    <Inputs v-model="form.remark" :placeholder="$t('payment.remark')"></Inputs>
                </div> -->
                <div class="form-item">
                    <div class="lable flex-between-c">
                        <p>手续费</p>
                        <p>{{`${charge.out_fee}  ${symbol.toUpperCase()}`}}</p>
                    </div>
                </div>
            </form>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button @click="auth" v-t="'common.save'"></Button>
        </div>
        <user-auth ref="UserAuth" :type="8" @save="saveHandle"></user-auth>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type form = {
    address: string;
    memo: string;
    value: string;
    password: string;
    remark: string;
}

type data = {
    symbol: string;
    form: form;
}

export default Vue.extend({
    name: 'AddSymbol',
    data(): data {
        return {
            symbol: this.$route.query.symbol as string,
            form: {
                address: '',
                memo: '',
                value: '',
                password: '',
                remark: '',
            },
        };
    },
    computed: {
        charge() {
            const activeItem: any = this.$store.state.symbolList.find((item: any) => item.symbol === this.symbol);
            return activeItem || {};
        },
        address() {
            return this.$store.state.address;
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'transferhistory') {
                vm.initParams();
            }
        });
    },
    activated() {
        this.form.address = this.address.address || '';
        this.form.memo = this.address.memo || '';
    },
    methods: {
        initParams() {
            this.form.address = '';
            this.form.memo = '';
            this.form.value = '';
            this.form.password = '';
            this.form.remark = '';
        },
        auth() {
            const vfi: boolean = this.$verification.fromVfi([
                {
                    type: 'empty',
                    msg: this.$t('payment.chequesAddr'),
                    value: this.form.address,
                },
                {
                    type: 'empty',
                    msg: this.$t('payment.amount'),
                    value: this.form.value,
                },
            ]);
            if (vfi) {
                (this.$refs.UserAuth as any).open();
            }
        },
        saveHandle(auth: any) {
            /**
             *
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
             */
            // TODO
            this.$api.withdrawSubmit({
                address: this.form.address,
                memo: this.form.memo,
                amount: this.form.value,
                coin: this.symbol,
                ...auth,
            }).then((res: any) => {
                this.$router.go(-1);
            });
        },
    },
});
</script>

<style lang="less" scoped>
.transfer-out{
    height: 100%;
    overflow: scroll;
    font-size: 34px;
    text-align: left;
    &-qrcode, &-assets{
        width: 50px;
    }
    &-form{
        padding-bottom: 150px;
        .form-item{
            margin-top: 76px;
            &:last-child{
                margin-top: 63px;
            }
            .lable{
                margin-bottom: 43px;
            }
            .amount-input{
                height: 169px;
                line-height: 169px;
                font-size: 76px;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
            .remark-input{
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
            .amount-line{
                padding: 32px 40px 0;
                background: #F5F7F9;
            }
        }
    }
}
</style>
