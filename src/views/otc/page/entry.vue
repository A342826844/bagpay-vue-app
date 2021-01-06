<template>
    <div class="otc">
        <Drawer position="right" v-model="screen">
            <OrderFilter size='small' :title="$t('common.screen')">
                <SubOrderFilter :title="$t('common.status')">
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
            :defaultVal="defaultVal"
            @on-click="clickHandle"
            class="otc-tab"
            :tabList="bodyTabList"
        >
            <div slot="right" class="otc-header-right">
                <!-- <img class="app-img-50" @click="screen=true" src="@/assets/img/common/screen.png" alt=""> -->
                <img class="app-img-50" @click="showMoreHandle(true)" src="@/assets/img/common/more.png" alt="">
            </div>
            <div class="otc-list" v-for="(item) in bodyTabList" :key="item.value" :slot="item.value">
                <div class="otc-tabbar" @scroll.capture="scrollLoad">
                    <V-Tabs
                        v-model="activeSymbol"
                        swipeable
                        line-height='0.053333rem'
                        line-width='0.693333rem'
                        color = '#5894EE'
                        ref="tabs"
                        title-active-color='#5894EE'
                        :swipe-threshold='5'
                        :border='false'
                        @change='changeCoinHandle(item.side)'
                        >
                        <V-Tab
                            v-for="(subItem, index) in coins"
                            :title="subItem.title"
                            :name="subItem.symbol"
                            :disabled="!subItem.symbol"
                            :key="index"
                        >
                            <transition name="fade">
                                <div class="otc-tabbar-page" v-show="subItem.symbol === activeSymbol">
                                    <div class="otc-tabbar-content bg-white">
                                        <div class="content-list">
                                            <PullRefresh
                                                v-model="isLoading"
                                                @refresh="onRefresh"
                                            >
                                            <QuickTrade
                                                :balances="balances"
                                                :coin="activeSymbol"
                                                :side="item.side"
                                            ></QuickTrade>
                                            <div
                                                v-for="renderData in renderData[item.side][activeSymbol]"
                                                :key="renderData.id"
                                            >
                                                <GoodsCard
                                                    arrow
                                                    :renderData='renderData'
                                                    @arrow-click="goBusinessDetail(renderData)"
                                                    @click="goTradeHandle(renderData)"
                                                ></GoodsCard>
                                                <div class="app-border-margin16 border-b"></div>
                                            </div>
                                            <div v-if="false" class="loadMore-loading">
                                                <Loading type='component' :loading='loadMore'></Loading>
                                            </div>
                                            <p class="content-list-nodata gray-color" v-show="!_loading && (showDataStatus === 1)">
                                                {{$t('common.noMore')}}
                                            </p>
                                            <NoData v-if="!_loading && (showDataStatus === 0)"/>
                                            </PullRefresh>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </V-Tab>
                    </V-Tabs>
                </div>
            </div>
        </TabList>
        <div class="more-shade" v-show="showMore" @click.self="showMoreHandle(false)">
            <div class="more-content">
                <div
                    class="more-item"
                    @click="clickShowMore(item)"
                    v-for="item in moreShade"
                    v-show="!(item.needOtc && (merchant.status !== 1))"
                    :key="item.name"
                >
                    <img :src="item.img" alt=""/>
                    <span>{{$t(item.title)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { axiosGoPromiseArr } from '@/api/axios';
import Drawer from '@/components/commons/Drawer.vue';
import { OrderFilter, SubOrderFilter, SubOrderFilterItem } from '@/components/Orders/index';
import Loading from '@/components/loading/index.vue';
import GoodsCard from '../component/GoodsCard.vue';
import QuickTrade from '../component/QuickTrade.vue';

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
    isLoading: boolean;
    activeSymbol: string;
    loadMore: boolean;
    side: 1|2;
    defaultVal: string;
    limit: number;
    balances: any[];
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
    name: 'OtcEntry',
    components: {
        GoodsCard,
        QuickTrade,
        Drawer,
        Loading,
        OrderFilter,
        SubOrderFilter,
        SubOrderFilterItem,
    },
    data(): data {
        return {
            screen: false,
            showMore: false,
            noDataShow: false,
            isLoading: false,
            loadMore: false,
            activeSymbol: 'usdt',
            side: 2,
            defaultVal: 'sideBuyT',
            limit: 10,
            balances: [],
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
                    name: 'payway',
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
                vm.initData();
            }
            if (to.query.type === 'buy') {
                // eslint-disable-next-line no-param-reassign
                vm.side = vm.bodyTabList[1].side;
                // eslint-disable-next-line no-param-reassign
                vm.defaultVal = vm.bodyTabList[1].value;
            }
            vm.loadData();
            if (vm._isLogin) {
                vm.otcGetMerchant();
                vm.getBalances();
            }
        });
    },
    created() {
        if (this.coins.length) {
            this.activeSymbol = this.coins[0].symbol;
        } else {
            this.changeLoading(true);
            this.getCoinList().then(() => {
                this.activeSymbol = this.coins[0].symbol;
                this.loadData();
            });
        }
        this.getConfigData();
    },
    computed: {
        coins(): Array<any> {
            let coins = this.$store.state.symbolList.filter((item: CoinInfo) => item.enable_otc);
            coins = coins.map((item: CoinInfo) => ({
                ...item,
                title: item.symbol.toUpperCase(),
            }));
            if (!coins.length) return [];
            return menuHandle(coins);
        },
        userBank(): Array<any> {
            return this.$store.getters.getBankEnableList;
        },
        merchant(): any {
            return this.$store.state.merchant;
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
                title: this.$t('common.typeBuyT'),
                value: 'sideBuyT',
                side: 2,
            }, {
                title: this.$t('common.typeSellT'),
                value: 'sideSellT',
                side: 1,
            }];
        },
    },
    methods: {
        initData() {
            this.renderData = {
                1: {},
                2: {},
            };
            this.paramsData = {
                1: {},
                2: {},
            };
        },
        onRefresh() {
            this.loadData(true);
            if (this._isLogin) {
                this.otcGetMerchant();
                this.getBalances();
            }
        },
        getBalances() {
            this.$api.getBalances().then((res: any) => {
                this.balances = res.data;
            });
        },
        isLoginRouter(path?: string) {
            if (!this._isLogin) {
                this.$loginRoute(path);
                return true;
            }
            return false;
        },
        scrollLoad(event: Event) {
            const scroll = (event.target as HTMLElement);
            const { scrollTop, scrollHeight, clientHeight } = scroll;
            const isEnd = this.renderData[this.side][this.activeSymbol].length >= this.paramsData[this.side][this.activeSymbol];
            if ((clientHeight + scrollTop > scrollHeight - 100) && (clientHeight + scrollTop !== scrollHeight) && !this.loadMore && !isEnd) {
                this.loadMore = true;
                this.loadData();
            }
        },
        showMoreHandle(showMore: boolean) {
            if (this.isLoginRouter()) return;
            this.showMore = showMore;
            if (showMore) {
                this.$overflowScrolling(false);
            } else {
                this.$overflowScrolling(true);
            }
        },
        goBusinessDetail(item: any) {
            if (this.isLoginRouter()) return;
            this.$router.push(`/otc/business/detail?uid=${item.uid}`);
        },
        goTradeHandle(item: any) {
            if (this.isLoginRouter()) return;
            if (!this._userInfo.pay_password) {
                this.$dialog.confirm({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('otc.payPwd')}`,
                    confirmButtonText: `${this.$t('otc.bind')}`,
                    cancelButtonText: `${this.$t('common.cancle2')}`,
                }).then(() => {
                    this.$router.push('/mine/safepass');
                });
                return;
            }
            const bankRes = this.userBank.some((subItem) => subItem.type === Number(item.pay_types));
            if (!bankRes && item.type === 1) {
                this.$dialog.confirm({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('otc.noPayWay')}`,
                    confirmButtonText: `${this.$t('otc.bind')}`,
                    cancelButtonText: `${this.$t('common.cancle2')}`,
                }).then(() => {
                    this.$router.push('/payway');
                });
                return;
            }
            this.$router.push({
                name: 'otcsubmit',
                params: item,
            });
        },
        changeCoinHandle(side: number) {
            if (side !== this.side) return;
            axiosGoPromiseArr.value.forEach((ele) => {
                ele.cancel(ele);
            });
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
        loadData(refresh?: boolean) {
            if (!refresh) {
                this.changeLoading(true);
            }
            if (!this.renderData[this.side][this.activeSymbol]) {
                this.$set(this.renderData[this.side], this.activeSymbol, []);
            }
            const params = {
                coin: this.activeSymbol,
                side: this.side,
                offset: refresh ? 0 : this.renderData[this.side][this.activeSymbol].length,
                limit: this.limit,
            };
            this.$api.getOtcOrderList(params).then((res: any) => {
                this.changeLoading(false);
                this.isLoading = false;
                this.loadMore = false;
                if (res.data.list) {
                    if (refresh) {
                        this.renderData[this.side][this.activeSymbol] = res.data.list;
                    } else {
                        this.renderData[this.side][this.activeSymbol] = this.renderData[this.side][this.activeSymbol].concat(res.data.list);
                    }
                }
                if (typeof this.paramsData[this.side][this.activeSymbol] === 'undefined') {
                    this.$set(this.paramsData[this.side], this.activeSymbol, res.data.total);
                }
            }).catch((err: any) => {
                this.isLoading = false;
                this.loadMore = false;
                if (err.message.cancleId) return;
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
            this.side = item.side;
            axiosGoPromiseArr.value.forEach((ele) => {
                ele.cancel(ele);
            });
            if (this.showDataStatus === 3) {
                this.loadData();
            }
            this.resizeTab();
        },
        clickShowMore(item: any) {
            this.showMoreHandle(false);
            if (item.name === 'otcAdv') {
                //    "phone": "86-13100000000",//[string] 手机号
                //     "email": "test@xx.com", //[string] 邮箱
                //     "password": "1", //[string] 处理过的密码,不为空代表已设置
                //     "pay_password": "1", //[string] 处理过的支付密码,不为空代表已设置
                //     "nickname": "昵称",
                //     "photo": "头像",
                //     "ver_lv": 0, //实名认证级别 0.未认证 1.基础认证 2.身份认证 3.视频认证
                //     "ga": "1", //处理过的google验证码,不为空代表已设置
                //     "status": 1, //状态,1.正常 0.禁用
                //     "created_at": "", //创建时间
                if (this._userInfo.ver_lv === 0 || this._userInfo.ver_lv === 1 || this._userInfo.ver_lv === 2) {
                    this.$dialog.confirm({
                        title: `${this.$t('common.poptip')}`,
                        message: `${this.$t('mine.notCertified', { num: 3 })}`,
                        confirmButtonText: `${this.$t('mine.toAuthenticate')}`,
                        cancelButtonText: `${this.$t('common.cancle2')}`,
                    }).then(() => {
                        this.$router.push('/mine/safesetting');
                    });
                    return;
                }
                if (this.merchant.status !== 1) {
                    this.$dialog.confirm({
                        title: `${this.$t('common.poptip')}`,
                        message: `${this.$t('otc.noBusiness')}`,
                        confirmButtonText: `${this.$t('mine.toAuthenticate')}`,
                        cancelButtonText: `${this.$t('common.cancle2')}`,
                    }).then(() => {
                        this.$router.push('/otc/advBusiness');
                    });
                    return;
                }
                if (!this._userInfo.pay_password) {
                    this.$dialog.confirm({
                        title: `${this.$t('common.poptip')}`,
                        message: `${this.$t('otc.payPwd')}`,
                        confirmButtonText: `${this.$t('otc.bind')}`,
                        cancelButtonText: `${this.$t('common.cancle2')}`,
                    }).then(() => {
                        this.$router.push('/mine/safepass');
                    });
                    return;
                }
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
        getConfigData() {
            this.$api.getConfigCommon().then((res: any) => {
                if (res.data) {
                    this.$store.commit('setConfigCommon', res.data);
                }
            }).catch(() => {
                setTimeout(() => {
                    this.getConfigData();
                }, 10 * 1000);
            });
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
    .content-list{
        padding-bottom: 150px;
        &-nodata{
            margin: 28px 0;
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
