<template>
    <div class="entry">
        <div class="entry-banner">
            <ul :class="`active${activeTab}`">
                <li class="entry-banner-item" :class="`item${index}`" v-for="(item, index) in list" :key="index">
                    <img @click.prevent="" :src="item.img" :alt="item.title">
                    <h5 class="primary-color">{{$t(item.title)}}</h5>
                    <p>{{$t(item.tip)}}</p>
                </li>
            </ul>
        </div>
        <div v-show="activeTab === 2" class="entry-btn">
            <Button @click="$router.push('/login')" class="entry-btn-item">登录账号</Button>
            <Button @click="$router.push('/register')" class="entry-btn-item" border type="info">创建账号</Button>
        </div>
        <div v-show="activeTab !== 2" class="entry-next flex-between-c">
            <a @click="activeTab = 2" href="javascript:void(0)">跳过</a>
            <div class="entry-next-tab">
                <p class="active0"></p>
                <p class="active1"></p>
                <p class="active2"></p>
                <div class="active-tip primary-bg" :class="`active${activeTab}`"></div>
            </div>
            <!-- <img src="" alt=""> -->
            <a @click="nextHandle" href="javascript:void(0)">下一步</a>
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
    list: Array<ListItem>;
}

export default Vue.extend({
    name: 'Home',
    data(): data {
        return {
            activeTab: 0,
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
    methods: {
        nextHandle() {
            this.activeTab += 1;
        },
    },
});
</script>
<style lang="less" scoped>
.entry{
    position: relative;
    height: 100%;
    min-height: 1280px;
    &-banner{
        width: 100%;
        height: 800px;
        overflow: hidden;
        margin-top: 120px;
        &>ul{
            position: relative;
            transition: all 0.3s;
            width: 300%;
            &.active0{
                transform: translateX(0);
            }
            &.active1{
                transform: translateX(-100%);
            }
            &.active2{
                transform: translateX(-200%);
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
                    left: 100%;
                }
                &.item2{
                    left: 200%;
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
    &-next{
        padding: 0 60px 0 72px;
        position: absolute;
        bottom: 180px;
        width: 100%;
        font-size: 28px;
        &-tab{
            position: relative;
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
