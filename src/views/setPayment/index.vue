<template>
    <div class="set-payment">
        <TitleHeader :title="$t('payment.setPaymentTitle')">
            <img @click="add()" class="app-img-50" slot="header" src="../../assets/img/common/add.png" alt="">
        </TitleHeader>
        <div class="set-payment-body">
            <SelectSymbol :defaultSymbol="symbol" @change="_change" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SelectSymbol from '@/components/selectSymbol/index.vue';

type data = {
    symbol: string;
    needMemo: string;
}

export default Vue.extend({
    name: 'SetPayment',
    components: {
        SelectSymbol,
    },
    data(): data {
        return {
            symbol: 'usdt',
            needMemo: '0',
        };
    },
    methods: {
        _change(item: any) {
            this.symbol = item.symbol;
            this.needMemo = item.need_memo;
        },
        add() {
            this.$store.commit('setAddAddr', {
                symbol: this.symbol,
                needMemo: this.needMemo,
            });
            this.$router.push({
                path: `/setpayment/add?symbol=${this.symbol}`,
            });
        },
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.set-payment{
    height: 100%;
    overflow: scroll;
    &-body{
         margin-top: 58px;
    }
}
</style>
