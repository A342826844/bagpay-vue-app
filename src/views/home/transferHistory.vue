<template>
    <div class="transfer-history primary-bg flex-column">
        <Headers bold theme="dark" :title="symbol.toUpperCase()"/>
        <div class="transfer-history-box flex-item-1 flex-column">
            <div class="top_flex app-padding40">
                <div class="transfer-history-top txt_left">
                    <p class="sub-value">{{$t('common.available')}}</p>
                    <h3 class="value">{{activeSymbol.available}}</h3>
                </div>
                <div class="transfer-history-top txt_right">
                    <p class="sub-value">{{$t('common.frozen')}}</p>
                    <h3 class="value">{{activeSymbol.otc_frozen}}</h3>
                </div>
            </div>
            <div class="transfer-history-card flex-item-1">
                <TabList
                    swipeable
                    size="big"
                    sticky
                    sticky-top="sub"
                    :defaultVal="active"
                    @change="tabChangeHandle"
                    @on-click="clickHandle"
                    class="transfer-tab"
                    :tabList="bodyTabList"
                >
                    <div class="transfer-list" slot="transferIn">
                        <ul>
                            <li class="app-padding40 flex-between-c" v-for="(item, index) in rechargeList" :key="index">
                                <div class="values">
                                    <h5 class="value green-color">{{$t('payment.transferIn')}}</h5>
                                    <p class="sub-value">{{item.created_at}}</p>
                                </div>
                                <div class="values">
                                    <h5 class="value">{{item.amount}}</h5>
                                    <p class="sub-value">手续费：<span class="price">0</span></p>
                                </div>
                            </li>
                        </ul>
                        <noData v-if="!isLoading && (!rechargeList.length)"/>
                    </div>
                    <div class="transfer-list" slot="transferOut">
                        <ul>
                            <li class="app-padding40 flex-between-c" v-for="(item, index) in withdrawalList" :key="index">
                                <div class="values">
                                    <h5 class="value red-color">
                                        {{$t('payment.transferOut')}}
                                    </h5>
                                    <p class="sub-value">{{item.created_at}}</p>
                                    <p class="sub-value">{{item.address.replace(item.address.slice(5,-5), '*****')}}</p>
                                </div>
                                <div class="values">
                                    <h5 class="value">{{item.amount}}</h5>
                                    <p class="sub-value">手续费：<span class="price">{{item.fee}}</span></p>
                                    <img class="cancel_img" @click="cancel(item.id)" src="@/assets/img/mine/cancel.png" alt="">
                                </div>
                            </li>
                        </ul>
                        <noData v-if="!isLoading && (!withdrawalList.length)"/>
                    </div>
                </TabList>
                <div></div>
            </div>
        </div>
        <div class="lxa-footer-btn transfer-history-btn flex-between-c">
            <Button @click="goLink('/otc/entry')" size="auto">
                <img src="../../assets/img/home/coin.png" alt="">
            </Button>
            <Button v-for="item in sideMap" :key="item.side" @click="goLink(item.path)" :type="item.type" size="small" v-t="item.title"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    symbol: string;
    active: string;
    size: number;
    isLoading: boolean;
    rechargeList: Array<any>; // 转入
    withdrawalList: Array<any>; // 转出
    activeSymbol: any;
    sideMap: {
        [elem: string]: any;
    };
}

export default Vue.extend({
    name: 'TransferHistory',
    data(): data {
        return {
            size: 100,
            symbol: '',
            isLoading: false,
            active: 'transferIn',
            rechargeList: [],
            withdrawalList: [],
            activeSymbol: {},
            sideMap: {
                1: {
                    value: 1,
                    color: 'green-color',
                    bgColor: 'green-bg',
                    title: 'payment.transferIn',
                    type: 'up',
                    path: '/payment',
                },
                2: {
                    value: 1,
                    color: 'red-color',
                    bgColor: 'red-bg',
                    title: 'payment.transferOut',
                    type: 'down',
                    path: '/transferout',
                },
            },
        };
    },
    computed: {
        bodyTabList() {
            return [
                {
                    title: this.$t('payment.transferIn'),
                    value: 'transferIn',
                }, {
                    title: this.$t('payment.transferOut'),
                    value: 'transferOut',
                },
            ];
        },
    },
    created() {
        this.symbol = this.$route.query.symbol as string;
        this.init();
    },
    methods: {
        init() {
            this.isLoading = true;
            this.changeLoading(true);
            Promise.all([this.getCoinHistory(), this.getWithdrawHistory(), this.getCoinBalances()]).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
        getCoinBalances() {
            return this.$api.getCoinBalances({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.data) {
                    this.activeSymbol = res.data;
                }
            });
        },
        getCoinHistory() {
            return this.$api.getCoinHistory({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.rechargeList = res.data.list || [];
                }
            });
        },
        getWithdrawHistory() {
            return this.$api.getWithdrawHistory({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.withdrawalList = res.data.list || [];
                }
            });
        },
        cancel(id: any) {
            this.$api.withdrawCcancel({
                id,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.getWithdrawHistory();
                }
            });
        },
        goLink(path: string) {
            this.$store.commit('setAddress', {});
            this.$router.push(`${path}?symbol=${this.symbol}`);
        },
        tabChangeHandle(value: any) {
            console.log(value);
        },
        clickHandle(value: any) {
            console.log(value);
        },
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.transfer-history{
    height: 100%;
    position: relative;
    &-box{
        overflow: scroll;
    }
    .top_flex{
        display: flex;
        justify-content: space-between;
    }
    &-top{
        margin: 50px 0;
        &.txt_left{
            text-align: left;
        }
        &.txt_right{
            text-align: right;
        }
        .value{
            font-size: 45px;
        }
        .sub-value{
            font-size: 28px;
            margin-bottom: 25px;
        }
    }
    &-card{
        background: #ffffff;
        color: #585858;
        border-radius: 50px 50px 0 0;
        padding-top: 50px;
        .transfer-list{
            background: #ffffff;
            padding-bottom: 180px;
            &>ul{
                &>li{
                    height: 142px;
                    .values{
                        &:first-child{
                            text-align: left;
                        }
                        &:last-child{
                            text-align: right;
                        }
                        .value{
                            font-size: 34px;
                        }
                        .sub-value{
                            margin-top: 17px;
                            color: #A6A6A6;
                        }
                        .price{
                            color: #585858;
                        }
                        .address{
                            font-size: 24px;
                            color: #A6A6A6;
                            margin-left: 40px;
                        }
                        .cancel_img{
                            width: 65px;
                        }
                    }
                }
            }
        }
    }
    &-btn{
        padding: 38px 52px;
        bottom: 0;
        background: #ffffff;
        font-size: 34px;
        img{
            width: 50px;
        }
    }
}
</style>
