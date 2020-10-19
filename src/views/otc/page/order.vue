<template>
    <div class="adv-manage">
        <Drawer position="right" v-model="isShow">
            <OrderFilter :title="'筛选'">
                <SubOrderFilter title="状态">
                    <SubOrderFilterItem
                        :active="state === item"
                        v-for="item in OtcOrderState"
                        :key="item"
                        @click="changeState(item)"
                    >
                        {{item | otcOrderState}}
                    </SubOrderFilterItem>
                    <SubOrderFilterItem :active="state === -1" @click="changeState(-1)">{{$t('common.all')}}</SubOrderFilterItem>
                </SubOrderFilter>
                <SubOrderFilter title="币种">
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
        <TitleHeader fill :title="'场外订单'">
            <img slot="header" @click="isShow=!isShow" class="app-img-50" src="@/assets/img/common/screen.png" alt="">
            <div @scroll.capture="scrollLoad($event, scrollLoadHandle)" class="app-margin-t40">
                <div class="body-content-slot" slot="history">
                    <PullRefresh
                        v-model="isLoading"
                        @refresh="onRefresh"
                    >
                        <NCardItem :showArrow="true" @click="goAdvState(item)" v-for="(item, index) in list" :key="index">
                            <template slot="title">
                                <span>{{item.coin && item.coin.toUpperCase()}}</span>
                                <span :class="item.taker_side|orderSideColor">{{item.taker_side | orderSide}}</span>
                            </template>
                            <template slot="right">
                                <span>{{item.state | otcOrderState}}</span>
                            </template>
                            <template slot="lable">
                                <span>{{"价格"}} ({{_unit}})</span>
                                <span>{{"数量"}} ({{item.coin && item.coin.toUpperCase()}})</span>
                                <span>{{"成交额"}} ({{_unit}})</span>
                            </template>
                            <template slot="value">
                                <span>{{item.price}}</span>
                                <span>{{item.amount}}</span>
                                <span>{{item.value}}</span>
                            </template>
                        </NCardItem>
                        <div class="loadMore-loading"><Loading type='component' :loading='loadMore'></Loading></div>
                        <p v-if="isEnd && list.length" class="color-gray">{{'暂无更多'}}</p>
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
import { OtcOrderState } from '@/commons/config/index';
import scrollLoad from '@/minxin/scrollLoad';

export default Vue.extend({
    components: {
        Loading,
        Drawer,
        OrderFilter,
        SubOrderFilter,
        SubOrderFilterItem,
        NCardItem,
    },
    mixins: [scrollLoad],
    data() {
        return {
            OtcOrderState,
            state: -1,
            isShow: false,
            loadMore: false,
            coin: '',
            limit: 10,
            isEnd: false,
            isLoading: false,
            list: [{ coin: 'usdt' }],
        };
    },
    created() {
        // this.$store.commit('changeLoading', true);
        this.loadData();
    },
    computed: {
        symbolList(): Array<CoinInfo> {
            return this.$store.getters.getOtcEnableList;
        },
    },
    methods: {
        onRefresh() {
            this.initParams();
        },
        // 滚动懒加载
        scrollLoadHandle() {
            this.loadData(true);
        },
        // 请求参数初始化
        initParams(loading?: boolean) {
            this.list = [];
            this.isEnd = false;
            this.loadMore = false;
            this.loadData(loading);
        },
        changeState(state: number) {
            this.state = state;
            this.initParams(true);
        },
        changeCoin(coin: string) {
            this.coin = coin;
            this.initParams(true);
        },
        // 加载数据
        loadData(loading?: boolean) {
            const params = {
                coin: this.coin, // [string] 币种
                state: this.state, // [OtcOrderState] -1取全部
                // begin: 0, // [time] 开始时间
                // end: 0, // [time] 结束时间
                offset: this.list.length, // [int64] 跳过条数
                limit: this.limit, // [int64] 最大返回条数
            };
            if (loading) {
                console.log(loading, 'loading');
                this.changeLoading(true);
            }
            // 取消请求
            if (axiosGoPromiseArr) {
                axiosGoPromiseArr.forEach((ele, index) => {
                    ele.cancel('001');
                    delete axiosGoPromiseArr[index];
                });
            }
            // TODO
            console.log(params);
            this.$api.otcOrderDealList(params).then((res: any) => {
                this.isLoading = false;
                this.list = this.list.concat(res.data || []);
                if (this.list.length >= res.total) {
                    this.isEnd = true;
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
}

</style>
<style lang="less">

</style>