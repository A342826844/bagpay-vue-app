<template>
    <div class="otc-advertising">
        <Headers>
            <span>市场参考价： <span @click="changePrice" class="primary-color">{{exchangeRate[form.coin] || '--'}} {{_unitIcon}}</span></span>
        </Headers>
        <div class="otc-advertising-box">
            <TabList
                swipeable
                size="big"
                sticky
                sticky-top="sub"
                :defaultVal="active"
                @change="tabChangeHandle"
                class="transfer-tab"
                :tabList="bodyTabList"
            >
                <div v-for="item in bodyTabList" :key="item.type" :slot="item.value" class="app-padding40">
                    <form @submit.prevent="" class="otc-advertising-form app-size-34" action="">
                        <div class="form-item">
                            <Select @click="$router.push(`/choisesymbol?symbol=${form.coin}&type=1`)">
                                <IconImg class="app-img-50 form-item-start" :symbol="form.coin"/>
                                <span class="form-item-select-coin vertical-m">{{coinSHow}}</span>
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
                            <Inputs decimal type="number" :autofocus="true" v-model="form.price" :placeholder="`${item.title}价格`">
                                <span class="form-item-start" slot="start">价格</span>
                                {{_unitIcon}}
                            </Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs :decimal="2" v-model="form.amount" :placeholder="`${item.title}数量`">
                                <span class="form-item-start" slot="start">数量</span>
                                {{coinSHow}}
                            </Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs readonly :value="total || '总额'">
                                <span class="form-item-start" slot="start">总额</span>
                                {{_unitIcon}}
                            </Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs decimal v-model="form.min_value" placeholder="单笔最低限额">
                                <span class="form-item-start" slot="start">最低</span>
                                {{_unitIcon}}
                            </Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs decimal v-model="form.max_value" placeholder="单笔最高限额">
                                <span class="form-item-start" slot="start">最高</span>
                                {{_unitIcon}}
                            </Inputs>
                        </div>
                        <div @click="selectPayHandle" class="form-item">
                            <Select>
                                <!-- <span v-if="form.type === 1">
                                    <span v-show="pay_types.length">{{pay_types[0] | payType}}</span>
                                    <span v-show="!pay_types.length">支付方式</span>
                                </span>
                                <span v-if="form.type !== 1">
                                    <span v-show="bankInfo.type">{{bankInfo.type | payType}}</span>
                                    <span v-show="!bankInfo.type">收款方式</span>
                                </span> -->
                                <span v-if="pay_types.length" class="vertical-m">{{pay_types[0] | payType}}</span>
                                <span v-if="!pay_types.length" class="vertical-m">{{form.type === 1 ? '支付方式' : '收款方式'}}</span>
                            </Select>
                        </div>
                        <!-- TODO 备注 -->
                        <div class="form-item text-align-l">备注</div>
                        <div class="form-item">
                            <V-Field
                                v-model="form.remark"
                                rows="3"
                                autosize
                                type="textarea"
                                maxlength="60"
                                :placeholder="'备注信息（非必填）'"
                                show-word-limit
                            >
                            </V-Field>
                        </div>
                    </form>
                    <Poptip>
                        <!-- <PoptipItem>
                            单个发布广告买入/卖出数量限制 0.01~1000 {{coinSHow}}
                        </PoptipItem> -->
                        <PoptipItem>
                            认证广告商家发布广告将没有累计限制
                        </PoptipItem>
                        <PoptipItem>
                            发布广告暂仅支持固定价格，数字货币价格浮动，请随时调整
                        </PoptipItem>
                        <PoptipItem>
                            广告若产生场外交易请及时处理
                        </PoptipItem>
                    </Poptip>
                </div>
            </TabList>
        </div>
        <!-- <SelectPopup v-model="selectPopup">
            <SelectPopupItem @click="changeRateType(1)">{{$t('otc.floatingPrice')}}</SelectPopupItem>
            <SelectPopupItem @click="isfloatRate = false">{{$t('otc.fixedPrice')}}</SelectPopupItem>
        </SelectPopup> -->
        <SelectPopup v-model="payPopup">
            <SelectPopupItem v-for="item in PayType" :key="item" @click="selectPayType(item)">{{ item | payType }}</SelectPopupItem>
        </SelectPopup>
        <div class="app-size-34 lxa-footer-bottom">
            <Button @click="submitHandle" :disabled="!form.price || !form.amount || !form.min_value || !form.max_value">发 布</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PayType } from '@/commons/config/index';

type data = {
    PayType: PayType;
    active: string;
    isfloatRate: boolean;
    pay_types: Array<number>;
    selectPopup: boolean;
    payPopup: boolean;
    exchangeRate: any;
    form: {
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
    };
}

export default Vue.extend({
    name: 'TransferHistory',
    data(): data {
        return {
            PayType,
            active: 'buy',
            isfloatRate: true,
            selectPopup: false,
            payPopup: false,
            pay_types: [], // TODO: 出售和购买的支付方式不一样
            exchangeRate: {},
            form: {
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
            },
        };
    },
    computed: {
        coinInfo(): CoinInfo {
            return this.$store.getters.getCoinInfo(this.form.coin);
        },
        coinSHow(): string {
            return ((this as any).form.coin || '').toUpperCase();
        },
        total(): string {
            const res = Number((this as any).form.amount) * Number((this as any).form.price);
            return res ? res.toFixed(2) : '';
        },
        bankInfo(): any {
            return this.$store.state.bankInfo;
        },
        bodyTabList(): any {
            return [
                {
                    title: '购买',
                    value: 'buy',
                    type: 1,
                }, {
                    title: '出售',
                    value: 'sell',
                    type: 2,
                },
            ];
        },
    },
    created() {
        this.form.coin = (this.$route.query.symbol as string) || '';
        this.getExchangeRate();
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'choisesymbol') {
                const symbol = sessionStorage.getItem('symbol');
                console.log(symbol);
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
            this.form.type = item.type;
        },
        setCoin(coin: string) {
            this.form.coin = coin;
        },
        getExchangeRate() {
            this.$api.getExchangeRate().then((res: any) => {
                if (res.data) {
                    this.exchangeRate = res.data;
                }
            });
        },
        changePrice() {
            if (this.exchangeRate[this.form.coin]) {
                this.form.price = `${this.exchangeRate[this.form.coin]}`;
            }
        },
        selectPayHandle() {
            if (this.form.type === 1) {
                this.payPopup = !this.payPopup;
            } else {
                //  TODO: 跳收款方式
                this.$router.push(`/payway/select?id=${this.bankInfo.id}`);
            }
        },
        selectPayType(item: number) {
            if (item) {
                this.pay_types = [item];
            }
        },
        initFormData() {
            this.form.price = '';
            this.form.amount = '';
            this.form.min_value = '';
            this.form.max_value = '';
            this.form.floating_rate = '';
            this.form.remark = '';
        },
        submitHandle() {
            console.log(this.pay_types);
            if (!Number(this.form.price)) {
                this.$normalToast('请输入价格');
                return;
            }
            if (Number(this.form.price) <= 0) {
                this.$normalToast('请输入大于0的价格');
                return;
            }
            if (!Number(this.form.amount)) {
                this.$normalToast('请输入数量');
                return;
            }
            if (Number(this.form.amount) <= 0) {
                this.$normalToast('请输入数量');
                return;
            }
            if (!Number(this.form.min_value)) {
                this.$normalToast('请输入单笔最低限额');
                return;
            }
            if (Number(this.form.min_value) <= 0) {
                this.$normalToast('请输入单笔最低限额');
                return;
            }
            if (!this.form.max_value) {
                this.$normalToast('请输入单笔最高限额');
                return;
            }
            if (!this.pay_types.length) {
                this.$normalToast('请选择收付款方式');
                return;
            }
            if (Number(this.form.min_value) > Number(this.total)) {
                console.log(this.form.min_value, this.total);
                this.$normalToast('单笔最低限额不能大于支付金额');
                return;
            }
            if (Number(this.form.max_value) <= Number(this.form.min_value)) {
                this.$normalToast('单笔最高限额不能低于最底限额');
                return;
            }
            this.otcOrderPlace();
        },
        otcOrderPlace() {
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
                ...this.form,
                total: this.total,
                pay_types: this.pay_types.join(','),
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
    overflow: scroll;
    &-box{
        padding-top: 50px;
    }
    .app-poptip{
        padding-bottom: 60px;
    }
    &-form{
        .form-item{
            margin-bottom: 36px;
            transition: all 0.3s;
            &:last-child{
                margin-bottom: 0;
            }
            &-start{
                margin-right: 60px;
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
