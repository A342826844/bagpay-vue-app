<template>
    <div class="otc-good-card app-padding40 border-b">
        <div>
            <div class="flex-between-c">
                <div class="text-align-l">
                    <div class="flex-start-c">
                        <h5 class="name">{{ renderData.nickname }}</h5>
                        <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
                    </div>
                    <p class="otc-good-card-pay value">{{ renderData.pay_types | payType}}</p>
                </div>
                <div class="text-align-r">
                    <p class="lable">单价</p>
                    <h6 class="app-size-34 primary-color otc-good-card-price">${{ renderData.price }}</h6>
                </div>
            </div>
            <div class="flex-between-c otc-good-card-num">
                <div class="text-align-l value">
                    <div>
                        <span class="lable">数量</span> {{ renderData.total }}  {{renderData.coin.toUpperCase()}}
                    </div>
                    <div>
                        <span class="lable">限额</span> ${{ renderData.min_value }}~{{ renderData.max_value }}
                    </div>
                </div>
                <div>
                    <Button @click="$emit('click', renderData)" size="mini" :type="side === 1 ? 'up' : 'down'">{{ side | orderSideType}}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'OtcGardCard',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        side: {
            type: Number,
            required: true,
        },
        renderData: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped lang="less">
@import '../../../assets/less/color.less';
.otc-good-card{
    height: 269px;
    padding-top: 42px;
    .lable{
        color: #A5A5A5;
    }
    .name{
        color: #202025;
        font-size: 28px;
    }
    .value{
        font-size: 24px;
        color: #343434;
    }
    &-pay{
        margin-top: 8px;
    }
    &-price{
        margin-top: 15px;
    }
    &-num{
        margin-top: 22px;
        line-height: 50px;
    }
}
</style>
