<template>
    <div class="invitation">
        <Headers bold theme="primary">
            <h4 class="invitation-header-left" slot="left">
                <span class=" vertical-m">{{_userInfo.nickname}}</span>
                <img src="../../assets/img/invitation/v1.png" class="level app-img-50" alt="">
            </h4>
            <img @click="$router.push('/invitation/help')" src="../../assets/img/common/help.png" class="app-img-50" alt="">
        </Headers>
        <div class="invitation-top primary-bg app-padding40">
            <div class="flex-between-c title">
                <div @click="$router.push('/invitation/profit')">总收益(USDT)<span class="triangle-r invitation-top-triangle"></span></div>
                <div>邀请总人数</div>
            </div>
            <div class=" flex-between-c value">
                <h5 @click="$router.push('/invitation/profit')">{{extUserData.allComm}}</h5>
                <h5>{{extUserData.childCount}}</h5>
            </div>
        </div>
        <div class="invitation-body">
            <Titles theme="grey" class="invitation-body-title">邀请人数</Titles>
            <div class="invitation-body-bread text-align-l app-padding40">
                <span @click="getRenderData(0)" :class="breadLeave === 0 ? 'active-user' : 'primary-color'">直推</span>
                <span v-show="breadLeave >= 1">
                    >
                    <span @click="getRenderData(1)" :class="breadLeave === 1 ? 'active-user' : 'primary-color'">2级({{secondInfo.userName}})</span>
                </span>
                <span v-show="breadLeave >= 2">
                    >
                    <span :class="breadLeave === 2 ? 'active-user' : 'primary-color'">3级({{thressInfo.userName}})</span>
                </span>
            </div>
            <ul class=" app-padding40 invitation-body-ul">
                <!-- <li v-for="item in 15" :key="item" class=" app-padding40 li light-grey-bg">
                    <div class=" flex-between-c title">
                        <span></span>
                        <div>
                            <span class="time">17:22 10/18</span>
                            <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                        </div>
                    </div>
                    <div class=" flex-between-c value">
                        <span>料子</span>
                        <h6 class=" app-size-34">0.781238432198</h6>
                    </div>
                </li> -->
                <LiItem @click="showChildenHandle(item)" v-for="item in list" :key="item.userId">
                    <template #title>{{parentNickname}}</template>
                    <template #time>{{item.createdAt | date('yyyy-MM-dd hh:mm:ss')}}</template>
                    <template #name>{{item.userName}}</template>
                    <template #value>{{item.parentCommSum}}</template>
                </LiItem>
                <NoData v-if="!_loading && !list.length"/>
            </ul>
        </div>
        <div class="lxa-footer-bottom app-size-34 flex-around-c app-padding40">
            <!-- <Button size="auto">
                <img class="app-img-50" src="../../assets/img/common/ercode1.png" alt="">
            </Button> -->
            <template v-if="extUserData.role !== 1">
                <Button
                    v-for="item in buttons1"
                    :key="item.value"
                    size="medium"
                    @click="clickHandle(item.value)"
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
                    @click="clickHandle(item.value)"
                    :type="item.type"
                    v-t="item.title"
                ></Button>
            </div>
        </V-Popup>
        <van-dialog closeOnClickOverlay class="invitation-ercode-dialog" v-model="erCodeShow" :show-confirm-button="false">
            <div class="ercode-box">
                <div class="ercode">
                    <img
                        class="ercode-bg"
                        src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2850686694,651598194&fm=26&gp=0.jpg" alt="">
                    <div class="ercode-bottom flex-between-c">
                        <div class=" text-align-l">
                            <p class="ercode-lable">邀请码</p>
                            <h4 class="ercode-code">{{extUserData.invitCode}}</h4>
                        </div>
                        <QrcodeVue :size="68" :value="extUserData.invitCode"></QrcodeVue>
                    </div>
                </div>
            </div>
            <div class="flex-around-c">
                <Button
                    v-for="item in buttons"
                    :key="item.value"
                    @click="clickHandle(item.value)"
                    :type="item.type"
                    class="ercode-btn"
                    size="medium"
                    v-t="item.title"></Button>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import QrcodeVue from 'qrcode.vue';
import LiItem from './components/Li-item.vue';

const v1 = require('../../assets/img/invitation/v1.png');
const v2 = require('../../assets/img/invitation/v2.png');
const v3 = require('../../assets/img/invitation/v3.png');

type data = {
    erCodeShow: boolean;
    showSelect: boolean;
    buttons: Array<any>;
    buttons1: Array<any>;
    buttons2: Array<any>;
    list: Array<any>;
    extUserData: any;
    secondInfo: any;
    thressInfo: any;
    partnerType: any;
    breadLeave: 0 | 1 | 2;
}

export default Vue.extend({
    name: 'Invitation',
    components: {
        LiItem,
        QrcodeVue,
    },
    data(): data {
        return {
            erCodeShow: false,
            showSelect: false,
            extUserData: {},
            list: [],
            partnerType: '',
            breadLeave: 0, // 显示 团队等级邀请数据 0: 显示直推 2: 显示二级推广用户 3: 显示三级推广用户
            secondInfo: {},
            thressInfo: {},
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
                    value: 'link',
                },
                {
                    title: 'invitation.partnerInvit',
                    type: 'down',
                    value: 'poster',
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
    },
    created() {
        this.loadData();
    },
    methods: {
        clickHandle(value: string) {
            console.log(value);
            this.erCodeShow = !this.erCodeShow;
        },
        partnerSelect(item: any) {
            this.partnerType = item.value;
            this.showSelect = true;
        },
        loadData() {
            this.changeLoading(true);
            Promise.all([this.getExtUser(), this.getExtChildren()]).finally(() => {
                this.changeLoading(false);
            });
        },
        getExtUser() {
            return this.$api.getExtUser().then((res: any) => {
                console.log(res);
                this.extUserData = res.data;
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
            max-width: 625px;
            max-height: 1147px;
            margin: 45px auto 62px;
            padding: 20px 15px;
            background: #fff;
            box-shadow: 0px 9px 21px 0px rgba(112, 145, 255, 0.2);
            border-radius: 20px;
            .ercode{
                position: relative;
            }
            .ercode-bg{
                width: 100%;
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
