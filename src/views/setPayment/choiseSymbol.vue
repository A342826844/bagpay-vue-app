<template>
    <div class="set-payment">
        <TitleHeader :title="$t('payment.choiceAddress')" />
        <div class="assets-symbol-list app-padding40">
            <ul>
                <li
                    @click="selected(item)"
                    class="flex-between-c"
                    v-for="item in symbolList"
                    :key="item.symbol"
                >
                    <div class="flex-start-c">
                        <icon-img :symbol="item.symbol"></icon-img>
                        <div class="list-values values1">
                            <h5 class="lable">{{item.symbol.toUpperCase()}}</h5>
                            <p class="value">{{item.name}}</p>
                        </div>
                    </div>
                    <div class="list-values" v-show="symbol === item.symbol">
                        <img src="@/assets/img/setting/ok.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    symbol: string;
    symbolList: Array<any>;
}

export default Vue.extend({
    name: 'SetPayment',
    data(): data {
        return {
            symbol: 'tusd',
            symbolList: [],
        };
    },
    mounted() {
        this.symbol = (this.$route.query.symbol || '') as string;
        this.getCoinList();
    },
    methods: {
        getCoinList() {
            this.$api.getCoinList().then((res: any) => {
                if (res.code === 0) {
                    this.symbolList = res.data.filter((item: any) => item.out_enable === 1);
                }
            });
        },
        selected(item: any) {
            sessionStorage.setItem('symbol', item.symbol);
            sessionStorage.setItem('needMemo', item.need_memo);
            this.$router.go(-1);
        },
    },
});
</script>

<style lang="less" scoped>
@import '../home/assets-symbol-list.less';
.set-payment{
    height: 100%;
    overflow: scroll;
    &-body{
         margin-top: 58px;
    }
}
</style>
