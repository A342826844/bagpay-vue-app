<template>
    <div class="mine">
        <TopBar v-if="_showTopBar">
            <h3 @click="showModel" class="app-padding40 text-align-l">
                <span class="ellipsis-1 ellipsis-name vertical-m app-size-45">{{_userInfo.nickname}}</span>
                <!-- <img class="mine-header-edit" src="../../assets/img/mine/edit.png" alt=""> -->
            </h3>
        </TopBar>
        <div v-if="!_showTopBar" class="app-padding40 mine-header flex-between-c">
            <div>
                <h3 @click="show = true" class="mine-header-coin">
                    <span class="ellipsis-1 mine-header-name vertical-m">{{_userInfo.nickname}}</span>
                    <img class="mine-header-edit" src="../../assets/img/mine/edit.png" alt="">
                </h3>
            </div>
        </div>
        <div v-if="_userInfo.channel === 'telegram'" class="text-align-l app-padding40 app-size-34 mine-tg-id">
            ID: <span @click="$copyText(_userInfo.telegram_id)" class="primary-color">{{_userInfo.telegram_id}}</span>
        </div>
        <div class="mine-body">
            <ul class="app-padding40">
                <li @click="goLink(item)" class="flex-between-c" v-for="item in list" :key="item.name">
                    <div class="item-left">
                        <img class="app-img-50" :src="item.img" :alt="item.title">
                        <p class="title" v-t="item.title"></p>
                    </div>
                    <div class="item-right">
                        <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
        <van-dialog
            :beforeClose="beforeClose"
            v-model="show"
            :title="$t('mine.changeNickname')"
            :confirmButtonText="$t('common.ok')"
            :cancelButtonText="$t('common.cancle2')"
            show-cancel-button
        >
            <div class="change-nickname app-padding40">
                <Inputs
                    @input="debounced"
                    clearable
                    :placeholder="$t('mine.placeNickname')"
                    v-model="nickName"
                    :error="error"
                    :errorMsg="$t('mine.existNickname')"
                />
            </div>
        </van-dialog>
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
const help = require('../../assets/img/mine/help.png');

type listItem = {
    name: string;
    img: unknown;
    title: string;
    path: string;
}

type data = {
    nickName: string;
    show: boolean;
    error: boolean;
    timer: any;
    list: Array<listItem>;
}

export default Vue.extend({
    name: 'Home',
    data(): data {
        return {
            nickName: '',
            show: false,
            error: false,
            timer: null,
            list: [
                {
                    name: 'manage',
                    img: manage,
                    title: 'payment.setPaymentTitle',
                    path: '/setpayment',
                }, {
                    name: 'payway',
                    img: pay,
                    title: 'mine.collectionSet',
                    path: '/payway',
                }, {
                    name: 'safe',
                    img: safe,
                    title: 'mine.safeSetting',
                    path: '/mine/safesetting',
                }, {
                    name: 'setting',
                    img: setting,
                    title: 'mine.systemSetting',
                    path: '/mine/systemsetting',
                }, {
                    name: 'aboutus',
                    img: aboutus,
                    title: 'mine.aboutus',
                    path: '/mine/aboutus',
                }, {
                    name: 'help',
                    img: help,
                    title: 'mine.help',
                    path: '/mine/help',
                },
            ],
        };
    },
    created() {
        this.initUserInfo();
    },
    watch: {
        show(val) {
            if (val) {
                this.$overflowScrolling(false);
            } else {
                setTimeout(() => {
                    this.$overflowScrolling(true);
                }, 500);
            }
        },
    },
    methods: {
        goLink(item: listItem) {
            this.$router.push(`${item.path}`);
        },
        showModel() {
            this.nickName = this._userInfo.nickname;
            this.show = true;
        },
        checkNickname() {
            if (!this.nickName.trim()) return;
            if (this.nickName === this._userInfo.nickname) return;
            this.$api.checkNickname({ nickName: this.nickName }).then(() => {
                this.error = false;
            }).catch(() => {
                this.error = true;
            });
        },
        debounced() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.error = false;
            this.timer = setTimeout(() => {
                this.checkNickname();
            }, 500);
        },
        confirmHandle(done: (close?: boolean) => void) {
            const nickName = this.nickName.trim();
            if (!nickName || this.error) {
                done(false);
                return;
            }
            this.$api.changeNickname({ nickName }).then(() => {
                this.$store.commit('setUserInfo', {
                    ...this._userInfo,
                    nickname: this.nickName,
                });
                this.nickName = '';
                done();
            }).catch(() => {
                done(false);
            });
        },
        beforeClose(action: string, done: () => void) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.checkNickname();
            if (action === 'confirm') {
                this.confirmHandle(done);
                return;
            }
            done();
        },
    },
});
</script>

<style lang="less" scoped>
.mine{
    .ellipsis-name{
        width: 160px;
        white-space: nowrap;
        display: inline-block;

    }
    &-header{
        font-size: 45px;
        height: 100px;
        &-coin{
            vertical-align: middle;
            display: inline-block;
        }
        &-name{
            display: inline-block;
            max-width: 500px;
            white-space: nowrap;
        }
        &-edit{
            height: 32px;
            width: auto;
        }
    }
    &-tg-id{
        margin-top: 28px;
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
    .change-nickname{
        margin: 28px 0;
    }
}
</style>
