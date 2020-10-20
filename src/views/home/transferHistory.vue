<template>
    <div class="transfer-history primary-bg flex-column">
        <Headers bold theme="dark" :title="symbol.toUpperCase()"/>
        <div class="transfer-history-box flex-item-1 flex-column">
            <div class="transfer-history-top">
                <h3 class="value">72 500.00</h3>
                <p class="sub-value">$72500.00</p>
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
                    </div>
                </TabList>
                <div></div>
            </div>
        </div>
        <div class="lxa-footer-btn transfer-history-btn flex-between-c">
            <Button @click="goLink('/otc')" size="auto">
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
    rechargeList: Array<any>; // 转入
    withdrawalList: Array<any>; // 转出
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
            active: 'transferIn',
            rechargeList: [],
            withdrawalList: [],
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
        this.symbol = (this.$route.query.symbol as string) || '';
        this.init();
    },
    methods: {
        init() {
            this.changeLoading(true);
            Promise.all([this.getCoinHistory(), this.getWithdrawHistory()]).finally(() => {
                this.changeLoading(false);
            });
        },
        getCoinHistory() {
            return this.$api.getCoinHistory({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.rechargeList = res.data.list || [{
                        amount: '302.44',
                        created_at: '2020-06-26 05:22',
                    }];
                }
            });
        },
        getWithdrawHistory() {
            return this.$api.getWithdrawHistory({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.withdrawalList = res.data.list || [{
                        fee: '66',
                        address: 'Efadfadfas fadsf asdfa sdfa sdf asdfsa f',
                        amount: '302.44',
                        created_at: '2020-06-26 05:22',
                    }];
                }
            });
        },
        cancel(id: any) {
            this.$api.withdrawCcancel({
                id,
            });
        },
        tabChangeHandle(value: any) {
            console.log(value);
        },
        clickHandle(value: any) {
            console.log(value);
        },
        goLink(path: string) {
            this.$router.push(`${path}?symbol=${this.symbol}`);
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
    &-top{
        margin: 50px 0;
        .value{
            font-size: 60px;
        }
        .sub-value{
            font-size: 29px;
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
