<template>
    <div class="merchant-record">
        <TitleHeader fill theme="primary" title="收款记录">
            <span @click="$router.push('/merchant/statistics')" slot="header">{{$t('merchant.statistics')}}</span>
            <span class="merchant-record-title-tip app-size-28" slot="title">{{$t('merchant.total', {total: 2})}}</span>
            <div class="merchant-record-title-right" slot="right">
                <span class="vertical-m">2021 {{$t('common.year')}} {{5 | monthFilter}}</span>
                <img class="app-img-50 vertical-m" src="@/assets/img/common/calendar1.png" alt="">
            </div>
            <div class="merchant-record-list app-padding40">
                <ShowCard class="merchant-record-mt40" divider>
                    <div class="flex-between-c" slot="slot1">
                        <h5>2021-01-11</h5>
                        <p>
                            <span>收入</span>
                            <span>+726.44 USDT</span>
                        </p>
                    </div>
                    <ul slot="slot2">
                        <li @click="$router.push(`/merchant/record/detail?id=${item}`)" class="ul-li" v-for="item in 5" :key="item">
                            <div class="flex-between-c">
                                <span>二维码收款-料子</span>
                                <b class="app-size-34 primary-color">+363.22</b>
                            </div>
                            <div class="text-align-l a6a6a6-color">05:22</div>
                        </li>
                    </ul>
                </ShowCard>
                <ShowCard class="merchant-record-mt40" divider>
                    <div class="flex-between-c" slot="slot1">
                        <h5>2021-01-11</h5>
                        <p>
                            <span>收入</span>
                            <span>+726.44 USDT</span>
                        </p>
                    </div>
                    <ul slot="slot2">
                        <li
                            class="ul-li"
                            v-for="item in 5"
                            :key="item"
                        >
                            <div class="flex-between-c">
                                <span>二维码收款-料子</span>
                                <b class="app-size-34 primary-color">+363.22</b>
                            </div>
                            <div class="text-align-l a6a6a6-color">05:22</div>
                        </li>
                    </ul>
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
    name: 'MerchantRecord',
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
.merchant-record{
    height: 100%;
    overflow: scroll;
    &-mt40{
        margin-top: 40px;
    }
    &-title-tip{
        font-weight: 400;
        margin-left: 35px;
        font-family: AlibabaPuHuiTiR;
    }
    &-title-right{
        color: #fff;
    }
    &-list{
        padding-bottom: 40px;
        .ul-li{
            margin-top: 32px;
            &:first-child{
                margin-top: 0;
            }
        }
    }
}
</style>
