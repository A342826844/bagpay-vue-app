<template>
    <div class="notice-detail">
        <TitleHeader title="公告详细">
            <div class="app-padding40">
                <div class="notice-detail-body" v-html="noticeDetail.content || '暂无公告'"></div>
                <div class="notice-detail-time text-align-r">{{noticeDetail.create_at | date('yyyy-MM-dd hh:mm:ss')}}</div>
            </div>
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
            console.log(this.$route.query.id);
        },
    },

});
</script>

<style lang="less" scoped>
.notice-detail{
    &-body{
        margin-top: 55px;
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
