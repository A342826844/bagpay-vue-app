<template>
    <div @click="clickHnadle" class="app-select flex-between-c app-padding40">
        <div>
            <slot></slot>
        </div>
        <img class="app-select-img" src="@/assets/img/common/arrow_right1.png" alt="">
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Select',
    methods: {
        clickHnadle() {
            this.$emit('click');
        },
    },
});
</script>

<style scoped lang="less">
.app-select{
    width: 100%;
    height: 99px;
    background: #F5F7F9;
    border-radius: 10px;
    &-img{
        width: 80px;
    }
}
</style>
