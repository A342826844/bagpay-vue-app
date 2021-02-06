<template>
    <V-Popup class="red-envelopes-popup" v-model="show" get-container="#app">
        <img class="envelopes-popup-bg" src="@/assets/img/envelope/1.png" alt="">
        <div class="ctx">
            <div class="ctx-info">
                <!-- <div><img src="" alt=""></div> -->
                <h5 class="sender app-size-45">{{dataInfo.sender}} <span class="tag"></span></h5>
                <div class="mark ">{{dataInfo.text}}</div>
            </div>
            <div class="open">
                 <div v-show="type === 1" @click="openHandle" class="container" :class="rotate ? 'animation-c' : ''">
                    <div class="back">
                        <img src="@/assets/img/envelope/02.png" alt="">
                    </div>
                    <div class="middle1"></div>
                    <div class="middle"></div>
                    <div class="middle2"></div>
                    <div class="front">
                        <img src="@/assets/img/envelope/01.png" alt="">
                    </div>
                </div>
                <div v-show="type === 2">
                    {{$t('envelope.sentOut')}}
                </div>
                <div v-show="type === 3">
                    {{$t('envelope.isReady')}}
                </div>
            </div>
            <div @click="$emit('look-log')" class="bottom">{{$t('envelope.lookLuck')}} ></div>
        </div>
        <div class="popup-close1">
            <img @click="show = false" class="app-img-50" src="@/assets/img/common/close1.png" alt="">
        </div>
    </V-Popup>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    show: boolean;
    rotate: boolean;
};

export default Vue.extend({
    name: 'RedEnvelopesPopup',
    props: {
        value: {
            type: Boolean,
        },
        dataInfo: {
            type: Object,
            default() {
                return {};
            },
        },
        type: {
            type: Number,
            default: 1,
        },
    },
    data(): data {
        return {
            show: false,
            rotate: false,
        };
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
        openHandle() {
            this.rotate = true;
            this.$emit('open');
        },
        stopHandle() {
            this.rotate = false;
        },
    },
});
</script>

<style scoped lang="less">
.red-envelopes-popup{
    background: transparent;
    .envelopes-popup-bg{
        width: 500px;
    }
    .ctx{
        // height: 660px;
        // width: 526px;
        // background: #fb573b;
        color: #fff;
        border-radius: 10px;
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
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
            .mark{
                margin-top: 20px;
            }
        }
        .open{
            padding-top: 50px;
            height: 300px;
            position: relative;
        }
        .container {
            width: 200px;
            height: 200px;
            margin-left: -100px;
            margin-top: -100px;
            position: absolute;
            border-radius: 50%;
            top: 56%;
            left: 50%;
            transform-style: preserve-3d;
            perspective: 800px;
            // perspective-origin: 10px 100px;
            transform: rotateY(0deg);
            // transform: rotateZ(100deg);
        }
        .animation-c{
            animation: spin 1.5s linear infinite;
        }
        .back, .front{
            color: #fff;
            font-size: 45px;
            font-weight: bold;
            line-height: 180px;
            img{
                width: 100%;
            }
        }
        .back {
            background: #fc2e20;
            // background-image: url("硬币背面图.jpg");
            width: 200px;
            border-radius: 50%;
            height: 200px;
            transform: rotateY(180deg);
        }
        .middle{
            width: 15px;
            height: 202px;
            background: #dcb187;
            position: absolute;
            transform: rotateY(90deg) translateX(-8px);
            top: -1px;
            left: 0;
            right: 0;
            margin: auto;
            border-radius: 20px;
        }
        .middle1 {
            background: #dcb187;
            width: 200px;
            height: 200px;
            position: absolute;
            transform: translateZ(1px);
            top: 0;
            border-radius: 50%;
        }
        .middle2 {
            background: #dcb187;
            width: 200px;
            height: 200px;
            position: absolute;
            transform: translateZ(9px);
            top: 0;
            border-radius: 50%;
        }
        .front {
            background: #ffe135;
            height: 200px;
            position: absolute;
            top: 0;
            transform: translateZ(15px);
            width: 200px;
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
            bottom: 102px;
            color: #FFFFFF;
            text-align: center;
            margin: auto;
            left: 0;
            right: 0;
        }
    }
    .popup-close1{
        margin-top: 20px;
    }
}
</style>
