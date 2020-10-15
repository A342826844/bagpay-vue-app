<template>
    <p>
        <span v-show="isInportent" class="isInportent">*</span>
        <span><slot></slot></span>
    </p>
</template>

<script>
export default {
    props: {
        isInportent: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang='less' scoped>
.isInportent{
    color: #f00;
    margin-right: .6em;
    position: relative;
    top: 10px;
}
</style>
