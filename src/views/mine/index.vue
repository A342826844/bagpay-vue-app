<template>
    <div class="mine">
        <div class="app-padding40 mine-header flex-between-c">
            <div>
                <h3 class="mine-header-coin">{{_userInfo.nickname}}</h3>
            </div>
            <div>
                <!-- <img class="app-img-50" src="../../assets/img/common/qrcode1.png" alt=""> -->
            </div>
        </div>
        <div class="mine-body">
            <ul class="app-padding40">
                <li @click="goLink(item)" class="flex-between-c" v-for="item in list" :key="item.name">
                    <div class="item-left">
                        <img class="app-img-50" :src="item.img" :alt="item.title">
                        <p class="title">{{item.title}}</p>
                    </div>
                    <div class="item-right">
                        <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const manage = require('../../assets/img/mine/manage.png');
const pay = require('../../assets/img/mine/pay.png');
const safe = require('../../assets/img/mine/safe.png');
const setting = require('../../assets/img/mine/setting.png');
// const feedback = require('../../assets/img/mine/feedback.png');
const aboutus = require('../../assets/img/mine/aboutus.png');

type listItem = {
    name: string;
    img: unknown;
    title: string;
    path: string;
}

type data = {
    list: Array<listItem>;
}

export default Vue.extend({
    name: 'Home',
    data(): data {
        return {
            list: [
                {
                    name: 'manage',
                    img: manage,
                    title: `${this.$t('payment.setPaymentTitle')}`,
                    path: '/setpayment',
                }, {
                    name: 'payway',
                    img: pay,
                    title: `${this.$t('mine.collectionSet')}`,
                    path: '/payway',
                }, {
                    name: 'safe',
                    img: safe,
                    title: `${this.$t('mine.safeSetting')}`,
                    path: '/mine/safesetting',
                }, {
                    name: 'setting',
                    img: setting,
                    title: `${this.$t('mine.systemSetting')}`,
                    path: '/mine/systemsetting',
                }, {
                    name: 'aboutus',
                    img: aboutus,
                    title: `${this.$t('mine.aboutus')}`,
                    path: '/mine/aboutus',
                },
                // {
                //     name: 'feedback',
                //     img: feedback,
                //     title: '意见反馈',
                //     path: '/mine/feedback',
                // },
            ],
        };
    },
    created() {
        this.initUserInfo();
    },
    methods: {
        goLink(item: listItem) {
            this.$router.push(`${item.path}`);
        },
    },
});
</script>

<style lang="less" scoped>
.mine{
    &-header{
        font-size: 45px;
        height: 100px;
        &-coin{
            vertical-align: middle;
            display: inline-block;
        }
    }
    &-body{
        margin-top: 32px;
        box-shadow: 0 -18px 29px 0px rgba(188, 188, 188, 0.15);
        border-radius: 100px 100px 0 0;
        padding-top: 40px;
        &>ul{
            &>li{
                height: 125px;
                .title{
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 40px;
                    font-size: 34px;
                }
            }
        }
    }
}
</style>
