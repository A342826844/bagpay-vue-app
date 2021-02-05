<template>
    <div class="red-envelope flex-column">
        <Headers ref="headers" bold theme="red" :title="$t('envelope.logs')"/>
        <div ref="fringe" class="red-envelope-fringe">
            <div class="red-envelope-fringe-info red-bg"></div>
        </div>
        <div @scroll.capture="scrollLoad" class="red-envelope-info">
            <TabList
                swipeable
                size="big"
                sticky
                sticky-top="sub"
                :defaultVal="active"
                :tabList="bodyTabList"
                @change="changeHandle"
            >
                <div @click="datePicker = true" class="app-padding40 app-size-28 calendar-right" slot="right">
                    {{columns[dateIndex]}} <img class="app-img-50" src="@/assets/img/common/calendar.png" alt="">
                </div>
                <div v-for="item in bodyTabList" :key="item.value" :slot="item.value">
                    <!-- <PullRefresh
                        v-model="isLoading"
                        @refresh="onRefresh"
                    > -->
                    <div class="app-margin-t40">
                        <p class="app-size-34">
                            <!-- TODO: -->
                            <span
                                v-html="$t('envelope.receivedEnvelopeTotal', { total: `<span class=red-color>${params[active].total || 0}</span>`})"
                                v-if="item.value === 'received'"
                            >
                            </span>
                            <span
                                v-html="$t('envelope.sendEnvelopeTotal', { total: `<span class=red-color>${params[active].total || 0}</span>`})"
                                v-if="item.value === 'send'"
                            >
                            </span>
                        </p>
                        <div class="red-envelope-amount">
                            ≈ <b class="app-size-100 yellow-color">{{totalAmount}}</b>
                            <span class="envelope-coin color-light app-size-28">{{_unit}}</span>
                        </div>
                    </div>
                    <div class="light-grey-bg red-envelope-empty"></div>
                        <ul>
                            <li
                                v-for="subItem in list[item.value]"
                                @click="$router.push(`/envelope/detail?id=${subItem.id || subItem.rid}`)"
                                :key="subItem.rid"
                            >
                                <NCardItem hideTitle>
                                    <template slot="lable">
                                        <span class="app-size-34 default57-color">{{$t('envelope.cdkEnvelope')}}</span>
                                        <span class="app-size-34 yellow-color">
                                            {{subItem.amount}} {{subItem.coin && subItem.coin.toUpperCase()}}
                                        </span>
                                    </template>
                                    <template slot="value">
                                        <span>{{subItem.created_at | date('MM-dd hh:mm')}}</span>
                                        <span v-if="item.value === 'received'" class="app-size-28 default57-color">{{subItem.sender}}</span>
                                        <span v-else class="app-size-28 default57-color">
                                            {{subItem.shares === subItem.took_count ? '已完成' : '进行中'}}
                                        </span>
                                    </template>
                                </NCardItem>
                                <div class="app-padding40">
                                    <div class="border-b"></div>
                                </div>
                            </li>
                        </ul>
                        <NoData v-show="!list[item.value].length && !_loading"></NoData>
                    <!-- </PullRefresh> -->
                </div>
            </TabList>
        </div>
        <V-Popup class="red-envelope-picker" v-model="datePicker">
            <div class="picker-confirm flex-between-c">
                <div @click="cancelHandle">{{$t('common.cancle')}}</div>
                <div @click="confirmHandle" class="primary-color">{{$t('common.ok')}}</div>
            </div>
            <van-picker
                ref="datePicker"
                :visible-item-count="3"
                :columns="columns"
            >
            </van-picker>
        </V-Popup>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DateForamt } from '@/utils/tool';
import NCardItem from '@/components/card/index.vue';

type data = {
    active: 'send'|'received';
    columns: any[];
    datePicker: boolean;
    dateIndex: number;
    coin: string;
    amount: number|string;
    isLoading: boolean;
    limit: number;
    rate: any;
    list: {
        received: any[];
        send: any[];
    };
    params: {
        received: any;
        send: any;
    };
}

export default Vue.extend({
    name: 'EnvelopeLogs',
    components: {
        NCardItem,
    },
    data(): data {
        return {
            datePicker: false,
            isLoading: false,
            active: 'received',
            columns: [],
            dateIndex: 0,
            limit: 20,
            amount: '',
            coin: '',
            rate: {},
            list: {
                received: [],
                send: [],
            },
            params: {
                received: {
                    loadMore: false,
                    isEnd: false,
                    total: '',
                    sum: [],
                },
                send: {
                    loadMore: false,
                    isEnd: false,
                    total: '',
                    sum: [],
                },
            },
        };
    },
    computed: {
        bodyTabList(): any[] {
            return [
                {
                    title: this.$t('envelope.mineReceived'),
                    value: 'received',
                }, {
                    title: this.$t('envelope.mineSend'),
                    value: 'send',
                },
            ];
        },
        totalAmount(): number {
            const { sum } = this.params[this.active];
            if (!sum.length) return 0;
            if (sum.length === 1) return sum[0].amount * (this.rate[sum[0].coin] || 1);
            const res = sum.reduce((total: any, item: any) => {
                if (typeof total === 'object') {
                    return total.amount * (this.rate[total.coin] || 1) + item.amount * (this.rate[item.coin] || 1);
                }
                return total + item.amount * (this.rate[item.coin] || 1);
            });
            return res;
        },
    },
    created() {
        this.getColumns();
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name !== 'envelopeDetail') {
                // eslint-disable-next-line no-param-reassign
                vm.dateIndex = 0;
                vm.initHandle();
            }
        });
    },
    methods: {
        getColumns() {
            let year = new Date().getFullYear();
            const startYear = 2020;
            while (year >= startYear) {
                this.columns.push(year);
                year -= 1;
            }
        },
        initHandle() {
            this.list.send = [];
            this.list.received = [];
            this.params = {
                received: {
                    loadMore: false,
                    isEnd: false,
                    total: '',
                    sum: [],
                },
                send: {
                    loadMore: false,
                    isEnd: false,
                    total: '',
                    sum: [],
                },
            };
            this.getExchangeRate();
            this.getList();
        },
        getCoinRate(coin: string) {
            return this.rate[coin] || 1;
        },
        cancelHandle() {
            this.datePicker = false;
            (this.$refs.datePicker as any).setIndexes(this.dateIndex);
        },
        getExchangeRate() {
            return this.$api.getExchangeRate().then((res: any) => {
                if (res.data) {
                    this.rate = res.data;
                }
            });
        },
        confirmHandle() {
            this.datePicker = false;
            this.dateIndex = (this.$refs.datePicker as any).getIndexes();
            this.list.send = [];
            this.list.received = [];
            this.getList(true);
        },
        onRefresh() {
            this.getList(true);
        },
        changeHandle(item: any) {
            this.active = item.value;
            if (!this.list[this.active].length) {
                this.getList();
            }
        },
        getList(refresh?: boolean) {
            if (refresh) {
                this.params[this.active].isEnd = false;
            }
            this.changeLoading(true);
            if (this.active === 'send') {
                this.getRedEnvelopeListForSend(refresh);
            } else {
                this.getRedEnvelopeListForReceived(refresh);
            }
        },
        // 滚动懒加载
        scrollLoad(event: Event) {
            const scroll = (event.target as HTMLElement);
            const { scrollTop, scrollHeight, clientHeight } = scroll;
            if (
                (clientHeight + scrollTop > scrollHeight - 100)
                && (clientHeight + scrollTop !== scrollHeight)
                && !this.params[this.active].loadMore && !this.params[this.active].isEnd) {
                this.params[this.active].loadMore = true;
                this.getList();
            }
        },

        getRedEnvelopeListForReceived(refresh?: boolean) {
            const params = {
                start: new DateForamt(`${this.columns[this.dateIndex]}-01-01 00:00:00`).getTime(),
                end: new DateForamt(`${this.columns[this.dateIndex] + 1}-01-01 00:00:00`).getTime(),
                offset: refresh ? 0 : this.list.received.length,
                limit: this.limit,
            };
            this.$api.getRedEnvelopeListForReceived(params).then((res: any) => {
                if (refresh) {
                    this.list.received = res.data.list || [];
                } else {
                    this.list.received = this.list.received.concat(res.data.list || []);
                }
                this.params.received.sum = res.data.sum || [];
                this.params.received.total = res.data.total;
                if (this.list.received.length === res.data.total) {
                    this.params.received.isEnd = true;
                }
            }).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
        getRedEnvelopeListForSend(refresh?: boolean) {
            const params = {
                start: new DateForamt(`${this.columns[this.dateIndex]}-01-01 00:00:00`).getTime(),
                end: new DateForamt(`${this.columns[this.dateIndex] + 1}-01-01 00:00:00`).getTime(),
                offset: refresh ? 0 : this.list.send.length,
                limit: this.limit,
            };
            this.$api.getRedEnvelopeListForSend(params).then((res: any) => {
                if (refresh) {
                    this.list.send = res.data.list || [];
                } else {
                    this.list.send = this.list.send.concat(res.data.list || []);
                }
                this.params.send.total = res.data.total;
                this.params.send.sum = res.data.sum || [];
                if (this.list.send.length === res.data.total) {
                    this.params.send.isEnd = true;
                }
            }).finally(() => {
                this.changeLoading(false);
                this.isLoading = false;
            });
        },
    },
});
</script>

<style lang="less" scoped>
.red-envelope{
    height: 100%;
    overflow: scroll;
    .color-light{
        color: #A6A6A6;
    }
    &-fringe{
        height: 100px;
        left: 0;
        top: 68px;
        width: 100%;
        position: absolute;
        overflow: hidden;
        background: #fff;
        z-index: 2000;
        &-info{
            border-radius: 0 0 50% 50%;
            height: 1500px;
            width: 1500px;
            left: -50%;
            position: absolute;
            top: -1400px;
        }
    }
    &-picker{
        // height: 320px;
        width: 450px;
        border-radius: 20px;
        .picker-confirm{
            position: absolute;
            // right: 20px;
            padding: 0 20px;
            top: 20px;
            z-index: 100;
            width: 100%;
        }
    }
    &-amount{
        margin-bottom: 28px;
        .envelope-coin{
            margin-left: 40px;
        }
    }
    &-info{
        height: calc(100% - 100px);
        overflow: auto;
        margin-top: 120px;
        .calendar-right{
            position: sticky;
        }
    }
    &-empty{
        height: 13px;
    }
    &-box1{
        // margin-top: 120px;
        padding-bottom: 45px;
    }
    &-box2{
        padding-bottom: 84px;
        margin-top: 45px;
    }
    &-box3{
        padding-bottom: 84px;
    }
    .form-item{
        margin: 40px 0;
        &-switch{
            min-width: 100px;
            transition: all 0.3s;
        }
    }
    .form-btn{
        margin-top: 45px;
        &-tip{
            margin-top: 45px;
            color: #A6A6A6;
        }
    }
    .popup-colse{
        margin: 40px;
    }
}
</style>
