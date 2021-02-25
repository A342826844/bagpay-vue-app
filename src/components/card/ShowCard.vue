<template>
    <div class="show-card" :class="direction === 'column' ? '' : 'ui-flex'">
        <slot></slot>
        <slot name="slot1"></slot>
        <div
            v-show="divider"
            class="show-card-divider"
            :class="direction === 'column' ? 'border-t' : 'border-l'"></div>
        <slot name="slot2"></slot>
    </div>
</template>

<script lang="ts">
/*
    卡片
    将信息聚合在卡片容器中展示。
    包含分割线及阴影
*/
import Vue from 'vue';

export default Vue.extend({
    name: 'HelloWorld',
    props: {
        msg: String,
        direction: {
            type: String, // column / row
            default: 'column', // 自上而下布局， 分割线是水平的
        },
        divider: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
        };
    },
});
</script>

<style scoped lang="less">
.show-card{
    background: #FFFFFF;
    border-radius: 20px;
    padding: 32px;
    justify-content: space-between;
    &-divider{
        color: #EBEBEB;
        &.border-t{
            padding-bottom: 32px;
            margin-top: 32px;
        }
        &.border-l{
            padding-right: 32px;
            margin-left: 32px;
        }
    }
}
</style>
