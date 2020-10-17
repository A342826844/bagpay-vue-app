<template>
    <Button
        @click="$emit('click')"
        class="orders-filter-item"
        size="mini"
        border
        :type="active ? 'primary' : 'text'"
    >
        <slot></slot>
    </Button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        active: {
            type: Boolean,
        },
    },
});
</script>

<style lang="less" scoped>
.orders-filter-item{
    margin-bottom: 38px;
}
</style>
