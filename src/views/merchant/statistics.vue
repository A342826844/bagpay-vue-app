<template>
    <div class="merchant-statistics primary-bg flex-column">
        <Headers bold theme="primary">
            <h4 slot="left">
                <span class="app-size-45 vertical-m">{{$t('merchant.statistics')}}</span>
            </h4>
        </Headers>
        <div class="merchant-statistics-box flex-item-1 flex-column">
            <div class="merchant-statistics-tab">
                <TabList
                    size="big"
                    :defaultVal="active"
                    :tabList="bodyTabList"
                >
                    <div slot="right">
                        <span class="vertical-m">2021 {{$t('common.year')}} {{5 | monthFilter}}</span>
                        <img class="app-img-50 vertical-m" src="@/assets/img/common/calendar1.png" alt="">
                    </div>
                </TabList>
            </div>
            <div class="merchant-statistics-card flex-item-1">
                <div class="flex-between-c app-padding40">
                    <div class="text-align-l">
                        <p class="app-size-28">{{$t('merchant.incomeAmoount')}}(USDT)</p>
                        <h4 class="app-size-45 primary-color">72 500.00</h4>
                        <p>{{$t('merchant.total1', {total: 2})}}</p>
                    </div>
                    <div class="text-align-r">
                        <p class="app-size-28">{{$t('merchant.expenditureAmount')}}(USDT)</p>
                        <h4 class="app-size-45">72 500.00</h4>
                        <p>{{$t('merchant.total1', {total: 3})}}</p>
                    </div>
                </div>
                <div class="app-padding40">
                    <!-- <p class="text-align-l">近5日对比</p> -->
                    <div class="scale-1px merchant-statistics-chart">
                        <Chart></Chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from './component/Chart.vue';

type data = {
    active: string;
}

export default Vue.extend({
    name: 'TransferHistory',
    components: {
        Chart,
    },
    data(): data {
        return {
            active: 'day',
        };
    },
    computed: {
        bodyTabList() {
            return [
                {
                    title: this.$t('merchant.forDay'),
                    value: 'day',
                }, {
                    title: this.$t('merchant.forMonth'),
                    value: 'month',
                },
            ];
        },
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.merchant-statistics{
    height: 100%;
    position: relative;
    &-box{
        overflow: scroll;
    }
    &-tab{
        margin-top: 72px;
    }
    &-card{
        background: #ffffff;
        color: #585858;
        border-radius: 50px 50px 0 0;
        padding-top: 50px;
    }
    &-chart{
        margin-top: 45px;
        box-shadow: 0px 1px 5px 0px rgba(178, 178, 178, 0.5);
        border-radius: 15px;
    }
}
</style>
<style lang="less">
.merchant-statistics-tab{
    .tab-list .tabbar-p.active, .merchant-statistics .tabbar-p{
        color: #ffffff;
    }
}
</style>
