<template>
    <div class="scan-value">
        <Headers :title="$t('common.scan')" />
        <pre class="app-padding40">{{value}}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    value: string | (string | null)[];
}

export default Vue.extend({
    name: 'Login',
    data(): data {
        return {
            value: '',
        };
    },
    created() {
        this.value = this.$route.query.value || '';
    },
});
</script>

<style lang="less" scoped>
.scan-value{
    text-align: left;
}
</style>
