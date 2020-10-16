<template>
    <img :src="getImg()" alt="">
    <!-- <img src="@/assets/img/symbol/usdt.png" alt=""> -->
</template>

<script lang="ts">
import Vue from 'vue';

// TODO 设定已有币种图标，没有的试用默认图标

export default Vue.extend({
    props: {
        symbol: String,
    },
    methods: {
        getImg() {
            return require(`@/assets/img/symbol/${this.symbol}.png`);
        },
    },
});
</script>

<style lang="less" scoped>
</style>
