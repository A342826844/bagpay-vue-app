<template>
    <transition name="fade">
        <div v-show="value" :class="`${position} ${theme}`" class="popup" @touchstart.stop="" @touchmove.stop="" @click="closePopupHandle">
            <div class="popup-body" @click.stop="">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { overflowScrolling } from '@/commons/dom/index';

export default Vue.extend({
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        position: {
            type: String,
            default: 'left',
        },

        theme: {
            type: String,
            default: 'light',
        },
        // dark light
    },
    watch: {
        value(val) {
            if (val) {
                overflowScrolling(false);
            } else {
                setTimeout(() => {
                    overflowScrolling(true);
                }, 500);
            }
        },
    },
    methods: {
        closePopupHandle() {
            this.$emit('input', false);
        },
    },
});
</script>

<style scoped lang='less'>
.popup{
    position: fixed;
    width: 200%;
    height: 100%;
    background: rgba(62, 62, 62, 0.3);
    z-index: 9999;
    transform:translateZ(1px);
    -webkit-overflow-scrolling: touch;
    &.left{
        left: 0;
        top: 0;
        .popup-body{
            left: 0;
        }
    }
    &.right{
        right: 0;
        top: 0;
        .popup-body{
            right: 0;
        }
    }
    // &.bottom{
    //     bottom: 0;
    // }
    // &.top{
    //     top: 0;
    // }
    .popup-body{
        width: 450px;
        height: 100%;
        position: absolute;
        background: #fff;
        &.left{
            left: 0;
            top: 0;
        }
        &.right{
            right: 0;
            top: 0;
        }
        &.bottom{
            bottom: 0;
        }
        &.top{
            top: 0;
        }
    }
    &.dark{
        .popup-body{
            background: #333;
        }
    }
}
.fade-enter-active, .fade-leave-active {
    transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    background-color: rgba(8, 8, 8, 0);
    /* opacity: 0; */
    &.left{
        transform: translateX(-30%);
    }
    &.right{
        transform: translateX(30%);
    }
}

</style>
