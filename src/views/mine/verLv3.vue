<template>
    <div class="realname">
        <TitleHeader :title="`${$t('mine.realName')}(LV3)`">
            <!-- <p class="app-padding40 realname-tip">申请实名认证</p> -->
            <form class="realname-form app-padding40" action="">
                <ul>
                    <li>
                        <input type="file" @change="fileChange($event, uploadList.name)" accept="video/*" name="" />
                        <div class="add-bg">
                            <img class="img_cont" :src="uploadList.img" alt="">
                            <Loading v-show="isoading"/>
                            <p class="primary-color" v-show="!uploadList.val" >{{$t(uploadList.title)}}</p>
                        </div>
                    </li>
                </ul>
            </form>
            <Poptip>
                <PoptipItem>
                    {{$t('mine.verLv3Tip1')}}
                </PoptipItem>
                <PoptipItem>
                    {{$t('mine.verLv3Tip2')}}
                </PoptipItem>
            </Poptip>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Loading from '@/components/loading/index.vue';

const verlvVideo = require('../../assets/img/mine/verlv_video.png');

type data = {
    isoading: boolean;
    uploadList: any;
}

export default Vue.extend({
    name: 'RealName',
    components: {
        Loading,
    },
    data(): data {
        return {
            isoading: false,
            uploadList: {
                val: '',
                title: 'mine.realName4',
                img: verlvVideo,
                name: 'idcardimg1',
                percent: 0,
            },
        };
    },
    methods: {
        saveHandle() {
            const vfy: boolean = this.$verification.fromVfi([
                {
                    type: 'empty',
                    msg: this.$t(this.uploadList.title),
                    value: this.uploadList.val,
                },
            ]);
            if (vfy) {
                this.isoading = true;
                const formData = new FormData();
                formData.append('video', this.uploadList.val);
                this.$api.postVerLv3(formData).then((res: any) => {
                    if (res.code === 0) {
                        this.initUserInfo();
                        this.$router.go(-1);
                    }
                }).finally(() => {
                    this.uploadList.title = 'mine.realName4';
                    this.isoading = false;
                });
            }
        },
        fileChange(e: any, name: string) {
            const file = e.target.files[0];
            if (file.size > 10 * 1024 * 1024) {
                // this.$normalToast(this.$t('setting.realName.IDCartRule4'));
                return;
            }
            // 上传正确的图片格式
            const videoName = [
                'mp4',
                'MP4',
                'mov',
                'MOV',
                'avi',
                'AVI',
            ];
            if (file) {
                const str1 = file.name.split('.');
                const letn = str1.length;
                const geImg = str1[letn - 1];
                const isFlase = videoName.indexOf(geImg);
                if (isFlase !== -1) {
                    this.uploadList.title = 'mine.realName5';
                    this.uploadList.val = file;
                    this.saveHandle();
                } else {
                    // 格式
                    // this.$normalToast(this.$t('setting.realName.IDCartRule4'));
                }
            }
        },
    },
});
</script>

<style lang="less" scoped>
.realname{
    height: 100%;
    overflow: scroll;
    font-size: 34px;
    &-tip{
        margin-top: 34px;
        text-align: left;
    }
    &-form{
        margin-top: 109px;
        .form-item{
            margin-top: 30px;
        }
        &>ul{
            margin: auto;
            width: 496px;
            margin-top: 110px;
            &>li{
                position: relative;
                width: 100%;
                height: 311px;
                margin-top: 32px;
                background: url('../../assets/img/mine/idCardBor.png');
                background-size: 100% 100%;
                padding: 15px;
                .img_cont{
                    width: 100%;
                    max-width: 100%;
                    max-height: 100%;
                }
                input{
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                }
                .add-bg{
                    width: 100%;
                    height: 100%;
                    &>p{
                        position: absolute;
                        bottom: 48px;
                        left: 0;
                        right: 0;
                        margin: auto;
                    }
                }
            }
        }
    }
}
</style>
