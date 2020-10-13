<template>
    <div class="payment primary-bg">
        <TitleHeader theme="dark" :title="$t('payment.paymentTitle')"/>
        <div class="payment-card">
            <h5 class="payment-card-title" v-t="'payment.paymentTip'">USDT</h5>
            <div class="payment-card-qrcode">
                <QrcodeVue class="qrcode-box" foreground="#5894EE" :size="size" :value="address"></QrcodeVue>
            </div>
            <div>
                <h5 class="payment-card-title" v-t="'payment.paymentAddr'"></h5>
                <p class="payment-card-address">3W236F536R56WR52139E5A9D592QEE595</p>
            </div>
            <div class="payment-card-btn">
                <img src="../../assets/img/common/copy.png" alt="">
                <img src="../../assets/img/common/share.png" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import QrcodeVue from 'qrcode.vue';

type data = {
    address: string;
    size: number;
}

export default Vue.extend({
    name: 'Payment',
    components: {
        QrcodeVue,
    },
    data(): data {
        return {
            address: '3W236F536R56WR52139E5A9D592QEE595',
            size: 100,
        };
    },
    created() {
        this.size = window.innerWidth * 0.42;
    },
    methods: {
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.payment{
    height: 100%;
    &-card{
        position: relative;
        margin: auto;
        margin-top: 49px;
        width: 650px;
        height: 892px;
        background: #FFFFFF;
        color: #585858;
        box-shadow: 1px 4px 13px 0px rgba(198, 194, 216, 0.5);
        border-radius: 20px;
        padding-top: 71px;
        &-title{
            font-size: 34px;
        }
        &-qrcode{
            margin: 59px 0 71px;
            .qrcode-box{
                display: inline-block;
                padding: 15px;
                .scale-1px(#98D0FF, 10px);
            }
        }
        &-address{
            margin-top: 29px;
            color: #A5A5A5;
        }
        &-btn{
            position: absolute;
            bottom: 60px;
            right: 37px;
            img{
                width: 50px;
                margin-left: 46px;
            }
        }
    }
}
</style>
