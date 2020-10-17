<template>
    <div class="orders-filter" :class="[size]">
        <div v-show="title" class="orders-filter-header border-b ui-flex">
            <p>{{title}}</p>
        </div>
        <div class="orders-filter-container">
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
        size: {
            type: String,
            default: '',
        },

    },
});
</script>

<style lang="less" scoped>
.orders-filter{
    height: 100%;
    .orders-filter-header{
        padding: 0 20px 35px;
        text-align: left;
        color: #202025;
        font-size: 45px;
        line-height: 45px;
        font-weight:bold;
        height: 230px;
        align-items: flex-end;
        span{
            vertical-align: bottom;
        }
        &::after{
            content: '';
            vertical-align: bottom;
        }
    }
    &.small{
        .orders-filter-header{
            height: 178px;
        }
    }
    &-container{
        height: calc(100% - 180px);
        overflow: scroll;
        padding: 48px 28px;
    }
}
</style>
