<template>
    <div class="red-envelope flex-column">
        <Headers ref="headers" bold theme="red" :title="$t('envelope.logs')"/>
        <div ref="fringe" class="red-envelope-fringe">
            <div class="red-envelope-fringe-info red-bg"></div>
        </div>
        <div class="red-envelope-info">
            <TabList
                swipeable
                size="big"
                sticky
                sticky-top="sub"
                :defaultVal="active"
                :tabList="bodyTabList"
            >
                <div @click="datePicker = true" class="app-padding40 app-size-28 calendar-right" slot="right">
                    {{columns[dateIndex]}} <img class="app-img-50" src="@/assets/img/common/calendar.png" alt="">
                </div>
                <div v-for="item in bodyTabList" :key="item.value" :slot="item.value">
                    <div class="app-margin-t40">
                        <p class="app-size-34">
                            <!-- TODO: -->
                            <span v-if="item === 'received'">{{$t('envelope.receivedEnvelopeTotal', { total: 12})}}</span>
                            <span v-if="item === 'send'">{{$t('envelope.sendEnvelopeTotal', { total: 12})}}</span>
                        </p>
                        <div class="red-envelope-amount">
                            <b class="app-size-100 yellow-color">{{amount}}</b>
                            <span class="envelope-coin color-light app-size-28">USDT{{coin && coin.toUpperCase()}}</span>
                        </div>
                    </div>
                    <div class="light-grey-bg red-envelope-empty"></div>
                    <ul>
                        <li @click="$router.push(`/envelope/detail?id=${subItem}`)" v-for="subItem in list[item.value]" :key="subItem">
                            <NCardItem hideTitle>
                                <template slot="lable">
                                    <span class="app-size-34 default57-color">{{$t('envelope.cdkEnvelope')}}</span>
                                    <span class="app-size-34 yellow-color">0.125 USDT</span>
                                </template>
                                <template slot="value">
                                    <span class="app-size-28 default57-color">135****2262</span>
                                    <span>{{123123 | date('MM-dd hh:mm')}}</span>
                                </template>
                            </NCardItem>
                            <div class="app-padding40">
                                <div class="border-b"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </TabList>
        </div>
        <V-Popup class="red-envelope-picker" v-model="datePicker">
            <div class="picker-confirm flex-between-c">
                <div @click="cancelHandle">{{$t('common.cancel')}}</div>
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
    list: {
        received: any[];
        send: any[];
    };
}

export default Vue.extend({
    name: 'Envelope',
    components: {
        NCardItem,
    },
    data(): data {
        return {
            datePicker: false,
            active: 'send',
            columns: [],
            dateIndex: 0,
            list: {
                received: [],
                send: [],
            },
        };
    },
    computed: {
        bodyTabList(): any[] {
            return [
                {
                    title: '我收到的',
                    value: 'received',
                }, {
                    title: '我发出的',
                    value: 'send',
                },
            ];
        },
    },
    created() {
        this.getColumns();
        this.getList();
    },
    methods: {
        getColumns() {
            const year = new Date().getFullYear();
            let startYear = 2020;
            while (startYear <= year) {
                this.columns.push(startYear);
                startYear += 1;
            }
            console.log(this.columns);
        },
        cancelHandle() {
            this.datePicker = false;
            (this.$refs.datePicker as any).setIndexes(this.dateIndex);
        },
        confirmHandle() {
            this.datePicker = false;
            this.dateIndex = (this.$refs.datePicker as any).getIndexes();
            console.log(this.dateIndex);
        },
        getList() {
            const arr = new Array(100).keys();
            this.list[this.active] = Array.from(arr);
            // this.getRedEnvelopeListForReceived();
            this.getRedEnvelopeListForSend();
        },
        getRedEnvelopeListForReceived() {
            const params = {
                start: new DateForamt(`${this.columns[this.dateIndex]}-01-01 00:00:00`).getTime(),
                end: new DateForamt(`${this.columns[this.dateIndex] + 1}-01-01 00:00:00`).getTime(),
                offset: 0,
                limit: 20,
            };
            this.$api.getRedEnvelopeListForReceived(params).then((res: any) => {
                console.log(res);
            });
        },
        getRedEnvelopeListForSend() {
            const params = {
                start: new DateForamt(`${this.columns[this.dateIndex]}-01-01 00:00:00`).getTime(),
                end: new DateForamt(`${this.columns[this.dateIndex] + 1}-01-01 00:00:00`).getTime(),
                offset: 0,
                limit: 20,
            };
            this.$api.getRedEnvelopeListForSend(params).then((res: any) => {
                console.log(res);
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
