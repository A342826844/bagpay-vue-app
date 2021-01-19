<template>
    <div class="app-top-bar">
        <div class="ui-flex nav-boxs">
            <div class="top-bar-slot">
                <slot></slot>
            </div>
            <div class="border-divider border-l"></div>
            <div
                @click="linkTo(item, index)"
                :title="item.title"
                class="flex-item-1 nav-box"
                v-for="(item, index) in tabList"
                :key="item.name"
            >
                <img
                    class="tar-icon"
                    :src="item.name !== $route.meta.activeName ? item.defaultIcon : item.activeIcon "
                    :alt="item.title"
                >
                <!-- <p class="nav-label" :style="{color: item.name !== $route.meta.name ? '' : '#333333'}">{{item.title}}</p> -->
            </div>
            <div class="border-divider border-l"></div>
            <div class="top-bar-qr app-padding40">
                <img
                    @click="loginPath(`/scanQRCode?type=${1}`)"
                    src="../../assets/img/common/qrcode2.png"
                    alt=""
                    class="qr-img"
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const assetsN = require('@/assets/img/footer/assets_n.png');
const assetsS = require('@/assets/img/footer/assets_s.gif');
const mineN = require('@/assets/img/footer/mine_n.png');
const mineS = require('@/assets/img/footer/mine_s.gif');
const otcN = require('@/assets/img/footer/otc_n.png');
const otcS = require('@/assets/img/footer/otc_s.gif');

interface LinkItem {
    path: string;
    name: string;
    title: string;
    needLogin?: boolean;
    defaultIcon: unknown;
    activeIcon: unknown;
}

export default Vue.extend({
    name: 'HelloWorld',
    props: {
        msg: String,
    },
    data() {
        return {
            tabList: [
                {
                    path: '/home',
                    name: 'home',
                    title: 'home',
                    defaultIcon: assetsN,
                    activeIcon: assetsS,
                }, {
                    path: '/otc/entry',
                    name: 'otcentry',
                    title: 'OTC',
                    defaultIcon: otcN,
                    activeIcon: otcS,
                }, {
                    path: '/mine',
                    name: 'mine',
                    title: 'mine',
                    needLogin: true,
                    defaultIcon: mineN,
                    activeIcon: mineS,
                },
            ],
        };
    },
    methods: {
        linkTo(item: LinkItem) {
            if (this.$route.name === item.name) return;
            if (item.needLogin && !this._isLogin) {
                this.$loginRoute(item.path);
                return;
            }
            this.$router.push(item.path);
        },
        loginPath(path: string) {
            if (!this._isLogin) {
                this.$loginRoute(path);
                return;
            }
            this.$router.push(path);
        },
    },
});
</script>

<style scoped lang="less">
.app-top-bar {
    position: static;
    // box-shadow: -1px -6px 10px 0px rgba(188, 188, 188, 0.15);
    box-shadow: 0px 6px 10px 0px rgba(188, 188, 188, 0.15);
    z-index: 100;
    width: 100%;
    height: 129px;
    background-color: #fff;
    overflow: hidden;
    // border-radius: 87px 87px 0 0 ;
    // top: calc(100% - 129px);
    top: 0;
    .nav-boxs {
        align-items: center;
        height: inherit;
        position: relative;
        background: #fff;
        .nav-box {
            display: inline-block;
            // min-width: 150px;
            position: relative;
            text-align: center;
        }
        .nav-label {
            font-size: 24px;
            color: #C3C3CD;
        }
        .tar-icon{
            height: auto;
            width: 55px;
            display: inline-block;
            position: relative;
            margin: 0 auto 10px;
            text-align: center;
            top: 8px;
        }
    }
    .top-bar-slot{
        width: 220px;
        flex-grow: 0;
        flex-shrink: 0;
        // height: 100%;
    }
    .border-divider{
        height: 40px;
    }
    .top-bar-qr{
        width: 130px;
        // vertical-align: middle;
        // height: 100%;
        // &::after{
        //     content: '';
        //     display: inline-block;
        //     height: 100%;
        //     vertical-align: middle;
        // }
        flex-grow: 0;
        flex-shrink: 0;
        .qr-img{
            width: 55px;
        }
    }
}
</style>
