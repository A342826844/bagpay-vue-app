<template>
    <div class="payment primary-bg">
        <TitleHeader theme="dark" :title="$t('payment.paymentTitle')"/>
        <div class="payment-card">
            <h5 class="payment-card-title">{{$t('payment.paymentTip') + symbol.toUpperCase()}}</h5>
            <div class="payment-card-qrcode" :style="{width: `${size + 15}px`, height: `${size + 15}px`}">
                <Loading v-show="!address"/>
                <QrcodeVue v-show="address" foreground="#5894EE" :size="size" :value="address"></QrcodeVue>
            </div>
            <div>
                <h5 class="payment-card-title" v-t="'payment.paymentAddr'"></h5>
                <p class="payment-card-address">{{address}}</p>
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
import Loading from '@/components/loading/index.vue'; // @ is an alias to /src

type data = {
    address: string;
    symbol: string;
    size: number;
}

export default Vue.extend({
    name: 'Payment',
    components: {
        QrcodeVue,
        Loading,
    },
    data(): data {
        return {
            address: '',
            symbol: '',
            size: 100,
        };
    },
    created() {
        this.size = window.innerWidth * 0.42;
        this.symbol = this.$route.query.symbol as string;
        this.getDeposit();
    },
    methods: {
        getDeposit() {
            this.$api.getDeposit({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.data) {
                    this.address = res.data.address;
                }
            });
        },
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
            display: inline-block;
            padding: 15px;
            .scale-1px(#98D0FF, 10px);
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
