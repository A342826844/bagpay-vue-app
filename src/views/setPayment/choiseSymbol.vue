<template>
  <div class="set-payment">
    <TitleHeader :title="$t('payment.choiceAddress')">
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
                <h5 class="lable">{{ item.symbol.toUpperCase() }}</h5>
                <p class="value">{{ item.name }}</p>
              </div>
            </div>
            <div class="list-values" v-show="symbol === item.symbol">
              <img src="@/assets/img/setting/ok.png" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </TitleHeader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
  symbol: string;
  type: string;
  symbolList: Array<any>;
};

export default Vue.extend({
    name: 'SetPayment',
    data(): data {
        return {
            symbol: 'tusd',
            symbolList: [],
            type: '',
        };
    },
    // computed: {
    //     symbolList() {
    //         return this.$store.state.symbolList;
    //     },
    // },
    mounted() {
        this.symbol = (this.$route.query.symbol || '') as string;
        sessionStorage.setItem('symbol', this.symbol);
        this.type = (this.$route.query.type || '') as string;
        let key = '';
        switch (this.type) {
        case '1':
            key = 'enable_otc';
            break;
        default:
            key = 'out_enable';
        }
        this.getCoinList(key);
    },
    methods: {
        getCoinList(key: string) {
            this.symbolList = this.filterHandle(this.$store.state.symbolList, key);
            this.$api.getCoinList().then((res: any) => {
                if (res.code === 0) {
                    // this.symbolList = res.data.filter((item: any) => item[key] === 1);
                    this.symbolList = this.filterHandle(res.data, key);
                }
            });
        },
        filterHandle(data: Array<CoinInfo>, key: string) {
            return data.filter((item: any) => item[key] === 1);
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
@import "../home/assets-symbol-list.less";
.set-payment {
  height: 100%;
  overflow: scroll;
  &-body {
    margin-top: 58px;
  }
}
</style>
