<template>
    <div class="set-payment-add">
        <TitleHeader :title="$t('payment.addrDetail')" />
        <form class="set-payment-add-form app-padding40">
            <div class="form-item">
                <div class="lable" v-t="'payment.choiceAddress'"></div>
                <div class="form-item-select app-padding40 flex-between-c">
                    <div>
                        <icon-img class="app-img-50" v-show="symbol" :symbol="symbol"></icon-img>
                        <span class="select-symbol vertical-m">{{symbol.toUpperCase()}}</span>
                    </div>
                </div>
            </div>
            <div class="form-item form-item-card">
                <div class="lable" v-t="'payment.chequesAddr'"></div>
                <V-Field
                    v-model="form.address"
                    rows="2"
                    autosize
                    readonly
                    :autofocus="true"
                    type="textarea"
                    maxlength="64"
                    :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`"
                    show-word-limit
                >
                <div slot="button" class="button_cont">
                    <img class="app-img-50" @click="$copyText(form.address)" src="@/assets/img/common/copy.png" alt="">
                </div>
                </V-Field>
            </div>
            <div class="form-item form-item-card" v-show="needMemo === '1'">
                <div class="lable" v-t="'payment.memoAddr'"></div>
                <Inputs v-model="form.memoAddr" readonly :placeholder="`${symbol.toUpperCase()} ${$t('payment.memoAddr')}`">
                </Inputs>
            </div>
            <div class="form-item">
                <div class="lable" v-t="'common.name'"></div>
                <Inputs v-model="form.remark" readonly maxlength="10" :placeholder="$t('payment.remark')"></Inputs>
            </div>
        </form>
        <div class="lxa-footer-btn">
            <Button @click="delHandle" v-t="'common.del'" type="down"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    symbol: string;
    needMemo: string;
    id: string;
    form: {
        address: string;
        memoAddr: string;
        remark: string;
    };
}

export default Vue.extend({
    name: 'SetPaymentEdit',
    data(): data {
        return {
            symbol: this.$route.query.symbol as string,
            needMemo: this.$route.query.needMemo as string,
            id: this.$route.query.id as string,
            form: {
                address: this.$route.query.address as string,
                memoAddr: this.$route.query.memo as string,
                remark: this.$route.query.remark as string,
            },
        };
    },
    methods: {
        delHandle() {
            this.$api.delAddr({
                id: this.id,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.$router.go(-1);
                }
            });
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
