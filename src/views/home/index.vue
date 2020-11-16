<template>
    <div class="home app-padding40">
        <div class="home-header flex-between-c">
            <div>
                <img src="../../assets/img/common/menu.png" alt=""
                    @click="$router.push(`/choisesymbol?symbol=${symbol}&form=2`)">
                <h3 class="home-header-coin">{{symbol.toUpperCase()}}</h3>
            </div>
            <div>
                <img v-show="_isplus" @click="$router.push(`/scanQRCode?type=${1}`)" src="../../assets/img/common/qrcode1.png" alt="">
            </div>
        </div>
        <div class="home-assets flex-around-s flex-column">
            <h4 class="home-assets-account" @click="_change">
                {{_unitIcon}}<span class="home-assets-value">{{
                    hide === '1' ? '****' :
                    changeRate(
                        (activeCoin.available || 0) + (activeCoin.otc_frozen || 0) + (activeCoin.sys_frozen || 0) + (activeCoin.withdraw_frozen || 0)
                        , symbol
                    )
                }}</span>
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
        <div class="home-notice flex-between-c">
            <div>
                <img class=" app-img-50" src="../../assets/img/common/notice.png" alt="">
                <span>公告：BagPay预计12月12日开放BTC、ETH...</span>
            </div>
            <span></span>
        </div>
        <div class="home-application">
            <ul class="home-application-ul flex-warp-s">
                <li @click="applicationHandle(item)" class="li" v-for="item in applicationList" :key="item.value">
                    <img class="li-img" :src="item.img" alt="">
                    <p class="li-p">{{item.title}}</p>
                </li>
            </ul>
        </div>
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
                            <p class="value">{{coinMap[item.coin]}}</p>
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

const cost = require('@/assets/img/home/cost.png');
const financial = require('@/assets/img/home/financial.png');
const news = require('@/assets/img/home/news.png');
const invita = require('@/assets/img/home/invita.png');
const tranfer = require('@/assets/img/home/tranfer.png');
const copy1 = require('@/assets/img/common/copy1.png');

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
    symbolList: Array<{
        coin: string;
        title: string;
        available: number;
        transfer: number;
    }>;
    applicationList: Array<appItem>;

}

export default Vue.extend({
    name: 'Home',
    data(): data {
        return {
            isLoading: false,
            symbol: this.$store.state.symbol,
            hide: this.$store.state.hideBalance,
            activeSymbol: {},
            rate: {},
            unitDecimal: this.$store.getters.getCurrencyTypeInfo.decaimal,
            symbolList: [],
            applicationList: [
                {
                    link: '',
                    isDev: true,
                    img: tranfer,
                    value: 'tranfer',
                    needLogin: true,
                    title: '转账',
                },
                {
                    link: '',
                    isDev: true,
                    img: financial,
                    value: 'financial',
                    needLogin: true,
                    title: '理财',
                },
                {
                    link: '',
                    isDev: true,
                    img: news,
                    value: 'news',
                    needLogin: true,
                    title: '资讯',
                },
                {
                    link: '/invitation',
                    img: invita,
                    value: 'invita',
                    needLogin: true,
                    title: '邀请',
                },
                {
                    link: '',
                    isDev: true,
                    img: cost,
                    value: 'cost',
                    needLogin: true,
                    title: '生活缴费',
                },
                {
                    link: '',
                    isDev: true,
                    img: copy1,
                    value: 'copy1',
                    needLogin: true,
                    title: '全部',
                },
            ],
        };
    },
    computed: {
        activeCoin(): any {
            return this.symbolList.find((item: any) => item.coin === this.symbol) || {};
        },
        coinMap(): any {
            return this.$store.getters.getCoinMap;
        },
    },
    created() {
        this.init();
    },
    methods: {
        _change() {
            this.hide = this.hide === '1' ? '0' : '1';
            this.$store.commit('setHideBalance', this.hide);
        },
        init() {
            this.isLoading = true;
            this.getUserBankList();
            this.changeLoading(true);
            this.initUserInfo();
            Promise.all([this.getDeposit(), this.initBalances(), this.getExchangeRate()]).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
        applicationHandle(item: appItem) {
            if (item.isDev) {
                this.$dialog.alert({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('common.isdev')}`,
                });
                return;
            }
            this.$router.push(item.link);
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
        initBalances() {
            return this.$api.getBalances().then((res: any) => {
                if (res.code === 0) {
                    this.symbolList = res.data;
                }
            });
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
    }
    &-application{
        .li{
            width: 25%;
            margin-top: 22px;
            &-img{
                width: 88px;
            }
            &-p{
                margin: 20px 0;
            }
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
        &-address{
            width: 100%;
        }
    }
}
</style>
