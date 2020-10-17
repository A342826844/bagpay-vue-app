<template>
    <div class="otc-order-detail">
        <TitleHeader border title="代付款">
            <!-- TODO: -->
            <span class="red-color" slot="right">{{121 | timeDown('mm:ss')}}</span>
            <div>
                <div class="order-detail-top flex-between-c app-padding40">
                    <div class="text-align-l">
                        <p class="lable">成交总额</p>
                        <h5 class="primary-color app-size-34">{{ orderDetail.value }}</h5>
                    </div>
                    <div class="text-align-l">
                        <p class="lable">交易币种</p>
                        <p class="value">{{ orderDetail.coin.toUpperCase() }}</p>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">订单类型</p>
                        <p class="value">{{ orderDetail.taker_side | orderSideType}}</p>
                    </div>
                </div>
                <div class="order-detail-list">
                    <ul class="app-padding40">
                        <li class="app-padding40">
                            <div class="flex-between-c">
                                <div class="lable">单价</div>
                                <div class="primary-color">{{ orderDetail.price }} {{_unit}}</div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <div class="lable">数量</div>
                                <div class="value">{{ orderDetail.amount }} {{orderDetail.coin.toUpperCase()}}</div>
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
                                <div class="primary-color">
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
        </TitleHeader>
        <div class="app-size-34 lxa-footer-bottom flex-around-c">
            <!-- OtcOrderStateWait        = 0 //等待中
            OtcOrderStateTrading     = 1 //交易中
            OtcOrderStateFinished    = 2 //已完成
            OtcOrderStateCanceled    = 3 //已取消
            OtcOrderStateClosed      = 4 //已关闭
            OtcOrderStatePlatClosed  = 5 //平台强制关闭 -->
            <Button @click="cancleHandle" :radius="false" type="cancel">取消</Button>
            <Button @click="releaseHandle" v-if="orderDetail.state === 1" :radius="false">标记已支付</Button>
            <Button v-if="orderDetail.state === 1" type="down" :radius="false">申述</Button>
            <Button v-if="orderDetail.state === 1" type="up" :radius="false">释放</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'OtcGardCard',
    data() {
        return {
            orderDetail: {
                id: 100,
                taker_id: 1, // 下单用户id
                maker_id: 2, // 广告主用户id
                order_id: 10, // 广告id
                taker_side: 1, // 下单用户的交易方向 OrderSide
                coin: 'usdt', // 币种
                price: 1, // 价格
                amount: 100, // 数量
                value: 100, // 交易额
                fee: 0.01, // 手续费 amount*fee_rate
                pay_type: 1, // PayType
                pay_tag: '0100', // 付款参考号
                bank_info_id: 10, // 收款信息id
                state: 1, // OtcOrderState
                appealing: 0, // 是否申诉中
                created_at: '', // 创建时间
            },
        };
    },
    methods: {
        getOrderDetail() {
            console.log('order');
        },
        cancleHandle() {
            this.$api.otcDealCancel(this.orderDetail.id).then(() => {
                this.getOrderDetail();
                this.$normalToast('取消成功');
            });
        },
        releaseHandle() {
            this.$api.otcDealRelease(this.orderDetail.id).then(() => {
                this.getOrderDetail();
                this.$normalToast('释放成功');
            });
        },
    },
});
</script>

<style scoped lang="less">
.otc-order-detail{
    background: #f8f8f8;
    height: 100%;
    overflow: scroll;
    padding-bottom: 120px;
    .order-detail{
        &-top{
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
            background: #f8f8f8;
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
}
</style>
