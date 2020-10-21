<template>
    <V-Pull-Refresh
        v-model="isLoading"
        class="app-pull-refresh"
        @refresh="onRefresh"
        :pulling-text="$t('refresh.pulling')"
        :loosing-text="$t('refresh.loosing')"
        :loading-text="$t('refresh.loading')"
    >
        <div class="com-refresh-loading" slot="loading">
            <Loading :loading="true" type="component"></Loading>
        </div>
        <slot></slot>
    </V-Pull-Refresh>
</template>

<script lang="ts">
import Vue from 'vue';
import Loading from '@/components/loading/index.vue'; // @ is an alias to /src

export default Vue.extend({
    name: 'layout',
    components: {
        Loading,
    },
    props: {
        msg: String,
        value: Boolean,
    },
    data() {
        return {
            isLoading: false,
        };
    },
    watch: {
        value(value) {
            if (value !== this.isLoading) {
                this.isLoading = value;
            }
        },
        isLoading(value) {
            if (value !== this.value) {
                this.$emit('input', value);
            }
        },
    },
    methods: {
        onRefresh(...arg: any[]) {
            this.$emit('refresh', arg);
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.app-pull-refresh{
    min-height: calc(100vh - 300px);
    .com-refresh-loading{
        height: 50px;
    }
    .van-pull-refresh__track{
        min-height: calc(100vh - 300px);
    }
}
</style>
