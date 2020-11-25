<template>
    <div class="home app-padding40">
        <div class="home-header flex-between-c">
            <div>
                <img src="../../assets/img/common/menu.png" alt=""
                    @click="toChoiceSymbol">
                <h3 class="home-header-coin">{{symbol.toUpperCase()}}</h3>
            </div>
            <div>
                <img v-show="_isplus" @click="loginPath(`/scanQRCode?type=${1}`)" src="../../assets/img/common/qrcode1.png" alt="">
            </div>
        </div>
        <div v-if="_isLogin" class="home-assets flex-around-s flex-column">
            <h4 class="home-assets-account" @click="_change">
                <span class="home-assets-value">{{
                    hide === '1' ? '****' : amount
                }} </span> <span class="font-w-n">{{symbol.toUpperCase()}}</span>
            </h4>
            <div class="home-assets-address flex-between-c">
                <p class="ellipsis" @click="$copyText(activeSymbol.address)">{{hide === '1' ? '****' : activeSymbol.address}}</p>
                <img @click="$router.push({
                    path: '/payment',
                    query: {
                        symbol: symbol,
                    }
                })" src="../../assets/img/common/qrcode.png" alt="">
            </div>
        </div>
        <div @click="$router.push('/entrylogin')" v-if="!_isLogin" class="home-assets flex-around-s flex-column">
            <h4 class="home-assets-account" @click="_change">
                <span class="home-assets-title">{{$t('common.clickToLogin')}}</span>
            </h4>
            <p class="home-assets-tip">{{$t('home.loginForAssets')}}</p>
        </div>
        <div class="home-notice flex-between-c">
            <div @touchmove.stop.prevent="" @click="handleClickSlide" class="flex-item-1 flex-start-c">
                <img class=" app-img-50" src="../../assets/img/common/notice.png" alt="">
                <swiper
                    v-if="article.length"
                    class="home-swiper-notice flex-item-1 text-align-l"
                    :options="noticeSwiperOption"
                >
                    <swiper-slide :data-id="sub_item.id" v-for="sub_item in article" :key="sub_item.id">
                        <span
                            :data-id="sub_item.id"
                            class="notice-item vertical-m"
                        >
                            {{category.title}}: {{sub_item.title}}
                        </span>
                    </swiper-slide>
                </swiper>
                <span v-else>{{$t('common.noNotice')}}</span>
            </div>
            <span @click="$router.push('/news/notice')">{{$t('common.lookMore')}}</span>
        </div>
        <AllApp></AllApp>
        <div class="assets-symbol-list">
            <div class="list-assets flex-between-c">
                <h4 v-t="'home.assets'"></h4>
                <!-- <div>
                    <img @click="addSymbol" src="../../assets/img/common/add.png" alt="">
                </div> -->
            </div>
            <ul>
                <li
                    @click="$router.push(`/transferhistory?symbol=${item.coin}`)"
                    class="flex-between-c"
                    v-for="item in symbolList"
                    :key="item.coin"
                >
                    <div class="flex-start-c">
                        <icon-img :symbol="item.coin"></icon-img>
                        <div class="list-values values1">
                            <h5 class="lable">{{item.coin.toUpperCase()}}</h5>
                            <p class="value">{{ $store.state.lang === 'en' ? item.coin.toUpperCase() : coinMap[item.coin]}}</p>
                        </div>
                    </div>
                    <div class="list-values">
                        <h5 class="num_lable">{{hide === '1' ? '****' : item.available}}</h5>
                        <p class="num_value">{{_unitIcon}} {{hide === '1' ? '****' : changeRate(item.available, item.coin)}}</p>
                    </div>
                </li>
            </ul>
            <noData v-if="!isLoading && (!symbolList.length)"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AllApp from './component/AllApp.vue';

type appItem = {
    link: string;
    isDev?: boolean;
    img: unknown;
    needLogin?: boolean;
    title: string;
    value: string;
}

type data = {
    symbol: string;
    hide: string;
    activeSymbol: any;
    rate: any;
    isLoading: boolean;
    unitDecimal: number;
    article: Array<any>;
    category: any;
    noticeSwiperOption: {};
    symbolList: Array<{
        coin: string;
        title: string;
        available: number;
        transfer: number;
    }>;

}

export default Vue.extend({
    name: 'Home',
    components: {
        AllApp,
    },
    data(): data {
        return {
            isLoading: false,
            symbol: this.$store.state.symbol,
            hide: this.$store.state.hideBalance,
            activeSymbol: {},
            rate: {},
            unitDecimal: this.$store.getters.getCurrencyTypeInfo.decaimal,
            symbolList: [],
            article: [],
            category: {},
            noticeSwiperOption: {
                direction: 'vertical',
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
            },
        };
    },
    computed: {
        activeCoin(): any {
            return this.symbolList.find((item: any) => item.coin === this.symbol) || {};
        },
        coinInfo(): CoinInfo {
            return this.$store.getters.getCoinInfo(this.symbol);
        },
        coinMap(): any {
            return this.$store.getters.getCoinMap;
        },
        amount(): any {
            const value = (this.activeCoin.available || 0)
                + (this.activeCoin.otc_frozen || 0)
                + (this.activeCoin.sys_frozen || 0)
                + (this.activeCoin.withdraw_frozen || 0);
            return value ? value.toFixed(this.coinInfo.decimal) : '0.00';
        },
    },
    created() {
        if (this._isLogin) {
            this.init();
        }
        this.getArticleCategories();
    },
    methods: {
        _change() {
            this.hide = this.hide === '1' ? '0' : '1';
            this.$store.commit('setHideBalance', this.hide);
        },
        init() {
            this.isLoading = true;
            this.changeLoading(true);
            if (this._isLogin) {
                this.getUserBankList();
                this.initUserInfo();
                Promise.all([this.getDeposit(), this.initBalances(), this.getExchangeRate()]).finally(() => {
                    this.isLoading = false;
                    this.changeLoading(false);
                });
            }
        },
        handleClickSlide(event: Event) {
            const { dataset } = (event.target as any);
            console.log(dataset, event.target);
            if (dataset.id) {
                this.$router.push(`/news/noticedetail?id=${dataset.id}`);
            } else {
                this.$router.push(`/news/noticedetail?id=${this.article[0].id}`);
            }
        },
        getExchangeRate() {
            return this.$api.getExchangeRate().then((res: any) => {
                if (res.data) {
                    this.rate = res.data;
                }
            });
        },
        changeRate(value: number, coin: string) {
            if (!value) {
                return '0';
            }
            return (value * (this.rate[coin] || 0)).toFixed(this.unitDecimal);
        },
        getDeposit() {
            return this.$api.getDeposit({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.activeSymbol = res.data;
                }
            });
        },
        getArticleCategories() {
            this.$api.getArticleCategories({ type: 1 }).then((res: any) => {
                if (res.data) {
                    return res.data[0];
                }
                throw new Error();
            }).then((res: any) => {
                const params = {
                    category: res.id,
                    offset: this.article.length,
                    limit: 10,
                };
                this.$api.getArticleList(params).then((data: any) => {
                    if (data.data.list) {
                        this.article = data.data.list;
                        this.category = res;
                    }
                });
            });
        },
        initBalances() {
            return this.$api.getBalances().then((res: any) => {
                if (res.code === 0) {
                    this.symbolList = res.data;
                }
            });
        },
        toChoiceSymbol() {
            if (!this._isLogin) {
                this.$loginRoute(`/choisesymbol?symbol=${this.symbol}&form=2`);
                return;
            }
            this.$router.push(`/choisesymbol?symbol=${this.symbol}&form=2`);
        },
        loginPath(path: string) {
            if (!this._isLogin) {
                this.$loginRoute(path);
                return;
            }
            this.$router.push(path);
        },
        addSymbol() {
            this.$router.push('/addsymbol');
        },
    },
});
</script>

<style lang="less" scoped>
@import './assets-symbol-list.less';
.home{
    padding-bottom: 150px;
    .font-w-n{
        font-weight: normal;
    }
    &-header{
        font-size: 45px;
        height: 100px;
        // background: pink;
        img{
            width: 50px;
            // vertical-align: middle;
        }
        &-coin{
            vertical-align: middle;
            display: inline-block;
        }
    }
    &-notice{
        margin: 32px 0;
        height: 45px;
    }
    &-swiper-notice{
        height: 45px;
        .notice-item{
            line-height: 45px;
            display: inline-block;
            width: 100%;
        }
    }
    &-assets{
        color: #fff;
        margin-top: 20px;
        height: 311px;
        border-radius: 50px;
        background-image: url(../../assets/img/home/banner.png);
        background-size: 100% 100%;
        text-align: left;
        padding: 50px 50px 50px 65px;
        img{
            width: 50px;
        }
        &-account{
            font-size: 30px;
        }
        &-value{
            font-size: 60px;
        }
        &-title{
            font-size: 45px;
        }
        &-address{
            width: 100%;
        }
        &-tip{
            height: 68px;
        }
    }
}
</style>
