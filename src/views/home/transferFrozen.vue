<template>
    <div class="transfer-frozen">
        <TitleHeader :title="`${activeSymbol.coin.toUpperCase()} ${$t('common.frozen')}`">
            <h3 class="transfer-frozen-top" slot="right">
                {{
                    ((Number(activeSymbol.otc_frozen || 0)
                    + Number(activeSymbol.sys_frozen || 0)
                    + Number(activeSymbol.withdraw_frozen || 0)).toFixed(2))
                }}
            </h3>
        </TitleHeader>
        <div class="app-padding40">
            <ul class="transfer-frozen-ul">
                <li class="transfer-frozen-li">
                    <h5 class="flex-between-c app-size-34">
                        <span class="primary-color">{{$t('home.withdraw_frozen')}}</span>
                        <span class="value">{{Number(activeSymbol.withdraw_frozen || 0).toFixed(2)}}</span>
                    </h5>
                    <p class="tip text-align-l">{{$t('home.withdraw_frozen_tip')}}</p>
                </li>
                <li class="transfer-frozen-li">
                    <h5 class="flex-between-c app-size-34">
                        <span class="primary-color">{{$t('home.sys_frozen')}}</span>
                        <span class="value">{{Number(activeSymbol.sys_frozen || 0).toFixed(2)}}</span>
                    </h5>
                    <p class="tip text-align-l">{{$t('home.sys_frozen_tip')}}</p>
                </li>
                <li class="transfer-frozen-li">
                    <h5 class="flex-between-c app-size-34">
                        <span class="primary-color">{{$t('home.otc_frozen')}}</span>
                        <span class="value">{{Number(activeSymbol.otc_frozen || 0).toFixed(2)}}</span>
                    </h5>
                    <p class="tip text-align-l">{{$t('home.otc_frozen_tip')}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    symbol: string;
    activeSymbol: any;
}

export default Vue.extend({
    name: 'TransferHistory',
    data(): data {
        return {
            symbol: '',
            activeSymbol: {},
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
        this.activeSymbol = this.$route.query;
        console.log(this.activeSymbol);
        if (!this.activeSymbol.id) {
            this.getCoinBalances();
        }
    },
    methods: {
        getCoinBalances() {
            this.changeLoading(true);
            return this.$api.getCoinBalances({
                coin: this.activeSymbol.coin,
            }).then((res: any) => {
                this.changeLoading(false);
                if (res.data) {
                    this.activeSymbol = res.data;
                }
            }).catch(() => {
                this.changeLoading(false);
            });
        },
    },
});
</script>

<style lang="less" scoped>
.transfer-frozen{
    &-top{
        color: #282828;
        line-height: 45px;
        font-size: 45px;
    }
    &-ul{
        padding-top: 28px;
    }
    &-li{
        padding-top: 28px;
        padding-bottom: 28px;
    }
    .value{
        color: #585858;
    }
    .tip{
        font-size: 24px;
        color: #A6A6A6;
        margin-top: 12px;
    }
}
</style>
