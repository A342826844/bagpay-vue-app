<template>
    <div @scroll.capture="scrollLoad" class="otc-advdetail">
        <Headers no-right-padding>
            <Button size="auto"  v-if="orderDetail.status === 0" @click="cancelHandle" shape="l-semicircle">
                {{$t('otc.adoff')}}
            </Button>
        </Headers>
        <PullRefresh fill v-model="isLoading" @refresh="onRefresh">
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
                            <p class="otc-advdetail-pay">
                                <span v-for="item in orderDetail.pay_types.split(',')" :key="item">
                                    {{ item | payType}}
                                </span>
                            </p>
                        </div>
                        <div class="text-align-r">
                            <p class="lable" v-t="'otc.unitPrice'"></p>
                            <h6 class="app-size-34 primary-color otc-advdetail-price">{{ orderDetail.price }}</h6>
                        </div>
                    </div>
                    <div class="flex-between-c app-padding40 app-margin-t40">
                        <div class="text-align-l">
                            <p class="lable">{{$t('otc.num')}}({{orderDetail.coin | toUpperCase}})</p>
                            <h6 class="app-size-34 otc-advdetail-price">{{ orderDetail.total }}</h6>
                        </div>
                        <div class="text-align-r">
                            <p class="lable" v-t="'otc.quota'"></p>
                            <h6 class="app-size-34 otc-advdetail-price">{{_unitIcon}}{{orderDetail.min_value}}~{{orderDetail.max_value}}</h6>
                        </div>
                    </div>
                    <div class="app-padding40 app-margin-t40">
                        <div class="border-b "></div>
                    </div>
                    <div class="otc-advdetail-tradeinfo flex-between-c app-padding40">
                        <div class="text-align-l">
                            <p class="lable">{{$t('otc.deal')}}({{orderDetail.coin | toUpperCase}}) </p>
                            <p class="name  otc-advdetail-price">{{orderDetail.filled}}</p>
                        </div>
                        <div class="text-align-l">
                            <p class="lable">{{$t('common.frozen')}}({{orderDetail.coin | toUpperCase}})</p>
                            <p class="name  otc-advdetail-price">{{orderDetail.frozen}}</p>
                        </div>
                        <div class="text-align-r">
                            <p class="lable" v-t="'common.premium'"></p>
                            <p class="name  otc-advdetail-price">--</p>
                        </div>
                    </div>
                </div>
                <div v-if="false" class="pay-type app-padding40">
                    <div class="pay-type-box app-padding40">
                        <p v-t="'otc.payment'"></p>
                        <p>{{ orderDetail.pay_types | payType}}</p>
                    </div>
                </div>
                <div class="order-info otc-advdetail-card app-padding40">
                    <div class="flex-between-c">
                        <p v-t="'common.releaseTime'"></p>
                        <p>{{ orderDetail.created_at | date('yyyy-MM-dd hh:mm:ss')}}</p>
                    </div>
                    <div class="flex-between-c">
                        <p v-t="'otc.orderNum'"></p>
                        <p>{{ orderDetail.id }}#</p>
                    </div>
                    <div class="app-margin-t40">
                        <div class="border-b "></div>
                    </div>
                    <div class="text-align-l otc-advdetail-mark">
                        <p class="lable" v-t="'payment.remark'"></p>
                        <div class="otc-advdetail-num">
                            {{ orderDetail.remark || $t('payment.defaultRemark') }}
                        </div>
                    </div>
                </div>
                <ul class="otc-advdetail-card order-list">
                    <li v-for="(item, index) in list" :key="index">
                        <NCardItem :showArrow="true" @click="goAdvState(item)">
                            <template slot="title">
                                <span>{{target_users[item.taker_id].nickname}}</span>
                                <!-- <span>{{target_users[item.taker_id].phone}}</span> -->
                            </template>
                            <template slot="right">
                                <span :class="item.state | otcDealStateColor">{{item.state | otcDealState}}</span>
                            </template>
                            <template slot="lable">
                                <span>{{$t('common.price')}} ({{_unit}})</span>
                                <span>{{$t('otc.num')}} ({{item.coin && item.coin.toUpperCase()}})</span>
                                <span>{{$t('common.time')}} </span>
                            </template>
                            <template slot="value">
                                <span>{{item.price}}</span>
                                <span>{{item.amount}}</span>
                                <span>{{item.updated_at}}</span>
                            </template>
                        </NCardItem>
                        <div class="app-border-margin16 border-b"></div>
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
// import scrollLoad from '@/minxin/scrollLoad';

type data = {
    orderDetail: any;
    isLoading: boolean;
    loadMore: boolean;
    isEnd: boolean;
    timer: any;
    form: {
        amount: string;
        value: string;
    };
    target_users: any;
    list: Array<any>;
}

export default Vue.extend({
    name: 'AdvDetail',
    components: {
        NCardItem,
    },
    // mixins: [scrollLoad],
    data(): data {
        return {
            isLoading: false,
            timer: 0,
            loadMore: false,
            isEnd: false,
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
                pay_types: '', // 支持的支付类型
                // country: 1, // 国家类型
                // currency: 1, // 货币类型
                // remark: '', // 备注
                // status: 1, // OrderState
                // floating_rate: 0, // 采用浮动价格后有效，溢价比例，0为不采用浮动价格, 1为不溢价，大于1为正溢价，小于1为负溢价
                // close_why: '', // 平台强制关闭的原因
                // created_at: '', // 创建时间
            },
            target_users: {},
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
            (this as any).isEnd = false;
            this.getOrderData(true);
        },
        // 滚动懒加载
        scrollLoad(event: Event) {
            const scroll = (event.target as HTMLElement);
            const { scrollTop, scrollHeight, clientHeight } = scroll;
            if ((clientHeight + scrollTop > scrollHeight - 100) && (clientHeight + scrollTop !== scrollHeight) && !this.loadMore && !this.isEnd) {
                this.loadMore = true;
                this.otcOrderDealList();
            }
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
        goAdvState(item: any) {
            this.$router.push(`/otc/order/detail?id=${item.id}`);
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
                this.loadMore = false;
                if (res.data.list) {
                    if (refresh) {
                        this.list = res.data.list;
                        this.target_users = res.data.target_users;
                    } else {
                        this.list = this.list.concat(res.data.list);
                        this.target_users = { ...this.target_users, ...res.data.target_users };
                    }
                }
                if (this.list.length >= res.data.total) {
                    (this as any).isEnd = true;
                }
            }).catch(() => {
                this.loadMore = false;
            });
        },
        cancelHandle() {
            this.$dialog.confirm({
                title: `${this.$t('otc.shelfAdv')}`,
                confirmButtonText: `${this.$t('common.ok')}`,
                cancelButtonText: `${this.$t('common.cancle2')}`,
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
        font-size: 28px;
    }
    &-btn{
        padding-left: 40px;
        padding-right: 40px;
    }
}
</style>
