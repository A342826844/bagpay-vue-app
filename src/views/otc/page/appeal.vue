<template>
    <div class="otc-appeal">
        <TitleHeader :title="$t('otc.orderAppeal')" />
        <form class="app-padding40 app-size-34" action="">
            <div class="form-item">
                <div class="lable" v-t="'otc.appealType'"></div>
                <Select @click="selectPopup = !selectPopup">{{ form.type | otcAppealType}}</Select>
            </div>
            <div class="form-item">
                <div class="lable" v-t="'otc.appealReason2'"></div>
                <V-Field
                    v-model="form.content"
                    rows="3"
                    autosize
                    :autofocus="true"
                    type="textarea"
                    maxlength="60"
                    :placeholder="$t('otc.appealReason')"
                    show-word-limit
                >
                </V-Field>
            </div>
            <div class="form-item">
                <div class="lable" v-t="'otc.uploadPhoto2'"></div>
                <V-Uploader :after-read="afterRead" :max-count="3" v-model="fileList" multiple></V-Uploader>
            </div>
        </form>
        <div class="app-size-34 lxa-footer-btn flex-around-c">
            <Button :disabled="!form.content || !fileList.length" @click="submitHandle">{{$t('common.ok')}}</Button>
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
    created() {
        this.id = this.$route.query.id as string;
    },
    methods: {
        submitHandle() {
            if (!this.form.content) {
                this.$normalToast(this.$t('otc.appealReason'));
                return;
            }
            if (!this.fileList.length) {
                this.$normalToast(this.$t('otc.uploadPhoto'));
                return;
            }
            this.otcAppealSubmit();
        },
        selectAppealType(item: number) {
            this.form.type = item;
        },
        afterRead(file: any) {
            // 通过 status 属性可以标识上传状态，uploading 表示上传中，failed 表示上传失败，done 表示上传完成。
            file.status = 'uploading';
            file.message = this.$t('common.compressing');
            this.$compress(file.file).then((res: any) => {
                file.file = res;
                file.status = 'done';
            }).catch((err: any) => {
                file.status = 'failed';
                if (err.message === '1') {
                    file.message = this.$t('common.imgErr');
                } else {
                    file.message = this.$t('common.imgTooBig');
                }
            });
        },
        otcAppealSubmit() {
            // const params = {
            //     deal_id: this.id, // [string] 订单id
            //     type: this.form.type, // [OtcAppealType] 问题类型
            //     content: this.form.content, // [string] 总是描述
            //     images: this.images.join(','), // [string] 申诉图片,逗号分隔
            // };
            const params: any = new FormData();
            this.fileList.forEach((item: any) => {
                if (item.status === 'done') {
                    params.append('images', item.file);
                }
            });
            params.append('deal_id', this.id);
            params.append('type', `${this.form.type}`);
            params.append('content', this.form.content);
            this.changeLoading(true);
            this.$api.otcAppealSubmit(params).then(() => {
                this.changeLoading(false);
                this.$normalToast(this.$t('otc.appealSuccess'));
                setTimeout(() => {
                    this.$router.go(-1);
                }, 1000);
            }).catch(() => {
                this.changeLoading(false);
            });
        },
    },
});
</script>
<style lang="less" scoped>
.otc-appeal{
    height: 100%;
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
