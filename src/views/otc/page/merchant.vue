<template>
    <div @scroll.capture="scrollLoad" class="otc-business-detail">
        <Drawer position="right" v-model="isShow">
            <OrderFilter :title="$t('common.screen')">
                <SubOrderFilter :title="$t('common.status')">
                    <SubOrderFilterItem
                        :active="status === item"
                        v-for="item in OtcOrderState"
                        :key="item"
                        @click="changeState(item)"
                    >
                        {{item | otcOrderState}}
                    </SubOrderFilterItem>
                    <SubOrderFilterItem :active="status === -1" @click="changeState(-1)">{{$t('common.all')}}</SubOrderFilterItem>
                </SubOrderFilter>
                <SubOrderFilter :title="$t('common.currency')">
                    <SubOrderFilterItem
                        v-for="item in symbolList"
                        :active="coin === item.symbol"
                        :key="item.symbol"
                        @click="changeCoin(item.symbol)"
                    >{{item.symbol.toUpperCase()}}</SubOrderFilterItem>
                    <SubOrderFilterItem :active="coin === ''" @click="changeCoin('')">{{$t('common.all')}}</SubOrderFilterItem>
                </SubOrderFilter>
            </OrderFilter>
        </Drawer>
        <TitleHeader no-right-padding>
            <template #title>
                <span class="otc-business-detail-name ellipsis-1">{{merchantInfo.nickname}}</span>
                <span class="otc-business-detail-tel">{{merchantInfo.phone | sliceMoblepre | formatName}}</span>
            </template>
            <div slot="right">
                <img class="app-img-50" src="../../../assets/img/otc/vfy_business.png" alt="">
                <img class="app-img-50" src="../../../assets/img/otc/vfy_real.png" alt="">
            </div>
            <Button size="auto"  @click="$router.push('/otc/adv?symbol=usdt')" shape="l-semicircle" slot="header">
                {{$t('otc.otcAdv')}}
            </Button>
            <div class="content-box">

                <p class="otc-business-detail-time text-align-l app-padding40">
                    {{$t('otc.vfytime')}}:{{merchantInfo.verification_at | date('yyyy-MM-dd hh:mm:ss')}}
                </p>
                <div class="otc-business-detail-top">
                    <div class="app-border-margin16 border-b"></div>
                    <div class="app-padding40 detail-info">
                        <div class="flex-between-c">
                            <div>
                                <p>{{$t('otc.cumulative')}}</p>
                                <p>{{merchantInfo.order_count}}</p>
                            </div>
                            <div>
                                <p>{{$t('otc.tradeOrderNum')}}</p>
                                <p>{{merchantInfo.finished_count}}</p>
                            </div>
                            <div>
                                <p>{{$t('otc.tradeOrderRate')}}</p>
                                <p>{{merchantInfo.finished_rate ? (merchantInfo.finished_rate * 100).toFixed(2) : 0 }}%</p>
                            </div>
                            <!-- <span>{{$t('otc.cumulative')}}</span>
                            <span>{{$t('otc.tradeOrderNum')}}</span>
                            <span>{{$t('otc.tradeOrderRate')}}</span> -->
                        </div>
                        <!-- <div class="flex-between-c value">
                            <span>{{merchantInfo.order_count}}</span>
                            <span>{{merchantInfo.finished_count}}</span>
                            <span>{{merchantInfo.finished_rate ? (merchantInfo.finished_rate * 100).toFixed(2) : 0 }}%</span>
                        </div> -->
                    </div>
                    <div class="detail-top-empty"></div>
                </div>
                <TabList
                    size="big"
                    border
                    :defaultVal="side"
                    sticky
                    subSticky
                    @on-click="clickHandle"
                    class="otc-business-detail-tabbar"
                    :tabList="bodyTabList"
                    ref="tablist"
                >
                    <div slot="tabright" class="app-padding40">
                        <img class="app-img-50"  @click="isShow=!isShow" src="@/assets/img/common/screen.png" alt="">
                    </div>
                    <div class="otc-list" v-for="(item) in bodyTabList" :key="item.value" :slot="item.value">
                        <PullRefresh
                            v-model="isLoading"
                            @refresh="onRefresh"
                        >
                            <div v-for="(item, index) in list" :key="index">
                                <NCardItem :showArrow="true" @click="goAdvState(item)">
                                    <template slot="title">
                                        <span>{{item.coin && item.coin.toUpperCase()}}</span>
                                        <span :class="item.type|orderSideColor">{{item.type | orderSideTypeUser}}</span>
                                    </template>
                                    <template slot="right">
                                        <span :class="item.status | otcOrderStateColor">{{item.status | otcOrderState}}</span>
                                    </template>
                                    <template slot="lable">
                                        <span>{{$t('common.price')}} ({{_unitIcon}})</span>
                                        <span>{{$t('otc.num')}} ({{item.coin && item.coin.toUpperCase()}})</span>
                                        <span>{{$t('otc.turnover')}} ({{_unitIcon}})</span>
                                    </template>
                                    <template slot="value">
                                        <span>{{item.price}}</span>
                                        <span>{{item.total}}</span>
                                        <span>{{(item.price * item.total)}}</span>
                                    </template>
                                </NCardItem>
                                <div class="app-border-margin16 border-b"></div>
                            </div>
                            <div class="loadMore-loading"><Loading type='component' :loading='loadMore'></Loading></div>
                            <p v-if="isEnd && list.length" class="color-gray">{{$t('common.noMore')}}</p>
                            <noData v-if="!_loading && (!list.length)"/>
                        </PullRefresh>
                    </div>
                </TabList>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { axiosGoPromiseArr } from '@/api/axios';
import Loading from '@/components/loading/index.vue';
import NCardItem from '@/components/card/index.vue';
import Drawer from '@/components/commons/Drawer.vue';
import { OrderFilter, SubOrderFilter, SubOrderFilterItem } from '@/components/Orders/index';
import { OtcOrderState } from '@/commons/config/index';

type data = {
    OtcOrderState: OtcOrderState;
    isLoading: boolean;
    coin: string;
    loadMore: boolean;
    isEnd: boolean;
    isShow: boolean;
    side: 1|2;
    limit: number;
    status: number;
    merchantInfo: any;
    list: any[];
    // 获取渲染的数据
    renderData: {
        // 购买数据
        1: {
            [elme: string]: Array<any>;
        };
        // 出售数据
        2: {
            [elme: string]: Array<any>;
        };
    };
    // 获取每个币种的总长度 total
    paramsData: {
        1: {
            [elme: string]: number;
        };
        2: {
            [elme: string]: number;
        };
    };
}

export default Vue.extend({
    name: 'OtcMerchant',
    components: {
        Loading,
        NCardItem,
        Drawer,
        OrderFilter,
        SubOrderFilter,
        SubOrderFilterItem,
    },
    data(): data {
        return {
            OtcOrderState,
            isLoading: false,
            isEnd: false,
            loadMore: false,
            isShow: false,
            side: 2,
            status: -1,
            coin: '',
            limit: 10,
            merchantInfo: {},
            list: [],
            renderData: {
                1: {},
                2: {},
            },
            paramsData: {
                1: {},
                2: {},
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'otcAdvDetail' && vm.list.length) {
                return;
            }
            vm.otcGetMerchant();
            vm.otcMerchantStat();
            vm.initParams();
        });
    },
    created() {
        this.loadData();
    },
    computed: {
        merchant(): any {
            return this.$store.state.merchant;
        },
        symbolList(): Array<CoinInfo> {
            return this.$store.getters.getOtcEnableList;
        },
        bodyTabList(): Array<any> {
            return [{
                title: this.$t('otc.advertising'),
                value: 'sideBuyT',
                side: 2,
            // }, {
            //     title: '历史',
            //     value: 'sideSellT',
            //     side: 1,
            }];
        },
    },
    methods: {
        onRefresh() {
            this.initParams(true);
        },
        // 滚动懒加载
        scrollLoad(event: Event) {
            const scroll = (event.target as HTMLElement);
            const { scrollTop, scrollHeight, clientHeight } = scroll;
            if ((clientHeight + scrollTop > scrollHeight - 100) && (clientHeight + scrollTop !== scrollHeight) && !this.loadMore && !this.isEnd) {
                this.loadMore = true;
                this.loadData();
            }
        },
        // 请求参数初始化
        initParams(refresh?: boolean) {
            if (!refresh) {
                this.list = [];
            }
            this.isEnd = false;
            this.loadMore = false;
            this.loadData(refresh);
        },
        changeState(status: number) {
            this.status = status;
            this.initParams();
        },
        changeCoin(coin: string) {
            this.coin = coin;
            this.initParams();
        },
        // 加载数据
        loadData(refresh?: boolean) {
            const params = {
                coin: this.coin, // [string] 币种
                status: this.status, // [OtcOrderState] -1取全部
                // begin: 0, // [time] 开始时间
                // end: 0, // [time] 结束时间
                offset: refresh ? 0 : this.list.length, // [int64] 跳过条数
                limit: this.limit, // [int64] 最大返回条数
            };
            if (!refresh) {
                this.changeLoading(true);
            }
            // 取消请求
            if (axiosGoPromiseArr.value) {
                axiosGoPromiseArr.value.forEach((ele) => {
                    ele.cancel(ele);
                });
            }
            this.$api.otcOrderList(params).then((res: any) => {
                this.isLoading = false;
                this.loadMore = false;
                this.changeLoading(false);
                if (res.data.list) {
                    if (refresh) {
                        this.list = res.data.list;
                    } else {
                        this.list = this.list.concat(res.data.list);
                    }
                }
                if (this.list.length >= res.data.total) {
                    this.isEnd = true;
                }
                if (this.$refs.tablist) {
                    (this.$refs.tablist as any).getContentHeight();
                }
            }).catch(() => {
                this.changeLoading(false);
                this.isLoading = false;
                this.loadMore = false;
            });
        },
        otcMerchantStat() {
            return this.$api.otcMerchantStat(this._userInfo.id).then((res: any) => {
                this.merchantInfo = res.data;
            });
        },
        clickHandle(item: any) {
            this.side = item.side;
            axiosGoPromiseArr.value.forEach((ele) => {
                ele.cancel(ele);
            });
        },
        // 去广告详情页
        goAdvState(item: { id: any }) {
            this.$router.push(`/otc/adv/detail?id=${item.id}`);
        },
    },
});
</script>

<style lang="less" scoped>
.otc-business-detail{
    height: 100%;
    width: 100%;
    overflow: scroll;
    &-name{
        display: inline-block;
        max-width: 300px;
        white-space: nowrap;
    }
    &-tel{
        font-size: 28px;
        line-height: 28px;
        font-weight: normal;
        color: #333333;
        margin-left: 44px;
    }
    &-top{
        color: #A5A5A5;
        .detail-info{
            line-height: 55px;
            padding-top: 25px;
            padding-bottom: 25px;
            .value{
                font-size: 28px;
                color: #575757;
            }
        }
        .detail-top-empty{
            height: 24px;
            background: #f8f8f8;
        }
    }
    &-time{
        height: 102px;
        line-height: 102px;
    }
    &-tabbar{
        padding-top: 35px;
    }
    .content-list-nodata{
        margin: 28px 0;
    }
}
.fade-enter-active, .fade-leave-active {
    transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0.3;
}
</style>
