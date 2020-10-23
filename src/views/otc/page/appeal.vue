<template>
    <div class="otc-appeal">
        <TitleHeader :title="'订单申诉'" />
        <form class="app-padding40 app-size-34" action="">
            <div class="form-item">
                <div class="lable">申述类型</div>
                <Select @click="selectPopup = !selectPopup">{{ form.type | otcAppealType}}</Select>
            </div>
            <div class="form-item">
                <div class="lable">申诉原因</div>
                <Inputs cols="30" rows="10" type="textarea" v-model="form.content"></Inputs>
            </div>
            <div class="form-item">
                <div class="lable">上传图片凭证</div>
                <V-Uploader :max-count="3" v-model="fileList" multiple></V-Uploader>
            </div>
        </form>
        <div class="app-size-34 lxa-footer-btn flex-around-c">
            <Button @click="submitHandle" >确定</Button>
        </div>
        <SelectPopup v-model="selectPopup">
            <SelectPopupItem
                v-for="item in OtcAppealType"
                :key="item"
                @click="selectAppealType(item)"
            >
                {{item | otcAppealType}}
            </SelectPopupItem>
        </SelectPopup>
    </div>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { OtcAppealType } from '@/commons/config/index';

export default Vue.extend({
    name: 'OtcSubmit',
    data() {
        return {
            OtcAppealType,
            upload: '',
            id: '',
            percent: 0,
            selectPopup: false,
            disabled: true,
            images: [],
            form: {
                content: '',
                type: 1,
            },
            fileList: [],
        };
    },
    methods: {
        submitHandle() {
            console.log('submitHandle');
        },
        selectAppealType(item: number) {
            console.log(item);
            this.form.type = item;
        },
        // afterRead(file: any) {
        //     console.log(file, 'afterRead');
        //     // 通过 status 属性可以标识上传状态，uploading 表示上传中，failed 表示上传失败，done 表示上传完成。
        //     file.status = 'uploading';
        // },
        otcAppealSubmit() {
            const params = {
                deal_id: this.id, // [string] 订单id
                type: this.form.type, // [OtcAppealType] 问题类型
                content: this.form.content, // [string] 总是描述
                images: this.images.join(','), // [string] 申诉图片,逗号分隔
            };
            this.$api.otcAppealSubmit(params).then((res: any) => {
                console.log(res);
            });
        },
        textareaInput() {
            console.log('textareaInput');
        },
        showImgHandle() {
            console.log('showImgHandle');
        },
        fileChange() {
            console.log('fileChange');
        },
    },
});
</script>
<style lang="less" scoped>
.otc-appeal{
    height: 100%;
    padding-bottom: 100px;
    overflow: scroll;
    text-align: left;
    .form-item{
        margin-top: 72px;
        .lable{
            margin-bottom: 43px;
        }
    }
}
</style>
