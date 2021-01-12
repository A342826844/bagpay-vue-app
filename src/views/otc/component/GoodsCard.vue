<template>
    <div class="otc-good-card app-padding40">
        <div>
            <div class="flex-between-c">
                <div class="text-align-l">
                    <div @click="$emit('arrow-click', renderData)" class="flex-start-c">
                        <h5 class="name">{{ renderData.nickname }}</h5>
                        <img v-if="arrow" class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
                    </div>
                    <!-- <p class="otc-good-card-pay value">{{ renderData.pay_types | payType}}</p> -->
                </div>
                <div class="text-align-r">
                    <!-- <p class="lable" v-t="'otc.unitPrice'"></p>
                    <h6 class="app-size-45 primary-color otc-good-card-price">${{ renderData.price }}</h6> -->
                    <span class="lable">{{$t('otc.quota')}}($)：</span>
                    <h6 style="display: inline">{{ renderData.min_value }}~{{ renderData.max_value }}</h6>
                </div>
            </div>
            <div class="flex-between-c otc-good-card-num">
                <div class="text-align-l">
                    <p class="lable">{{$t('otc.num')}}({{renderData.coin.toUpperCase()}})</p>
                    <h6 class=" app-size-34 otc-good-card-value">
                        {{ Number((renderData.total - renderData.filled - renderData.frozen).toFixed(4)) }}
                    </h6>
                </div>
                <div class="text-align-r">
                    <p class="lable">{{$t('otc.unitPrice')}}($)</p>
                    <h6 class="primary-color app-size-34 otc-good-card-value">{{renderData.price}}</h6>
                </div>
            </div>
            <div class="flex-between-c otc-good-card-num">
                <!-- <div class="text-align-l value">
                    <div>
                        <span class="lable" v-t="'otc.num'"></span>
                        {{ Number((renderData.total - renderData.filled - renderData.frozen).toFixed(4)) }}  {{renderData.coin.toUpperCase()}}
                    </div>
                    <div>
                        <span class="lable" v-t="'otc.quota'"></span> ${{ renderData.min_value }}~{{ renderData.max_value }}
                    </div>
                </div> -->
                <div>
                    <img
                        v-for="item in renderData.pay_types.split(',')"
                        :key="item"
                        class="app-img-50 margin-r8"
                        :src="PayTypeImg[item]"
                        alt=""
                    >
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
import { PayTypeImg } from '@/commons/config';

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
    data() {
        return {
            PayTypeImg,
        };
    },
});
</script>

<style scoped lang="less">
@import '../../../assets/less/color.less';
.otc-good-card{
    // height: 269px;
    padding-top: 28px;
    padding-bottom: 28px;
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
    &-value{
        margin-top: 8px;
    }
    &-pay{
        margin-top: 8px;
    }
    &-price{
        margin-top: 15px;
    }
    &-num{
        margin-top: 15px;
        // line-height: 50px;
    }
    .margin-r8{
        margin-right: 8px;
    }
}
</style>
