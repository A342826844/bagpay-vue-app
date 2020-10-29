<template>
    <div class="realname">
        <TitleHeader :title="`${$t('mine.realName')}`">
            <p class="realname-tip app-padding40">当前认证等级(LV3)</p>
            <form class="realname-form app-padding40" action="">
                <ul>
                    <li>
                        <input type="file" @change="fileChange($event, uploadList.name)" accept="video/*" name="" />
                        <div class="add-bg">
                            <img class="img_cont" :src="uploadList.img" alt="">
                            <Loading v-show="isoading"/>
                            <p class="primary-color">{{$t(uploadList.title)}}</p>
                        </div>
                    </li>
                </ul>
            </form>
            <div class="label_txt">请录制视频时口述以下内容：</div>
            <div class="label_cont">
                <div class="label_item">{{$t('mine.verLv3Tip1')}}</div>
                <div class="label_item">{{$t('mine.verLv3Tip2')}}</div>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Loading from '@/components/loading/index.vue';

const assetsS = require('@/assets/img/common/confirm.gif');
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
                        this.$toast({
                            message: '上传成功',
                            icon: assetsS,
                            onClose: () => {
                                this.$router.go(-1);
                            },
                        });
                    }
                }).catch(() => {
                    this.uploadList.val = '';
                    this.$normalToast('文件上传失败');
                }).finally(() => {
                    this.uploadList.title = 'mine.realName4';
                    this.isoading = false;
                });
            }
        },
        fileChange(e: any, name: string) {
            const file = e.target.files[0];
            if (file.size > 20 * 1024 * 1024) {
                this.$normalToast('文件过大，请重新选择');
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
                    this.$normalToast('文件格式错误，只支持MP4,MOV,AVI后缀视频文件');
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
    .label_txt{
        color: #3E80CA;
        text-align: left;
        padding: 80px 40px 20px;
    }
    .label_cont{
        background-color: #F4F6F9;
        margin: 0 40px 80px;
        padding: 40px;
        font-size: 28px;
        text-align: left;
        .label_item{
            line-height: 50px;
            &+.label_item{
                margin-top: 40px;
            }
        }
    }
    &-form{
        margin-top: 100px;
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
