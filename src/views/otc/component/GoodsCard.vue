<template>
    <div class="otc-good-card app-padding40 border-b">
        <div>
            <div class="flex-between-c">
                <div>
                    <div class="flex-start-c">
                        <h5 class="name">料子</h5>
                        <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
                    </div>
                    <p class="otc-good-card-pay">Huione Pay</p>
                </div>
                <div class="text-align-r">
                    <p>单价</p>
                    <h6 class="app-size-34 primary-color otc-good-card-price">$6.8950</h6>
                </div>
            </div>
            <div class="flex-between-c otc-good-card-num">
                <div class="text-align-l">
                    <div>
                        <span>数量</span> 22356.36323  USDT
                    </div>
                    <div>
                        <span>限额</span> $10.00~1020.59
                    </div>
                </div>
                <div>
                    <Button size="mini" type="up">购买</Button>
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
        msg: String,
        type: {
            type: String,
            default: 'primary', // primary, info
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        border: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'default', // small, default, large
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
        color: #333333;
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
