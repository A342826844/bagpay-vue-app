<template>
    <div class="otc-order-detail">
        <TitleHeader border title="代付款">
            <span class="red-color" slot="right">15分 56秒</span>
            <div>
                <div class="order-detail-top flex-between-c app-padding40">
                    <div class="text-align-l">
                        <p class="lable">成交总额</p>
                        <h5 class="primary-color app-size-34">$52652</h5>
                    </div>
                    <div class="text-align-l">
                        <p class="lable">成交总额</p>
                        <p class="value">$52652</p>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">成交总额</p>
                        <p>$52652</p>
                    </div>
                </div>
                <div class="order-detail-list">
                    <ul class="app-padding40">
                        <li class="app-padding40" v-for="item in 8" :key="item">
                            <div class="flex-between-c">
                                <div class="lable">单价</div>
                                <div class="primary-color">232.28   USD</div>
                            </div>
                            <div class="flex-between-c list-item-2">
                                <div class="lable">数量</div>
                                <div class="value">22356.36323 USDT</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </TitleHeader>
        <div class="app-size-34 lxa-footer-bottom flex-around-c">
            <Button :radius="false" type="cancel">取消</Button>
            <Button :radius="false">标记已支付</Button>
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
.otc-order-detail{
    background: #f8f8f8;
    height: 100%;
    overflow: scroll;
    padding-bottom: 120px;
    .order-detail{
        &-top{
            padding-top: 33px;
            padding-bottom: 39px;
            .lable{
                color: #A5A5A5;
                margin-bottom: 26px;
            }
            .value{
                color: #585858;
                font-size: 28px;
            }
        }
        &-list{
            background: #f8f8f8;
            padding-top: 28px;
            &>ul{
                &>li{
                    background: #ffffff;
                    margin-top: 28px;
                    padding-top: 43px;
                    padding-bottom: 42px;
                    font-size: 29px;
                    .lable{
                        color: #A5A5A5;
                    }
                    .value{
                        color: #343434;
                    }
                    .list-item-2{
                        margin-top: 42px;
                    }
                }
            }
        }
    }
}
</style>
