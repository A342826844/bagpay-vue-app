<template>
    <div class="mine-help-detail">
        <Headers :title="$t(title)"></Headers>
        <video webkit-playsinline data-setup='{}' :src="video[id].src" :poster="video[id].poster" controls class="video-js" >
            <source :src="video[id].src" type="video/mp4"/>
            不支持视频播放
        </video>
        <!-- <video class="video" preload src="http://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/login.mp4" controls>
            <h4>不支持视频播放</h4>
            <source src="http://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/login.mp4" type="video/mp4" />
        </video> -->
        <!-- <video
            id="my-player"
            class="video-js"
            controls
            src="../../assets/video/test10.mp4"
            data-setup='{}'>
            <source src="../../assets/video/test10.mp4" type="video/mp4" />
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
            </p>
        </video> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
   video: any;
   id: any;
   title: any;
};

// const login = require('../../assets/video/login.mp4');
// const tranfer = require('../../assets/video/tranfer.mp4');
// const otc = require('../../assets/video/otc.mp4');
const login = require('../../assets/img/mine/help-login.jpg');
const tranfer = require('../../assets/img/mine/help-tranfer.jpg');
const otc = require('../../assets/img/mine/help-otc.jpg');
const registerEn = require('../../assets/img/mine/help-register.en.png');
const tranferEn = require('../../assets/img/mine/help-tranfer.en.png');
const otc1En = require('../../assets/img/mine/help-otc1.en.png');
const otc2En = require('../../assets/img/mine/help-otc2.en.png');
const otc3En = require('../../assets/img/mine/help-otc3.en.png');

export default Vue.extend({
    name: 'HelpDetail',
    data(): data {
        return {
            id: '1',
            title: '',
            video: {
                1: {
                    src: 'https://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/register.mp4',
                    poster: login,
                },
                2: {
                    src: 'https://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/tranfer.mp4',
                    poster: tranfer,
                },
                3: {
                    src: 'https://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/otc.mp4',
                    poster: otc,
                },
                4: {
                    src: 'https://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/register.en.mp4',
                    poster: registerEn,
                },
                5: {
                    src: 'https://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/tranfer.en.mp4',
                    poster: tranferEn,
                },
                6: {
                    src: 'https://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/otc1.en.mp4',
                    poster: otc1En,
                },
                7: {
                    src: 'https://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/otc2.en.mp4',
                    poster: otc2En,
                },
                8: {
                    src: 'https://x100.oss-ap-southeast-1.aliyuncs.com/wap-bagpay/video/otc3.en.mp4',
                    poster: otc3En,
                },
            },
        };
    },
    created() {
        this.id = this.$route.query.id || '1';
        this.title = this.$route.query.title || '';
    },
});
</script>

<style lang="less" scoped>
.mine-help-detail{
    height: 100%;
}
.video-js{
    width: 100%;
    margin: 0 auto;
    height: calc(100% - 100px);
}
</style>
