<template>
    <div class="otc-advertising">
        <Headers position="fixed">
            <span>
                {{$t('otc.referencePrice')}}
                <span @click="changePrice" class="primary-color">
                    {{exchangeRate[formTemp[typeKey].coin] || '--'}} {{_unitIcon}}
                </span>
            </span>
        </Headers>
        <TabList
            size="big"
            :defaultVal="type"
            class="otc-advertising-box-tabbar"
            @change="tabChangeHandle"
            :tabList="bodyTabList"
        >
            <div v-for="item in bodyTabList" :key="item.type" :slot="item.value" class="app-padding40">
                <form @submit.prevent="" class="otc-advertising-form app-size-34" action="">
                    <div class="form-item">
                        <Select @click="$router.push(`/choisesymbol?symbol=${formTemp['form'+item.type].coin}&type=1`)">
                            <span class=" form-item-start">
                                <IconImg class="app-img-50" :symbol="formTemp['form'+item.type].coin"/>
                            </span>
                            <span class="vertical-m">{{formTemp['form'+item.type].coin && formTemp['form'+item.type].coin.toUpperCase()}}
                            </span>
                        </Select>
                    </div>
                    <!-- <div @click="selectPopup = !selectPopup" class="form-item">
                        <Select>
                            <span class="vertical-m">{{isfloatRate ? $t('otc.floatingPrice') : $t('otc.fixedPrice') }}</span>
                        </Select>
                    </div>
                    <div class="form-item" :class="isfloatRate ? 'form-item-show' : 'form-item-hide'">
                        <Inputs v-model="form.floating_rate" placeholder="溢价率(30~50)">%</Inputs>
                    </div> -->
                    <div class="form-item">
                        <Inputs
                            decimal
                            type="number"
                            :autofocus="item.type === 1"
                            v-model="formTemp[`form${item.type}`].price"
                            :placeholder="`${item.title}${$t('common.price')}`"
                        >
                            <span class="form-item-start" slot="start">{{$t('common.price')}}</span>
                            {{_unitIcon}}
                        </Inputs>
                    </div>
                    <div class="form-item">
                        <Inputs
                            :decimal="coinInfo.decimal"
                            v-model="formTemp[`form${item.type}`].amount"
                            :placeholder="`${item.title}${$t('otc.num')}`"
                        >
                            <span class="form-item-start" slot="start" v-t="'otc.num'"></span>
                            {{coinSHow}}
                        </Inputs>
                        <p v-show="item.type === 2" class="red-color form-tip text-align-l app-padding40">{{$t('common.placeolderFee')}}</p>
                    </div>
                    <div class="form-item">
                        <Inputs readonly :value="total || $t('otc.total')">
                            <span class="form-item-start" slot="start">{{$t('otc.total')}}</span>
                            {{_unitIcon}}
                        </Inputs>
                    </div>
                    <div class="form-item">
                        <Inputs readonly :value="feeValue || $t('otc.total')">
                            <span class="form-item-start" slot="start">{{$t('common.fee')}}</span>
                            {{coinSHow}}
                        </Inputs>
                    </div>
                    <div class="form-item">
                        <Inputs decimal v-model="formTemp[`form${item.type}`].min_value" :placeholder="$t('otc.minLimit')">
                            <span class="form-item-start" slot="start">{{$t('otc.min')}}</span>
                            {{_unitIcon}}
                        </Inputs>
                    </div>
                    <div class="form-item">
                        <Inputs decimal v-model="formTemp[`form${item.type}`].max_value" :placeholder="$t('otc.maxLimit')">
                            <span class="form-item-start" slot="start">{{$t('otc.max')}}</span>
                            {{_unitIcon}}
                        </Inputs>
                    </div>
                    <div @click="selectPayHandle" class="form-item">
                        <Select>
                            <span v-if="formTemp[`form${item.type}`].pay_types.length" class="vertical-m">
                                {{formTemp[`form${item.type}`].pay_types[0] | payType}}
                            </span>
                            <span v-if="!formTemp[`form${item.type}`].pay_types.length" class="vertical-m">
                                {{item.type === 1 ? $t('common.payway') : $t('otc.payment')}}
                            </span>
                        </Select>
                    </div>
                    <!-- TODO 备注 -->
                    <div class="form-item text-align-l">{{$t('payment.remark')}}</div>
                    <div class="form-item">
                        <V-Field
                            v-model="formTemp[`form${item.type}`].remark"
                            rows="3"
                            autosize
                            type="textarea"
                            maxlength="60"
                            :placeholder="$t('payment.remarkTip')"
                            show-word-limit
                        >
                        </V-Field>
                    </div>
                </form>
                <Poptip>
                    <PoptipItem>
                        发布广告手续: {{coinInfo.otc_fee * 100}} %
                    </PoptipItem>
                    <PoptipItem>
                        {{$t('otc.advTip1')}}
                    </PoptipItem>
                    <PoptipItem>
                        {{$t('otc.advTip2')}}
                    </PoptipItem>
                    <PoptipItem>

                        {{$t('otc.advTip3')}}
                    </PoptipItem>
                </Poptip>
                <div class="app-size-34 lxa-footer-btn">
                    <Button
                        @click="submitHandle"
                        :disabled="!formTemp[`form${item.type}`].price
                        ||
                        !formTemp[`form${item.type}`].amount
                        ||
                        !formTemp[`form${item.type}`].min_value
                        ||
                        !formTemp[`form${item.type}`].max_value">{{$t('common.release')}}</Button>
                </div>
            </div>
        </TabList>
        <!-- <SelectPopup v-model="selectPopup">
            <SelectPopupItem @click="changeRateType(1)">{{$t('otc.floatingPrice')}}</SelectPopupItem>
            <SelectPopupItem @click="isfloatRate = false">{{$t('otc.fixedPrice')}}</SelectPopupItem>
        </SelectPopup> -->
        <user-auth ref="UserAuth" :type="10" @save="saveHandle"></user-auth>
        <SelectPopup v-model="payPopup">
            <SelectPopupItem v-for="item in PayType" :key="item" @click="selectPayType(item)">{{ item | payType }}</SelectPopupItem>
        </SelectPopup>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PayType } from '@/commons/config/index';

type data = {
    PayType: PayType;
    isfloatRate: boolean;
    pay_types: Array<number>;
    selectPopup: boolean;
    payPopup: boolean;
    exchangeRate: any;
    type: 1|2;
    formTemp: {
        form1: {
            price: string|number;
            amount: string|number;
            type: string|number;
            coin: string|number;
            country: number;
            currency: number;
            floating_rate: string|number;
            remark: string|number;
            min_value: string|number;
            max_value: string|number;
            pay_types: Array<any>;
        };
        form2: {
            price: string|number;
            amount: string|number;
            type: string|number;
            coin: string|number;
            country: number;
            currency: number;
            floating_rate: string|number;
            remark: string|number;
            min_value: string|number;
            max_value: string|number;
            pay_types: Array<any>;
        };
    };
}

export default Vue.extend({
    name: 'OtcAdv',
    data(): data {
        return {
            PayType,
            isfloatRate: true,
            selectPopup: false,
            payPopup: false,
            pay_types: [], // TODO: 出售和购买的支付方式不一样
            exchangeRate: {},
            type: 1,
            formTemp: {
                form1: {
                    coin: '',
                    type: 1,
                    price: '',
                    amount: '',
                    min_value: '',
                    max_value: '',
                    floating_rate: 0,
                    remark: '',
                    country: 1,
                    currency: 1,
                    pay_types: [],
                },
                form2: {
                    coin: '',
                    type: 1,
                    price: '',
                    amount: '',
                    min_value: '',
                    max_value: '',
                    floating_rate: 0,
                    remark: '',
                    country: 1,
                    currency: 1,
                    pay_types: [],
                },
            },
        };
    },
    computed: {
        coinInfo(): CoinInfo {
            return this.$store.getters.getCoinInfo(this.formTemp[this.typeKey].coin);
        },
        coinSHow(): string {
            return ((this as any).formTemp[this.typeKey].coin || '').toUpperCase();
        },
        total(): string {
            const res = Number((this as any).formTemp[this.typeKey].amount) * Number((this as any).formTemp[this.typeKey].price);
            return res ? res.toFixed(2) : '';
        },
        bankInfo(): any {
            return this.$store.state.bankInfo;
        },
        feeValue(): string {
            const { otc_fee } = this.coinInfo;
            if (Number(this.total)) {
                return (Number(this.formTemp[this.typeKey].amount) * otc_fee).toFixed(this.coinInfo.decimal);
            }
            return (0).toFixed(this.coinInfo.decimal);
        },
        typeKey(): 'form1'| 'form2' {
            return (`form${this.type}` as 'form1'| 'form2');
        },
        bodyTabList(): any {
            return [
                {
                    title: this.$t('common.sideBuyT'),
                    value: 'buy',
                    type: 1,
                }, {
                    title: this.$t('common.sideSellT'),
                    value: 'sell',
                    type: 2,
                },
            ];
        },
    },
    created() {
        this.formTemp.form1.coin = (this.$route.query.symbol as string) || '';
        this.formTemp.form2.coin = (this.$route.query.symbol as string) || '';
        this.getExchangeRate();
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'choisesymbol') {
                const symbol = sessionStorage.getItem('symbol');
                vm.setCoin(symbol);
            } else if (from.name === 'PaywaySelect') {
                vm.selectPayType(vm.$store.state.bankInfo.type);
            } else {
                vm.setCoin(to.query.symbol);
                vm.initFormData();
            }
        });
    },
    methods: {
        tabChangeHandle(item: any) {
            this.type = item.type;
        },
        setCoin(coin: string) {
            const key: 'form1'|'form2' = (`form${this.type}` as 'form1'|'form2');
            this.formTemp[key].coin = coin;
        },
        getExchangeRate() {
            this.$api.getExchangeRate().then((res: any) => {
                if (res.data) {
                    this.exchangeRate = res.data;
                }
            });
        },
        changePrice() {
            if (this.exchangeRate[this.formTemp[this.typeKey].coin]) {
                this.formTemp[this.typeKey].price = `${this.exchangeRate[this.formTemp[this.typeKey].coin]}`;
            }
        },
        selectPayHandle() {
            if (this.type === 1) {
                this.payPopup = !this.payPopup;
            } else {
                this.$router.push(`/payway/select?id=${this.bankInfo.id}`);
            }
        },
        selectPayType(item: number) {
            if (item) {
                this.formTemp[this.typeKey].pay_types = [item];
            }
        },
        initFormData() {
            this.formTemp.form1.price = '';
            this.formTemp.form1.amount = '';
            this.formTemp.form1.min_value = '';
            this.formTemp.form1.max_value = '';
            this.formTemp.form1.floating_rate = '';
            this.formTemp.form1.remark = '';
            this.formTemp.form2.price = '';
            this.formTemp.form2.amount = '';
            this.formTemp.form2.min_value = '';
            this.formTemp.form2.max_value = '';
            this.formTemp.form2.floating_rate = '';
            this.formTemp.form2.remark = '';
        },
        submitHandle() {
            console.log(this.coinInfo);
            if (!Number(this.formTemp[this.typeKey].price)) {
                this.$normalToast(this.$t('otc.enterPrice'));
                return;
            }
            if (Number(this.formTemp[this.typeKey].price) <= 0) {
                this.$normalToast(this.$t('otc.enterPrice2', { num: '0' }));
                return;
            }
            if (!Number(this.formTemp[this.typeKey].amount)) {
                this.$normalToast(this.$t('otc.enterNum2'));
                return;
            }
            if (Number(this.formTemp[this.typeKey].amount) <= 0) {
                this.$normalToast(this.$t('otc.enterNum2'));
                return;
            }
            if (!Number(this.formTemp[this.typeKey].min_value)) {
                this.$normalToast(this.$t('otc.minLimit2'));
                return;
            }
            if (Number(this.formTemp[this.typeKey].min_value) <= 0) {
                this.$normalToast(this.$t('otc.minLimit2'));
                return;
            }
            if (!this.formTemp[this.typeKey].max_value) {
                this.$normalToast(this.$t('otc.maxLimit2'));
                return;
            }
            if (!this.formTemp[this.typeKey].pay_types.length) {
                this.$normalToast(this.$t('otc.selectPayWay'));
                return;
            }
            if (Number(this.formTemp[this.typeKey].min_value) > Number(this.total)) {
                this.$normalToast(this.$t('otc.minLimit3'));
                return;
            }
            if (Number(this.formTemp[this.typeKey].max_value) <= Number(this.formTemp[this.typeKey].min_value)) {
                this.$normalToast(this.$t('otc.maxLimit3'));
                return;
            }
            if (this.type === 2) {
                (this.$refs.UserAuth as any).open();
            } else {
                this.saveHandle({});
            }
            // this.otcOrderPlace();
        },
        // saveHandle(data) {

        // },
        saveHandle(data: any) {
            // coin: [string] 币种标识
            // type: [OrderSide] 交易方向
            // price: [float64] 价格
            // total: [float64] 总数量
            // min_value: [float64] 最小下单交易额
            // max_value: [float64] 最大下单交易额,0为不限
            // pay_types: [string] 支持的支付方式类型[PayType],逗号分隔
            // country: [CountryType] 所在国家
            // currency: [CurrencyType] 法币类型
            // floating_rate: [float64] 采用浮动价格后有效，溢价比例，0为不采用浮动价格, 1为不溢价，大于1为正溢价，小于1为负溢价
            // remark: [string] 备注
            const params = {
                ...this.formTemp[this.typeKey],
                total: this.formTemp[this.typeKey].amount,
                type: this.type,
                pay_types: this.formTemp[this.typeKey].pay_types.join(','),
                ...data,
                country: this.$store.state.countryType,
                currency: this.$store.state.currencyType,
            };
            this.changeLoading(true);
            this.$api.otcOrderPlace(params).then((res: any) => {
                this.changeLoading(false);
                this.$router.replace(`/otc/adv/detail?id=${res.data}`);
            }).catch(() => {
                this.changeLoading(false);
            });
        },
    },
});
</script>

<style lang="less" scoped>
.otc-advertising{
    height: 100%;
    width: 100%;
    padding-top: 138px;
    &-box{
        padding-top: 50px;
        height: calc(100% - 88px);
    }
    .app-poptip{
        margin-bottom: 30px;
    }
    &-form{
        .form-item{
            margin-bottom: 36px;
            transition: all 0.3s;
            .form-tip{
                padding-top: 12px;
                font-size: 24px;
            }
            &:last-child{
                margin-bottom: 0;
            }
            &-start{
                margin-right: 60px;
                display: inline-block;
                min-width: 100px;
                text-align: left;
            }
            &-show{
                height: 100px;
            }
            &-hide{
                height: 0;
                margin-bottom: 0;
            }
            &-select-coin{
                margin-left: 25px;
            }
        }
    }
}
</style>
<style lang="less">
.otc-advertising-box{
    & &-tabbar{
        .tabbar{
            // position: absolute;
            left: 0;
        }
    }
}
</style>
