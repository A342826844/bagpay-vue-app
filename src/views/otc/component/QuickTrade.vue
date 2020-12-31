<template>
    <div class="otc-quick-trade app-padding40">
        <div class="flex-between-c">
            <div class=" text-align-l">
                <p class="font-28">盘口最优价 <span class="primary-color">{{bestPrice}} USD/{{coin && coin.toUpperCase()}}</span></p>
                <p>余额：{{balance}} {{coin && coin.toUpperCase()}}</p>
            </div>
            <div>
                <div
                    class="banks"
                    :class="item.type === pay_type ? 'primary-border-color' : 'gray-border-color'"
                    v-for="item in userBank"
                    @click="pay_type = item.type"
                    :key="item.type"
                >
                    <img v-show="item.type === pay_type" class="select" src="../../../assets/img/common/switch1.png" alt="">
                    <img class="banks-img" :src="PayTypeImg[item.type]" alt="">
                </div>
            </div>
        </div>
        <div class="margin-t-36 app-size-34">
            <Inputs
                decimal
                v-model="value"
                :placeholder="$t('otc.placeInput', { type: methodType === 1 ? $t('otc.amount') : $t('otc.num')})"
            >
                <div class="switch">
                    {{methodType === 1 ? '$' : (coin && coin.toUpperCase())}}
                    <button @click="changeMethodType" class="switch-btn primary-bg">
                        <img class="app-img-50" src="../../../assets/img/common/switch.png" alt="">
                    </button>
                </div>
            </Inputs>
        </div>
        <!-- <div class="margin-t-36 flex-between-c">
            <span></span>
            <div class="font-28" @click="changeMethodType">
                <img class="switch-img" src="../../../assets/img/common/switch.png" alt="">
                {{$t('otc.methodType', { type: methodType === 1 ? $t('otc.num') : $t('otc.amount')})}}
            </div>
        </div> -->
        <div class="margin-t-36 app-size-34">
            <Button @click="tradeHandle">一键{{title}}</Button>
        </div>
        <div class="margin-t-36">
            * 极速一键下单，按需匹配用户挂单最优盘口价
        </div>
        <div class="empty"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PayTypeImg } from '@/commons/config';

interface Data {
    PayTypeImg: any;
    value: string;
    pay_type: number;
    methodType: number;
    bestPrice: number | string;
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
        title: {
            type: String,
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
            value: '',
            pay_type: 0,
            bestPrice: '--',
            methodType: 1, // 1 按数量购买 2 按金额购买
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
    },
    methods: {
        changeMethodType() {
            this.methodType = (this.methodType === 1 ? 2 : 1);
            this.value = '';
        },
        tradeHandle() {
            if (!this._isLogin) {
                this.$loginRoute(this.$route.path);
                return;
            }
            if (!this.userBank.length) {
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
            if (!this.pay_type) {
                this.$normalToast('选择支付方式');
                return;
            }
            if (!Number(this.value)) {
                this.$normalToast('请输入数量或金额');
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
                side: this.side, // [int] 1.买 2.卖
                pay_type: this.pay_type, // [int] 支付类型
            };
            this.$api.otcOrderMatch(params).then((res: any) => {
                console.log(res);
                this.$router.push({
                    name: 'otcsubmit',
                    params: {
                        ...res.data,
                        inputAmount: amount,
                        inputValue: value,
                    },
                });
            });
        },
    },
});
</script>

<style scoped lang="less">
.otc-quick-trade{
    padding-top: 36px;
    .font-28{
        font-size: 28px;
    }
    .margin-t-36{
        margin-top: 36px;
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
}
</style>
