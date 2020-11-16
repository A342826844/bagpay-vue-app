<template>
    <div class="all-application">
        <ul class="home-application-ul flex-warp-s">
            <li @click="applicationHandle(item)" class="li" v-for="item in renderAppList" :key="item.value">
                <img class="li-img" :src="item.img" alt="">
                <p class="li-p">{{item.title}}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const cost = require('@/assets/img/home/cost.png');
const financial = require('@/assets/img/home/financial.png');
const news = require('@/assets/img/home/news.png');
const invita = require('@/assets/img/home/invita.png');
const tranfer = require('@/assets/img/home/tranfer.png');
const allApp = require('@/assets/img/common/all-app.png');

type appItem = {
    link: string;
    isDev?: boolean;
    img: unknown;
    needLogin?: boolean;
    title: string;
    value: string;
}

type data = {
    applicationList: Array<appItem>;
    more: appItem;

}

export default Vue.extend({
    name: 'AllApp',
    props: {
        all: Boolean,
    },
    data(): data {
        return {
            applicationList: [
                {
                    link: '',
                    isDev: true,
                    img: tranfer,
                    value: 'tranfer',
                    needLogin: true,
                    title: '转账',
                },
                {
                    link: '',
                    isDev: true,
                    img: financial,
                    value: 'financial',
                    needLogin: true,
                    title: '理财',
                },
                {
                    link: '',
                    isDev: true,
                    img: news,
                    value: 'news',
                    needLogin: true,
                    title: '资讯',
                },
                {
                    link: '/invitation',
                    img: invita,
                    value: 'invita',
                    needLogin: true,
                    title: '邀请',
                },
                {
                    link: '',
                    isDev: true,
                    img: cost,
                    value: 'cost',
                    needLogin: true,
                    title: '生活缴费',
                },
            ],
            more: {
                link: '/allapplist',
                img: allApp,
                value: 'allApp',
                title: '全部',
            },
        };
    },
    computed: {
        renderAppList(): Array<appItem> {
            if (this.all) {
                return this.applicationList;
            }
            return this.applicationList.slice(0, 7).concat(this.more);
        },
    },
    methods: {
        applicationHandle(item: appItem) {
            if (item.isDev) {
                this.$dialog.alert({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('common.isdev')}`,
                });
                return;
            }
            this.$router.push(item.link);
        },
    },

});
</script>

<style lang="less" scoped>
.all-application{
    .li{
        width: 25%;
        margin-top: 22px;
        &-img{
            width: 80px;
        }
        &-p{
            margin: 20px 0;
        }
    }
}
</style>
