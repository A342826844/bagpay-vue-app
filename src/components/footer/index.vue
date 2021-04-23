<template>
    <footer class="app-footer">
        <div class="ui-flex nav-boxs">
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
                <p class="nav-label" :style="{color: item.name !== $route.meta.activeName ? '' : '#333333'}">{{$t(item.title)}}</p>
            </div>
        </div>
    </footer>
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
                    title: 'footer.home',
                    defaultIcon: assetsN,
                    activeIcon: assetsS,
                }, {
                    path: '/otc/entry',
                    name: 'otcentry',
                    title: 'footer.otc',
                    defaultIcon: otcN,
                    activeIcon: otcS,
                }, {
                    path: '/mine',
                    name: 'mine',
                    title: 'footer.mine',
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
    },
});
</script>

<style scoped lang="less">
.app-footer {
    position: fixed;
    box-shadow: -1px -6px 10px 0px rgba(188, 188, 188, 0.15);
    z-index: 100;
    width: 100%;
    height: 129px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 87px 87px 0 0 ;
    top: calc(100% - 129px);
    .nav-boxs {
        align-items: center;
        height: inherit;
        position: relative;
        background: #fff;
        .nav-box {
            display: inline-block;
            min-width: 150px;
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
}
</style>
