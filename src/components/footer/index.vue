<template>
    <footer class="app-footer">
        <div class="ui-flex nav-boxs">
            <div
                @click="linkTo(item, index)"
                :title="item.title"
                class="flex__item nav-box"
                v-for="(item, index) in tabList"
                :key="item.name"
            >
                <img
                    class="tar-icon"
                    :src="item.name !== $route.meta.name ? item.defaultIcon : item.activeIcon "
                    :alt="item.title"
                >
                <p class="nav-label" :style="{color: item.name !== $route.meta.name ? '' : '#333333'}">{{item.title}}</p>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';

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
                    path: '/',
                    name: 'home',
                    title: '首页',
                    defaultIcon: 'homeN',
                    activeIcon: 'homeS',
                }, {
                    path: '/mine',
                    name: 'mine',
                    title: '我的',
                    needLogin: true,
                    defaultIcon: 'contractN',
                    activeIcon: 'contractS',
                },
            ],
        };
    },
    methods: {
        linkTo(item: LinkItem) {
            console.log(this.$route.name, item.name);
            if (this.$route.name === item.name) return;
            if (item.needLogin) {
                // this.$loginRoute(item.path);
                this.$router.push(item.path);
            } else {
                this.$router.push(item.path);
            }
        },
    },
});
</script>

<style scoped lang="less">
.app-footer {
    position: fixed;
    // box-shadow: 0px -2px 10px 0px rgba(203, 203, 203, 0.75);
    z-index: 100;
    width: 100%;
    height: 100px;
    background-color: #fff;
    top: calc(100% - 100px);
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
            width: 46px;
            display: inline-block;
            position: relative;
            margin: 0 auto 10px;
            text-align: center;
            top: 8px;
        }
    }
}
</style>
