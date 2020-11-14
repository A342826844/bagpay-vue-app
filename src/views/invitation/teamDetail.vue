<template>
    <div class="invitation-profit">
        <TitleHeader title="团队详细">
            <ul class="invitation-profit-ul app-padding40">
                <LiItem v-for="item in 15" :key="item">
                    <template #title>提现佣金</template>
                    <template #time>17:22 10/18</template>
                    <template #name>料子</template>
                    <template #value>0.781238432198</template>
                </LiItem>
            </ul>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LiItem from './components/Li-item.vue';

type data = {

}

export default Vue.extend({
    name: 'Invitation',
    components: {
        LiItem,
    },

});
</script>

<style lang="less" scoped>
.invitation-profit{
    &-ul{
        margin-top: 55px;
    }
}
</style>
