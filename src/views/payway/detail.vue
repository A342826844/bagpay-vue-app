<template>
    <div class="payway-add">
        <TitleHeader :title="$t('payway.addpay')">
            <form @submit.prevent="" class="payway-add-form app-padding40">
                <div class="form-item">
                    <div class="lable" v-t="'payway.payway'"></div>
                    <!-- <Inputs v-if="bankInfo.type === 1" readonly :value="$t('common.theBank')"></Inputs> -->
                    <Inputs readonly :value="bankInfo.type | payType"></Inputs>
                </div>
                <div class="form-item">
                    <div class="lable" v-t="'payway.name'"></div>
                    <Inputs readonly v-model="bankInfo.real_name"></Inputs>
                </div>
                <div v-if="bankInfo.type === 1" class="form-item">
                    <div class="lable" v-t="'payway.bank'"></div>
                    <Inputs readonly v-model="bankInfo.bank"></Inputs>
                </div>
                <div v-if="[1, 4].includes(bankInfo.type)" class="form-item">
                    <div class="lable" v-t="'payway.account'"></div>
                    <Inputs readonly v-model="bankInfo.account"></Inputs>
                </div>
                <div v-if="bankInfo.type === 5" class="form-item">
                    <div class="lable" v-t="'payway.contact'"></div>
                    <Inputs readonly v-model="bankInfo.account"></Inputs>
                </div>
                <div v-if="bankInfo.type === 1" class="form-item">
                    <div class="lable" v-t="'payway.sub_bank'"></div>
                    <Inputs readonly v-model="bankInfo.sub_bank"></Inputs>
                </div>
                <div v-if="bankInfo.type === 4" class="form-item">
                    <div class="lable" v-t="'payway.qrc'"></div>
                    <img @click="showImg" class="bankinfo-img" :src="`${$api.getFile}${bankInfo.qrc}`" alt="">
                </div>
                <div v-if="bankInfo.type === 5" class="form-item">
                    <div class="lable" v-t="'payway.address'"></div>
                    <Inputs readonly v-model="bankInfo.bank"></Inputs>
                </div>
                <div v-if="bankInfo.type === 5" class="form-item">
                    <div class="lable" v-t="'payway.fullAddress'"></div>
                    <V-Field
                        v-model="bankInfo.sub_bank"
                        rows="3"
                        readonly
                        autosize
                        type="textarea"
                        maxlength="100"
                        :placeholder="$t('payway.placeAddress')"
                        show-word-limit
                    />
                </div>
            </form>
            <!-- <user-auth ref="UserAuth" :type="5" @save="addHandle"></user-auth> -->
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button
                @click="delHandle"
                type="down"
                v-t="'common.del'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */

import Vue from 'vue';
import { ImagePreview } from 'vant';
import { PayType } from '@/commons/config/index';

type data = {
    PayType: PayType;
    bankInfo: any;
};

export default Vue.extend({
    name: 'PaywayAdd',
    data(): data {
        return {
            PayType,
            bankInfo: {},
        };
    },
    // created() {
    //     this.bankInfo = { ...this.$route.params };
    //     console.log(...this.bankInfo);
    //     console.log(this.bankInfo);
    //     if (!this.bankInfo.id) {
    //         setTimeout(() => {
    //             this.$router.go(-1);
    //         }, 50);
    //     }
    // },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            vm.setBankInfo(to.params);
        });
    },
    methods: {
        setBankInfo(info: any) {
            this.bankInfo = { ...info };
            if (!this.bankInfo.id) {
                setTimeout(() => {
                    this.$router.go(-1);
                }, 50);
            }
        },
        delHandle() {
            this.$dialog.confirm({
                title: `${this.$t('payway.deleteTitle')}`,
                // message: `${this.$t('确定删除收付款方式')}`,
                confirmButtonText: `${this.$t('common.ok')}`,
                cancelButtonText: `${this.$t('common.cancle2')}`,
            }).then(() => {
                this.changeLoading(true);
                this.$api.bankUserDelete(this.bankInfo.id).then(() => {
                    this.$normalToast(this.$t('common.delSucces'));
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1500);
                }).finally(() => {
                    this.changeLoading(false);
                });
            });
        },
        showImg() {
            ImagePreview({
                images: [`${this.$api.getFile}${this.bankInfo.qrc}`],
            });
        },
    },
});
</script>

<style lang="less" scoped>
// @import "../../assets/less/excludecss/index.less";
.payway-add {
  height: 100%;
  font-size: 34px;
  &-form {
    margin-top: 58px;
    text-align: left;
    .form-item {
      margin-top: 76px;
      &-select {
        height: 99px;
        background: #f5f7f9;
        .select-symbol {
          margin-left: 26px;
        }
      }
      .lable {
        margin-bottom: 43px;
      }
    }
  }
  .bankinfo-img{
      width: 100px;
  }
}
</style>
