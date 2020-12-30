<template>
    <div class="otc-quick-trade app-padding40">
        <div class=" felx-between-c">
            <div>
                <p>盘口最优价 5.8 CNY/USDT</p>
                <p>余额：1562326.00 USDT</p>
            </div>
            <div>
                <img src="" alt="">
            </div>
        </div>
        <div>
            <input type="text">
        </div>
        <div class=" flex-between-c">
            <span></span>
            <div>
                <img src="" alt="">
                按数量购买
            </div>
        </div>
        <div>
            <button>一键购买</button>
        </div>
        <div>
            * 极速一键下单，按需匹配用户挂单最优盘口价
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
        arrow: {
            type: Boolean,
            default: false,
        },
        renderData: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped lang="less">

</style>
