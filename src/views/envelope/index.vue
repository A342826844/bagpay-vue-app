<template>
    <div class="envelope">
        <img class="envelope-bg" :src="bg" alt="">
        <div class="envelope-ctx">
            <Headers
                ref="headers"
                bold
                theme="dark"
                @right-click="$router.push('/envelope/logs')"
                :value="$t('envelope.logs')"
            />
            <h3 class="envelope-ctx-title">
                {{$t('envelope.receivedEnvelope')}}
            </h3>
            <h4 class="envelope-ctx-tip">
                {{$t('envelope.entryCdkForEnvelope')}}
            </h4>
            <div class="envelope-ctx-form">
                <div class="form-item form-item1 flex-between-c app-size-34">
                    <input class="input" v-model="cdk" :placeholder="$t('envelope.entryCdk')" type="text">
                    <button @click="getRedEnvelopeForCdk" class="btn primary-color">{{$t('envelope.received')}}</button>
                </div>
                <div @click="$router.push('/envelope/send')" class="form-item form-item2">
                    <button class="form-item2-btn btn app-size-45 ">{{$t('envelope.sendEnvelope')}}</button>
                    <img src="@/assets/img/common/red-go.png" class="app-img-50" alt="">
                </div>
            </div>
        </div>
        <RedEnvelopesPopup
            :dataInfo="dataInfo"
            v-model="show"
            :type="popupType"
            @open="openHnadle"
            @look-log="lookHandle"
            ref="redPopup"
        ></RedEnvelopesPopup>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const bg = require('@/assets/img/envelope/bg.jpg');

type data = {
    bg: any;
    title: string;
    show: boolean;
    cdk: string;
    popupType: number;
    dataInfo: any;
}

export default Vue.extend({
    name: 'Envelope',
    data(): data {
        return {
            bg,
            title: 'aaa',
            cdk: '',
            show: false,
            popupType: 1,
            dataInfo: {},
        };
    },
    methods: {
        redEnvelopeTakeForCdk() {
            if (!this.cdk.trim()) return;
            let cdk = this.$getRedEnvelopeCdk(this.cdk);
            cdk = cdk || this.cdk;
            const params = {
                cdk: cdk.trim(),
            };
            if (this._loading) return;
            this.changeLoading(true);
            this.$api.redEnvelopeTakeForCdk(params, { errMsg: this.$t('envelope.invalidCdk') }).then((res: any) => {
                this.$router.push(`/envelope/detail?id=${res.data.rid}`);
            }).finally(() => {
                this.changeLoading(false);
            });
        },
        getRedEnvelopeForCdk() {
            if (!this.cdk.trim()) return;
            let cdk = this.$getRedEnvelopeCdk(this.cdk);
            cdk = cdk || this.cdk;
            const params = {
                cdk: cdk.trim(),
            };
            if (this._loading) return;
            this.changeLoading(true);
            this.$api.getRedEnvelopeForCdk(params).then((res: any) => {
                this.dataInfo = res.data;
                this.show = true;
            }).finally(() => {
                this.changeLoading(false);
            });
        },
        openHnadle() {
            this.$api.redEnvelopeTakeForId(this.dataInfo.rid || this.dataInfo.id, { hideErrMsg: true }).then(() => {
                // this.$router.push(`/envelope/detail?id=${res.data.rid}`);
                setTimeout(() => {
                    this.lookHandle();
                }, 1000);
                this.show = false;
            }).catch((err: any) => {
                setTimeout(() => {
                    if (err.message === 'ERR_ALREADY_TOOK') {
                        this.popupType = 3;
                    }
                    if (err.message === 'ERR_HAS_NONE') {
                        this.popupType = 2;
                    }
                }, 1500);
            });
        },
        lookHandle() {
            (this.$refs.redPopup as any).stopHandle();
            this.$router.push(`/envelope/detail?id=${this.dataInfo.rid || this.dataInfo.id}`);
        },
    },
});
</script>

<style lang="less" scoped>
.envelope{
    position: relative;
    background: #d73b3c;
    min-height: 100%;
    &-bg{
        width: 100%;
    }
    &-ctx{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &-title{
            margin-top: 280px;
            font-size: 135px;
            font-weight: bold;
            font-family: Alibaba PuHuiTi;
            color: #FFFFFF;
            text-shadow: 0px 8px 13px rgba(241, 33, 27, 0.43);
        }
        &-tip{
            margin-top: 338px;
            font-size: 40px;
            font-weight: 900;
            color: #EF2B31;
            background: linear-gradient(0deg, #FADA26 0%, #FFF8E1 100%);
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        &-form{
                margin-top: 100px;
            .form-item{
                width: 567px;
                margin: 0 auto;
                height: 100px;
                background: linear-gradient(0deg, #F8C136  0%, #FFEFBE 100%);
                border-radius: 50px;
            }
            .form-item1{
                background: #FFFFFF;
                // color: #BABABA;
            }
            .input, .btn{
                height: 100%;
                background: transparent;
                line-height: 100%;
                text-align: left;
                padding-left: 60px;
            }
            .input{
                flex: 1;
                min-width: 100px;
            }
            .btn{
                padding-right: 48px;
            }
            .form-item2 {
                margin-top: 65px;
            }
            .form-item2-btn{
                color: #EF2B31;

            }
        }
    }
}
.en{
    .envelope-ctx-title{
        font-size: 100px;
    }
    .envelope-ctx-tip{
        margin: auto;
        margin-top: 180px;
        width: 450px;
        text-align: center;
    }
    .envelope-ctx-form{
        margin-top: 30px;
    }
}
</style>
