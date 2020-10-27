<template>
    <div @scroll.capture="scrollLoad($event, scrollLoadHandle)" class="otc-advdetail">
        <Headers>
            <span v-show="orderDetail.status === 0" @click="cancelHandle" class="primary-color">下架</span>
        </Headers>
        <PullRefresh v-model="isLoading" @refresh="onRefresh">
            <Titles>
                <span :class="orderDetail.status | otcOrderStateColor">{{orderDetail.status | otcOrderState }}</span>
            </Titles>
            <div class="otc-advdetail-box">
                <div class="otc-advdetail-card">
                    <div class="flex-between-c app-padding40">
                        <div class="text-align-l">
                            <div class="flex-start-c">
                                <h5 class="name">
                                    {{orderDetail.coin | toUpperCase}}
                                    <span :class="orderDetail.type | orderSideColor">{{ orderDetail.type | orderSideTypeUser}}</span></h5>
                            </div>
                            <p class="otc-advdetail-pay">{{ orderDetail.pay_types | payType}}</p>
                        </div>
                        <div class="text-align-r">
                            <p class="lable">单价</p>
                            <h6 class="app-size-34 primary-color otc-advdetail-price">{{ orderDetail.price }}</h6>
                        </div>
                    </div>
                    <div class="flex-between-c app-padding40 app-margin-t40">
                        <div class="text-align-l">
                            <p class="lable">数量({{orderDetail.coin | toUpperCase}})</p>
                            <h6 class="app-size-34 otc-advdetail-price">{{ orderDetail.total }}</h6>
                        </div>
                        <div class="text-align-r">
                            <p class="lable">限额</p>
                            <h6 class="app-size-34 otc-advdetail-price">{{_unitIcon}}{{orderDetail.min_value}}~{{orderDetail.max_value}}</h6>
                        </div>
                    </div>
                    <div class="app-padding40 app-margin-t40">
                        <div class="border-b "></div>
                    </div>
                    <div class="otc-advdetail-tradeinfo flex-between-c app-padding40">
                        <div class="text-align-l">
                            <p class="lable">成交({{orderDetail.coin | toUpperCase}}) </p>
                            <p class="name  otc-advdetail-price">{{orderDetail.filled}}</p>
                        </div>
                        <div class="text-align-l">
                            <p class="lable">冻结({{orderDetail.coin | toUpperCase}})</p>
                            <p class="name  otc-advdetail-price">{{orderDetail.frozen}}</p>
                        </div>
                        <div class="text-align-r">
                            <p class="lable">溢价率</p>
                            <p class="name  otc-advdetail-price">--</p>
                        </div>
                    </div>
                </div>
                <div v-if="false" class="pay-type app-padding40">
                    <div class="pay-type-box app-padding40">
                        <p>收款方式</p>
                        <p>{{ orderDetail.pay_types | payType}}</p>
                    </div>
                </div>
                <div class="order-info otc-advdetail-card app-padding40">
                    <div class="flex-between-c">
                        <p>发布时间</p>
                        <p>{{ orderDetail.created_at | date('yyyy-MM-dd hh:mm:ss')}}</p>
                    </div>
                    <div class="flex-between-c">
                        <p>订单编号</p>
                        <p>{{ orderDetail.id }}#</p>
                    </div>
                    <div class="app-margin-t40">
                        <div class="border-b "></div>
                    </div>
                    <div class="text-align-l otc-advdetail-mark">
                        <p class="lable">备注</p>
                        <div class="otc-advdetail-num">
                            {{ orderDetail.remark }}
                        </div>
                    </div>
                </div>
                <ul class="otc-advdetail-card order-list">
                    <li>
                        <NCardItem :showArrow="true" @click="goAdvState(item)" v-for="(item, index) in list" :key="index">
                            <template slot="title">
                                <span>{{item.coin && item.coin.toUpperCase()}}</span>
                                <span :class="item.taker_side | orderSideUserColor">{{item.taker_side | orderSideType}}</span>
                            </template>
                            <template slot="right">
                                <span :class="item.state | otcDealStateColor">{{item.state | otcDealState}}</span>
                            </template>
                            <template slot="lable">
                                <span>{{"价格"}} ({{_unit}})</span>
                                <span>{{"数量"}} ({{item.coin && item.coin.toUpperCase()}})</span>
                                <span>{{"时间"}} </span>
                            </template>
                            <template slot="value">
                                <span>{{item.price}}</span>
                                <span>{{item.amount}}</span>
                                <span>{{item.updated_at}}</span>
                            </template>
                        </NCardItem>
                    </li>
                </ul>
            </div>
        </PullRefresh>
        <!-- <div class="otc-advdetail-btn app-size-34 lxa-footer-btn flex-around-c">
            <Button @click="cancelHandle" type="up">下架</Button>
        </div> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NCardItem from '@/components/card/index.vue';
import scrollLoad from '@/minxin/scrollLoad';

type data = {
    orderDetail: any;
    isLoading: boolean;
    timer: any;
    form: {
        amount: string;
        value: string;
    };
    list: Array<any>;
}

export default Vue.extend({
    name: 'OtcSubmit',
    components: {
        NCardItem,
    },
    mixins: [scrollLoad],
    data(): data {
        return {
            isLoading: false,
            timer: 0,
            list: [],
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
                // pay_types: '1', // 支持的支付类型
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
        // this.getOrder();
        this.orderDetail.id = Number(this.$route.query.id);
        this.getOrderData();
    },
    methods: {
        onRefresh() {
            this.getOrderData(true);
            (this as any).isEnd = false;
        },
        // 滚动懒加载
        scrollLoadHandle() {
            this.otcOrderDealList();
        },
        getOrderData(refresh?: boolean) {
            if (!refresh) {
                this.changeLoading(true);
            }
            Promise.all([this.getOrderDetail(), this.otcOrderDealList(refresh)]).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
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
                this.$normalToast('获取订单详情失败');
            });
        },
        goAdvState(item: any) {
            this.$router.push(`/otc/order/detail?id=${item.id}`);
            console.log('去订单详情');
        },
        otcOrderDealList(refresh?: boolean) {
            const params = {
                coin: this.orderDetail.coin, // [string] 币种
                state: -1, // [OtcOrderState] -1取全部
                // begin:  // [time] 开始时间
                // end:  // [time] 结束时间
                order_id: this.orderDetail.id,
                offset: refresh ? 0 : this.list.length, // [int64] 跳过条数
                limit: 15, // [int64] 最大返回条数
            };
            return this.$api.otcOrderDealList(params).then((res: any) => {
                console.log(res);
                if (res.data.list) {
                    if (refresh) {
                        this.list = res.data.list;
                    } else {
                        this.list = this.list.concat(res.data.list);
                    }
                }
                if (this.list.length >= res.total) {
                    (this as any).isEnd = true;
                }
            });
        },
        cancelHandle() {
            this.$dialog.confirm({
                title: '确认下架广告',
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcOrderCancel(this.orderDetail.id).then(() => {
                    this.getOrderDetail();
                }).catch(() => {
                    this.changeLoading(false);
                });
            }).catch();
        },
    },
});
</script>
<style lang="less" scoped>
.otc-advdetail{
    background: #f8f8f8;
    height: 100%;
    padding-bottom: 180px;
    overflow: scroll;
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
    }
    &-price{
        margin-top: 15px;
    }
    &-num{
        margin-top: 22px;
        line-height: 50px;
    }
    &-card {
        background: #ffffff;
        margin-bottom: 24px;
        padding-top: 40px;
    }
    .order-list{
        padding-top: 0;
    }
    &-tradeinfo{
        padding-top: 33px;
        padding-bottom: 33px;
        line-height: 50px;
        color: #333333;
        font-size: 28px;
        .lable{
            font-size: 24px;
        }
    }
    &-mark{
        padding-top: 33px;
        color: #333333;
        font-size: 28px;
        min-height: 248px;
        .lable{
            font-size: 24px;
        }
    }
    .pay-type{
        background: #f8f8f8;
        padding-top: 24px;
        padding-bottom: 24px;
        &-box{
            height: 102px;
            line-height: 102px;
            background: #ffffff;
        }
    }
    .order-info{
        line-height: 50px;
    }
    &-btn{
        padding-left: 40px;
        padding-right: 40px;
    }
}
</style>
