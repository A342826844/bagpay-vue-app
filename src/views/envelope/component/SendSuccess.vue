<template>
    <V-Popup
        class="send-success"
        v-model="show"
        :overlay-style="{ background: 'rgba(62, 62, 62, 0.3)' }"
        @click-overlay="closedHandle"
    >
        <div class="send-success-info">
            <img class="send-success-bg" src="@/assets/img/envelope/send-s.png" alt="">
            <div class="send-success-box">
                <h5 class="send-success-tip text-fill">{{$t('envelope.envelopeIsReady')}}</h5>
                <p class="send-success-cdk text-fill ellipsis-1">{{dataInfo.cdk}}</p>
                <div @click="$copyText($setRedEnvelopeCdk(dataInfo.cdk))" class="send-success-btn">
                    <span class="form-item2-btn btn app-size-45 ">{{$t('envelope.copyCdk')}}</span>
                </div>
                <div @click="shareHandle(dataInfo.cdk)" class="send-success-btn">
                    <span class="form-item2-btn btn app-size-45 ">{{$t('envelope.shareCdk')}}</span>
                </div>
            </div>
        </div>
        <div>
            <img @click="closedHandle" class="app-img-50" src="@/assets/img/common/close1.png" alt="">
        </div>
    </V-Popup>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    show: boolean;
}

export default Vue.extend({
    name: 'EnvelopeSendSuccess',
    props: {
        dataInfo: {
            type: Object,
            default() {
                return {};
            },
        },
        value: {
            type: Boolean,
        },
    },
    data(): data {
        return {
            show: false,
        };
    },
    computed: {
        cdk(): string {
            return '';
        },
    },
    watch: {
        show(val) {
            if (val !== this.value) {
                this.$emit('input', val);
            }
        },
        value(val) {
            if (val !== this.show) {
                this.show = val;
            }
        },
    },
    methods: {
        shareHandle(cdk: string) {
            const content = this.$setRedEnvelopeCdk(cdk);
            this.$shareDataHandle({
                content,
                type: 'text',
            }, () => {
                // that.$normalToast(that.$t('invitauser.invitationSuccess'), 1000);
            }, () => {
                this.$normalToast(this.$t('common.invitationFail'), 1000);
            });
        },
        testHandle() {
            this.$getRedEnvelopeCdk('请前往BagPay钱包输入口令👉这是领取红包的口令👈领取红包 https://bagpay.io/');
        },
        closedHandle() {
            this.show = false;
            if (this.$route.name === 'envelopeDetail') {
                this.$emit('update');
                return;
            }
            this.$router.replace(`/envelope/detail?id=${this.dataInfo.id}`);
        },
    },
});
</script>

<style lang="less" scoped>
.send-success{
    background: transparent;
    &-bg{
        width: 750px;
    }
    &-info{
        position: relative;
    }
    &-box{
        position: absolute;
        top: 600px;
        margin: 0 auto;
        left: 0;
        right: 0;
    }
    .text-fill{
        color: #FADA26 ;
        background: linear-gradient(0deg, #FADA26 0%, #FFF8E1 100%);
        background-clip: text;
        font-weight: 900;
        -webkit-text-fill-color: transparent;
    }
    &-tip{
        // margin-top: 338px;
        font-size: 40px;
        padding-bottom: 20px;
    }
    &-cdk{
        // margin-top: 338px;
        font-size: 40px;
        // padding-bottom: 60px;
    }
    &-btn{
        width: 567px;
        margin: 48px auto;
        height: 100px;
        color: #EF2B31;
        line-height: 100px;
        background: linear-gradient(0deg, #F8C136  0%, #FFEFBE 100%);
        border-radius: 50px;
    }
}
.en .send-success-tip{
    font-size: 32px;
}
</style>
