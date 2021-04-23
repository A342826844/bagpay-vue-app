<template>
    <div class="otc-quick-trade">
        <div class="app-padding40">
            <div class="flex-between-c margin-t-56 flex-wrap-between">
                <p class="app-line-height50">
                    {{$t('otc.bestPrice')}}
                    <span class="primary-color">{{bestPrice}} $/{{coin && coin.toUpperCase()}}</span>
                </p>
                <p class="app-line-height50" v-show="side === 1">
                    {{$t('otc.balance')}}: {{balance}} {{coin && coin.toUpperCase()}}
            </p>
            </div>
            <div v-if="false" class="margin-t-36 app-size-34">
                <Inputs
                    decimal
                    v-model="value"
                    :placeholder="$t('otc.placeInput', { type: methodType === 1 ? $t('otc.amount') : $t('otc.num')})"
                >
                    <span class="form-item-start" slot="start" v-t="methodType === 1? 'otc.amount' : 'otc.num'"></span>
                    <div class="switch">
                        {{methodType === 1 ? '$' : (coin && coin.toUpperCase())}}
                        <button @click="changeMethodType" class="switch-btn primary-bg">
                            <img class="app-img-50" src="../../../assets/img/common/switch.png" alt="">
                        </button>
                    </div>
                </Inputs>
            </div>
            <div v-if="false" class="margin-t-36 app-size-34 flex-between-c">
                <Select class="select-pay" @click="selectPayHandle">
                    <span v-for="item in pay_type" :key="item">{{item | payType}}</span>
                    <span v-show="!pay_type.length">{{side === 2 ? $t('common.payway') : $t('otc.payment')}}</span>
                </Select>
                <span>&nbsp;</span>
                <Button @click="tradeHandle">{{$t('otc.quick')}}{{ side | orderSideType}}</Button>
            </div>
            <div class="form-box margin-t-36 ">
                <div class="app-padding40 flex-between-c">
                    <span v-t="methodType === 1? 'otc.amount' : 'otc.num'"></span>
                    <span @click="changeMethodType" class="primary-color">{{methodType === 1 ? $t('otc.byTotal') : $t('otc.byAmount')}}</span>
                </div>
                <div class="app-padding40  flex-between-c">
                    <span class="app-size-45">{{methodType === 1 ? '$' : (coin && coin.toUpperCase())}}</span>
                    <Inputs
                        class="app-size-34"
                        bgColor="transparent"
                        decimal
                        v-model="value"
                        :placeholder="$t('otc.placeInput', { type: methodType === 1 ? $t('otc.amount') : $t('otc.num')})"
                    ></Inputs>
                </div>
                <div class="form-box-border border-b"></div>
                <div >
                    <Select bgColor="transparent" class="select-pay" @click="selectPayHandle">
                        <div class="flex-between-c">
                            <div>
                                <img class="app-img-50" v-for="item in pay_type" :key="item" :src="PayTypeImg[item]" alt="">
                                <span v-for="item in pay_type" :key="item"> {{item | payType}}</span>
                                <span v-show="!pay_type.length">{{side === 2 ? $t('common.payway') : $t('otc.payment')}}</span>
                            </div>
                            <p class="default97-color">{{$t('otc.towHour')}}</p>
                        </div>
                    </Select>
                </div>
            </div>
            <div class="app-size-34 margin-t-48">
                <Button @click="tradeHandle">{{$t('otc.quick')}}{{ side | orderSideType}}</Button>
            </div>
            <div class="margin-t-56 default97-color">
                * {{$t('otc.quickTip')}}
            </div>
        </div>
        <SelectPopup container="#app" v-model="payPopup">
            <SelectPopupItem
                v-for="item in PayType"
                :key="item"
                class="select-box"
                @click="selectPayType(item)"
            >
                {{ item | payType }}
                <img
                    v-show="pay_type.includes(item)"
                    class="app-img-50 select-img"
                    src="../../../assets/img/setting/ok.png" alt=""
                >
            </SelectPopupItem>
        </SelectPopup>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PayTypeImg, PayType } from '@/commons/config';

interface Data {
    PayTypeImg: any;
    PayType: PayType;
    value: string;
    pay_type1: number[];
    pay_type2: number[];
    methodType: number;
    payPopup: boolean;
    bestPrice: number | string;
    bestOrderInfo: any;
}

export default Vue.extend({
    name: 'OtcGardCard',
    props: {
        coin: {
            type: String,
            required: true,
        },
        side: {
            type: Number,
            required: true,
        },
        balances: {
            type: Array,
            required: true,
        },
    },
    data(): Data {
        return {
            PayTypeImg,
            PayType,
            payPopup: false,
            value: '',
            pay_type1: [],
            pay_type2: [],
            bestPrice: '--',
            methodType: 1, // 1 按数量购买 2 按金额购买
            bestOrderInfo: {},
        };
    },
    computed: {
        userBank(): Array<any> {
            return this.$store.getters.getBankEnableList;
        },
        balance(): number {
            const res: any = this.balances.find((item: any) => item.coin === this.coin);
            return res ? res.available : 0;
        },
        coinInfo(): CoinInfo {
            return this.$store.getters.getCoinInfo(this.coin);
        },
        pay_type(): number[] {
            if (this.side === 2) return this.pay_type2;
            if (this.side === 1) return this.$store.state.otcPayTypes.map((item: any) => item.type);
            return [];
        },
    },
    mounted() {
        this.otcGetBestPrice();
    },
    methods: {
        changeMethodType() {
            this.methodType = (this.methodType === 1 ? 2 : 1);
            this.value = '';
        },
        selectPayHandle() {
            if (this.side === 2) {
                this.payPopup = true;
                return;
            }
            if (!this._isLogin) {
                this.$loginRoute('/payway/select?type=1');
                return;
            }
            this.$router.push('/payway/select?type=1');
        },
        selectPayType(item: number) {
            // if (this.pay_type2.includes(item)) {
            //     this.pay_type2 = this.pay_type2.filter((subitem: number) => subitem !== item);
            // } else {
            //     this.pay_type2 = this.pay_type2.concat(item);
            // }
            this.pay_type2 = [item];
        },
        tradeHandle() {
            if (!this._isLogin) {
                this.$loginRoute(this.$route.path);
                return;
            }
            if (!this.userBank.length && this.side === 1) {
                this.$dialog.confirm({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('otc.noPayWay')}`,
                    confirmButtonText: `${this.$t('otc.bind')}`,
                    cancelButtonText: `${this.$t('common.cancle2')}`,
                }).then(() => {
                    this.$router.push('/payway');
                });
                return;
            }
            if (!this.pay_type.length) {
                this.$normalToast(this.$t('common.selectPayType'));
                return;
            }
            if (!Number(this.value)) {
                this.$normalToast(this.$t('otc.enterNum'));
                return;
            }
            this.otcOrderMatch();
        },
        otcOrderMatch() {
            let value: number|null = null;
            let amount: number|null = null;
            if (this.methodType === 1) {
                value = Number(this.value);
            } else {
                amount = Number(this.value);
            }
            const params = {
                value, // [float64] 按金额
                amount, // [float64] 按数量,按金额和按数量只能选一个
                coin: this.coin, // [string] 可选,币种
                side: this.side === 1 ? 2 : 1, // [int] 1.买 2.卖
                pay_type: this.pay_type.join(','), // [int] 支付类型
            };
            this.changeLoading(true);
            this.$api.otcOrderMatch(params).then((res: any) => {
                this.changeLoading(false);
                if (!res.data) {
                    this.$normalToast(this.$t('otc.noOrder'));
                    return;
                }
                this.$router.push({
                    name: 'otcsubmit',
                    params: {
                        ...res.data,
                        inputAmount: amount,
                        inputValue: value,
                        selectPayType: this.pay_type[0],
                    },
                });
            }).catch(() => {
                this.changeLoading(false);
            });
        },
        otcGetBestPrice() {
            const params = {
                coin: this.coin, // [string] 可选,币种
                side: this.side, // [int] 1.买 2.卖
            };
            this.$api.otcGetBestPrice(params).then((res: any) => {
                this.bestOrderInfo = res.data;
                if (res.data) {
                    this.bestPrice = res.data.price;
                }
            });
        },
    },
});
</script>

<style scoped lang="less">
.otc-quick-trade{
    .font-28{
        font-size: 28px;
    }
    .margin-t-36{
        margin-top: 36px;
    }
    .margin-t-56{
        margin-top: 56px;
    }
    .margin-t-48{
        margin-top: 48px;
    }
    .form-item-start{
        margin-right: 40px;
    }
    .select-pay{
        margin-right: 28px;
    }
    .switch{
        height: 100%;
        &-btn{
            height: 100%;
            width: 110px;
            position: relative;
            left: 40px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
    .banks{
        display: inline-block;
        box-sizing: border-box;
        margin-left: 15px;
        width: 74px;
        position: relative;
        border-width: 1.5px;
        border-style: solid;
        border-radius: 12px;
        .banks-img{
            width: 70px;
        }
        .select{
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
        }
    }
    .empty{
        width: 100%;
        height: 17px;
        background: #F4F6F9;

    }
    .form-box{
        box-shadow: 0px 1px 5px 0px rgba(178, 178, 178, 0.5);
        border-radius: 20px;
        padding-top: 34px;
        &-border{
            margin: 0 12px;
        }
    }
}
.select-box{
    position: relative;
}
.select-img{
    position: absolute;
    right: 22px;
    top: 0;
    bottom: 0;
    margin: auto;
}
</style>
