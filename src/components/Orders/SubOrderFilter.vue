<template>
    <div class="orders-filter-box">
        <div class="tips">{{title}}</div>
        <div class="ui-flex flex-between flex-wrap">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        title: {
            type: String,
            default: '',
        },

    },
});
</script>

<style lang="less" scoped>
.orders-filter{
    &-box{
        .tips{
            margin: 10px 0 48px 0;
            text-align: left;
            font-size:34px;
            color:rgba(109,109,109,1);
        }
    }
}
</style>
