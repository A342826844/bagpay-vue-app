<template>
    <div class="otc-good-card app-padding40">
        <div>
            <div class="flex-between-c">
                <div class="text-align-l">
                    <div @click="$emit('arrow-click', renderData)" class="flex-start-c">
                        <h5 class="name">{{ renderData.nickname }}</h5>
                        <img v-if="arrow" class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
                    </div>
                    <p class="otc-good-card-pay value">{{ renderData.pay_types | payType}}</p>
                </div>
                <div class="text-align-r">
                    <p class="lable" v-t="'otc.unitPrice'"></p>
                    <h6 class="app-size-45 primary-color otc-good-card-price">${{ renderData.price }}</h6>
                </div>
            </div>
            <div class="flex-between-c otc-good-card-num">
                <div class="text-align-l value">
                    <div>
                        <span class="lable" v-t="'otc.num'"></span>
                        {{ Number((renderData.total - renderData.filled - renderData.frozen).toFixed(4)) }}  {{renderData.coin.toUpperCase()}}
                    </div>
                    <div>
                        <span class="lable" v-t="'otc.quota'"></span> ${{ renderData.min_value }}~{{ renderData.max_value }}
                    </div>
                </div>
                <div>
                    <Button
                        @click="$emit('click', renderData)"
                        size="mini"
                        class="app-size-28"
                        :disabled="
                            renderData.uid == _userInfo.id|| Number((renderData.total - renderData.filled - renderData.frozen).toFixed(4)) === 0
                        "
                        :type="renderData.type === 2 ? 'up' : 'down'"
                    >
                        {{ renderData.type | orderSideType}}
                    </Button>
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
@import '../../../assets/less/color.less';
.otc-good-card{
    height: 269px;
    padding-top: 20px;
    .lable{
        color: #A5A5A5;
    }
    .name{
        color: #202025;
        font-size: 28px;
    }
    .value{
        font-size: 28px;
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
