<template>
    <div class="otc-order-detail">
        <Headers />
        <PullRefresh fill v-model="isLoading" @refresh="onRefresh">
            <Titles border>
                <span :class="orderDetail.state | otcOrderStateColor">{{orderDetail.state | otcDealState}}</span>
                <span v-if="orderDetail.state === 0" class="red-color order-detail-download" slot="right">{{download | timeDown('mm:ss')}}</span>
            </Titles>
            <div>
                <div class="order-detail-top flex-between-c app-padding40">
                    <div class="text-align-l">
                        <p class="lable" v-t="'otc.totalTurnover'"></p>
                        <h5 class="primary-color app-size-34">{{ orderDetail.value }}</h5>
                    </div>
                    <div class="text-align-l">
                        <p class="lable" v-t="'otc.buyCurrency'"></p>
                        <p class="value">{{ orderDetail.coin | toUpperCase }}</p>
                    </div>
                    <div class="text-align-r">
                        <p class="lable" v-t="'otc.orderType'"></p>
                        <p class="" :class="orderDetail.taker_side|orderSideColor">
                            {{ orderDetail.taker_side | orderSideUser(orderDetail.taker_id, _userInfo.id)}}
                        </p>
                    </div>
                </div>
                <div class="order-detail-list">
                    <ul class="app-padding40">
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable" v-t="'otc.unitPrice'"></div>
                                <div class="primary-color">{{ orderDetail.price }} {{_unitIcon}}</div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <div class="lable" v-t="'otc.num'"></div>
                                <div class="value">{{ orderDetail.amount }} {{orderDetail.coin | toUpperCase}}</div>
                            </div>
                        </li>
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable">{{ orderDetail.taker_side | orderSideUserLable(orderDetail.taker_id, _userInfo.id)}}</div>
                                <div>
                                    <!-- <span class="vertical-m" v-t="'otc.seeDetails'"></span>
                                    <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt=""> -->
                                </div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <!-- TODO: 商家昵称、手机号-->
                                <div class="value">{{orderDetail.target_nickname}}</div>
                                <div class="value">{{orderDetail.target_phone | sliceMoblepre | formatName}}</div>
                            </div>
                        </li>
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable" v-t="'otc.orderNum'"> </div>
                                <div class="value">#{{ orderDetail.id }}#</div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <div class="lable" v-t="'otc.orderTime'"></div>
                                <div class="value">{{ orderDetail.created_at | date('yyyy-MM-dd hh:mm:ss')}}</div>
                            </div>
                        </li>
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable" v-t="'common.payway'"></div>
                                <div @click="showPayHandle" class="primary-color">
                                    <span class="vertical-m">{{ orderDetail.pay_type | payType}}</span>
                                    <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
                                </div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <!-- TODO: 支付信息 -->
                                <div class="value" v-t="'otc.payNum'"></div>
                                <div class="value">{{ orderDetail.pay_tag }}</div>
                            </div>
                        </li>
                        <li v-if="orderDetail.appealing" class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable" v-t="'otc.appeal'"></div>
                                <div >
                                    {{ appealData.type | otcAppealType}}
                                </div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <div class="value" v-t="'otc.appealTime'"></div>
                                <div class="value">{{ appealData.created_at | date('yyyy-MM-dd hh:mm:ss')}}</div>
                            </div>
                            <div v-show="appealData.suggest" class="flex-between-c list-item-2">
                                <div class="value" v-t="'otc.opinions'"></div>
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
            <!-- {{showPayBtn}}
            {{showReleasBtn}} -->
            <Button @click="cancleHandle" v-if="showPayBtn" type="cancel">{{$t('common.cancle2')}}</Button>
            <Button @click="otcDealPadiHandle" v-if="showPayBtn">{{$t('otc.markPaid')}}</Button>
            <Button @click="appealHandle"
                v-if="orderDetail.state === 1 && !orderDetail.appealing && !appealData.id" type="down">{{$t('otc.appeal')}}</Button>
            <Button @click="cancleAppealHandle" v-if="orderDetail.appealing && appealingStatus(appealData.uid, appealData.user_type)" type="down">
                {{$t('otc.cancelAppeal')}}
            </Button>
            <Button @click="releaseHandle" v-if="showReleasBtn && !orderDetail.appealing" type="up">{{$t('otc.release')}}</Button>
            <Button @click="showAppealing" v-if="orderDetail.appealing && !appealingStatus(appealData.uid, appealData.user_type)" type="down">
                {{$t('otc.appealing')}}
            </Button>
        </div>
        <van-dialog v-model="show" close-on-click-overlay :show-confirm-button="false" :title="$t('common.payway')">
            <div class="pay-dialog app-padding40">
                <div class="flex-between-c">
                    <span v-t="'otc.mode'"></span>
                    <span>{{payDetail.type | payType}}</span>
                </div>
                <div class="flex-between-c">
                    <span v-t="'payway.name'"></span>
                    <span @click="$copyText(payDetail.real_name)" class="primary-color">{{payDetail.real_name}}</span>
                </div>
                <div v-if="payDetail.type === 1" class="flex-between-c">
                    <span v-t="'payway.bankDeposit'"></span>
                    <span @click="$copyText(payDetail.bank)" class="primary-color">{{payDetail.bank}}</span>
                </div>
                <div class="flex-between-c">
                    <span v-t="'payway.account'"></span>
                    <span @click="$copyText(payDetail.account)" class="primary-color">{{payDetail.account}}</span>
                </div>
                <div v-if="payDetail.type !== 1" class="flex-between-c">
                    <span v-t="'payway.qrc'"></span>
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
    detailTimer: any;
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
            detailTimer: 0,
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
        showPayBtn(): boolean {
            // state = 0 &&  (购买 || 买入)
            return this.orderDetail.state === 0 && this.getTakerType(this.orderDetail.taker_side, this.orderDetail.maker_id, this._userInfo.id);
        },
        showReleasBtn(): boolean {
            // state = 2 &&  (出售 || 卖出)
            return this.orderDetail.state === 1 && !this.getTakerType(this.orderDetail.taker_side, this.orderDetail.maker_id, this._userInfo.id);
        },
    },
    created() {
        this.id = Number(this.$route.query.id);
        this.getOrderData();
    },
    destroyed() {
        clearInterval(this.timer);
        clearInterval(this.detailTimer);
    },
    methods: {
        // 订单方向 OrderSide
        // Vue.filter('orderSideUser', (state: 1|2, taker_id: number, user_id: number) => {
        //     // OrderSideBuy   = 1 // 买入
        //     // OrderSideSell  = 2 // 卖出
        //     const states1 = {
        //         1: 'common.sideBuy', 买入
        //         2: 'common.sideSellT', 出售
        //     };
        //     const states2 = {
        //         1: 'common.sideSell', 卖出
        //         2: 'common.sideBuyT', 购买
        //     };
        //     if (taker_id === user_id) {
        //         return i18n.t(states1[state]);
        //     }
        //     return i18n.t(states2[state]);
        // });
        /** 判断交易方向
         *
         * @return true (购买 || 买入)
         * @return false (出售 || 卖出)
         */
        getTakerType(taker_side: number, maker_id: number, userId: string|number) {
            if (maker_id === Number(userId)) {
                // return taker_side === 2; // true => 买入  false => 出售
                if (taker_side === 2) {
                    return true; // 购买
                }
                return false; // 卖出
                // return;
            }
            if (taker_side === 2) {
                return false; // 出售
            }
            return true; // 买入
            // 买入 卖出
            // return taker_side === 1; // false => 卖出  true => 购买
        },
        // TODO: 商家和买家不一样
        goBusinessDetail() {
            // taker_id: 4
            // maker_id: 2
            const uid = this._userInfo.id === this.orderDetail.taker_id ? this.orderDetail.maker_id : this.orderDetail.taker_id;
            this.$router.push(`/otc/business/detail?uid=${uid}`);
        },
        appealingStatus(uid: number, type: number) {
            if (uid === Number(this._userInfo.id) && type === 1) {
                return true;
            }
            if (uid === Number(this._userInfo.id) && type === 2) {
                return true;
            }
            return false;
        },
        onRefresh() {
            this.getOrderData(true);
        },
        refreshOrderDetail() {
            clearInterval(this.detailTimer);
            if (this.orderDetail.state === 0 || this.orderDetail.state === 1) {
                Promise.all([this.otcAppealByOrderId(), this.getOrderDetail()]).finally(() => {
                    this.changeLoading(false);
                    this.detailTimer = setTimeout(() => {
                        this.refreshOrderDetail();
                    }, 5000);
                });
            }
        },
        getOrderData(refresh?: boolean) {
            if (!refresh) {
                this.changeLoading(true);
            }
            this.isLoading = true;
            Promise.all([this.otcAppealByOrderId(), this.getOrderDetail()]).finally(() => {
                this.changeLoading(false);
                this.isLoading = false;
                this.refreshOrderDetail();
            });
        },
        showAppealing() {
            this.$dialog.alert({
                title: `${this.$t('common.poptip')}`,
                message: `${this.$t('otc.contactAppealing')}`,
                confirmButtonText: `${this.$t('common.ok')}`,
            });
        },
        otcAppealByOrderId() {
            return this.$api.otcAppealByOrderId(this.id).then((res: any) => {
                if (res.data) {
                    this.appealData = res.data;
                }
            });
        },
        getBankListById() {
            this.changeLoading(true);
            return this.$api.getBankListById(this.orderDetail.bank_info_id).then((res: any) => {
                this.changeLoading(false);
                this.payDetail = res.data;
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast(this.$t('otc.payInfoFailed'));
                }
                throw new Error();
            });
        },
        getDownload(created_at: string) {
            clearInterval(this.timer);
            // TODO 时间搓
            const createdAt = new DateForamt(created_at, true).getDate().getTime();

            const OtcGlobalDealTimeout = Number(this.configCommon.OtcGlobalDealTimeout) * 1000;
            this.timer = setInterval(() => {
                const nowTimer = new Date().getTime();
                this.download = OtcGlobalDealTimeout - (nowTimer - createdAt);
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
                    this.getTakerType(this.orderDetail.taker_side, this.orderDetail.maker_id, this._userInfo.id);
                    if (this.orderDetail.state === 0) {
                        this.getDownload(this.orderDetail.created_at);
                    } else {
                        clearInterval(this.timer);
                    }
                    return;
                }
                this.$normalToast(this.$t('otc.orderInfoFailed'));
            }).catch((err: any) => {
                this.isLoading = false;
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast(this.$t('otc.orderInfoFailed'));
                }
            });
        },
        showPayImg(qrc: string) {
            ImagePreview({
                images: [`${this.$api.getFile}${qrc}`],
            });
        },
        imagePreviewHandle(index: number) {
            ImagePreview({
                images: this.appealImages,
                startPosition: index,
            });
        },
        cancleHandle() {
            this.$dialog.confirm({
                title: `${this.$t('otc.cancelPay')}`,
                messageAlign: 'left',
                confirmButtonText: `${this.$t('common.ok')}`,
                cancelButtonText: `${this.$t('common.cancle2')}`,
                message: `<div class="app-reset-diolog-message">
                    <span class="red-color">${this.$t('otc.noCancelPay')}</span>
                    <span>${this.$t('otc.cancelRule', { num: this.configCommon.OtcGlobalMaxCancel })}</span>
                </div>`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcDealCancel(this.orderDetail.id).then(() => {
                    this.changeLoading(false);
                    this.getOrderData();
                    this.$normalToast(this.$t('otc.cancelSuccess'));
                }).catch((err: any) => {
                    this.changeLoading(false);
                    if (!err.data) {
                        this.$normalToast(this.$t('common.networkErr'));
                    }
                });
            });
        },
        releaseHandle() {
            this.$dialog.confirm({
                title: `${this.$t('otc.releasePay')}`,
                confirmButtonText: `${this.$t('common.ok')}`,
                cancelButtonText: `${this.$t('common.cancle2')}`,
                message: `<div class="app-reset-diolog-message">
                    <span class="red-color">${this.$t('otc.noReleasePay')}</span>
                </div>`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcDealRelease(this.orderDetail.id).then(() => {
                    this.changeLoading(false);
                    this.getOrderData();
                    this.$normalToast(this.$t('otc.releaseSuccess'));
                }).catch((err: any) => {
                    this.changeLoading(false);
                    if (!err.data) {
                        this.$normalToast(this.$t('common.networkErr'));
                    }
                });
            });
        },
        otcDealPadiHandle() {
            this.$dialog.confirm({
                title: `${this.$t('otc.payConfirm')}`,
                messageAlign: 'left',
                confirmButtonText: `${this.$t('common.ok')}`,
                cancelButtonText: `${this.$t('common.cancle2')}`,
                message: `<div class="app-reset-diolog-message">
                    <span>${this.$t('otc.confirmPay')}</span>
                    <span class="red-color">${this.$t('otc.maliciousClick')}</span>
                </div>`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcDealPadi(this.orderDetail.id).then(() => {
                    this.getOrderData();
                    this.$normalToast(this.$t('otc.confirmSuccess'));
                    this.changeLoading(false);
                }).catch((err: any) => {
                    this.changeLoading(false);
                    if (!err.data) {
                        this.$normalToast(this.$t('common.networkErr'));
                    }
                });
            });
        },
        cancleAppealHandle() {
            this.$dialog.confirm({
                title: `${this.$t('otc.confirmAppeal')}`,
                confirmButtonText: `${this.$t('common.ok')}`,
                cancelButtonText: `${this.$t('common.cancle2')}`,
                message: `${this.$t('otc.noConfirmAppeal')}`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.otcAppealCancel(this.appealData.id).then(() => {
                    this.getOrderData();
                    this.$normalToast(this.$t('otc.cancelAppealSuccess'));
                    this.changeLoading(false);
                }).catch((err: any) => {
                    this.changeLoading(false);
                    if (!err.data) {
                        this.$normalToast(this.$t('common.networkErr'));
                    }
                });
            });
        },
        showSuggestHandle(suggest: string) {
            this.$dialog.alert({
                title: `${this.$t('otc.opinions')}`,
                message: suggest,
                confirmButtonText: `${this.$t('common.ok')}`,
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
