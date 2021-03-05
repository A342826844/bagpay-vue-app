<template>
    <div class="merchant-recorddetail">
        <TitleHeader :title="$t('merchant.recordDetail')">
            <div class="app-padding40">
                <div class="merchant-recorddetail-top">
                    <h4 class="app-size-34 black-color">料子</h4>
                    <div class="top-value">
                        <span class="red-color num app-size-66">+352.00 </span>
                        <span>USDT</span>
                    </div>
                </div>
                <ShowCard class="scale-1px merchant-recorddetail-card app-size-28" divider>
                    <div slot="slot1">
                        <div class="flex-between-c">
                            <span>{{$t('merchant.currentState')}}</span>
                            <span>已收款</span>
                        </div>
                        <div class="flex-between-c">
                            <span>{{$t('merchant.collectionTime')}}</span>
                            <span>2021-01-05</span>
                        </div>
                        <div class="flex-between-c">
                            <span>{{$t('merchant.amount')}}</span>
                            <span>170.00</span>
                        </div>
                    </div>
                    <div slot="slot2">
                        <div class="flex-between-c">
                            <span>{{$t('merchant.description')}}</span>
                            <span>商品</span>
                        </div>
                        <div class="flex-between-c">
                            <span>{{$t('merchant.tradeNum')}}</span>
                            <span>295995959595595954</span>
                        </div>
                        <div class="flex-between-c">
                            <span>{{$t('merchant.merchantNum')}}</span>
                            <span>595955156454165654</span>
                        </div>
                    </div>
                </ShowCard>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    form: {
        name: string;
        tel: string;
        url: string;
    };
}

export default Vue.extend({
    name: 'MerchantRecordDetail',
    data(): data {
        return {
            form: {
                name: '',
                tel: '',
                url: '',
            },
        };
    },
});
</script>

<style lang="less" scoped>
.merchant-recorddetail{
    height: 100%;
    &-top{
        margin-top: 82px;
        .top-value{
            margin-top: 30px;
            .num{
                margin-right: 24px;
            }
        }
    }
    &-card{
        margin-top: 82px;
        color: #8D8D8D;
        line-height: 60px;
    }
}
</style>
