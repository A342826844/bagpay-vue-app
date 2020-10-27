<template>
    <div class="transfer-out">
        <TitleHeader :title="`${symbol.toUpperCase()} ${$t('payment.transferOut')}`">
            <!-- <img class="transfer-out-qrcode" slot="header" src="../../assets/img/common/qrcode1.png" alt=""> -->
            <form class="transfer-out-form app-padding40">
                <div class="form-item">
                    <div class="lable" v-t="'payment.chequesAddr'"></div>
                    <V-Field
                        v-model="form.address"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="64"
                        :autofocus="true"
                        :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`"
                        show-word-limit
                    >
                    <div slot="button" class="button_cont">
                        <img class="app-img-50"
                            src="@/assets/img/home/assets.png"
                            @click="$router.push({
                                path: 'addrList',
                                query: {
                                    symbol: symbol,
                                    needMemo: charge.need_memo
                                }
                            })" alt="">
                    </div>
                    </V-Field>
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
            <Poptip>
                <PoptipItem>
                    {{ `24小时内最高可转${this.maxAmount} ${this.symbol.toUpperCase()}` }}
                </PoptipItem>
                <PoptipItem>
                    为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。
                </PoptipItem>
                <PoptipItem>
                    请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
                </PoptipItem>
            </Poptip>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button @click="auth" v-t="'common.ok'" :disabled="!form.address || (charge.need_memo === 1 && !form.memo) || !form.value"></Button>
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
    isLoading: boolean;
    amount: number;
    maxAmount: number;
    form: form;
}

export default Vue.extend({
    name: 'AddSymbol',
    data(): data {
        return {
            symbol: this.$route.query.symbol as string,
            isLoading: false,
            amount: 0,
            maxAmount: 0,
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
            vm.initAddress();
            if (from.name !== 'addrList') {
                vm.initParams();
            }
        });
    },
    methods: {
        initAddress() {
            this.form.address = this.address.address || '';
            this.form.memo = this.address.memo || '';
        },
        initParams() {
            this.form.value = '';
            this.form.password = '';
            this.form.remark = '';
            this.isLoading = true;
            this.changeLoading(true);
            Promise.all([this.getDayAmount(), this.getCoinOne()]).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
        getDayAmount() {
            return this.$api.getDayAmount({
                coin: this.symbol,
            }).then((res: any) => {
                this.amount = res.data || 0;
            });
        },
        getCoinOne() {
            return this.$api.getCoinOne({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.data) {
                    if (this._userInfo.ver_lv === 1) {
                        this.maxAmount = res.data.out_max_lv_1;
                    } else if (this._userInfo.ver_lv === 2) {
                        this.maxAmount = res.data.out_max_lv_2;
                    } else if (this._userInfo.ver_lv === 3) {
                        this.maxAmount = res.data.out_max;
                    } else {
                        this.maxAmount = 0;
                    }
                    console.log(this.maxAmount);
                } else {
                    this.maxAmount = 0;
                }
            });
        },
        auth() {
            if (this.isLoading) return;
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
            if (!vfi) return;
            if (Number(this.form.value) + this.amount > this.maxAmount) {
                this.$normalToast(`24小时内最高可转${this.maxAmount} ${this.symbol.toUpperCase()}`);
            } else {
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
            if (this.isLoading) return;
            this.isLoading = true;
            this.changeLoading(true);
            this.$api.withdrawSubmit({
                address: this.form.address,
                memo: this.form.memo,
                amount: this.form.value,
                coin: this.symbol,
                ...auth,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.$router.go(-1);
                }
            }).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
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
