<template>
    <div class="otc-submit">
        <TitleHeader>
            <template #title>
                {{ orderDetail.type | orderSideType}}
                <span class="primary-color">{{orderDetail.coin && orderDetail.coin.toUpperCase()}}</span>
            </template>
            <div class="otc-submit-box">
                <div class="flex-between-c app-padding40">
                    <div>
                        <div class="flex-start-c app-padding-r40">
                            <h5 class="name ellipsis-1">{{ orderDetail.nickname }}</h5>
                            <!-- <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt=""> -->
                        </div>
                        <p class="otc-submit-pay">
                            <span v-for="item in orderDetail.pay_types.split(',')" :key="item">
                                {{ item | payType}}
                            </span>
                        </p>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">{{$t('otc.unitPrice')}}</p>
                        <h6 class="app-size-34 primary-color otc-submit-price">{{ orderDetail.price }}</h6>
                    </div>
                </div>
                <div class="flex-between-c app-padding40 app-margin-t40 otc-submit-amountinfo">
                    <div class="text-align-l">
                        <p class="lable">{{$t('otc.num')}}({{orderDetail.coin && orderDetail.coin.toUpperCase()}})</p>
                        <h6 class="app-size-34 otc-submit-price">
                            {{ total }}
                        </h6>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">{{$t('otc.quota')}}</p>
                        <h6 class="app-size-34 otc-submit-price">{{_unitIcon}}{{orderDetail.min_value}}~{{maxValue}}</h6>
                    </div>
                </div>
                <div v-show="orderDetail.remark" class="app-padding40">
                    <div class="border-b "></div>
                </div>
                <div v-show="orderDetail.remark" class="text-align-l otc-submit-mark app-padding40">
                    <p class="lable">{{$t('otc.remark')}}</p>
                    <div class="otc-submit-num">
                        {{ orderDetail.remark }}
                    </div>
                </div>
            </div>
            <form @submit.prevent="" class="otc-submit-form app-padding40 text-align-l app-size-34">
                <div class="form-lable flex-between-c">
                    <span>{{ orderDetail.type | orderSideType}}{{$t('otc.num')}}</span>
                    <span v-show="orderDetail.type === 1" class="app-size-28">
                        <span v-t="'mine.availableAmount'"></span>:
                        <span class="primary-color">{{balance}}</span>
                        {{orderDetail.coin && orderDetail.coin.toUpperCase()}}
                    </span>
                </div>
                <div class="form-lable">
                    <input
                        class="form-input app-padding40"
                        :decimal="2"
                        :placeholder="`${$t('otc.maxTrade')}${maxTip} ${orderDetail.coin && orderDetail.coin.toUpperCase()}`"
                        v-model="form.amount"
                        @input="inputAmount('amount')"
                    />
                </div>
                <div class="form-lable">{{$t('otc.payAmount')}}</div>
                <div class="form-lable">
                    <input
                        class="form-input app-padding40"
                        decimal
                        :placeholder="`${$t('otc.minAmount')}${minTip} ${_unitIcon}`"
                        v-model="form.value"
                        @input="inputAmount('value')"
                    />
                </div>
                <div class="form-lable">{{orderDetail.type === 2 ? $t('common.payway') : $t('otc.payment')}}</div>
                <div class="form-lable">
                    <Select @click="selectPayHandle">
                        <span v-show="form.pay_type">{{form.pay_type | payType}}</span>
                        <span v-show="!form.pay_type">{{$t('otc.selectPayWay')}}</span>
                    </Select>
                </div>
                <p class="flex-between-c fee">
                    <span>{{$t('common.fee')}}: </span>
                    <span>{{feeValue + (orderDetail.coin && orderDetail.coin.toUpperCase())}}</span>
                </p>
                <p
                    v-show="orderDetail.type === 1 && coinInfo.otc_fee"
                    class="red-color form-tip text-align-l"
                >
                    {{$t('common.placeolderFee')}}
                </p>
            </form>
            <div>
                <Poptip>
                    <PoptipItem>
                        {{$t('common.placeFee')}}: {{coinInfo.otc_fee * 100}} %
                    </PoptipItem>
                    <PoptipItem>
                        {{$t('business.vfiBusTip1')}}
                    </PoptipItem>
                    <PoptipItem>
                        {{$t('business.vfiBusTip2')}}
                    </PoptipItem>
                </Poptip>
            </div>
        </TitleHeader>
        <user-auth ref="UserAuth" :type="10" @save="saveHandle"></user-auth>
        <div class="app-size-34 app-padding40 lxa-footer-btn flex-around-c">
            <Button @click="$router.go(-1)" size="medium" type="cancel">{{$t('common.cancle2')}}（{{download}} s）</Button>
            <Button @click="submitHandle" size="medium" :disabled="!form.amount || !form.value" type="up">{{$t('common.ok')}}</Button>
        </div>
        <SelectPopup v-model="payPopup">
            <SelectPopupItem
                v-for="item in pay_types"
                :key="item"
                class="select-box"
                @click="selectPayType(item)"
            >
                {{ item | payType }}
            </SelectPopupItem>
        </SelectPopup>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    orderDetail: any;
    timer: any;
    download: number;
    payPopup: boolean;
    balances: any[];
    // pay_types: any[];
    form: {
        amount: string;
        value: string;
        pay_type: string|number;
    };
}

export default Vue.extend({
    name: 'OtcSubmit',
    data(): data {
        return {
            download: 60,
            timer: 0,
            balances: [],
            // pay_types: [],
            payPopup: false,
            orderDetail: {
                // id: 1,
                // uid: 10, // 所属用户id
                // nickname: 'allen', // 昵称
                // coin: 'usdt', // 币种
                // type: 1, // OrderSide 交易方向
                // price: 1, // 价格
                // total: 100, // 总数量
                // filled: 10, // 已成交
                // filled_value: 10, // 已成交金额
                // frozen: 0, // 下单被冻结数量
                // min_value: 10, // 最小下单金额
                // max_value: 100, // 最大下单金额
                pay_types: '', // 支持的支付类型
                // country: 1, // 国家类型
                // currency: 1, // 货币类型
                // remark: '', // 备注
                // status: 1, // OrderState
                // floating_rate: 0, // 采用浮动价格后有效，溢价比例，0为不采用浮动价格, 1为不溢价，大于1为正溢价，小于1为负溢价
                // close_why: '', // 平台强制关闭的原因
                // created_at: '', // 创建时间
            },
            form: {
                amount: '',
                value: '',
                pay_type: '',
            },
        };
    },
    // created() {
    //     this.getOrder();
    //     this.downLoadHandle();
    // },
    // beforeDestroy() {
    //     clearInterval(this.timer);
    // },
    beforeRouteLeave(to, from, next) {
        clearInterval(this.timer);
        if (to.name !== 'PaywaySelect') {
            this.$store.commit('resetOtcPayTypes');
        }
        next();
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'PaywaySelect') {
                vm.setPayType();
            } else {
                vm.initData();
                vm.getOrder();
            }
            vm.downLoadHandle();
        });
    },
    computed: {
        maxTip(): any {
            const {
                max_value, price,
            } = (this as any).orderDetail;
            const maxValue = Math.floor(max_value / price);
            // const maxTotal = (total - frozen).toFixed(this.coinInfo.decimal);
            const res = Math.min(Number(maxValue), this.total);
            return res;
        },
        minTip(): any {
            return (this as any).orderDetail.min_value;
        },
        coinInfo(): CoinInfo {
            return this.$store.getters.getCoinInfo(this.orderDetail.coin);
        },
        feeValue(): string {
            const { otc_fee } = this.coinInfo;
            if (Number(this.form.amount)) {
                return (Number(this.form.amount) * otc_fee).toFixed(this.coinInfo.decimal);
            }
            return (0).toFixed(this.coinInfo.decimal);
        },
        total(): number {
            return Number((this.orderDetail.total - this.orderDetail.filled - this.orderDetail.frozen).toFixed(this.coinInfo.decimal));
        },
        maxValue(): number {
            const total = Math.floor(this.total * this.orderDetail.price);
            const max = Math.min(total, this.orderDetail.max_value);
            return max;
        },
        balance(): number {
            const res = this.balances.find((item) => item.coin === this.orderDetail.coin);
            return res ? res.available : 0;
        },
        userBank(): Array<any> {
            return this.$store.getters.getBankEnableList;
        },
        pay_types(): any[] {
            if (this.orderDetail.type === 2) {
                return this.orderDetail.pay_types.split(',');
            }
            const res = this.userBank.filter((item: any) => this.orderDetail.pay_types.split(',').includes(`${item.type}`));
            return res.map((item: any) => `${item.type}`);
        },
    },
    watch: {
        pay_types(value) {
            if (value && value.length === 1 && !this.form.pay_type) {
                // eslint-disable-next-line prefer-destructuring
                this.form.pay_type = value[0];
            }
        },
    },
    methods: {
        initData() {
            this.form = {
                amount: '',
                value: '',
                pay_type: '',
            };
            this.orderDetail = {
                pay_types: '', // 支持的支付类型
            };
            this.download = 60;
        },
        getOrder() {
            this.getBalances();
            if (this.$route.query.id) {
                this.orderDetail.id = Number(this.$route.query.id);
                this.getOrderDetail();
                return;
            }
            this.orderDetail = { ...this.$route.params };
            if (!this.orderDetail.id) {
                this.$router.go(-1);
            }
            if (this.orderDetail.inputValue) {
                this.form.value = this.orderDetail.inputValue;
                this.inputAmount('value');
            } else {
                this.form.amount = this.orderDetail.inputAmount;
                this.inputAmount('amount');
            }
            if (this.orderDetail.selectPayType) {
                this.form.pay_type = Number(this.orderDetail.selectPayType);
            }
        },
        selectPayType(type: string) {
            this.form.pay_type = type;
        },
        selectPayHandle() {
            // this.payPopup = true;
            if (this.orderDetail.type === 2) {
                this.payPopup = true;
                return;
            }
            this.$router.push(`/payway/select?type=1&pay_types=${this.orderDetail.pay_types}&selectType=${this.form.pay_type}`);
        },
        setPayType() {
            const [pay_type] = this.$store.state.otcPayTypes.map((item: any) => item.type);
            // eslint-disable-next-line prefer-destructuring
            this.form.pay_type = Number(pay_type);
        },
        getOrderDetail() {
            this.changeLoading(true);
            return this.$api.otcOrderGetById(this.orderDetail.id).then((res: any) => {
                this.changeLoading(false);
                if (res.data) {
                    this.orderDetail = res.data;
                }
            }).catch(() => {
                this.changeLoading(false);
                this.$normalToast(this.$t('otc.orderInfoFailed'));
            });
        },
        downLoadHandle() {
            this.timer = setInterval(() => {
                this.download -= 1;
                if (this.download <= 0) {
                    this.download = 0;
                    if (!this._loading) {
                        this.$router.go(-1);
                    }
                }
            }, 1000);
        },
        submitHandle() {
            if (!Number(this.form.amount)) {
                this.$normalToast(this.$t('otc.enterNum'));
                return;
            }
            if (Number(this.form.amount) <= 0) {
                this.$normalToast(this.$t('otc.enterNum'));
                return;
            }
            if (!this.form.pay_type) {
                this.$normalToast(this.$t('otc.selectPayWay'));
                return;
            }
            // this.$dialog.confirm({
            //     title: '确认下单',
            //     messageAlign: 'left',
            //     message: `<div class="app-reset-diolog-message">
            //         <span class="primary-color">如果您未收到买家付款， 请不要释放交易</span>
            //     </div>`,
            // }).then(() => {
            //     this.otcDealSubmit();
            // });
            if (this.orderDetail.type === 1) {
                (this.$refs.UserAuth as any).open();
            } else {
                this.otcDealSubmit({});
            }
        },
        saveHandle(data: any) {
            this.otcDealSubmit(data);
        },
        inputAmount(value: 'amount'|'value') {
            this.inputSliceHandle(value);
            if (value === 'amount') {
                const amount = Number(this.form.amount) || 0;
                // this.form.value = this.$dividedBy(amount, this.orderDetail.price);
                this.form.value = `${Number((amount * this.orderDetail.price).toFixed(this.$store.getters.getCurrencyTypeInfo.decaimal)) || ''}`;
            } else if (value === 'value') {
                const amount = Number(this.form.value) || 0;
                // this.form.amount = this.$multipliedBy(amount, this.orderDetail.price);
                // this.form.amount = Math.ceil(this.form.amount *100)/100
                this.form.amount = `${Number((amount / this.orderDetail.price).toFixed(this.coinInfo.decimal)) || ''}`;
            }
        },
        inputSliceHandle(value: 'amount'|'value') {
            // if (key === 'amount') {
            //     this.form.value = (Number(this.form.amount) * this.orderDetail.price).toFixed(this.$store.state.unitDecimal);
            // } else {
            //     this.form.amount = (Number(this.form.value) / this.orderDetail.price).toFixed(this.coinInfo.decimal);
            // }
            // eslint-disable-next-line
            this.form[value] = String(this.form[value]).replace(/[^0-9\.?]/g, '');
            const dioLeng = this.form[value].split('.');
            if (dioLeng.length < 2) return;
            const { unitDecimal } = this.$store.state;
            const { decimal } = this.coinInfo;
            if (value === 'amount') {
                this.form[value] = `${dioLeng[0]}.${String(dioLeng[1]).replace(/\./g, '').slice(0, decimal)}`;
            } else {
                this.form[value] = `${dioLeng[0]}.${String(dioLeng[1]).replace(/\./g, '').slice(0, unitDecimal)}`;
            }
        },
        otcDealSubmit(data: any) {
            const params = {
                order_id: this.orderDetail.id, // [int64] 广告id
                pay_type: Number(this.form.pay_type), // [PayType] 支付类型
                price: this.orderDetail.price, // [float64] 价格
                amount: Number(this.form.amount), // [float64] 数量
                ...data,
            };
            if (this._loading) return;
            this.changeLoading(true);
            this.$api.otcDealSubmit(params).then((res: any) => {
                this.changeLoading(false);
                this.$router.replace(`/otc/order/detail?id=${res.data.id}`);
            }).catch(() => {
                this.$normalToast(this.$t('otc.orderFailed'));
                this.changeLoading(false);
            });
        },
        getBalances() {
            this.$api.getBalances().then((res: any) => {
                this.balances = res.data;
            });
        },
    },
});
</script>
<style lang="less" scoped>
.otc-submit{
    background: #f8f8f8;
    height: 100%;
    // padding-bottom: 100px;
    overflow: scroll;
    position: relative;
    .lable{
        color: #A5A5A5;
    }
    .name{
        color: #202025;
        font-size: 28px;
    }
    .value{
        color: #333333;
    }
    &-pay{
        margin-top: 8px;
        text-align: left;
    }
    &-price{
        margin-top: 15px;
    }
    &-num{
        margin-top: 22px;
        line-height: 50px;
    }
    &-amountinfo{
        padding-bottom: 33px;
    }
    &-mark{
        padding-top: 33px;
        padding-bottom: 33px;
        color: #333333;
        font-size: 28px;
        min-height: 150px;
        .lable{
            font-size: 24px;
        }
    }
    &-box{
        background: #ffffff;
        padding-top: 40px;
    }
    &-form{
        margin-top: 34px;
        padding-top: 53px;
        padding-bottom: 40px;
        background: #ffffff;
        .form-tip{
            font-size: 22px;
        }
        .form-lable{
            margin-bottom: 43px;
        }
        .form-input{
            height: 99px;
            line-height: 60px;
            width: 100%;
            background: #F5F7F9;
            border-radius: 10px;
            // margin-bottom: 43px;
        }
    }
    &-btn{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .fee{
        padding-top: 12px;
        padding-bottom: 12px;
        font-size: 32px;
    }
}
</style>
