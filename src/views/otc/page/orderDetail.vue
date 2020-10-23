<template>
    <div class="otc-order-detail">
        <Headers />
        <PullRefresh v-model="isLoading" @refresh="onRefresh">
            <Titles border>
                <span :class="orderDetail.status | otcOrderStateColor">{{orderDetail.state | otcDealState}}</span>
            </Titles>
            <span class="red-color" slot="right">{{121 | timeDown('mm:ss')}}</span>
            <div>
                <div class="order-detail-top flex-between-c app-padding40">
                    <div class="text-align-l">
                        <p class="lable">成交总额</p>
                        <h5 class="primary-color app-size-34">{{ orderDetail.value }}</h5>
                    </div>
                    <div class="text-align-l">
                        <p class="lable">交易币种</p>
                        <p class="value">{{ orderDetail.coin | toUpperCase }}</p>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">订单类型</p>
                        <p class="value" :class="orderDetail.taker_side|orderSideColor">{{ orderDetail.taker_side | orderSide}}</p>
                    </div>
                </div>
                <div class="order-detail-list">
                    <ul class="app-padding40">
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable">单价</div>
                                <div class="primary-color">{{ orderDetail.price }} {{_unitIcon}}</div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <div class="lable">数量</div>
                                <div class="value">{{ orderDetail.amount }} {{orderDetail.coin | toUpperCase}}</div>
                            </div>
                        </li>
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable">商家</div>
                                <div class="lable">
                                    <span class="vertical-m">查看TA详细</span>
                                    <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
                                </div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <!-- TODO: 商家昵称、手机号-->
                                <div class="value">料子 TODO</div>
                                <div class="value">1355516111521</div>
                            </div>
                        </li>
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable">订单编号 </div>
                                <div class="value">#{{ orderDetail.id }}#</div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <div class="value">订单时间</div>
                                <div class="value">{{ orderDetail.created_at | date('yyyy-MM-dd hh:mm:ss')}}</div>
                            </div>
                        </li>
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable">支付方式</div>
                                <div @click="showPayHandle" class="primary-color">
                                    <span class="vertical-m">{{ orderDetail.pay_type | payType}}</span>
                                    <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
                                </div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <!-- TODO: 支付信息 -->
                                <div class="value">廖小艾 </div>
                                <div class="value">{{ orderDetail.pay_tag }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </PullRefresh>
        <div class="app-size-34 app-padding40 lxa-footer-btn flex-around-c">
            <!-- // OtcDealStateTrading   = 0 //交易中
            // OtcDealStatePayed     = 1 //已支付
            // OtcDealStateDone      = 2 //已放币,已完成
            // OtcDealStateCanceled  = 3 //已取消 -->
            <Button @click="cancleHandle" v-if="orderDetail.state === 0 && orderDetail.taker_id === _userInfo.id" type="cancel">取消</Button>
            <Button @click="otcDealPadiHandle" v-if="orderDetail.state === 0 && orderDetail.taker_id === _userInfo.id">标记已支付</Button>
            <Button @click="appealHandle" v-if="orderDetail.state === 1" type="down">申述</Button>
            <Button @click="cancleAppealHandle" v-if="orderDetail.state === 1" type="down">取消申诉</Button>
            <Button @click="releaseHandle" v-if="orderDetail.state === 1 && orderDetail.maker_id === _userInfo.id" type="up">释放</Button>
        </div>
        <van-dialog v-model="show" close-on-click-overlay :show-confirm-button="false" title="支付方式">
            <div class="pay-dialog app-padding40">
                <div class="flex-between-c">
                    <span>方式 </span>
                    <span>{{payDetail.type | payType}}</span>
                </div>
                <div class="flex-between-c">
                    <span>姓名</span>
                    <span>{{payDetail.real_name}}</span>
                </div>
                <div v-if="payDetail.type === 1" class="flex-between-c">
                    <span>开户行</span>
                    <span>{{payDetail.bank}}</span>
                </div>
                <div class="flex-between-c">
                    <span>账号</span>
                    <span class="primary-color">{{payDetail.account}}</span>
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    show: boolean;
    isLoading: boolean;
    id: number;
    orderDetail: any;
    payDetail: any;
}

export default Vue.extend({
    name: 'OtcGardCard',
    data(): data {
        return {
            show: false,
            isLoading: false,
            id: 0,
            payDetail: {},
            orderDetail: {
                // id: 100,
                // taker_id: 1, // 下单用户id
                // maker_id: 2, // 广告主用户id
                // order_id: 10, // 广告id
                // taker_side: 1, // 下单用户的交易方向 OrderSide
                // coin: 'usdt', // 币种
                // price: 1, // 价格
                // amount: 100, // 数量
                // value: 100, // 交易额
                // fee: 0.01, // 手续费 amount*fee_rate
                // pay_type: 1, // PayType
                // pay_tag: '0100', // 付款参考号
                // bank_info_id: 10, // 收款信息id
                // state: 1, // OtcOrderState
                // appealing: 0, // 是否申诉中
                // created_at: '', // 创建时间
            },
        };
    },
    created() {
        this.id = Number(this.$route.query.id);
        this.getOrderDetail();
    },
    methods: {
        onRefresh() {
            this.getOrderDetail(true);
        },
        getBankListById() {
            this.changeLoading(true);
            return this.$api.getBankListById(this.orderDetail.bank_info_id).then((res: any) => {
                this.changeLoading(false);
                console.log(res);
                this.payDetail = res.data;
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast('获取支付信息失败，请稍后重试');
                }
                throw new Error();
            });
        },
        getOrderDetail(refresh?: boolean) {
            if (!refresh) {
                this.changeLoading(true);
            }
            this.$api.otcOrderDealList({
                order_id: this.id, state: -1, offset: 0, limit: 10,
            }).then((res: any) => {
                this.changeLoading(false);
                this.isLoading = false;
                if (res.data) {
                    // eslint-disable-next-line prefer-destructuring
                    this.orderDetail = res.data.list[0];
                    return;
                }
                this.$normalToast('获取订单详情失败');
            }).catch((err: any) => {
                this.isLoading = false;
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast('获取订单详情失败');
                }
            });
        },
        cancleHandle() {
            this.$dialog.confirm({
                title: '确认取消交易',
                messageAlign: 'left',
                message: `<div class="app-reset-diolog-message">
                    <span class="primary-color">如果您已经向卖家付款， 请不要取消交易</span>
                    <span>取消规则： 买家当日累计${3}笔交易， 会限制当日买入功能</span>
                </div>`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcDealCancel(this.orderDetail.id).then(() => {
                    this.changeLoading(false);
                    this.getOrderDetail();
                    this.$normalToast('取消成功');
                }).catch((err: any) => {
                    this.changeLoading(false);
                    if (!err.data) {
                        this.$normalToast('网络错误，刷新后重试');
                    }
                });
            });
        },
        releaseHandle() {
            this.$dialog.confirm({
                title: '确认释放交易',
                messageAlign: 'left',
                message: `<div class="app-reset-diolog-message">
                    <span class="primary-color">如果您未收到买家付款， 请不要释放交易</span>
                </div>`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcDealRelease(this.orderDetail.id).then(() => {
                    this.changeLoading(false);
                    this.getOrderDetail();
                    this.$normalToast('释放成功');
                }).catch((err: any) => {
                    this.changeLoading(false);
                    if (!err.data) {
                        this.$normalToast('网络错误，刷新后重试');
                    }
                });
            });
        },
        otcDealPadiHandle() {
            this.$dialog.confirm({
                title: '付款确认',
                messageAlign: 'left',
                message: `<div class="app-reset-diolog-message">
                    <span>请确认您已向卖家付款</span>
                    <span class="primary-color">恶意点击将直接冻结账户</span>
                </div>`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcDealPadi(this.orderDetail.id).then(() => {
                    this.getOrderDetail();
                    this.$normalToast('确认成功');
                    this.changeLoading(false);
                }).catch((err: any) => {
                    this.changeLoading(false);
                    if (!err.data) {
                        this.$normalToast('网络错误，刷新后重试');
                    }
                });
            });
        },
        cancleAppealHandle() {
            this.$dialog.confirm({
                title: '确认取消申诉',
                messageAlign: 'left',
                message: `<div class="app-reset-diolog-message">
                    <span class="primary-color">确认取消本次申诉</span>
                </div>`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcAppealCancel(this.orderDetail.id).then(() => {
                    this.getOrderDetail();
                    this.$normalToast('取消申诉成功');
                    this.changeLoading(false);
                }).catch((err: any) => {
                    this.changeLoading(false);
                    if (!err.data) {
                        this.$normalToast('网络错误，刷新后重试');
                    }
                });
            });
        },
        showPayHandle() {
            if (this.payDetail.id) {
                this.show = true;
                return;
            }
            this.getBankListById().then(() => {
                this.show = true;
            });
        },
        appealHandle() {
            this.$router.push(`/otc/order/appeal?id=${this.orderDetail.id}`);
        },
    },
});
</script>

<style scoped lang="less">
.otc-order-detail{
    background: #f8f8f8;
    height: 100%;
    overflow: scroll;
    // padding-bottom: 220px;
    .order-detail{
        &-top{
            background: #ffffff;
            padding-top: 33px;
            padding-bottom: 39px;
            .lable{
                color: #A5A5A5;
                margin-bottom: 26px;
            }
            .value{
                color: #585858;
                font-size: 28px;
            }
        }
        &-list{
            // background: #f8f8f8;
            padding-top: 28px;
            &>ul{
                &>li{
                    background: #ffffff;
                    margin-top: 28px;
                    padding-top: 43px;
                    padding-bottom: 42px;
                    font-size: 29px;
                    .lable{
                        color: #A5A5A5;
                    }
                    .value{
                        font-size: 28px;
                        color: #333333;
                    }
                    .list-item-2{
                        margin-top: 42px;
                    }
                }
            }
        }
    }
    .pay-dialog{
        line-height: 80px;
        padding-bottom: 42px;
    }
}
</style>
