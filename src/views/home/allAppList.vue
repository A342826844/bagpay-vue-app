<template>
    <div class="allapp-list">
        <TitleHeader :title="$t('common.allApp')">
            <AllApp all class="allapp-list-body"></AllApp>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AllApp from './component/AllApp.vue';

export default Vue.extend({
    name: 'AllAppList',
    components: {
        AllApp,
    },
});
</script>

<style lang="less" scoped>
.allapp-list{
    &-body{
        margin-top: 55px;
    }
}
</style>
