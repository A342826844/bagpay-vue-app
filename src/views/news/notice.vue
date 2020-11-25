<template>
    <div class="notice">
        <TitleHeader :title="$t('news.noticeList')">
            <div class="app-padding40">
                <ul class="notice-ul">
                    <li
                        @click="$router.push(`/news/noticedetail?id=${item.id}`)"
                        v-for="item in list"
                        :key="item.id"
                        class="li app-padding40 light-grey-bg"
                    >
                        <div class="flex-between-c">
                            <span class="ellipsis">{{category.title}}: {{item.title}}</span>
                            <img class=" app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                        </div>
                        <div class="time text-align-l">{{item.created_at | date('yyyy-MM-dd hh:mm:ss')}}</div>
                    </li>
                </ul>
                <NoData v-if="!_loading && !list.length"></NoData>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    list: Array<any>;
    category: any;
}

export default Vue.extend({
    name: 'Notice',
    data(): data {
        return {
            list: [],
            category: {},
        };
    },
    created() {
        this.getArticleCategories();
    },
    methods: {
        getArticleCategories() {
            this.changeLoading(true);
            this.$api.getArticleCategories({ type: 1 }).then((res: any) => {
                if (res.data) {
                    return res.data[0];
                }
                throw new Error();
            }).then((res: any) => {
                const params = {
                    category: res.id,
                    offset: this.list.length,
                    limit: 10,
                };
                this.$api.getArticleList(params).then((data: any) => {
                    this.changeLoading(false);
                    if (data.data.list) {
                        this.list = data.data.list;
                        this.category = res;
                    }
                });
            }).catch(() => {
                this.changeLoading(false);
            });
        },
    },
});
</script>

<style lang="less" scoped>
.notice{
    &-ul{
        margin-top: 55px;
        font-size: 28px;
        .li{
            margin-top: 30px;
            padding-top: 28px;
            padding-bottom: 28px;
            .time{
                margin-top: 18px;
                font-size: 24px;
                color: #A6A6A6;
            }
        }
    }
    &-poptip{
        margin-top: 64px;
        font-size: 28px;
        &-item{
            margin-top: 52px;
        }
    }
}
</style>
