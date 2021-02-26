<template>
    <div class="merchant-fund light-grey-bg">
        <div class="merchant-fund-header">
            <Headers bold theme="primary">
                <h4 slot="left">
                    <span class="app-size-45 vertical-m">商家服务</span>
                </h4>
            </Headers>
            <div class="merchant-fund-header-fringe primary-bg"></div>
        </div>
        <div class="merchant-fund-body">
            <div class=" app-padding40">
                <ShowCard class="margin-b40" divider direction="row">
                    <div class="text-align-l" slot="slot1">
                        <p>账户余额(USDT)</p>
                        <b @click="$router.push('/merchant/fund?symbol=usdt')" class="primary-color app-size-45">72 500.00</b>
                        <Button @click="$router.push('/merchant/fund')" class="app-size-22" size="micro">资金管理</Button>
                    </div>
                    <div class="text-align-r" slot="slot2">
                        <p>今日收款(USDT)</p>
                        <b @click="$router.push('/merchant/record')" class="primary-color app-size-45">72 500.00</b>
                        <Button @click="$router.push('/merchant/record')" class="app-size-22" size="micro">收款记录</Button>
                    </div>
                </ShowCard>
            </div>
            <div class="flex-between-c app-padding40">
                <Button @click="goLink('/otc/entry')" size="auto">
                    <img class="app-img-50" src="@/assets/img/home/coin.png" alt="">
                </Button>
                <Button v-for="item in sideMap" :key="item.side" @click="goLink(item.path)" :type="item.type" size="small" v-t="item.title"></Button>
            </div>
            <!-- <div v-for="item in 200" :key="item" >test</div> -->
            <div>
                <TabList
                    swipeable
                    size="big"
                    sticky
                    sticky-top="sub"
                    :defaultVal="active"
                    class="merchant-fund-list"
                    :tabList="bodyTabList"
                >
                    <div class="transfer-list" slot="transferIn">
                        <ul>
                            <li class="app-padding40 flex-between-c" v-for="(item, index) in rechargeList" :key="index">
                                <div class="values">
                                    <!-- <h5 class="value green-color">{{$t('payment.transferIn')}}</h5> -->
                                    <h5 class="status_label" :class="{
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
                                    <h5 class="status_label" :class="{
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
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    address: string;
    loading: boolean;
    symbol: string;
    qrValue: string;
    memo: string;
    value: string;
    active: string;
    rechargeList: any[];
    withdrawalList: any[];
    size: number;
    sideMap: {
        [elem: string]: any;
    };
}

export default Vue.extend({
    name: 'merchantFund',
    data(): data {
        return {
            address: '',
            symbol: '',
            loading: true,
            qrValue: '',
            value: '',
            memo: '',
            size: 100,
            active: 'transferIn',
            rechargeList: [],
            withdrawalList: [],
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
    methods: {
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
});
</script>

<style lang="less" scoped>
.merchant-fund{
    height: 100%;
    position: relative;
    overflow: auto;
    .margin-b40{
        margin-bottom: 40px;
    }
    .margin-t24{
        margin-top: 24px;
    }
    &-header-fringe{
        height: 220px;
        border-radius: 0 0 50px 50px;
    }
    &-body{
        position: absolute;
        // background: pink;
        max-height: calc(100% - 220px);
        overflow: scroll;
        top: 150px;
        // width: 658px;
        left: 0;
        right: 0;
        margin: 0 auto;
        &-mark{
            .mark1{
                width: 430px;
                &-title{
                    margin-bottom: 28px;
                }
            }
            .mark2{
                width: 200px;
            }
            .img1{
                width: 92px;
                flex-shrink: 0;
                margin-right: 20px;
            }
            .img2{
                width: 100px;
            }
        }
        &-gateway{
            .path{
                width: 580px;
                margin-top: 52px;
            }
            .path-img{
                width: 100%;
            }
            // .path-lable{
            //     width: 100%;
            // }
        }
        &-api{
            .api-li{
                margin-bottom: 32px;
                &-tip{
                    margin-top: 20px;
                }
            }
        }
    }
    &-list{
        margin-top: 52px;
        .transfer-list{
            // background: #ffffff;
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
                            color:#5894EE;
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
}
</style>

<style lang="less">
.merchant-fund-list .tabbar{
    background: transparent !important;
}
</style>
