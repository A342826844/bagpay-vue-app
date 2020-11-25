<template>
    <div class="mine-help">
        <TitleHeader :title="$t('mine.help')">
            <ul class="mine-help-ul">
                <li
                    @click="gotoPlay(item)"
                    v-for="item in renderList"
                    :key="item.id"
                    class="mine-help-li flex-between-c app-padding40"
                >
                    <div class="text-align-l">
                        <h3 class="title  app-size-34">{{$t(item.title)}}</h3>
                        <p class="tip">{{$t('mine.videoDetail')}}-{{$t(item.tip)}}</p>
                    </div>
                    <div><img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt=""></div>
                </li>
            </ul>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'MineHelp',
    computed: {
        renderList() {
            const zh = [{
                id: 1,
                title: 'mine.loginTutorial', // 注册登录
                type: 1, // 1 视频， 2 图片， 3 公告
                tip: 'mine.howToRegister', //
            }, {
                id: 2,
                title: 'mine.howToRecharge', // 充值提现
                type: 1, // 1 视频， 2 图片， 3 公告
                tip: 'mine.transferAssets',
            }, {
                id: 3,
                title: 'mine.otc', // otc
                type: 1, // 1 视频， 2 图片， 3 公告
                tip: 'mine.otcTrading',
            }];
            const en = [{
                id: 4,
                title: 'mine.loginTutorial', // 注册登录
                type: 1, // 1 视频， 2 图片， 3 公告
                tip: 'mine.howToRegister', //
            }, {
                id: 5,
                title: 'mine.howToRecharge', // 充值提现
                type: 1, // 1 视频， 2 图片， 3 公告
                tip: 'mine.transferAssets',
            }, {
                id: 6,
                title: 'mine.howToOtcS', // OTC出售
                type: 1, // 1 视频， 2 图片， 3 公告
                tip: 'mine.otcSell',
            }, {
                id: 7,
                title: 'mine.howToOtcB', // OTC购买
                type: 1, // 1 视频， 2 图片， 3 公告
                tip: 'mine.otcBuy',
            }, {
                id: 8,
                title: 'mine.howToOtcBuss', // OTC商家
                type: 1, // 1 视频， 2 图片， 3 公告
                tip: 'mine.otcBussiness',
            }];
            if (this.$store.state.lang === 'en') {
                return en;
            }
            return zh;
        },
    },
    methods: {
        gotoPlay(item: any) {
            this.$router.push(`/mine/helpDetail?id=${item.id}&title=${item.title}`);
            // window.location.href = 'https://ksv-video-publish.cdn.bcebo
            // s.com/005e619bd109264c584bea1e9e737d7e059a09f9.mp4?auth_key=1649904124-0-0-9b4611a824e3a5ec1c065b32850ab5a5';
        },
    },
});

</script>

<style lang="less" scoped>
@import "../../assets/less/excludecss/index.less";
.mine-help {
    &-ul{
        margin-top: 50px;
    }
    &-li{
        margin-top: 75px;
        margin-bottom: 75px;
        line-height: 50px;
    }
}
</style>
