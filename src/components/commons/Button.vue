<template>
    <button
        @click="$emit('click')"
        :disabled="disabled"
        class="app-button"
        :class="[type, size, {disabled}, {border}]"
    >
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
            default: 'primary', // primary, info
        },
        disabled: {
            type: Boolean,
            default: false,
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
    border-radius: 10px;
    height: 99px;
    width: 662px;
    text-align: center;
    &.border{
        .scale-1px(@primary, 10px);
    }
    &.primary{
        .primary-bg;
    }
    &.info{
        .info-bg;
        border-color: @primary;
    }
}
</style>
