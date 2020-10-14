<template>
    <div class="otc">
        <Drawer position="right" v-model="screen">
            <OrderFilter
                ref="historyRef"
                size='small'
                :title="$t('筛选')"
                @choose="selecTyoe"
                :renderData="renderDataTree"
            ></OrderFilter>
        </Drawer>
        <TabList
            size="big"
            border
            :defaultVal="activeType"
            @change="tabChangeHandle"
            @on-click="clickHandle"
            class="otc-tab"
            :tabList="bodyTabList"
        >
            <div slot="right" class="otc-header-right">
                <img class="app-img-50" @click="screen=true" src="@/assets/img/common/screen.png" alt="">
                <img class="app-img-50" @click="showMore=true" src="@/assets/img/common/more.png" alt="">
            </div>
            <div class="otc-list" v-for="item in bodyTabList" :key="item.value" :slot="item.value">
                <div class="otc-tabbar" @scroll.capture="scrollLoad">
                    <V-Tabs
                        v-model="active"
                        swipeable
                        line-height='0.053333rem'
                        line-width='0.693333rem'
                        color = '#5894EE'
                        ref="tabs"
                        title-active-color='#5894EE'
                        :swipe-threshold='6'
                        :border='false'
                        @change='tabChangeHandle'
                        >
                        <V-Tab v-for="(item, index) in coins" :title="item.name" :name="item.coin" :disabled="!item.name" :key="index">
                            <transition name="fade">
                                <div class="otc-tabbar-page" v-show="item.coin === active">
                                    <div class="otc-tabbar-content bg-white">
                                        <div class="content-list">
                                            <GoodsCard v-for="item in renderData[active]" :renderData='item' :key="item.id"></GoodsCard>
                                            <div v-if="false" class="loadMore-loading">
                                                <Loading type='component' :loading='loadMore'></Loading>
                                            </div>
                                            <p class="color-gray" v-show="!globalLoading && paramsDate[active] && paramsDate[active].isEnd">
                                                {{$t('暂无更多')}}
                                            </p>
                                            <NoData v-if="!globalLoading" :show='noDataShow'  />
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
                    v-show="!(item.needOtc && !userInfo.isOtc)"
                    :key="item.url"
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
import Drawer from '@/components/commons/Drawer.vue';
import OrderFilter, { renderData } from '@/components/Orders/OrderFilter.vue';
import Loading from '@/components/loading/index.vue';
import GoodsCard from '../component/GoodsCard.vue';

const business = require('../../../assets/img/otc/business.png');
const fabu = require('../../../assets/img/otc/fabu.png');
const manage = require('../../../assets/img/otc/manage.png');
const payment = require('../../../assets/img/otc/payment.png');
const order = require('../../../assets/img/otc/order.png');

type data = {
    screen: boolean;
    showMore: boolean;
    loadMore: boolean;
    noDataShow: boolean;
    active: string;
    activeType: string;
    renderDataTree: renderData;
    paramsDate: any;
    renderData: any;
    coins: Array<any>;
    moreShade: Array<any>;
}

export default Vue.extend({
    components: {
        GoodsCard,
        Drawer,
        Loading,
        OrderFilter,
    },
    data(): data {
        return {
            screen: false,
            showMore: false,
            loadMore: false,
            noDataShow: false,
            active: 'usdt',
            activeType: '',
            renderDataTree: [{
                title: '交易类型',
                key: 'type',
                value: 0,
                data: [{
                    title: '普通',
                    type: 0,
                }, {
                    title: '大宗',
                    type: 1,
                }],
            }, {
                title: '支付方式',
                key: 'pay',
                value: 0,
                data: [{
                    title: '普通',
                    pay: 0,
                }, {
                    title: '大宗',
                    pay: 1,
                }],
            }],
            renderData: {
                usdt: [{}, {}, {}, {}, {}, {}, {}, {}],
                usdc: [{}, {}, {}],
            },
            paramsDate: {},
            coins: [
                {
                    name: 'USDT',
                    coin: 'usdt',
                }, {
                    name: 'USDC',
                    coin: 'usdc',
                }, {
                    name: '',
                    coin: 'disable',
                }, {
                    name: '',
                    coin: 'disable',
                }, {
                    name: '',
                    coin: 'disable',
                },
            ],
            moreShade: [
                {
                    img: fabu,
                    title: '发布广告',
                    url: '/orderRecord',
                    needlogin: true,
                    isfabu: true,
                }, {
                    img: manage,
                    title: '广告管理',
                    url: '/otc/AdvManage',
                    needlogin: true,
                    neediRealAuth: false,
                    needOtc: true,
                }, {
                    img: order,
                    title: '场外订单',
                    url: '/otc/otcOrder',
                    needlogin: true,
                    neediRealAuth: false,
                }, {
                    img: payment,
                    title: '收款方式',
                    url: '/payment',
                    needlogin: true,
                }, {
                    img: business,
                    title: '广告商家',
                    url: '/otc/merchants/3',
                    needlogin: false,
                    neediRealAuth: false,
                    // }, {
                    //     img: require('@/assets/img/quickTrans/message.png'),
                    //     title: '订单消息',
                    //     url: '/setting/otcmsg',
                    //     needlogin: false,
                },
            ],
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
    methods: {
        selecTyoe(item: any) {
            console.log(item, 'selecTyoe');
        },
        checkType() {
            console.log('checkType');
        },
        scrollLoad() {
            console.log('scrollLoad');
        },
        tabChangeHandle() {
            console.log('tabChangeHandle');
        },
        clickHandle() {
            setTimeout(() => {
                (this.$refs.tabs as Element[]).forEach((item) => {
                    (item as any).resize();
                });
            }, 0);
            console.log('clickHandle');
        },
        clickShowMore() {
            console.log('clickShowMore');
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
