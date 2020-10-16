<template>
    <div class="otc-advertising">
        <Headers>
            <span>市场参考价： <span class="primary-color">66263.83 USD</span></span>
        </Headers>
        <div class="otc-advertising-box">
            <TabList
                swipeable
                size="big"
                sticky
                sticky-top="sub"
                :defaultVal="active"
                @change="tabChangeHandle"
                @on-click="clickHandle"
                class="transfer-tab"
                :tabList="bodyTabList"
            >
                <div class="app-padding40" slot="buy">
                    <form class="otc-advertising-form app-size-34" action="">
                        <div class="form-item">
                            <Select>
                                <img class="app-img-50" src="@/assets/img/symbol/usdt.png" alt="">
                                <span class="form-item-select-coin vertical-m">{{form.coin}}</span>
                            </Select>
                        </div>
                        <div @click="selectPopup = !selectPopup" class="form-item">
                            <Select>
                                <span class="vertical-m">{{isfloatRate ? $t('otc.floatingPrice') : $t('otc.fixedPrice') }}</span>
                            </Select>
                        </div>
                        <div class="form-item" :class="isfloatRate ? 'form-item-show' : 'form-item-hide'">
                            <Inputs v-model="form.floating_rate" placeholder="溢价率(30~50)">%</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs decimal="8" type="number" v-model="form.price" placeholder="买入价格">{{_unit}}</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs v-model="form.amount" placeholder="买入数量">USDT</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs readonly :value="total || '自动计算'">USDT</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs v-model="form.min_value" placeholder="单笔最低限额">{{_unit}}</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs v-model="form.max_value" placeholder="单笔最高限额">{{_unit}}</Inputs>
                        </div>
                        <div @click="payPopup = !payPopup" class="form-item">
                            <Select>
                                <span class="vertical-m">选择收付款方式</span>
                            </Select>
                        </div>
                        <!-- TODO 备注 -->
                    </form>
                    <Poptip>
                        <PoptipItem>
                            单个发布广告买入/卖出数量限制 0.01~1000 BTC
                        </PoptipItem>
                        <PoptipItem>
                            认证广告商家发布广告将没有累计限制
                        </PoptipItem>
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
                <div slot="sell">
                    出售
                </div>
            </TabList>
        </div>
        <SelectPopup v-model="selectPopup">
            <SelectPopupItem @click="isfloatRate = true">{{$t('otc.floatingPrice')}}</SelectPopupItem>
            <SelectPopupItem @click="isfloatRate = false">{{$t('otc.fixedPrice')}}</SelectPopupItem>
        </SelectPopup>
        <SelectPopup v-model="payPopup">
            <SelectPopupItem v-for="item in PayType" :key="item" @click="isfloatRate = true">{{ item | payType }}</SelectPopupItem>
        </SelectPopup>
        <div class="app-size-34 lxa-footer-btn">
            <Button>发 布</Button>
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
            pay_types: [],
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
        renderList() {
            return [{ side: 2 }, { side: 1 }, { side: 2 },
                { side: 2 }, { side: 1 }, { side: 2 }, { side: 2 }, { side: 1 },
                { side: 2 }, { side: 2 }, { side: 1 }, { side: 2 },
            ];
        },
        total() {
            const res = Number((this as any).form.amount) * Number((this as any).form.price);
            return res ? res.toFixed(2) : '';
        },
        bodyTabList() {
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
    },
    methods: {
        tabChangeHandle(item: any) {
            this.form.type = item.side;
        },
        otcOrderPlace() {
            const params = {
                ...this.form,
                total: this.total,
                pay_types: this.pay_types.join(','),
            };
            this.$api.otcOrderPlace(params).then((res: any) => {
                console.log(res);
            });
        },
        clickHandle(value: any) {
            console.log(value);
        },
    },
});
</script>

<style lang="less" scoped>
.otc-advertising{
    height: 100%;
    overflow: scroll;
    padding-bottom: 180px;
    &-box{
        padding-top: 50px;
    }
    &-form{
        .form-item{
            margin-bottom: 36px;
            transition: all 0.3s;
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
