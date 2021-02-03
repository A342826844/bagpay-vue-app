<template>
    <div class="envelope">
        <img class="envelope-bg" :src="bg" alt="">
        <div class="envelope-ctx">
            <Headers ref="headers" bold theme="dark" value="红包记录"/>
            <h3 class="envelope-ctx-title">
                领取红包
            </h3>
            <h4 class="envelope-ctx-tip">
                输入口令，领取红包
            </h4>
            <div class="envelope-ctx-form">
                <div class="form-item form-item1 flex-between-c app-size-34">
                    <input class="input" v-model="cdk" placeholder="填写口令" type="text">
                    <button @click="redEnvelopeTakeForCak" class="btn primary-color">领取</button>
                </div>
                <div @click="$router.push('/envelope/send')" class="form-item form-item2">
                    <button class="form-item2-btn btn app-size-45 ">发红包</button>
                    <img src="@/assets/img/common/red-go.png" class="app-img-50" alt="">
                </div>
            </div>
        </div>
        <RedEnvelopesPopup v-model="show"></RedEnvelopesPopup>
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
}

export default Vue.extend({
    name: 'Envelope',
    data(): data {
        return {
            bg,
            title: 'aaa',
            cdk: '',
            show: false,
        };
    },
    methods: {
        redEnvelopeTakeForCak() {
            if (!this.cdk) return;
            const params = {
                cdk: this.cdk,
            };
            if (this._loading) return;
            this.changeLoading(true);
            this.$api.redEnvelopeTakeForCak(params).then((res: any) => {
                this.$router.push(`/redEnvelopeLog?id=${res.data.rid}`);
            }).finally(() => {
                this.changeLoading(false);
            });
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
</style>
