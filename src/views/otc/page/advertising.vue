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
                        <div class="form-item">
                            <Select>
                                <span class="vertical-m">浮动价格</span>
                            </Select>
                        </div>
                        <div class="form-item">
                            <Inputs v-model="form.rate" placeholder="溢价率(30~50)">%</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs v-model="form.price" placeholder="买入价格">USD</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs v-model="form.amount" placeholder="买入数量">USDT</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs readonly :value="total || '自动计算'">USDT</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs v-model="form.min" placeholder="单笔最低限额">USD</Inputs>
                        </div>
                        <div class="form-item">
                            <Inputs v-model="form.max" placeholder="单笔最高限额">USD</Inputs>
                        </div>
                        <div class="form-item">
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
        <div class="app-size-34 lxa-footer-btn">
            <Button>发 布</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    active: string;
    total: string;
    form: {
        price: string|number;
        amount: string|number;
        value: string|number;
        coin: string|number;
        takerSide: string|number;
        paytype: string|number;
        rate: string|number;
        min: string|number;
        max: string|number;
    };
}

export default Vue.extend({
    name: 'TransferHistory',
    data(): data {
        return {
            active: 'buy',
            total: '',
            form: {
                price: '',
                amount: '',
                value: '',
                coin: '',
                takerSide: '',
                paytype: '',
                rate: '',
                min: '',
                max: '',
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
        bodyTabList() {
            return [
                {
                    title: '购买',
                    value: 'buy',
                }, {
                    title: '出售',
                    value: 'sell',
                },
            ];
        },
    },
    created() {
        this.form.coin = (this.$route.query.symbol as string) || '';
    },
    methods: {
        tabChangeHandle(value: any) {
            console.log(value);
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
            &-select-coin{
                margin-left: 25px;
            }
        }
    }
}
</style>
