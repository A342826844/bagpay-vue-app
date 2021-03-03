<template>
    <div class="transfer-out">
        <TitleHeader :title="title">
            <img
                class="transfer-out-qrcode"
                @click="$router.push(`/scanQRCode`)"
                slot="header"
                v-if="$route.name !== 'transferpayment'"
                src="../../assets/img/common/qrcode1.png" alt=""
            >
            <form @submit.prevent="" class="transfer-out-form app-padding40">
                <div class="form-item">
                    <div class="lable" v-t="'payment.toAdd'"></div>
                    <!-- <V-Field
                        v-model="form.address"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="64"
                        @input="queryUidByAddress"
                        :autofocus="true"
                        :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`"
                        show-word-limit
                    >
                    <div slot="button" class="button_cont">
                        <img class="app-img-50"
                            src="@/assets/img/home/assets.png"
                            v-if="$route.name !== 'transferpayment'"
                            @click="$router.push({
                                path: '/addrList',
                                query: {
                                    symbol: symbol,
                                    needMemo: charge.need_memo
                                }
                            })" alt="">
                    </div>
                    </V-Field> -->
                    <Inputs
                        v-model="form.address"
                        :decimal="charge.decimal"
                        maxlength="64"
                        @input="queryUidByAddress"
                        :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`"
                    >
                        <div class="button_cont">
                            <img class="app-img-50"
                                src="@/assets/img/home/assets.png"
                                v-if="$route.name !== 'transferpayment'"
                                @click="$router.push({
                                    path: '/addrList',
                                    query: {
                                        symbol: symbol,
                                        needMemo: charge.need_memo
                                    }
                                })" alt="">
                        </div>
                        <ul slot="option">
                            <li>24482484a54f65a45sdwdadw</li>
                            <li>24482484a54f65a45sdwdadw</li>
                            <li>24482484a54f65a45sdwdadw</li>
                        </ul>
                    </Inputs>
                </div>
                <div :class="hasProtocol ? 'chainshow' : 'chainhide' " class="form-item">
                    <Select @click="showPopupHandle">
                        <div class="flex-between-c">
                            <span v-t="'common.chainProtocol'"></span>
                            <span class="vertical-m">
                                {{activeProtocol.protocol && activeProtocol.protocol.toUpperCase()}}
                            </span>
                        </div>
                    </Select>
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
                <div class="fee_label">
                    <div class="lable flex-between-c">
                        <p>{{$t('common.minerFee')}}</p>
                        <p>{{`${ innerUser ? charge.internal_out_fee : charge.out_fee}  ${symbol.toUpperCase()}`}}</p>
                    </div>
                </div>
            </form>
            <Poptip>
                <!-- <PoptipItem>
                    {{$t('home.paymentTip11', {
                            amount: `${charge.out_fee} ${this.symbol.toUpperCase()}`,
                        }
                    )}}
                </PoptipItem>
                <PoptipItem>
                    {{$t('home.paymentTip10', {
                            amount: `${charge.internal_out_fee} ${this.symbol.toUpperCase()}`,
                        }
                    )}}
                </PoptipItem> -->
                <PoptipItem>
                    {{$t('home.paymentTip4', {
                            "txt": `${this.maxAmount} ${this.symbol.toUpperCase()}`,
                            amount: `${this.amount} ${this.symbol.toUpperCase()}`,
                            protocol: activeProtocol.protocol ? `(${activeProtocol.protocol.toUpperCase()})` : '',
                        }
                    )}}
                </PoptipItem>
                <!-- <PoptipItem v-show="hasProtocol">
                    {{$t('common.erc20Cash', {
                        protocol: activeProtocol.protocol && activeProtocol.protocol.toUpperCase()
                    })}}
                </PoptipItem> -->
                <PoptipItem>
                    {{$t('home.paymentTip5')}}
                </PoptipItem>
                <PoptipItem>
                    {{$t('home.paymentTip6')}}
                </PoptipItem>
            </Poptip>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <p class="app-padding40 flex-between-c actual-receipt">
                <span>{{$t('common.actualReceipt')}}</span>
                <span class=" primary-color">{{`${actualValue}  ${symbol.toUpperCase()}`}}</span>
            </p>
            <Button @click="auth" v-t="'common.ok'" :disabled="!form.address || (charge.need_memo === 1 && !form.memo) || !form.value"></Button>
        </div>
        <user-auth ref="UserAuth" :type="8" @save="saveHandle"></user-auth>
        <SelectPopup v-model="chainPopup">
            <SelectPopupItem
                v-for="item in chainList"
                :key="item.id"
                class="select-box"
                @click="selectChain(item)"
            >
                {{ item.protocol.toUpperCase() }}
            </SelectPopupItem>
        </SelectPopup><SelectPopup v-model="chainPopup">
            <SelectPopupItem
                v-for="item in chainList"
                :key="item.id"
                class="select-box"
                @click="selectChain(item)"
            >
                {{ item.protocol.toUpperCase() }}
            </SelectPopupItem>
        </SelectPopup>
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
    chainPopup: boolean; // 显示协议弹出
    hasProtocol: boolean; // 是否有协议
    activeProtocol: any; // 所选协议
    chainList: any[]; // 协议列表
    symbol: string;
    isLoading: boolean;
    innerUser: boolean;
    amount: number;
    maxAmount: number;
    internal_out_fee: string|number;
    form: form;
}

export default Vue.extend({
    name: 'TransferOut',
    data(): data {
        return {
            chainPopup: false,
            hasProtocol: false,
            activeProtocol: {},
            chainList: [],
            symbol: this.$route.query.symbol as string,
            isLoading: false,
            innerUser: false,
            amount: 0,
            maxAmount: 0,
            internal_out_fee: '--',
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
        // 实际到账
        actualValue(): string {
            const fee = this.innerUser ? this.charge.internal_out_fee : this.charge.out_fee;
            const value = Number(this.form.value) - fee;
            if (value && value > 0) return value.toFixed(this.charge.decimal);
            return (0).toFixed(this.charge.decimal);
        },
        title(): any {
            if (this.$route.name === 'transferpayment') {
                return `${this.symbol && this.symbol.toUpperCase()} ${this.$t('common.payment')}`;
            }
            return this.$t('common.tranfer');
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            // if (vm._userInfo.ver_lv === 0) {
            //     // XXX: 有时候页面会自动关, 所以给个定时器解决
            //     setTimeout(() => {
            //         vm.showLvConfirm(vm._userInfo.ver_lv);
            //     }, 100);
            // }
            // vm.getDataHandle();
            if (from.name === 'addrList') {
                vm.initAddress();
                return;
            }
            if (from.name === 'scanQRCode' && vm.$route.name === 'transferpayment') {
                vm.initAddress();
                vm.getData(from.name);
                return;
            }
            if (from.name === 'scanQRCode') {
                // eslint-disable-next-line no-param-reassign
                vm.form.address = vm.$store.state.qrcodeResult || '';
                return;
            }
            if (from.name === 'minesafepass' || from.name === 'verLv1' || from.name === 'minesafesetting') {
                return;
            }
            vm.initParams();
        });
    },
    methods: {
        initAddress() {
            this.symbol = this.$route.query.symbol as string;
            if (this.address.address) {
                this.form.address = this.address.address || '';
                this.form.memo = this.address.memo || '';
                this.activeProtocol.protocol = this.hasProtocol ? (this.address.protocol || 'erc20') : (this.address.protocol || '');
                this.queryUidByAddress();
            }
        },
        initParams() {
            this.form.value = '';
            this.form.password = '';
            this.form.remark = '';
            this.symbol = this.$route.query.symbol as string;
            this.form.address = '';
            this.form.memo = '';
            this.getData();
            // Promise.all([this.getDayAmount(), this.initUserInfo(), this.getWithdraw()]).finally(() => {
            //     this.isLoading = false;
            //     this.changeLoading(false);
            // });
        },
        showPopupHandle() {
            if (this.hasProtocol) {
                this.chainPopup = true;
            }
        },
        getDataHandle(name?: string) {
            return this.getCoinProtocols().then((res: any) => {
                if (res.length) {
                    if (name !== 'scanQRCode') {
                        this.activeProtocol = { ...res[0] };
                    }
                    this.hasProtocol = true;
                    this.chainList = res;
                } else {
                    this.activeProtocol = {};
                    this.hasProtocol = false;
                    this.chainList = [];
                }
            });
        },
        getCoinProtocols() {
            return this.$api.getCoinProtocols(this.symbol).then((res: any) => {
                if (res.data) return res.data;
                return [];
            }).catch(() => []);
        },
        selectChain(item: any) {
            this.activeProtocol = { ...item };
            this.getWithdraw();
        },
        queryUidByAddress() {
            if (!this.form.address) return;
            const params = {
                coin: this.symbol, // 币种
                address: this.form.address, // 地址
                protocol: this.activeProtocol.protocol,
                // protocol: [string] 协议,可选
            };
            this.$api.queryUidByAddress(params).then((res: any) => {
                if (res.data) {
                    this.innerUser = true;
                } else {
                    this.innerUser = false;
                }
            });
        },
        getData(name?: string) {
            this.isLoading = true;
            this.changeLoading(true);
            // this.getDayAmount();
            Promise.all([this.initUserInfo(), this.getDataHandle(name)]).then(() => {
                this.getWithdraw();
            });
            // this.initUserInfo().then(() => {
            //     this.getWithdraw();
            // });
        },
        // getDayAmount() {
        //     return this.$api.getDayAmount({
        //         coin: this.symbol,
        //     }).then((res: any) => {
        //         this.amount = res.data || 0;
        //     });
        // },
        showLvConfirm(ver_lv: number) {
            this.$dialog.confirm({
                title: `${this.$t('common.poptip')}`,
                message: ver_lv ? `${this.$t('home.paymentTip7')}` : `${this.$t('home.paymentTip8')}`,
                confirmButtonText: `${this.$t('otc.bind')}`,
                cancelButtonText: `${this.$t('common.cancle2')}`,
            }).then(() => {
                this.goVerLv();
            }).catch(() => {
                // if (ver_lv === 0) {
                //     this.$router.go(-1);
                // }
            });
        },
        goVerLv() {
            if (this._userInfo.ver_lv === 0) {
                this.$router.push('/mine/verlv1');
            // } else if (this._userInfo.ver_lv === 1) {
            //     this.$router.push('/mine/safesetting');
            // } else if (this._userInfo.ver_lv === 2) {
            //     this.$router.push('/mine/safesetting');
            } else {
                this.$router.push('/mine/safesetting?type=1');
            }
        },
        getWithdraw() {
            this.changeLoading(true);
            return this.$api.getWithdraw({
                protocol: this.activeProtocol.protocol,
                coin: this.symbol,
            }).then((res: any) => {
                if (res.data) {
                    this.internal_out_fee = res.data.internal_out_fee;
                    if (this._userInfo.ver_lv === 1) {
                        this.maxAmount = res.data.out_max_lv_1;
                    } else if (this._userInfo.ver_lv === 2) {
                        this.maxAmount = res.data.out_max_lv_2;
                    } else if (this._userInfo.ver_lv === 3) {
                        this.maxAmount = res.data.out_max;
                    } else {
                        this.maxAmount = res.data.max_amount_24h;
                    }
                    this.amount = res.data.amount_24h;
                } else {
                    this.maxAmount = 0;
                }
            }).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
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
                if (this._userInfo.ver_lv === 3) {
                    this.$normalToast(this.$t('home.paymentTip4', {
                        txt: `${this.maxAmount} ${this.symbol.toUpperCase()}`,
                        amount: `${this.amount} ${this.symbol.toUpperCase()}`,
                    }));
                    return;
                }
                this.showLvConfirm(this._userInfo.ver_lv);
                return;
            }
            (this.$refs.UserAuth as any).open();
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
                protocol: this.activeProtocol.protocol,
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
        .chainshow{
            margin-top: 60px !important;
            height: 99px;
            opacity: 1;
            transition: all 0.3s;
        }
        .chainhide{
            height: 0;
            transition: all 0.3s;
            margin-top: 0 !important;
            opacity: 0;
        }
        margin-top: 76px;
        .fee_label{
            margin-top: 30px;
        }
        .form-item{
            &+.form-item{
                margin-top: 60px;
            }
            .lable{
                margin-bottom: 40px;
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
    .actual-receipt{
        margin: 30px 0;
    }
    .lxa-footer-btn{
        padding-top: 0;
    }
}
</style>
