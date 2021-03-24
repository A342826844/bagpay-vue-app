<template>
    <div
        class="app-title-box app-padding40 flex-between-end"
        :class="[{'border-b': border}, {'border-padding': border}, theme]"
    >
        <h3 class="t-h3">
            <template v-if="title">{{title}}</template>
            <slot></slot>
        </h3>
        <slot name="right"></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'layout',
    props: {
        title: {
            type: String,
        },
        border: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String,
            default: 'light', // light dark grey
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.app-title-box {
    background: #ffffff;
    text-align: left;
    padding-top: 62px;
    // font-weight: bold;
    .t-h3{
        color: #282828;
        line-height: 34px;
        font-size: 34px;
    }
    &.border-padding{
        padding-bottom: 28px;
    }
    &.dark{
        background: transparent;
        .t-h3{
            color: #ffffff;
        }
    }
    &.grey{
        .t-h3{
            color: #575757;
        }
    }
}
</style>
