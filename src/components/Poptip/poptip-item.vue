<template>
    <p>
        <span v-show="isImportent" class="isImportent" :class="{ red: !notRed }">*</span>
        <span><slot></slot></span>
    </p>
</template>

<script>
export default {
    props: {
        isImportent: {
            type: Boolean,
            default: true,
        },
        notRed: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang='less' scoped>
.isImportent{
    margin-right: .6em;
    position: relative;
    top: 10px;
    &.red{
        color: #f00;
    }
}
</style>
