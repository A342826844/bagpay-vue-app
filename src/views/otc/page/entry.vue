<template>
    <div class="otc">
        <Drawer position="right" v-model="screen">
            <OrderFilter size='small' :title="$t('common.screen')">
                <SubOrderFilter title="状态">
                    <SubOrderFilterItem>待付款</SubOrderFilterItem>
                    <SubOrderFilterItem :active="true">待付款</SubOrderFilterItem>
                    <SubOrderFilterItem>待付款</SubOrderFilterItem>
                </SubOrderFilter>
                <SubOrderFilter title="币种">
                    <SubOrderFilterItem>CNY</SubOrderFilterItem>
                    <SubOrderFilterItem>USDT</SubOrderFilterItem>
                    <SubOrderFilterItem>待付款</SubOrderFilterItem>
                </SubOrderFilter>
            </OrderFilter>
        </Drawer>
        <TabList
            size="big"
            border
            :defaultVal="side"
            @on-click="clickHandle"
            class="otc-tab"
            :tabList="bodyTabList"
        >
            <div slot="right" class="otc-header-right">
                <img class="app-img-50" @click="screen=true" src="@/assets/img/common/screen.png" alt="">
                <img class="app-img-50" @click="showMore=true" src="@/assets/img/common/more.png" alt="">
            </div>
            <div class="otc-list" v-for="(item) in bodyTabList" :key="item.value" :slot="item.value">
                <div class="otc-tabbar" @scroll.capture="scrollLoad($event, loadData)">
                    <V-Tabs
                        v-model="activeSymbol"
                        swipeable
                        line-height='0.053333rem'
                        line-width='0.693333rem'
                        color = '#5894EE'
                        ref="tabs"
                        title-active-color='#5894EE'
                        :swipe-threshold='6'
                        :border='false'
                        @change='changeCoinHandle(item.side)'
                        >
                        <V-Tab
                            v-for="(subItem) in coins"
                            :title="subItem.title"
                            :name="subItem.symbol"
                            :disabled="!subItem.symbol"
                            :key="subItem.symbol"
                        >
                            <transition name="fade">
                                <div class="otc-tabbar-page" v-show="subItem.symbol === activeSymbol">
                                    <div class="otc-tabbar-content bg-white">
                                        <div class="content-list">
                                            <GoodsCard
                                                v-for="renderData in renderData[item.side][activeSymbol]"
                                                :renderData='renderData'
                                                :key="renderData.id"
                                                :side="item.side"
                                                @click="goTradeHandle(renderData)"
                                            ></GoodsCard>
                                            <div v-if="false" class="loadMore-loading">
                                                <Loading type='component' :loading='loadMore'></Loading>
                                            </div>
                                            <p class="gray-color" v-show="!_loading && (showDataStatus === 1)">
                                                {{$t('common.noMore')}}
                                            </p>
                                            <NoData v-if="!_loading && (showDataStatus === 0)"/>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </V-Tab>
                    </V-Tabs>
                </div>
            </div>
        </TabList>
        <div class="more-shade" v-show="showMore" @click.self="showMore=false">
            <div class="more-content">
                <div
                    class="more-item"
                    @click="clickShowMore(item)"
                    v-for="item in moreShade"
                    v-show="!(item.needOtc && (_userInfo.isOtc === '3'))"
                    :key="item.name"
                >
                    <img :src="item.img" alt=""/>
                    <span>{{$t(item.title)}}</span>
                </div>
            </div>
        </div>
        <!-- <toast
            :isShow="toast.show"
            :showToastType="toast.type"
            :toastContent="toast.content"
            :toastTitle="toast.title"
            :toastOperateTitle="toast.confirm"
            :toastAssistOperateTitle="toast.assist"
            @handle-main-click="mainClick"
            @handle-assist-click="toast.show = false"/> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { axiosGoPromiseArr } from '@/api/axios';
import Drawer from '@/components/commons/Drawer.vue';
import { OrderFilter, SubOrderFilter, SubOrderFilterItem } from '@/components/Orders/index';
import Loading from '@/components/loading/index.vue';
import scrollLoad from '@/minxin/scrollLoad';
import GoodsCard from '../component/GoodsCard.vue';

const business = require('../../../assets/img/otc/business.png');
const fabu = require('../../../assets/img/otc/fabu.png');
const manage = require('../../../assets/img/otc/manage.png');
const payment = require('../../../assets/img/otc/payment.png');
const order = require('../../../assets/img/otc/order.png');

type data = {
    screen: boolean;
    showMore: boolean;
    // loadMore: boolean;
    noDataShow: boolean;
    activeSymbol: string;
    side: 1|2;
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
    // coins: Array<any>;
    moreShade: Array<any>;
}

const menuHandle = (data: Array<any>): Array<any> => {
    if (data.length < 5) {
        return menuHandle(data.concat({
            symbol: '',
        }));
    }
    return data;
};

export default Vue.extend({
    components: {
        GoodsCard,
        Drawer,
        Loading,
        OrderFilter,
        SubOrderFilter,
        SubOrderFilterItem,
    },
    mixins: [scrollLoad],
    data(): data {
        return {
            screen: false,
            showMore: false,
            noDataShow: false,
            activeSymbol: '',
            side: 2,
            renderData: {
                1: {},
                2: {},
            },
            paramsData: {
                1: {},
                2: {},
            },
            moreShade: [
                {
                    img: fabu,
                    title: 'otc.otcAdv',
                    name: 'otcAdv',
                    needlogin: true,
                    isfabu: true,
                }, {
                    img: manage,
                    title: 'otc.manage',
                    name: 'otcAdvManage',
                    needlogin: true,
                    neediRealAuth: false,
                    needOtc: true,
                }, {
                    img: order,
                    title: 'otc.order',
                    name: 'otcOrder',
                    needlogin: true,
                    neediRealAuth: false,
                }, {
                    img: payment,
                    title: 'otc.payment',
                    name: 'payment',
                    needlogin: true,
                }, {
                    img: business,
                    title: 'otc.business',
                    name: 'otcAdvBusiness',
                    needlogin: false,
                    neediRealAuth: false,
                },
            ],
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name !== 'otcsubmit') {
                vm.loadData();
            }
        });
    },
    watch: {
        coins(value) {
            if (!this.activeSymbol) {
                this.activeSymbol = value[0].symbol;
            }
        },
    },
    created() {
        if (this.coins.length) {
            this.activeSymbol = this.coins[0].symbol;
        }
    },
    methods: {
        goTradeHandle(item: any) {
            console.log(item);
            this.$router.push({
                name: 'otcsubmit',
                params: item,
            });
        },
        changeCoinHandle(index: number) {
            console.log(this.side);
            if (index !== this.side) return;
            if (this.showDataStatus === 3) {
                this.loadData();
            }
        },
        /** 获取渲染的数据, index=1表示购买下的数据, index=2表示出售下的数据 */
        getRenderData(index: 1|2) {
            if (this.renderData[index] && this.renderData[index][this.activeSymbol]) {
                return this.renderData[index][this.activeSymbol];
            }
            return [];
            // return this.renderData[index][this.activeSymbol];
        },
        loadData() {
            this.changeLoading(true);
            axiosGoPromiseArr.forEach((ele, index) => {
                ele.cancel('001');
                delete axiosGoPromiseArr[index];
            });
            if (!this.renderData[this.side][this.activeSymbol]) {
                this.$set(this.renderData[this.side], this.activeSymbol, []);
            }
            const params = {
                coin: this.activeSymbol,
                side: this.side,
                offset: this.renderData[this.side][this.activeSymbol].length,
                limit: 10,
            };
            this.$api.getOtcOrderList(params).then((res: any) => {
                this.changeLoading(false);
                if (res.data.list) {
                    this.renderData[this.side][this.activeSymbol] = this.renderData[this.side][this.activeSymbol].concat(res.data.list);
                }
                if (typeof this.paramsData[this.side][this.activeSymbol] === 'undefined') {
                    this.$set(this.paramsData[this.side], this.activeSymbol, res.data.total);
                }
            }).catch((err: any) => {
                if (err.message === '001') return;
                this.changeLoading(false);
            });
        },
        resizeTab() {
            setTimeout(() => {
                (this.$refs.tabs as Element[]).forEach((item) => {
                    (item as any).resize();
                });
            }, 0);
        },
        clickHandle(item: any) {
            console.log(item);
            this.side = item.side;
            if (this.showDataStatus === 3) {
                this.loadData();
            }
            this.resizeTab();
        },
        clickShowMore(item: any) {
            if (item.name === 'otcAdv') {
                this.$router.push({
                    name: item.name,
                    query: { symbol: this.activeSymbol },
                });
                return;
            }
            this.$router.push({
                name: item.name,
            });
        },
    },
    computed: {
        coins(): Array<any> {
            let coins = this.$store.state.symbolList.filter((item: CoinInfo) => item.enable_otc);
            coins = coins.map((item: CoinInfo) => ({
                ...item,
                title: item.symbol.toUpperCase(),
            }));
            return menuHandle(coins);
        },
        showDataStatus(): number {
            try {
                const total = this.paramsData[this.side][this.activeSymbol];
                if (typeof total === 'undefined') return 3; // 第一次请求被取消的时候，没有初始化total
                const len = this.renderData[this.side][this.activeSymbol].length;
                if (total === len && len === 0) return 0; // 暂无数据
                return total <= len ? 1 : 2; // 1: 暂无更多  2: 还有数据不显示
            } catch (e) {
                return 3; // 第一次加载数据
            }
        },
        bodyTabList(): Array<any> {
            return [{
                title: this.$t('common.sideBuyT'),
                value: 'sideBuyT',
                side: 2,
            }, {
                title: this.$t('common.sideSellT'),
                value: 'sideSellT',
                side: 1,
            }];
        },
    },
});

</script>

<style lang='less' scoped>

@padding35: 35px;
.otc{
    height: 100%;
    &-tab{
        padding-top: @padding35;
    }
    &-header{
        &-right{
        padding-top: @padding35;
            img{
                margin-right: 39px;
            }
        }
    }
    .more-shade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(98, 98, 98, 0.3);
        z-index: 1000;
        .more-content {
            position: absolute;
            right: 71px;
            top: 47.5px;
            padding: 0 20px;
            width: auto;
            // height: 249px;
            border-radius: 5px;
            background-color: #fff;
            text-align: left;
            .more-item {
                padding: 0 14px;
                height: 123px;
                line-height: 123px;
                border-bottom: solid 1PX #ebebeb;
                font-size: 34px;
                color: #949ba5;
                & > img {
                    width: 45px;
                    height: auto;
                    vertical-align: middle;
                }
                & > span {
                    margin-left: 34px;
                }
            }
            .more-item:last-child {
                border: none;
            }
        }
    }
    &-tabbar-page{
        height: calc(100vh - 315px);
        overflow: scroll;
    }
}
.fade-enter-active, .fade-leave-active {
    transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0.3;
}
</style>
