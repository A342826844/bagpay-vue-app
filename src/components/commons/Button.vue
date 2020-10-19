<template>
    <button
        @click="$emit('click')"
        :disabled="disabled"
        class="app-button"
        :class="[type, size, {disabled}, {border}, {radius}]">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'HelloWorld',
    props: {
        msg: String,
        type: {
            type: String,
            default: 'primary', // primary, info, cancel, text
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        radius: {
            type: Boolean,
            default: true,
        },
        border: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'default', // small, default, large
        },
    },
});
</script>

<style scoped lang="less">
@import '../../assets/less/color.less';
@import '../../assets/less/excludecss/index.less';
.app-button{
    border: none;
    outline: none;
    height: 99px;
    width: 662px;
    text-align: center;
    &.border{
        .scale-1px(@primary, 10px);
    }
    &.radius{
        border-radius: 10px;
    }
    &.primary{
        .primary-bg;
    }
    &.down{
        .red-bg;
    }
    &.up{
        .green-bg;
    }
    &.info{
        .info-bg;
        border-color: @primary;
    }
    &.cancel{
        color: #A6A6A6;
        background: #ffffff;
    }
    &.text{
        background: #ffffff;
        &.border{
            .scale-1px(rgba(160,160,160,1), 10px);
        }
    }
    &:disabled{
        background: #e8e8e8;
        color: #575757;
    }
    &.small{
        width: 235px;
    }
    &.mini{
        width: 186px;
        height: 70px;
    }
    &.auto{
        width: auto;
        padding: 0 45px;
    }
}
</style>
