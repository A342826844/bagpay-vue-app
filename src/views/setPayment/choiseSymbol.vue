<template>
    <div class="set-payment">
        <Headers title="选择币种"></Headers>
        <h3>TODO</h3>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    symbol: string;
}

export default Vue.extend({
    name: 'SetPayment',
    data(): data {
        return {
            symbol: 'tusd',
        };
    },
    methods: {
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.set-payment{
    height: 100%;
    overflow: scroll;
    &-body{
         margin-top: 58px;
    }
}
</style>
