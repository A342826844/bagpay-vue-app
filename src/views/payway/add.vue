<template>
    <div class="payway-add">
        <TitleHeader :title="$t('payway.addpay')">
            <form class="payway-add-form app-padding40">
                <div class="form-item">
                    <div class="lable" v-t="'payway.payway'"></div>
                    <Select @click="payPopup = true">
                        <!-- <img class="app-img-50" src="../../assets/img/mine/del.png" alt=""> -->
                        <span class="vertical-m">{{ form.type | payType}}</span>
                    </Select>
                </div>
                <div class="form-item">
                    <div class="lable" v-t="'payway.name'"></div>
                    <Inputs readonly v-model="form.real_name" :autofocus="true"></Inputs>
                </div>
                <div v-if="form.type === 1" class="form-item">
                    <div class="lable" v-t="'payway.bank'"></div>
                    <Select @click="$router.push(`/payway/banks?id=${bankInfo.id}`)">
                        <!-- <img class="app-img-50" src="../../assets/img/mine/del.png" alt=""> -->
                        <span class="vertical-m">{{ bankInfo.title }}</span>
                    </Select>
                    <!-- <Inputs v-model="form.bank"></Inputs> -->
                </div>
                <div class="form-item">
                    <div class="lable" v-t="'payway.account'"></div>
                    <Inputs v-model="form.account"></Inputs>
                </div>
                <div v-if="form.type === 1" class="form-item">
                    <div class="lable" v-t="'payway.sub_bank'"></div>
                    <Inputs v-model="form.sub_bank"></Inputs>
                </div>
                <div v-if="form.type !== 1" class="form-item">
                    <div class="lable" v-t="'payway.qrc'"></div>
                    <V-Uploader :max-count="1" v-model="fileList" multiple :after-read="afterRead"></V-Uploader>
                </div>
            </form>
            <user-auth ref="UserAuth" :type="5" @save="addHandle"></user-auth>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button
                @click="authHandle"
                v-t="'common.ok'"
                :disabled="!form.real_name || !form.account || (!form.sub_bank && form.type === 1) || (!fileList.length && form.type !== 1)"></Button>
        </div>
        <SelectPopup v-model="payPopup">
            <SelectPopupItem v-for="item in PayType" :key="item" @click="selectPayType(item)">{{ item | payType }}</SelectPopupItem>
        </SelectPopup>
    </div>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */

import Vue from 'vue';
import { PayType } from '@/commons/config/index';

type data = {
    PayType: Array<any>;
    symbol: string;
    needMede: string;
    payPopup: boolean;
    fileList: Array<any>;
    bankInfo: any;
    form: {
        type: number;
        account: string;
        real_name: string;
        bank: string;
        sub_bank: string;
        qrc: any;
    };
};

export default Vue.extend({
    name: 'SetPaymentAdd',
    data(): data {
        return {
            PayType,
            payPopup: false,
            bankInfo: {},
            symbol: this.$route.query.symbol as string,
            needMede: this.$route.query.needMede as string,
            fileList: [],
            form: {
                type: 1,
                account: '',
                real_name: '',
                bank: '',
                sub_bank: '',
                qrc: '',
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            vm.getVerStutas();
            if (from.name === 'PaywayBanks') {
                vm.changeBankInfo();
            } else {
                vm.init();
            }
        });
    },
    methods: {
        init() {
            this.form.account = '';
            this.form.real_name = '';
            this.form.sub_bank = '';
            this.form.qrc = '';
            this.fileList = [];
        },
        changeBankInfo() {
            this.bankInfo = this.$store.state.bankInfo;
        },
        afterRead(file: any) {
            this.$compress(file.file).then((res: Blob) => {
                this.form.qrc = res;
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
        getVerStutas() {
            this.$api.getVerStutas().then((res: any) => {
                this.form.real_name = res.data.real_name;
            });
        },
        authHandle() {
            if (this._loading) return;
            if (this.form.type === 1) {
                const vfi: boolean = this.$verification.fromVfi([
                    {
                        type: 'empty',
                        msg: this.$t('payway.name'),
                        value: this.form.real_name,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('payway.bank'),
                        value: this.bankInfo.name,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('payway.account'),
                        value: this.form.account,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('payway.sub_bank'),
                        value: this.form.sub_bank,
                    },
                ]);
                if (!vfi) return;
            } else {
                const vfi: boolean = this.$verification.fromVfi([
                    {
                        type: 'empty',
                        msg: this.$t('payway.name'),
                        value: this.form.real_name,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('payway.account'),
                        value: this.form.account,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('payway.qrc'),
                        value: this.form.qrc,
                    },
                ]);
                if (!vfi) return;
            }
            (this.$refs.UserAuth as any).open();
        },
        selectPayType(type: any) {
            this.form.type = type;
        },
        addHandle(data: any) {
            let params: any = null;
            const list = {
                type: this.form.type, // type: [int] 类型：1.银行卡 2.支付宝 3.微信 4.汇旺
                real_name: this.form.real_name, // real_name: [string] 持卡人姓名
                bank: this.bankInfo.title || '', // bank: [string] 银行名称
                sub_bank: this.form.sub_bank || '', // sub_bank: [string] 支行名称
                account: this.form.account, // account: [string] 账号
                qrc: this.form.type === 1 ? null : this.form.qrc, // qrc: [file] 二维码
                ...data,
            };
            if (this.form.type === 1) {
                params = list;
            } else {
                params = new FormData();
                Object.keys(list).forEach((item) => {
                    (params as FormData).append(item, list[item]);
                });
            }
            this.changeLoading(true);
            this.$api.addUserBank(params).then(() => {
                this.changeLoading(false);
                this.$normalToast(this.$t('mine.addSuccess'));
                setTimeout(() => {
                    this.$router.go(-1);
                }, 1500);
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast(this.$t('mine.addFailed'));
                }
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
}
</style>
