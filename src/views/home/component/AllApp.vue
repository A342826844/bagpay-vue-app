<template>
    <div class="all-application">
        <ul class="home-application-ul flex-warp-s">
            <li @click="applicationHandle(item)" class="li" v-for="item in renderAppList" :key="item.value">
                <img class="app-img-50" :src="item.img" alt="">
                <p class="li-p">{{$t(item.title)}}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

// const cost = require('@/assets/img/home/cost.png');
const red = require('@/assets/img/home/red.png');
// const financial = require('@/assets/img/home/financial.png');
// const news = require('@/assets/img/home/news.png');
const book = require('@/assets/img/home/book.png');
// const business = require('@/assets/img/home/business.png');
const invita = require('@/assets/img/home/invita.png');
// const tranfer = require('@/assets/img/home/tranfer.png');
const merchant = require('@/assets/img/common/merchant.png');
const allApp = require('@/assets/img/common/all-app.png');

type appItem = {
    link: string;
    isDev?: boolean;
    showOut?: boolean;
    img: unknown;
    needLogin?: boolean;
    title: string;
    value: string;
}

type data = {
    applicationList: Array<appItem>;
    more: appItem;
    show: boolean;

}

export default Vue.extend({
    name: 'AllApp',
    props: {
        all: Boolean,
    },
    data(): data {
        return {
            show: false,
            applicationList: [
                // {
                //     link: '/transferout?symbol=usdt',
                //     img: business,
                //     value: 'merchant',
                //     isDev: true,
                //     needLogin: true,
                //     showOut: true,
                //     title: 'common.merchant',
                // },
                {
                    link: '/invitation',
                    img: invita,
                    showOut: true,
                    value: 'invita',
                    needLogin: true,
                    title: 'common.invita',
                },
                {
                    link: '/envelope',
                    img: red,
                    value: 'envelope',
                    showOut: true,
                    needLogin: true,
                    title: 'common.redEnvelope',
                },
                // {
                //     link: '',
                //     isDev: true,
                //     img: financial,
                //     value: 'financial',
                //     needLogin: true,
                //     title: 'common.financial',
                // },
                {
                    link: '/mine/help',
                    showOut: true,
                    img: book,
                    value: 'help',
                    needLogin: true,
                    title: 'common.help',
                },
                {
                    link: '/merchant',
                    img: merchant,
                    showOut: true,
                    value: 'merchant',
                    needLogin: true,
                    title: 'common.merchant',
                },
                // {
                //     link: '',
                //     isDev: true,
                //     img: cost,
                //     value: 'cost',
                //     needLogin: true,
                //     title: 'common.cost',
                // },
            ],
            more: {
                link: '/allapplist',
                img: allApp,
                value: 'allApp',
                title: 'common.all',
            },
        };
    },
    computed: {
        renderAppList(): Array<appItem> {
            if (this.all) {
                return this.applicationList;
            }
            return this.applicationList.filter((item) => item.showOut).concat(this.more);
        },
    },
    methods: {
        applicationHandle(item: appItem) {
            if (item.value === 'cost') {
                this.show = true;
                return;
            }
            if (item.isDev) {
                this.$dialog.alert({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('common.isdev')}`,
                    confirmButtonText: `${this.$t('common.ok')}`,
                });
                return;
            }
            if (item.needLogin && !this._isLogin) {
                this.$loginRoute(item.link);
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
        width: 20%;
        margin-top: 22px;
        &-img{
            width: 80px;
        }
        &-p{
            margin: 18px 0;
        }
    }
}
</style>
