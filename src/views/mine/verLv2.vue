<template>
    <div class="realname">
        <TitleHeader :title="`${$t('mine.realName')}`">
            <p class="realname-tip app-padding40">当前认证等级(LV2)</p>
            <form class="realname-form app-padding40" action="">
                <ul>
                    <li v-for="item in uploadList" :key="item.name">
                        <input type="file" @change="fileChange($event, item.name)" accept="image/*" name="" />
                        <div class="add-bg">
                            <img :src="item.img" alt="">
                            <p class="primary-color" v-show="!item.val">{{$t(item.title)}}</p>
                        </div>
                        <div class="myProgress" v-show="!!item.percent">
                            <Progress :percent="item.percent"/>
                        </div>
                    </li>
                </ul>
            </form>
            <Poptip>
                <PoptipItem>
                    {{$t('mine.verLv2Tip')}}
                </PoptipItem>
            </Poptip>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button @click="saveHandle" :disabled="!uploadList[0].val || !uploadList[1].val || !uploadList[2].val" v-t="'common.ok'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import uploadQiniu from '@/commons/upload/index';
import Progress from '../../components/Progress/index.vue';

const idcard1 = require('../../assets/img/mine/idcard1.png');
const idcard2 = require('../../assets/img/mine/idcard2.png');
const idcard3 = require('../../assets/img/mine/idcard3.png');

type data = {
    uploadList: Array<any>;
}

export default Vue.extend({
    name: 'RealName',
    components: {
        Progress,
    },
    data(): data {
        return {
            uploadList: [
                {
                    val: '',
                    title: 'mine.realName1',
                    img: idcard1,
                    name: 'idcardimg1',
                    percent: 0,
                },
                {
                    val: '',
                    title: 'mine.realName2',
                    img: idcard2,
                    name: 'idcardimg2',
                    percent: 0,
                },
                {
                    val: '',
                    title: 'mine.realName3',
                    img: idcard3,
                    name: 'idcardimg3',
                    percent: 0,
                },
            ],
        };
    },
    methods: {
        saveHandle() {
            if (this._loading) return;
            this.changeLoading(true);
            const vfy: boolean = this.$verification.fromVfi([
                {
                    type: 'empty',
                    msg: this.$t(this.uploadList[0].title),
                    value: this.uploadList[0].val,
                },
                {
                    type: 'empty',
                    msg: this.$t(this.uploadList[1].title),
                    value: this.uploadList[1].val,
                },
                {
                    type: 'empty',
                    msg: this.$t(this.uploadList[2].title),
                    value: this.uploadList[2].val,
                },
            ]);
            if (vfy) {
                const formData = new FormData();
                formData.append('pic1', this.uploadList[0].val);
                formData.append('pic2', this.uploadList[1].val);
                formData.append('pic3', this.uploadList[2].val);
                this.$api.postVerLv2(formData).then((res: any) => {
                    if (res.code === 0) {
                        this.initUserInfo();
                        this.$router.go(-1);
                    }
                }).finally(() => {
                    this.changeLoading(false);
                });
            }
        },
        fileChange(e: any, name: string) {
            const file = e.target.files[0];
            this.$compress(file).then((res: any) => {
                console.log(res);
                this.uploadList = this.uploadList.map((item) => {
                    const newItem = { ...item };
                    if (item.name === name) {
                        newItem.img = URL.createObjectURL(res);
                        newItem.val = res;
                        newItem.percent = 0;
                    }
                    return newItem;
                });
            });
        },
        uploadProgress(percent: number, name: string) {
            this.uploadList = this.uploadList.map((item: any) => {
                const res = { ...item };
                if (item.name === name) {
                    res.percent = percent;
                }
                return res;
            });
        },
        async uploadImgHandle(file: any, name: string) {
            const obj = await uploadQiniu(file, this.uploadProgress, this, name);
            if (obj.isOk) {
                this.replaceImg(file, name, obj.name);
            } else {
                // this.$normalToast('上传失败');
            }
        },
        replaceImg(file: any, name: string, val: string) {
            this.uploadList = this.uploadList.map((item) => {
                const res = { ...item };
                if (item.name === name) {
                    res.img = URL.createObjectURL(file);
                    res.val = val;
                    res.percent = 0;
                }
                return res;
            });
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
                img{
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
