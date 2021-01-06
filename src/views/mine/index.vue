<template>
    <div class="mine">
        <div class="app-padding40 mine-header flex-between-c">
            <div>
                <h3 @click="show = true" class="mine-header-coin">
                    {{_userInfo.nickname}}
                    <img class="mine-header-edit" src="../../assets/img/mine/edit.png" alt="">
                </h3>
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
        checkNickname() {
            if (!this.nickName.trim()) return;
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
            }).finally(() => {
                done();
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
    &-header{
        font-size: 45px;
        height: 100px;
        &-coin{
            vertical-align: middle;
            display: inline-block;
        }
        &-edit{
            height: 32px;
            width: auto;
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
    .change-nickname{
        margin: 28px 0;
    }
}
</style>
