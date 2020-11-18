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
                        <div class="flex-start-c">
                            <h5 class="name">{{ orderDetail.nickname }}</h5>
                            <!-- <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt=""> -->
                        </div>
                        <p class="otc-submit-pay">{{ orderDetail.pay_types | payType}}</p>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">{{$t('otc.unitPrice')}}</p>
                        <h6 class="app-size-34 primary-color otc-submit-price">{{ orderDetail.price }}</h6>
                    </div>
                </div>
                <div class="flex-between-c app-padding40 app-margin-t40">
                    <div class="text-align-l">
                        <p class="lable">{{$t('otc.num')}}({{orderDetail.coin && orderDetail.coin.toUpperCase()}})</p>
                        <h6 class="app-size-34 otc-submit-price">
                            {{ Number((orderDetail.total - orderDetail.filled - orderDetail.frozen).toFixed(4)) }}
                        </h6>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">{{$t('otc.quota')}}</p>
                        <h6 class="app-size-34 otc-submit-price">{{_unitIcon}}{{orderDetail.min_value}}~{{orderDetail.max_value}}</h6>
                    </div>
                </div>
                <div class="app-padding40 app-margin-t40">
                    <div class="border-b "></div>
                </div>
                <div class="text-align-l otc-submit-mark app-padding40">
                    <p class="lable">{{$t('otc.remark')}}</p>
                    <div class="otc-submit-num">
                        {{ orderDetail.remark }}
                    </div>
                </div>
            </div>
            <form class="otc-submit-form app-padding40 text-align-l app-size-34">
                <div class="form-lable">{{ orderDetail.type | orderSideType}}{{$t('otc.num')}}</div>
                <input
                    class="form-input app-padding40"
                    :decimal="2"
                    :placeholder="`${$t('otc.maxTrade')}${maxTip} ${orderDetail.coin && orderDetail.coin.toUpperCase()}`"
                    v-model="form.amount"
                    @input="inputAmount('amount')"
                />
                <div class="form-lable">{{$t('otc.payAmount')}}</div>
                <input
                    class="form-input app-padding40"
                    decimal
                    :placeholder="`${$t('otc.minAmount')}${minTip} ${_unitIcon}`"
                    v-model="form.value"
                    @input="inputAmount('value')"
                />
            </form>
            <div>
                <Poptip>
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
        <div class="otc-submit-btn custom-footer app-size-34 flex-around-c">
            <Button :radius="false" @click="$router.go(-1)" type="cancel">{{$t('common.cancle2')}}（{{download}} s）</Button>
            <Button :radius="false" @click="submitHandle" :disabled="!form.amount || !form.value" type="up">{{$t('common.ok')}}</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    orderDetail: any;
    timer: any;
    download: number;
    form: {
        amount: string;
        value: string;
    };
}

export default Vue.extend({
    name: 'OtcSubmit',
    data(): data {
        return {
            download: 60,
            timer: 0,
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
                // pay_types: '1,2', // 支持的支付类型
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
            },
        };
    },
    created() {
        this.getOrder();
        this.downLoadHandle();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    computed: {
        maxTip(): any {
            const {
                max_value, total, price, frozen,
            } = (this as any).orderDetail;
            const maxValue = (max_value / price).toFixed(2);
            const maxTotal = (total - frozen).toFixed(2);
            const res = Math.max(Number(maxValue), Number(maxTotal));
            return res;
        },
        minTip(): any {
            return (this as any).orderDetail.min_value;
        },
        coinInfo(): CoinInfo {
            return this.$store.getters.getCoinInfo('usdt');
        },
    },
    methods: {
        getOrder() {
            this.orderDetail = { ...this.$route.params };
            if (!this.orderDetail.id) {
                this.$router.go(-1);
            }
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
                pay_type: Number(this.orderDetail.pay_types), // [PayType] 支付类型
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
    },
});
</script>
<style lang="less" scoped>
.otc-submit{
    background: #f8f8f8;
    height: 100%;
    padding-bottom: 100px;
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
    &-mark{
        padding-top: 33px;
        color: #333333;
        font-size: 28px;
        height: 248px;
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
        .form-lable{
            margin-bottom: 43px;
        }
        .form-input{
            height: 99px;
            line-height: 60px;
            width: 100%;
            background: #F5F7F9;
            border-radius: 10px;
            margin-bottom: 43px;
        }
    }
    &-btn{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
</style>
