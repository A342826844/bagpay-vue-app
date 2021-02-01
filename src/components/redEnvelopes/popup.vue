<template>
    <V-Popup class="red-envelopes-popup" v-model="show" get-container="#app">
        <div class="ctx">
            <div class="ctx-close">+</div>
            <div class="ctx-info">
                <!-- <div><img src="" alt=""></div> -->
                <div class="sender">一个King <span class="tag"></span></div>
                <div class="mark">恭喜发财，万事如意</div>
            </div>
            <div class="open">
                 <div class="container">
                    <div class="back">反</div>
                    <div class="middle1"></div>
                    <div class="middle"></div>
                    <div class="middle2"></div>
                    <div class="front">正</div>
                </div>
            </div>
            <div class="bottom">看看朋友手气 ></div>
        </div>
    </V-Popup>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    show: boolean;
};

export default Vue.extend({
    name: 'RedEnvelopesPopup',
    props: {
        value: {
            type: Boolean,
        },
    },
    data(): data {
        return {
            show: false,
        };
    },
    watch: {
        show(val) {
            if (val !== this.value) {
                console.log('show', val);
                this.$emit('input', val);
            }
        },
        value(val) {
            if (val !== this.show) {
                console.log('value', val);
                this.show = val;
            }
        },
    },
});
</script>

<style scoped lang="less">
.red-envelopes-popup{
    background: transparent;
    .ctx{
        height: 660px;
        width: 526px;
        background: #fb573b;
        color: #fff;
        border-radius: 10px;
        position: relative;
        &-close{
            width: 50px;
            position: absolute;
            right: 0;
            top: 0;
            font-size: 50px;
            font-weight: 100;
            transform: rotateZ(45deg);
        }
        &-info{
            padding-top: 80px;
            font-size: 32px;
            .mark{
                margin-top: 20px;
            }
        }
        .container {
            width: 150px;
            height: 150px;
            margin-left: -75px;
            margin-top: -75px;
            position: absolute;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform-style: preserve-3d;
            transform: rotateY(0deg);
            animation: spin 2.5s linear infinite;
        }
        .back, .front{
            color: #fff;
            font-size: 45px;
            font-weight: bold;
            line-height: 140px;
        }
        .back {
            background: #fc2e20;
            // background-image: url("硬币背面图.jpg");
            width: 150px;
            border-radius: 50%;
            height: 150px;
            transform: rotateY(180deg);
        }
        .middle{
            width: 12px;
            height: 150px;
            background: #dcb187;
            position: absolute;
            transform: rotateY(45deg) translateZ(6px);
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            border-radius: 20px;
        }
        .middle1 {
            background: #dcb187;
            width: 150px;
            height: 150px;
            position: absolute;
            transform: translateZ(1px);
            top: 0;
            border-radius: 50%;
        }
        .middle2 {
            background: #dcb187;
            width: 150px;
            height: 150px;
            position: absolute;
            transform: translateZ(9px);
            top: 0;
            border-radius: 50%;
        }
        .front {
            background: #ffe135;
            height: 150px;
            position: absolute;
            top: 0;
            transform: translateZ(10px);
            width: 150px;
            border-radius: 50%;
        }
        @keyframes spin {
            0% {
                transform: rotateY(0deg);
            }
            100% {
                transform: rotateY(360deg);
            }
        }
        .bottom{
            position: absolute;
            bottom: 40px;
            color: #dcb187;
            text-align: center;
            margin: auto;
            left: 0;
            right: 0;
        }
    }
}
</style>
