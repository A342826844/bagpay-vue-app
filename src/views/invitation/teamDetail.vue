<template>
    <div class="invitation-profit">
        <TitleHeader title="团队详细">
            <ul class="invitation-profit-ul app-padding40">
                <LiItem @click="showChildenHandle(item)" v-for="item in list" :key="item.userId">
                    <template #title>{{userName}}</template>
                    <template #time>{{item.createdAt | date('yyyy-MM-dd hh:mm:ss')}}</template>
                    <template #name>{{item.userName}}</template>
                    <template #value>{{item.parentCommSum}}</template>
                </LiItem>
                <NoData v-if="!_loading && !list.length"/>
            </ul>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LiItem from './components/Li-item.vue';

type data = {
    list: Array<any>;
    userName: string;
    userId: number;
}

export default Vue.extend({
    name: 'Invitation',
    components: {
        LiItem,
    },
    data(): data {
        return {
            list: [],
            userName: '',
            userId: 0,
        };
    },
    created() {
        const userName = (this.$route.query.userName as string) || '';
        const userId = Number(this.$route.query.userId);
        this.$route.meta.index = 1000 + userId;
        this.init(userId, userName);
    },
    beforeRouteUpdate(to, from, next) {
        const userName = (to.query.userName as string) || '';
        const userId = Number(to.query.userId);
        // eslint-disable-next-line no-param-reassign
        to.meta.index = 1000 + userId;
        // eslint-disable-next-line no-param-reassign
        from.meta.index = 1000 + this.userId;
        this.init(userId, userName);
        next();
    },
    methods: {
        init(userId: number, userName: string) {
            this.userName = userName;
            this.userId = userId;
            this.list = [];
            this.changeLoading(true);
            this.getExtChildren(this.userId).then(() => {
                this.changeLoading(false);
            });
        },
        getExtChildren(userId?: number) {
            const params = {
                userId,
                cascade: false,
            };
            return this.$api.getExtChildren(params).then((res: any) => {
                this.list = res.data;
            });
        },
        showChildenHandle(item: any) {
            const path = `/invitation/Teamdetail?userId=${item.userId}&userName=${item.userName}`;
            this.$router.push(`${path}`);
        },
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
