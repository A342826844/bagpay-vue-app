<template>
    <div @scroll.capture="scrollLoad" class="invitation-profit">
        <TitleHeader :title="$t('invitation.commDetail')">
            <ul class="invitation-profit-ul app-padding40">
                <LiItem v-for="item in list" :key="item.id">
                    <template #title>{{item.commType | invitaCommTypeTeam}}</template>
                    <template #time>{{item.createdAt | date('yyyy-MM-dd hh:mm:ss')}}</template>
                    <template #name>{{item.childNickname}}</template>
                    <template #value>{{item.amount | toNonExponential}} {{item.coin && item.coin.toUpperCase()}}</template>
                </LiItem>
                <p class="content-list-nodata gray-color" v-show="!_loading && isEnd">
                    {{$t('common.noMore')}}
                </p>
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
    page: number;
    size: number;
    isEnd: boolean;
    loadMore: boolean;
}

export default Vue.extend({
    name: 'Invitation',
    components: {
        LiItem,
    },
    data(): data {
        return {
            list: [],
            page: 1,
            size: 10,
            isEnd: false,
            loadMore: false,
        };
    },
    created() {
        this.getCommDetail();
    },
    methods: {
        scrollLoad(event: Event) {
            const scroll = (event.target as HTMLElement);
            const { scrollTop, scrollHeight, clientHeight } = scroll;
            if ((clientHeight + scrollTop > scrollHeight - 100) && (clientHeight + scrollTop !== scrollHeight) && !this.loadMore && !this.isEnd) {
                this.loadMore = true;
                this.getCommDetail();
            }
        },
        getCommDetail() {
            const params = {
                currentPage: this.page,
                pageNum: this.size,
            };
            this.changeLoading(true);
            this.$api.getCommDetail(params).then((res: any) => {
                this.loadMore = false;
                if (res.data.list) {
                    this.list = this.list.concat(res.data.list);
                }
                if (this.list.length >= res.data.total) {
                    this.isEnd = true;
                } else {
                    this.page += 1;
                }
            }).finally(() => {
                this.changeLoading(false);
            });
        },
    },

});
</script>

<style lang="less" scoped>
.invitation-profit{
    height: 100%;
    overflow: scroll;
    &-ul{
        margin-top: 55px;
    }
}
</style>
