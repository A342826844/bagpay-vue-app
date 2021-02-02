<template>
    <div class="red-envelope flex-column">
        <Headers ref="headers" :title="`${symbol.toUpperCase()}账单`"/>
        <div>
            <NCardItem v-for="item in list" :key="item.id">
                <template slot="title">
                    <span>{{item.type | balanceLogType}}</span>
                </template>
                <template slot="right">
                    <!-- <strong :class="item.amount > 0 ? 'red-color' : ''">{{item.amount}}</strong> -->
                </template>
                <template slot="lable">
                    <span>{{$t('金额')}}</span>
                    <!-- <span>{{$t('手续费')}}</span> -->
                    <span>{{$t('时间')}}</span>
                </template>
                <template slot="value">
                    <strong :class="item.amount > 0 ? 'red-color' : ''">{{item.amount}}</strong>
                    <!-- <span>{{item.fee}}</span> -->
                    <span>{{item.created_at | date('MM-dd hh:mm')}}</span>
                </template>
            </NCardItem>
            <noData v-if="!_loading && (!list.length)"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NCardItem from '@/components/card/index.vue';

type data = {
    list: any[]; // 转出
    sender: string;
    symbol: string;
    title: any;
    coin: string;
    shares: number;
    amount: number;
    took_shares: number;
}

export default Vue.extend({
    name: 'RedEnvelope',
    components: {
        NCardItem,
    },
    data(): data {
        return {
            list: [],
            sender: '',
            symbol: '',
            coin: '',
            title: '',
            shares: 0,
            amount: 0,
            took_shares: 0,
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            // eslint-disable-next-line no-param-reassign
            vm.symbol = to.query.coin || '';
            vm.getData();
        });
    },
    methods: {
        getData() {
            const params = {
                coin: this.symbol,
                offset: 0,
                limit: 20,
            };
            this.changeLoading(true);
            this.$api.getUserBalanceLog(params).then((res: any) => {
                this.list = res.data.list;
            }).finally(() => {
                this.changeLoading(false);
            });
        },
    },
});
</script>

<style lang="less" scoped>
</style>
