<template>
    <div class="set-payment-add">
        <TitleHeader :title="$t('payment.addAddress')" />
        <form class="set-payment-add-form app-padding40">
            <div class="form-item">
                <div class="lable" v-t="'payment.choiceAddress'"></div>
                <div @click="$router.push('/choisesymbol')" class="form-item-select app-padding40 flex-between-c">
                    <div>
                        <img class="app-img-50" :src="imgList[symbol]" alt="">
                        <span class="select-symbol vertical-m">{{symbol.toUpperCase()}}</span>
                    </div>
                    <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                </div>
            </div>
            <div class="form-item form-item-card">
                <div class="lable" v-t="'payment.chequesAddr'"></div>
                <Inputs v-model="form.address" :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`">
                    <img class="app-img-50" src="../../assets/img/common/qrcode1.png" alt="">
                </Inputs>
            </div>
            <div class="form-item">
                <div class="lable" v-t="'common.name'"></div>
                <Inputs v-model="form.password" maxlength="10" :placeholder="$t('payment.remark')"></Inputs>
            </div>
        </form>
        <div class="lxa-footer-btn">
            <Button @click="saveHandle" v-t="'common.save'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const usdt = require('../../assets/img/symbol/usdt.png');
const tusd = require('../../assets/img/symbol/tusd.png');
const usdc = require('../../assets/img/symbol/usdc.png');

type data = {
    symbol: string;
    imgList: {
        usdt: unknown;
        tusd: unknown;
        usdc: unknown;
    };
    form: {
        symbol: string;
        address: string;
        remark: string;
    };
}

export default Vue.extend({
    name: 'SetPaymentAdd',
    data(): data {
        return {
            symbol: 'tusd',
            imgList: {
                usdt,
                tusd,
                usdc,
            },
            form: {
                symbol: '',
                address: '',
                remark: '',
            },
        };
    },
    methods: {
        saveHandle() {
            // TODO
        },
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.set-payment-add{
    height: 100%;
    font-size: 34px;
    &-form{
        margin-top: 58px;
        text-align: left;
        .form-item{
            margin-top: 76px;
            &-select{
                height: 99px;
                background: #F5F7F9;
                .select-symbol{
                    margin-left: 26px;
                }
            }
            .lable{
                margin-bottom: 43px;
            }
        }
    }
}
</style>
