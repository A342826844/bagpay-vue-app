<template>
    <div class="transfer-out">
        <TitleHeader :title="`${symbol.toUpperCase()} ${$t('home.transferOut')}`">
            <img class="transfer-out-qrcode" slot="header" src="../../assets/img/common/qrcode1.png" alt="">
            <form class="transfer-out-form app-padding40">
                <div class="form-item">
                    <div class="lable" v-t="'home.chequesAddr'"></div>
                    <Inputs v-model="form.address" :placeholder="`${symbol.toUpperCase()} ${$t('home.address')}`">
                        <img class="transfer-out-assets" src="../../assets/img/home/assets.png" alt="">
                    </Inputs>
                </div>
                <div class="form-item form-item-card">
                    <div class="lable" v-t="'home.amount'"></div>
                    <Inputs class="amount-input" v-model="form.address" placeholder="0"></Inputs>
                    <div class="amount-line">
                        <div class="border-t"></div>
                    </div>
                    <Inputs class="remark-input" v-model="form.address" :placeholder="$t('home.remark')"></Inputs>
                </div>
                <div class="form-item">
                    <div class="lable" v-t="'home.password'"></div>
                    <Inputs v-model="form.password" :placeholder="$t('home.passwordTip')"></Inputs>
                </div>
                <div class="form-item">
                    <div class="lable flex-between-c">
                        <p>手续费</p>
                        <p>0.00 USDT</p>
                    </div>
                </div>
            </form>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button @click="saveHandle" v-t="'common.save'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type form = {
    address: string;
    value: string;
    password: string;
    remark: string;
}

type data = {
    symbol: string;
    form: form;
}

export default Vue.extend({
    name: 'AddSymbol',
    data(): data {
        return {
            symbol: '',
            form: {
                address: '',
                value: '',
                password: '',
                remark: '',
            },
        };
    },
    created() {
        this.symbol = (this.$route.query.symbol as string) || '';
    },
    methods: {
        addHandle() {
            // TODO
        },
        delHandle() {
            // TODO
        },
        saveHandle() {
            // TODO
        },
    },
});
</script>

<style lang="less" scoped>
.transfer-out{
    height: 100%;
    overflow: scroll;
    font-size: 34px;
    text-align: left;
    &-qrcode, &-assets{
        width: 50px;
    }
    &-form{
        padding-bottom: 150px;
        .form-item{
            margin-top: 76px;
            &:last-child{
                margin-top: 63px;
            }
            .lable{
                margin-bottom: 43px;
            }
            .amount-input{
                height: 169px;
                line-height: 169px;
                font-size: 76px;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
            .remark-input{
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
            .amount-line{
                padding: 32px 40px 0;
                background: #F5F7F9;
            }
        }
    }
}
</style>
