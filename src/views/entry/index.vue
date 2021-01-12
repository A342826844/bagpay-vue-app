<template>
    <div
        @touchmove="moveHandle"
        @touchstart="startHandle"
        @touchend="endHandle"
        class="entry">
        <Headers :isBack="$route.name === 'entrylogin'">
            <span
                v-show="activeTab !== 2 && $route.name !== 'entrylogin'"
                class="primary-color"
                @click="$router.push('/home')"
            >{{$t('entry.skip')}}</span>
        </Headers>
        <!-- <div @click="$router.push('/telegramLogin')" class="entry-hide-btn"></div> -->
        <div class="entry-banner" :class="{ 'login-type': $route.name === 'entrylogin'}">
            <ul
                :class="[`active${activeTab}`]"
                :style="{
                    transform: moveIng ? bodyLeft : '',
                    'transition-duration': moveIng ? '' : '.3s'
                }"
            >
                <li class="entry-banner-item" :class="`item${index}`" v-for="(item, index) in list" :key="index">
                    <img @click.prevent="" :src="item.img" :alt="item.title">
                    <h5 v-show="$route.name !== 'entrylogin'" class="primary-color">{{$t(item.title)}}</h5>
                    <p v-show="$route.name !== 'entrylogin'">{{$t(item.tip)}}</p>
                </li>
            </ul>
        </div>
        <div v-show="activeTab === 2 && $route.name !== 'entrylogin'" class="entry-btn app-size-34">
            <Button @click="$router.push('/home')" class="entry-btn-item">{{$t('entry.letgo')}}</Button>
        </div>
        <div v-if="$route.name === 'entrylogin'" class="entry-btn app-size-34">
            <Button @click="$router.push('/login')" class="entry-btn-item">{{$t('login.loginTitle')}}</Button>
            <Button @click="$router.push('/register')" class="entry-btn-item" border type="info">{{$t('login.registerTitle')}}</Button>
        </div>
        <div v-if="$route.name === 'entrylogin' && $isServe" class="entry-third">
            <p>{{$t('common.thirdLogin')}}</p>
            <div class="entry-third-line">
                <div class="border-b"></div>
            </div>
            <div>
                <ul>
                    <li @click="$router.push('/telegramLogin')">
                        <img class="app-img-50" src="@/assets/img/common/telegram.png" alt="">
                        <p class="entry-third-title">Telegram</p>
                    </li>
                </ul>
            </div>
        </div>
        <div v-show="activeTab !== 2 && $route.name !== 'entrylogin'" class="entry-next flex-between-c">
            <span  href="javascript:void(0)"></span>
            <div class="entry-next-tab">
                <p class="active0"></p>
                <p class="active1"></p>
                <p class="active2"></p>
                <div class="active-tip primary-bg" :class="`active${activeTab}`"></div>
            </div>
            <!-- <img src="" alt=""> -->
            <span href="javascript:void(0)"></span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const banner1 = require('@/assets/img/entry/banner1.png');
const banner2 = require('@/assets/img/entry/banner2.png');
const banner3 = require('@/assets/img/entry/banner3.png');

type ListItem = {
    img: unknown;
    title: string;
    tip: string;
}

type data = {
    activeTab: number;
    moveTo: number;
    moveIng: boolean;

    beginX: number;
    beginY: number;
    beginTime: number;

    position: string;

    list: Array<ListItem>;
}

const HORIZONTAL = 'HORIZONTAL';
const VERTICAL = 'VERTICAL';

export default Vue.extend({
    name: 'Entry',
    data(): data {
        return {
            activeTab: 0,
            moveTo: 0,
            moveIng: false,

            beginX: 0,
            beginY: 0,
            beginTime: 0,

            position: '',

            list: [
                {
                    img: banner1,
                    title: 'entry.title1',
                    tip: 'entry.tip1',
                }, {
                    img: banner2,
                    title: 'entry.title2',
                    tip: 'entry.tip2',
                }, {
                    img: banner3,
                    title: 'entry.title3',
                    tip: 'entry.tip3',
                },
            ],
        };
    },
    // beforeRouteEnter(to, from, next) {
    //     next((vm: any) => {
    //         vm.$logoutHandle();
    //     });
    // },
    computed: {
        bodyLeft(): string {
            return `translateX(calc(${this.moveTo}px - ${this.activeTab * 100}vw))`;
        },
    },
    created() {
        if (this.$route.name === 'entrylogin' || localStorage.getItem('isinit')) {
            this.activeTab = 2;
        }
        localStorage.setItem('isinit', `${new Date().getTime()}`);
    },
    methods: {
        nextHandle() {
            this.activeTab += 1;
        },
        moveHandle(e: TouchEvent) {
            if (this.$route.name === 'entrylogin') return;
            if (!this.moveIng) {
                this.moveIng = true;
            }
            const moveX = e.touches[0].pageX - this.beginX;
            const moveY = e.touches[0].pageY - this.beginY;

            // 判断用户滑动方向， 让垂直滚动和水平滚动不能同时触发
            if (!this.position) {
                if (Math.abs(moveX) > Math.abs(moveY)) {
                    this.position = HORIZONTAL;
                } else {
                    this.position = VERTICAL;
                }
            }
            if (this.position === VERTICAL) return;
            // 阻止移动端的滑动默认事件
            e.stopPropagation();
            e.preventDefault();

            const width = document.documentElement.clientWidth;
            if ((this.activeTab === 0 && moveX >= width / 5) || (this.activeTab === this.list.length - 1 && moveX <= -width / 5)) {
                return;
            }
            this.moveTo = moveX;
            // if ((this.activeTab === 0 && this.moveTo >= 0) || (this.activeTab === this.list.length - 1 && this.moveTo <= 0)) {
            //     return;
            // }
        },
        endHandle() {
            this.moveIng = false;
            this.position = '';
            const endStart = new Date().getTime();

            if ((this.activeTab === 0 && this.moveTo >= 0) || (this.activeTab === this.list.length - 1 && this.moveTo <= 0)) {
                this.moveTo = 0;
                return;
            }
            const width = document.documentElement.clientWidth;
            if (Math.abs(this.moveTo) >= width / 3 || ((endStart - this.beginTime <= 300) && (Math.abs(this.moveTo) > 10))) {
                const next = this.moveTo > 0 ? -1 : 1;
                this.activeTab += next;
                this.moveTo = 0;
                return;
            }
            this.moveTo = 0;
        },
        startHandle(e: TouchEvent) {
            this.beginX = e.touches[0].pageX;
            this.beginY = e.touches[0].pageY;
            this.beginTime = new Date().getTime();
        },
    },
});
</script>
<style lang="less" scoped>
.entry{
    position: relative;
    height: 100%;
    min-height: 1280px;
    &-hide-btn{
        position: absolute;
        height: 50px;
        width: 50px;
        background: transparent;
        top: 0;
        left: 50%;
        z-index: 2000;
    }
    &-banner{
        width: 100%;
        height: 800px;
        overflow: hidden;
        margin-top: 120px;
        &.login-type{
            height: 600px;
        }
        &>ul{
            position: relative;
            transition-property: all;
            width: 300%;
            &.active0{
                transform: translateX(0);
            }
            &.active1{
                transform: translateX(-100vw);
            }
            &.active2{
                transform: translateX(-200vw);
            }
            &>li{
                position: absolute;
                width: 100vw;
                // height: 400px;
                img{
                    width: 650px;
                }
                h5{
                    font-size: 45px;
                    line-height: 1;
                }
                p{
                    margin-top: 47px;
                    font-size: 34px;
                    line-height: 1;
                }
                &.item0{
                    left: 0;
                }
                &.item1{
                    left: 100vw;
                }
                &.item2{
                    left: 200vw;
                }
            }
        }
    }
    &-btn{
        margin: 120px 0 60px;
        &-item{
            &:last-child{
                margin-top: 30px;
            }
        }
    }
    &-third{
        &-line{
            padding: 44px;
        }
        &-title{
            margin-top: 24px;
        }
    }
    &-next{
        padding: 0 60px 0 72px;
        position: absolute;
        bottom: 180px;
        width: 100%;
        font-size: 28px;
        &-tab{
            position: relative;
            width: 54px;
            &>.active-tip, &>p{
                width: 42px;
                height: 11px;
                border-radius: 6px;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                &.active0{
                    transform: translateX(-62px);
                }
                &.active1{
                    transform: translateX(0);
                }
                &.active2{
                    transform: translateX(62px);
                }
            }
            &>.active-tip{
                transition: all 0.3s;
            }
            &>p{
                display: inline-block;
                background: #EEF3FB;
                // &:nth-child(2) {
                //     margin: 0 20px;
                // }
            }
        }
    }
}
</style>
