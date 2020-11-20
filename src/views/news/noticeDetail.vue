<template>
    <div class="notice-detail">
        <TitleHeader :title="$t('news.noticeDetail')">
            <div class="app-padding40">
                <h6 class="notice-detail-title text-align-l app-size-34">{{noticeDetail.title}}</h6>
                <div class="notice-detail-body" v-html="noticeDetail.content"></div>
                <div class="notice-detail-time text-align-r">{{noticeDetail.created_at | date('yyyy-MM-dd hh:mm:ss')}}</div>
            </div>
            <NoData v-if="!_loading && !noticeDetail.content"></NoData>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    noticeDetail: any;
}

export default Vue.extend({
    name: 'NoticeDetail',
    data(): data {
        return {
            noticeDetail: {},
        };
    },
    created() {
        this.getNoticeDatail();
    },
    methods: {
        getNoticeDatail() {
            this.changeLoading(true);
            this.$api.getArticleDetail(Number(this.$route.query.id)).then((res: any) => {
                this.changeLoading(false);
                if (res.data) {
                    this.noticeDetail = res.data;
                }
            }).finally(() => {
                this.changeLoading(false);
            });
        },
    },

});
</script>

<style lang="less" scoped>
.notice-detail{
    &-title{
        margin-top: 55px;
    }
    &-body{
        margin-top: 26px;
        text-align: left;
        img{
            max-width: 100%;
        }
    }
    &-time{
        margin-top: 55px;
        font-size: 28px;
        color: #A4A4A4;
    }
}
</style>
