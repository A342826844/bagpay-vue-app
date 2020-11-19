<template>
    <div @scroll.capture="scrollLoad" class="otc-business-detail">
        <TitleHeader>
            <template #title>
                <span>{{merchantInfo.nickname}}</span>
                <span class="otc-business-detail-tel">{{merchantInfo.phone | sliceMoblepre | formatName}}</span>
            </template>
            <div slot="right">
                <img class="app-img-50" src="../../../assets/img/otc/vfy_business.png" alt="">
                <img class="app-img-50" src="../../../assets/img/otc/vfy_real.png" alt="">
            </div>
            <div>

                <p class="otc-business-detail-time text-align-l app-padding40">
                    {{$t('otc.vfytime')}}:{{merchantInfo.verification_at | date('yyyy-MM-dd hh:mm:ss')}}
                </p>
                <div class="otc-business-detail-top">
                    <div class="app-border-margin16 border-b"></div>
                    <div class="app-padding40 detail-info">
                        <div class="flex-between-c">
                            <span>{{$t('otc.cumulative')}}</span>
                            <span>{{$t('otc.tradeOrderNum')}}</span>
                            <span>{{$t('otc.tradeOrderRate')}}</span>
                        </div>
                        <div class="flex-between-c value">
                            <span>{{merchantInfo.order_count}}</span>
                            <span>{{merchantInfo.finished_count}}</span>
                            <span>{{merchantInfo.finished_rate ? (merchantInfo.finished_rate * 100).toFixed(2) : 0 }}%</span>
                        </div>
                    </div>
                    <div class="detail-top-empty"></div>
                </div>
                <TabList
                    size="big"
                    border
                    :defaultVal="side"
                    @on-click="clickHandle"
                    class="otc-business-detail-tabbar"
                    :tabList="bodyTabList"
                    ref="tablist"
                >
                    <div class="otc-list" v-for="(item) in bodyTabList" :key="item.value" :slot="item.value">
                        <div class="otc-tabbar">
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
                                                    <div
                                                        v-for="renderData in renderData[item.side][activeSymbol]"
                                                        :key="renderData.id"
                                                    >
                                                        <GoodsCard
                                                            :renderData='renderData'
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
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </V-Tab>
                            </V-Tabs>
                        </div>
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
import GoodsCard from '../component/GoodsCard.vue';

type data = {
    screen: boolean;
    showMore: boolean;
    // loadMore: boolean;
    noDataShow: boolean;
    isLoading: boolean;
    activeSymbol: string;
    loadMore: boolean;
    side: 1|2;
    limit: number;
    uid: number;
    merchantInfo: any;
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

const menuHandle = (data: Array<any>): Array<any> => {
    if (data.length < 5) {
        return menuHandle(data.concat({
            symbol: '',
        }));
    }
    return data;
};

export default Vue.extend({
    name: 'BusinessDetail',
    components: {
        GoodsCard,
        Loading,
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
            limit: 10,
            uid: 0,
            merchantInfo: {},
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
            // eslint-disable-next-line no-param-reassign
            vm.uid = Number(to.query.uid);
            if (from.name !== 'otcsubmit') {
                vm.initData();
            }
            vm.loadData();
            vm.otcGetMerchant();
            vm.otcMerchantStat();
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
            this.otcGetMerchant();
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
            this.showMore = showMore;
            if (showMore) {
                this.$overflowScrolling(false);
            } else {
                this.$overflowScrolling(true);
            }
        },
        goBusinessDetail(item: any) {
            this.$router.push(`/otc/business/detail?uid=${item.id}`);
        },
        otcMerchantStat() {
            return this.$api.otcMerchantStat(this.uid).then((res: any) => {
                this.merchantInfo = res.data;
            });
        },
        goTradeHandle(item: any) {
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
            if (!bankRes) {
                this.$dialog.confirm({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('otc.noPayWay')}`,
                    confirmButtonText: `${this.$t('otc.bind')}`,
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
                uid: this.uid,
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
                if (this.$refs.tablist) {
                    (this.$refs.tablist as any).getContentHeight();
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
    },
});
</script>

<style lang="less" scoped>
.otc-business-detail{
    height: 100%;
    width: 100%;
    overflow: scroll;
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
