<template>
    <div @scroll.capture="scrollLoad($event, scrollLoadHandle)" class="adv-manage">
        <Drawer position="right" v-model="isShow">
            <OrderFilter :title="$t('common.screen')">
                <SubOrderFilter :title="$t('common.status')">
                    <SubOrderFilterItem
                        :active="state === item"
                        v-for="item in OtcDealState"
                        :key="item"
                        @click="changeState(item)"
                    >
                        {{item | otcDealState}}
                    </SubOrderFilterItem>
                    <SubOrderFilterItem :active="state === -1" @click="changeState(-1)">{{$t('common.all')}}</SubOrderFilterItem>
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
        <TitleHeader :title="$t('otc.order')">
            <img slot="header" @click="isShow=!isShow" class="app-img-50" src="@/assets/img/common/screen.png" alt="">
            <div class="app-margin-t40">
                <div class="body-content-slot" slot="history">
                    <PullRefresh
                        v-model="isLoading"
                        @refresh="onRefresh"
                    >
                        <NCardItem :showArrow="true" @click="goAdvState(item)" v-for="(item, index) in list" :key="index">
                            <template slot="title">
                                <span>{{item.coin && item.coin.toUpperCase()}}</span>
                                <span :class="item.taker_side|orderSideUserColor(item.taker_id, _userInfo.id)">
                                    {{item.taker_side | orderSideUser(item.taker_id, _userInfo.id)}}
                                </span>
                            </template>
                            <template slot="right">
                                <span :class="item.state | otcDealStateColor">{{item.state | otcDealState}}</span>
                            </template>
                            <template slot="lable">
                                <span>{{$t('common.price')}} ({{_unitIcon}})</span>
                                <span>{{$t('otc.num')}} ({{item.coin && item.coin.toUpperCase()}})</span>
                                <span>{{$t('otc.turnover')}} ({{_unitIcon}})</span>
                            </template>
                            <template slot="value">
                                <span>{{item.price}}</span>
                                <span>{{item.amount}}</span>
                                <span>{{item.value}}</span>
                            </template>
                        </NCardItem>
                        <div class="loadMore-loading"><Loading type='component' :loading='loadMore'></Loading></div>
                        <p v-if="isEnd && list.length" class="content-list-nodata color-gray">{{$t('common.noMore')}}</p>
                        <noData v-if="!_loading && (!list.length)"/>
                    </PullRefresh>
                </div>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { axiosGoPromiseArr } from '@/api/axios';
import Loading from '@/components/loading/index.vue';
// import navFilter from '../component/filter.vue';
import Drawer from '@/components/commons/Drawer.vue';
import { OrderFilter, SubOrderFilter, SubOrderFilterItem } from '@/components/Orders/index';
import NCardItem from '@/components/card/index.vue';
import { OtcDealState } from '@/commons/config/index';

export default Vue.extend({
    components: {
        Loading,
        Drawer,
        OrderFilter,
        SubOrderFilter,
        SubOrderFilterItem,
        NCardItem,
    },
    data() {
        return {
            OtcDealState,
            state: -1,
            isShow: false,
            loadMore: false,
            coin: '',
            limit: 10,
            isEnd: false,
            isLoading: false,
            list: [],
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'orderdetail' && vm.list.length) {
                return;
            }
            vm.initParams();
        });
    },
    computed: {
        symbolList(): Array<CoinInfo> {
            return this.$store.getters.getOtcEnableList;
        },
    },
    methods: {
        onRefresh() {
            this.initParams(true);
        },
        // 滚动懒加载
        scrollLoadHandle() {
            this.loadData();
        },
        scrollLoad(event: Event) {
            const scroll = (event.target as HTMLElement);
            const { scrollTop, scrollHeight, clientHeight } = scroll;
            if ((clientHeight + scrollTop > scrollHeight - 50) && (clientHeight + scrollTop !== scrollHeight) && !this.loadMore && !this.isEnd) {
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
        changeState(state: number) {
            this.state = state;
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
                state: this.state, // [OtcOrderState] -1取全部
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
            this.$api.otcOrderDealList(params).then((res: any) => {
                this.changeLoading(false);
                this.isLoading = false;
                this.loadMore = false;
                if (res.data.list) {
                    if (refresh) {
                        this.list = res.data.list;
                    } else {
                        this.list = this.list.concat(res.data.list);
                    }
                    if (this.list.length >= res.data.total) {
                        this.isEnd = true;
                    }
                }
            }).catch(() => {
                this.changeLoading(false);
                this.isLoading = false;
                this.loadMore = false;
            });
        },
        // 去广告详情页
        goAdvState(item: { id: any }) {
            this.$router.push(`/otc/order/detail?id=${item.id}`);
        },
    },
});

</script>

<style lang="less" scoped>
.adv-manage{
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #fff;
  overflow: scroll;
}
.content-list-nodata {
    margin: 28px 0;
}

</style>
