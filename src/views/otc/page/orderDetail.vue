<template>
    <div class="otc-order-detail">
        <Headers />
        <PullRefresh v-model="isLoading" @refresh="onRefresh">
            <Titles border>
                <span :class="orderDetail.state | otcOrderStateColor">{{orderDetail.state | otcDealState}}</span>
                <span v-if="orderDetail.state === 0" class="red-color order-detail-download" slot="right">{{download | timeDown('mm:ss')}}</span>
            </Titles>
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
                        <p class="" :class="orderDetail.taker_side|orderSideColor">
                            {{ orderDetail.taker_side | orderSideUser(orderDetail.taker_id, _userInfo.id)}}
                        </p>
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
                        <li v-if="false" class="app-padding40">
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
                                <div class="value">付款参考号</div>
                                <div class="value">{{ orderDetail.pay_tag }}</div>
                            </div>
                        </li>
                        <li v-if="orderDetail.appealing" class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable">申诉</div>
                                <div >
                                    {{ appealData.type | otcAppealType}}
                                </div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <div class="value">申诉时间</div>
                                <div class="value">{{ orderDetail.created_at | date('yyyy-MM-dd hh:mm:ss')}}</div>
                            </div>
                            <div v-show="appealData.suggest" class="flex-between-c list-item-2">
                                <div class="value">处理意见</div>
                                <div class="value">{{ orderDetail.created_at | date('yyyy-MM-dd hh:mm:ss')}}</div>
                                <div
                                    @click="showSuggestHandle(appealData.suggest)"
                                    class=" primary-color appeal-suggest ellipsis"
                                >{{ appealData.suggest}}</div>
                            </div>
                            <div class="appeal-img-list">
                                <img
                                    v-for="(item, index) in appealImages"
                                    :key="index"
                                    @click="imagePreviewHandle(index)"
                                    :src="item" alt="">
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
            <Button @click="cancleHandle" v-if="
                orderDetail.state === 0
                &&
                orderDetail.taker_id === _userInfo.id
                &&
                orderDetail.taker_side" type="cancel"
            >取消</Button>
            <Button @click="otcDealPadiHandle" v-if="
                orderDetail.state === 0
                &&
                orderDetail.taker_id === _userInfo.id
                &&
                orderDetail.taker_side"
            >标记已支付</Button>
            <Button @click="appealHandle" v-if="
                orderDetail.state === 1
                &&
                !orderDetail.appealing" type="down"
            >申诉</Button>
            <Button @click="cancleAppealHandle" v-if="orderDetail.appealing" type="down">取消申诉</Button>
            <Button @click="releaseHandle" v-if="
                orderDetail.state === 1
                &&
                orderDetail.taker_side" type="up"
            >释放</Button>
        </div>
        <van-dialog v-model="show" close-on-click-overlay :show-confirm-button="false" title="支付方式">
            <div class="pay-dialog app-padding40">
                <div class="flex-between-c">
                    <span>方式 </span>
                    <span>{{payDetail.type | payType}}</span>
                </div>
                <div class="flex-between-c">
                    <span>姓名</span>
                    <span @click="$copyText(payDetail.real_name)" class="primary-color">{{payDetail.real_name}}</span>
                </div>
                <div v-if="payDetail.type === 1" class="flex-between-c">
                    <span>开户行</span>
                    <span @click="$copyText(payDetail.bank)" class="primary-color">{{payDetail.bank}}</span>
                </div>
                <div class="flex-between-c">
                    <span>账号</span>
                    <span @click="$copyText(payDetail.account)" class="primary-color">{{payDetail.account}}</span>
                </div>
                <div class="flex-between-c">
                    <span>二维码</span>
                    <img @click="showPayImg(payDetail.qrc)" class="app-img-50" :src="`${$api.getFile}${payDetail.qrc}`" alt="">
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ImagePreview } from 'vant';
import { DateForamt } from '@/utils/tool';

type data = {
    show: boolean;
    isLoading: boolean;
    id: number;
    download: number;
    timer: any;
    orderDetail: any;
    payDetail: any;
    appealData: any;
}

export default Vue.extend({
    name: 'OtcGardCard',
    data(): data {
        return {
            show: false,
            isLoading: true,
            timer: 0,
            id: 0,
            payDetail: {},
            appealData: {},
            download: 0,
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
    computed: {
        appealImages(): Array<any> {
            if (this.appealData.images) {
                return this.appealData.images.split(',').map((item: string) => `${this.$api.getFile}${item}`);
            }
            return [];
        },
        configCommon(): any {
            return this.$store.state.configCommon;
        },
    },
    created() {
        this.id = Number(this.$route.query.id);
        this.getOrderData();
    },
    destroyed() {
        clearInterval(this.timer);
    },
    methods: {
        onRefresh() {
            this.getOrderData(true);
        },
        getOrderData(refresh?: boolean) {
            if (!refresh) {
                this.changeLoading(true);
            }
            this.isLoading = true;
            Promise.all([this.otcAppealByOrderId(), this.getOrderDetail()]).finally(() => {
                this.changeLoading(false);
                this.isLoading = false;
            });
        },
        otcAppealByOrderId() {
            return this.$api.otcAppealByOrderId(this.id).then((res: any) => {
                console.log(res);
                if (res.data) {
                    this.appealData = res.data;
                }
            });
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
        getDownload(created_at: string) {
            clearInterval(this.timer);
            // TODO 时间搓
            const createdAt = new DateForamt(created_at, true).getDate().getTime();

            console.log(createdAt, this.configCommon.OtcGlobalDealTimeout);
            const OtcGlobalDealTimeout = Number(this.configCommon.OtcGlobalDealTimeout) * 1000;
            this.timer = setInterval(() => {
                console.log('==');
                const nowTimer = new Date().getTime();
                console.log(nowTimer, createdAt);
                this.download = OtcGlobalDealTimeout - (nowTimer - createdAt);
                console.log(this.download);
                if (this.download <= 0) {
                    clearInterval(this.timer);
                    this.getOrderDetail();
                }
            }, 1000);
        },
        getOrderDetail() {
            return this.$api.otcDealGetById(this.id).then((res: any) => {
                this.changeLoading(false);
                this.isLoading = false;
                if (res.data) {
                    // eslint-disable-next-line prefer-destructuring
                    this.orderDetail = res.data;
                    if (this.orderDetail.state === 0) {
                        this.getDownload(this.orderDetail.created_at);
                    } else {
                        clearInterval(this.timer);
                    }
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
        showPayImg(qrc: string) {
            ImagePreview({
                images: [`${this.$api.getFile}${qrc}`],
            });
        },
        imagePreviewHandle(index: number) {
            console.log(this);
            console.log(Object.keys(this).indexOf('$dialog'));
            ImagePreview({
                images: this.appealImages,
                startPosition: index,
            });
        },
        cancleHandle() {
            this.$dialog.confirm({
                title: '确认取消交易',
                messageAlign: 'left',
                message: `<div class="app-reset-diolog-message">
                    <span class="red-color">如果您已经向卖家付款， 请不要取消交易</span>
                    <span>取消规则： 买家24小时累计取消${this.configCommon.OtcGlobalMaxCancel}笔交易， 会限制当日买入功能</span>
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
                message: `<div class="app-reset-diolog-message">
                    <span class="red-color">如果您未收到买家付款， 请不要释放交易</span>
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
                    <span class="red-color">恶意点击将直接冻结账户</span>
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
                message: '确认取消本次申诉',
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcAppealCancel(this.appealData.id).then(() => {
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
        showSuggestHandle(suggest: string) {
            this.$dialog.alert({
                title: '处理意见',
                message: suggest,
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
        &-download{
            font-size: 28px;
        }
    }
    .pay-dialog{
        line-height: 80px;
        padding-bottom: 42px;
    }
    .appeal-suggest{
        width: 50%;
        text-align: right;
    }
    .appeal-img-list{
        text-align: left;
        img{
            margin: 15px;
            width: 80px;
        }
    }
}
</style>
