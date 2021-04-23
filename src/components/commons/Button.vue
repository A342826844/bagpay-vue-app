<template>
    <button
        @click="$emit('click')"
        :disabled="disabled"
        class="app-button"
        :class="[type, size, shape, {disabled}, {border}, {radius}]">
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
            default: 'default', // small, default, large, fill, medium
        },
        shape: {
            type: String,
            default: '', // l-semicircle, r-semicircle
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
    height: 90px;
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
    &.reprimary{
        background: @primary;
        color: @primary-bg;
    }
    &.down{
        .red-bg;
    }
    &.up{
        .green-bg;
    }
    &.info{
        background: #FDF7EB;
        border-color: #DFC086;
    }
    &.reinfo{
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
    &.medium {
        width: 305px;
    }
    &.small{
        width: 235px;
    }
    &.fill{
        width: 100%;
    }
    &.mini{
        width: 186px;
        height: 70px;
    }
    &.micro{
        width: auto;
        height: 40px;
        padding: 0 26px;
    }
    &.auto{
        width: auto;
        padding: 0 45px;
    }
    &.l-semicircle{
        border-radius: 100px 0 0 100px;
        height: 74px;
        padding: 0 27px 0 53px;
        line-height: 74px;
    }
    &.r-semicircle{
        border-radius: 0 100px 100px 0;
        height: 74px;
        line-height: 74px;
        padding: 0 53px 0 27px;
    }
}
</style>
