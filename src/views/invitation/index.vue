<template>
    <div class="invitation">
        <Headers bold theme="primary">
            <h4 class="invitation-header-left vertical-m" slot="left">
                <span class=" vertical-m">{{_userInfo.nickname}}</span>
                <img src="../../assets/img/invitation/v1.png" class="level app-img-50" alt="">
            </h4>
            <img @click="$router.push('/invitation/help')" src="../../assets/img/common/help.png" class="app-img-50" alt="">
        </Headers>
        <div class="invitation-top primary-bg app-padding40">
            <div class="flex-between-c title">
                <div @click="$router.push('/invitation/profit')">
                    {{$t('invitation.allProfit')}}(USDT)
                    <span class="triangle-r invitation-top-triangle"></span>
                </div>
                <div>{{$t('invitation.invitToalP')}}</div>
            </div>
            <div class=" flex-between-c value">
                <h5 @click="$router.push('/invitation/profit')">{{extUserData.allComm}}</h5>
                <h5>{{extUserData.childCount}}</h5>
            </div>
        </div>
        <div class="invitation-body">
            <Titles theme="grey" class="invitation-body-title">{{$t('invitation.invitPeople')}}</Titles>
            <div class="invitation-body-bread text-align-l app-padding40">
                <span @click="getRenderData(0)" :class="breadLeave === 0 ? 'active-user' : 'primary-color'">{{$t('invitation.dPush')}}</span>
                <span v-show="breadLeave >= 1">
                    >
                    <span @click="getRenderData(1)" :class="breadLeave === 1 ? 'active-user' : 'primary-color'">
                        2{{$t('invitation.level')}}({{secondInfo.userName}})
                    </span>
                </span>
                <span v-show="breadLeave >= 2">
                    >
                    <span :class="breadLeave === 2 ? 'active-user' : 'primary-color'">
                        3{{$t('invitation.level')}}({{thressInfo.userName}})
                    </span>
                </span>
            </div>
            <ul class=" app-padding40 invitation-body-ul">
                <LiItem :arrow="!!item.childCount" @click="showChildenHandle(item)" v-for="item in list" :key="item.userId">
                    <template #title>{{parentNickname}}</template>
                    <template #time>{{item.createdAt | date('yyyy-MM-dd hh:mm:ss')}}</template>
                    <template #name>{{item.userName}} ({{item.childCount}})</template>
                    <template #value>{{item.parentCommSum}}</template>
                </LiItem>
                <NoData v-if="!_loading && !list.length"/>
            </ul>
        </div>
        <!-- 底部两个按钮 -->
        <div class="lxa-footer-bottom app-size-34 flex-around-c app-padding40">
            <!-- <Button size="auto">
                <img class="app-img-50" src="../../assets/img/common/ercode1.png" alt="">
            </Button> -->
            <template v-if="extUserData.role !== 1">
                <Button
                    v-for="item in buttons1"
                    :key="item.value"
                    size="medium"
                    @click="btnsClickHandle(item.value)"
                    :type="item.type"
                    v-t="item.title"
                ></Button>
            </template>
            <template v-else>
                <Button
                    v-for="item in buttons2"
                    :key="item.value"
                    size="medium"
                    @click="partnerSelect(item.value)"
                    :type="item.type"
                    v-t="item.title"
                ></Button>
            </template>
        </div>
        <!-- 一级合伙人选择按钮 -->
        <V-Popup
            position="bottom"
            :overlay-style="{ background: 'rgba(62, 62, 62, 0.3)' }"
            v-model="showSelect"
            class="select-popup app-popup-bottom"
        >
            <div class="select-popup-box flex-around-c app-padding40 app-size-34">
                <Button
                    v-for="item in buttons1"
                    :key="item.value"
                    size="medium"
                    @click="btnsClickHandle(item.value)"
                    :type="item.type"
                    v-t="item.title"
                ></Button>
            </div>
        </V-Popup>
        <!-- 海报弹框 -->
        <van-dialog closeOnClickOverlay class="invitation-ercode-dialog" v-model="erCodeShow" :show-confirm-button="false">
            <div ref="ercodeInvite" class="ercode-box">
                <swiper ref="mySwiper" v-if="posterList.length" :options="swiperOption">
                    <swiper-slide v-for="item in posterList" :key="item.id">
                        <div ref="ercode" class="ercode">
                            <img class="ercode-bg" :src="item.image" alt="">
                            <div class="ercode-bottom flex-between-c">
                                <div class=" text-align-l">
                                    <p class="ercode-lable">{{$t('login.invite_code')}}</p>
                                    <h4 @click="$copyText(invitCode)" class="ercode-code">{{invitCode}}</h4>
                                </div>
                                <QrcodeVue :size="68" :value="`${$invitationUrl}/?invit=${invitCode}`"></QrcodeVue>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class=" flex-around-c">
                <Button
                    v-for="item in buttons"
                    :key="item.value"
                    @click="clickHandle(item.value)"
                    :type="item.type"
                    class="ercode-btn"
                    size="small"
                    v-t="item.title"></Button>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import QrcodeVue from 'qrcode.vue';
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import html2canvas from 'html2canvas';
// import { browserDownload } from '@/commons/dom/index';
import LiItem from './components/Li-item.vue';

const v1 = require('../../assets/img/invitation/v1.png');
const v2 = require('../../assets/img/invitation/v2.png');
const v3 = require('../../assets/img/invitation/v3.png');
const p1 = require('../../assets/img/invitation/p1.jpg');

type data = {
    erCodeShow: boolean;
    showSelect: boolean;
    buttons: Array<any>;
    buttons1: Array<any>;
    buttons2: Array<any>;
    posterList: Array<any>;
    list: Array<any>;
    extUserData: any;
    swiperOption: any;
    secondInfo: any;
    thressInfo: any;
    invitCode: any;
    breadLeave: 0 | 1 | 2;
}

export default Vue.extend({
    name: 'Invitation',
    components: {
        LiItem,
        QrcodeVue,
        // Swiper,
        // SwiperSlide,
    },
    data(): data {
        return {
            erCodeShow: false,
            showSelect: false,
            extUserData: {},
            posterList: [{ image: p1, id: 10 }],
            list: [],
            invitCode: '',
            breadLeave: 0, // 显示 团队等级邀请数据 0: 显示直推 2: 显示二级推广用户 3: 显示三级推广用户
            secondInfo: {},
            thressInfo: {},
            swiperOption: {
                spaceBetween: 30,
            },
            buttons: [
                {
                    title: 'common.save',
                    type: 'up',
                    value: 'save',
                },
                {
                    title: 'common.share',
                    type: 'primary',
                    value: 'share',
                },
            ],
            buttons1: [
                {
                    title: 'invitation.link',
                    type: 'up',
                    value: 'link',
                },
                {
                    title: 'invitation.poster',
                    type: 'down',
                    value: 'poster',
                },
            ],
            buttons2: [
                {
                    title: 'invitation.commonInvit',
                    type: 'up',
                    value: 'common',
                },
                {
                    title: 'invitation.partnerInvit',
                    type: 'down',
                    value: 'partner',
                },
            ],
        };
    },
    computed: {
        levelImg(): any {
            if (this.extUserData.role === 0) {
                return v1;
            }
            if (this.extUserData.role === 1) {
                return v2;
            }
            if (this.extUserData.role === 2) {
                return v3;
            }
            return v1;
        },
        parentNickname(): string {
            if (this.breadLeave === 0) {
                return this._userInfo.nickname;
            }
            if (this.breadLeave === 1) {
                return this.secondInfo.userName;
            }
            if (this.breadLeave === 2) {
                return this.thressInfo.userName;
            }
            return '';
        },
        swiper(): any {
            return (this.$refs.mySwiper as any).$swiper;
        },
    },
    created() {
        this.loadData();
    },
    methods: {
        clickHandle(value: string) {
            this.erCodeShow = !this.erCodeShow;
            if (value === 'save') {
                this.saveHandle();
                return;
            }
            this.shareHandle();
        },
        // 复制链接和显示海报
        btnsClickHandle(value: any) {
            if (!this.extUserData.invitCode) return;
            this.showSelect = false;
            if (value === 'link') {
                this.$copyText(`${this.$invitationUrl}/?invit=${this.invitCode}`);
                return;
            }
            this.erCodeShow = true;
        },
        partnerSelect(value: string) {
            if (!this.extUserData.invitCode) return;
            if (value === 'common') {
                this.invitCode = this.extUserData.invitCode;
            } else {
                this.invitCode = this.extUserData.partnerInviteCode;
            }
            this.showSelect = true;
        },
        loadData() {
            this.changeLoading(true);
            Promise.all([this.getExtUser(), this.getExtChildren(), this.getCommPoster()]).finally(() => {
                this.changeLoading(false);
            });
        },
        getExtUser() {
            return this.$api.getExtUser().then((res: any) => {
                this.extUserData = res.data;
                this.invitCode = this.extUserData.invitCode;
            });
        },
        html2CanvasHnadle() {
            this.changeLoading(true);
            // const erCodeDom = (this.$refs.ercode as any)[this.swiper.activeIndex];
            const erCodeDom = (this.$refs.ercodeInvite as any);
            return html2canvas((erCodeDom as HTMLElement)).then((canvas: HTMLCanvasElement) => canvas.toDataURL('image/png'));
        },
        saveHandle() {
            this.html2CanvasHnadle().then((res: any) => {
                // if (!(window as any).plus) {
                //     browserDownload(res);
                //     return;
                // }
                this.$saveImg(res, () => {
                    this.changeLoading(false);
                    this.$normalToast(`${this.$t('common.saveSuccess')}`, 1000);
                }, () => {
                    this.changeLoading(false);
                    this.$normalToast(this.$t('common.saveFail'), 1000);
                });
            });
        },
        shareHandle() {
            this.html2CanvasHnadle().then((res: any) => {
                this.shareDataHandle(res);
            });
        },
        shareDataHandle(base64: string) {
            try {
                this.$saveImg(base64, (url: string) => {
                    this.changeLoading(false);
                    if (this.$route.name !== 'invitation') return;
                    this.$shareDataHandle({
                        type: 'image',
                        pictures: [url],
                        title: '',
                    }, () => {
                        // that.$normalToast(that.$t('invitauser.invitationSuccess'), 1000);
                    }, () => {
                        this.$normalToast(this.$t('common.invitationFail'), 1000);
                    });
                }, () => {
                    this.$normalToast(this.$t('common.invitationFail'), 1000);
                    this.changeLoading(false);
                });
            } catch (e) {
                this.changeLoading(false);
                this.$normalToast(this.$t('common.invitationFail'), 1000);
            }
        },
        getCommPoster() {
            return this.$api.getCommPoster().then((res: any) => {
                if (res.data && res.data.length) {
                    this.posterList = res.data;
                }
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
            if (!item.childCount) return;
            if (this.breadLeave === 0) {
                this.secondInfo = item;
            } else if (this.breadLeave === 1) {
                this.thressInfo = item;
            }
            if (this.breadLeave === 2) {
                this.$router.push(`/invitation/Teamdetail?userId=${item.userId}&userName=${item.userName}`);
                return;
            }
            this.breadLeave += 1;
            this.getRenderData();
        },
        getRenderData(breadLeave?: 0|1|2) {
            if (typeof breadLeave === 'number') {
                if (this.breadLeave === breadLeave) return;
                this.breadLeave = breadLeave;
            }
            let userId;
            if (this.breadLeave === 1) {
                userId = this.secondInfo.userId;
            } else if (this.breadLeave === 2) {
                userId = this.secondInfo.userId;
            }
            this.changeLoading(true);
            this.list = [];
            this.getExtChildren(userId).then(() => {
                this.changeLoading(false);
            });
        },
    },

});
</script>

<style lang="less" scoped>
.invitation{
    min-height: 100%;
    &-header-left{
        font-size: 45px;
        .level{
            margin-left: 18px;
        }
    }
    &-top{
        padding-top: 60px;
        padding-bottom: 60px;
        border-radius: 0 0 50px 50px;
        &-triangle{
            margin-left: 20px;
        }
        .title{
            font-size: 28px;
            line-height: 28px;
        }
        .value{
            font-size: 45px;
            line-height: 45px;
            height: 45px;
            margin-top: 24px;
        }
    }
    &-body{
        &-bread{
            padding-top: 46px;
            font-size: 28px;
            .active-user{
                font-weight: bold;
            }
        }
        &-ul{
            line-height: 1;
            .li{
                margin-top: 30px;
                padding-top: 28px;
                padding-bottom: 32px;
                border-radius: 10px;
                .value{
                    margin-top: 12px;
                    font-size: 28px;
                }
                .title{
                    font-size: 24px;
                }
                .time{
                    color: #A6A6A6;
                }
            }
        }
    }
    &-ercode-dialog{
        background: #fff0;
        // padding: 20px 15px;
        .ercode-box{
            width: 555px;
            // max-height: 800px;
            margin: 130px auto 62px;
            padding: 20px 15px;
            background: #fff;
            box-shadow: 0px 9px 21px 0px rgba(112, 145, 255, 0.2);
            border-radius: 20px;
            .ercode{
                position: relative;
                width: 525px;
                margin: auto;
            }
            .ercode-bg{
                width: 525px;
                // height: 1200px;
            }
            .ercode-bottom{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                background: #fff;
                padding: 40px 60px 0;
                border-radius: 80px 80px 0 0;
            }
            .ercode-lable{
                color: #B6B6B6;
                font-size: 28px;
            }
            .ercode-code{
                color: #575757;
                font-size: 45px;
                margin-top: 20px;
            }
        }
        .ercode-btn{
            margin: 0 10px 52px;
        }
    }
}
.select-popup-box{
    margin: 50px 0;
}
</style>
