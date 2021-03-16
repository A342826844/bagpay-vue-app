<template>
    <div class="transfer-history primary-bg flex-column">
        <Headers bold theme="primary" :title="symbol.toUpperCase()"/>
        <!-- <Headers
            bold
            theme="primary"
            :title="symbol.toUpperCase()"
            @right-click="$router.push(`/userBalanceLog?coin=${symbol}`)"
            value="账单"
        /> -->
        <div class="transfer-history-box flex-item-1 flex-column">
            <div class="top_flex app-padding40 white-color">
                <div class="transfer-history-top txt_left">
                    <p class="sub-value">{{$t('common.available')}}</p>
                    <h3 class="value">{{activeSymbol.available}}</h3>
                </div>
                <div class="transfer-history-nbsp">---</div>
                <div @click="goFrozen" class="transfer-history-top txt_left">
                    <p class="sub-value transfer-history-triangle">{{$t('common.frozen')}}</p>
                    <h3 class="value">
                        {{(activeSymbol.otc_frozen || 0) + (activeSymbol.sys_frozen || 0) + (activeSymbol.withdraw_frozen || 0)}}
                    </h3>
                </div>
            </div>
            <div class="transfer-history-card flex-item-1">
                <TabList
                    swipeable
                    size="big"
                    sticky
                    sticky-top="sub"
                    :defaultVal="active"
                    :tabList="bodyTabList"
                >
                    <div class="transfer-list" slot="transferIn">
                        <ul>
                            <li class="app-padding40 flex-between-c" v-for="(item, index) in rechargeList" :key="index">
                                <div class="values">
                                    <!-- <h5 class="value green-color">{{$t('payment.transferIn')}}</h5> -->
                                    <h5 class="status_label green-color" :class="{
                                        gery: item.status > 0,
                                    }">{{item.status | depositState}}</h5>
                                    <p class="sub-value">{{item.created_at | date('yyyy-MM-dd hh:mm:ss')}}</p>
                                </div>
                                <div class="values">
                                    <h5 class="value">{{item.amount}}</h5>
                                    <p class="sub-value">{{$t('common.minerFee')}}：<span class="price">{{item.fee || 0}}</span></p>
                                </div>
                            </li>
                        </ul>
                        <noData v-if="!isLoading && (!rechargeList.length)"/>
                    </div>
                    <div class="transfer-list" slot="transferOut">
                        <ul>
                            <li class="app-padding40 flex-between-c" v-for="(item, index) in withdrawalList" :key="index">
                                <div class="values">
                                    <!-- <h5 class="value red-color">
                                        {{$t('payment.transferOut')}}
                                    </h5> -->
                                    <h5 class="status_label red-color" :class="{
                                        gery: item.status === 1 || item.status > 2,
                                    }">{{item.status | withdrawState}}</h5>
                                    <p class="sub-value">{{item.created_at | date('yyyy-MM-dd hh:mm:ss')}}</p>
                                    <p class="sub-value">{{item.address.replace(item.address.slice(5,-5), '*****')}}</p>
                                </div>
                                <div class="values">
                                    <h5 class="value">{{item.amount}}</h5>
                                    <p class="sub-value">{{$t('common.minerFee')}}：<span class="price">{{item.fee}}</span></p>
                                    <img class="cancel_img" @click="cancel(item.id)"
                                        v-if="item.status === 0" src="@/assets/img/mine/cancel.png" alt="">
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
                    title: 'payment.receive',
                    type: 'up',
                    path: '/payment',
                },
                2: {
                    value: 1,
                    color: 'red-color',
                    bgColor: 'red-bg',
                    title: 'payment.send',
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
        goFrozen() {
            this.$router.push({
                query: {
                    coin: this.symbol,
                    ...this.activeSymbol,
                },
                path: '/transferFrozen',
            });
        },
        goLink(path: string) {
            if (path === 'transferOut' && this._userInfo.ver_lv === 0) {
                this.$dialog.confirm({
                    message: `${this.$t('mine.payPwd')}`,
                    className: 'confirm_34',
                    confirmButtonText: `${this.$t('common.ok')}`,
                    cancelButtonText: `${this.$t('common.cancle2')}`,
                    beforeClose: (action: any, done: any) => {
                        if (action === 'confirm') {
                            this.$router.push('/mine/safepass');
                        }
                        done();
                    },
                });
            } else {
                this.$store.commit('setAddress', {});
                this.$router.push(`${path}?symbol=${this.symbol}`);
            }
        },
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.transfer-history{
    height: 100%;
    position: relative;
    background: url('../../assets/img/common/bg1.png') repeat;
    background-size: contain;
    &-box{
        overflow: scroll;
    }
    .top_flex{
        display: flex;
        justify-content: space-between;
        min-height: 240px;
        margin: 20px 0;
        flex-wrap: wrap;
        flex-shrink: 0;
    }
    &-triangle{
        &::after{
            content: '';
            display: inline-block;
            height: 0;
            width: 0;
            border: 8px solid;
            vertical-align: middle;
            margin: 0 -8px 0 8px;
            border-top-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
        }
    }
    &-nbsp{
        width: 50px !important;
        color: transparent;
    }
    &-top{
        margin: 30px 0;
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
                    // height: 142px;
                    padding-top: 28px;
                    padding-bottom: 28px;
                    align-items: flex-start;
                    .values{
                        &:first-child{
                            text-align: left;
                        }
                        &:last-child{
                            text-align: right;
                        }
                        .status_label{
                            font-size: 34px;
                            &.grey{
                                color: #A6A6A6;
                            }
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
