<template>
    <div @click="$emit('click')" class="select-popup-item border-b">
        <Button size="fill" :radius="false" type="reinfo">
            <slot></slot>
        </Button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SelectPopupItem',
    props: {
        msg: String,
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
