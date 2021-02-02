<template>
    <div class="payway-add">
        <TitleHeader :title="$t('payway.addpay')">
            <form @submit.prevent="" class="payway-add-form app-padding40">
                <div class="form-item">
                    <div class="lable" v-t="'payway.payway'"></div>
                    <Select @click="payPopup = true">
                        <!-- <img class="app-img-50" src="../../assets/img/mine/del.png" alt=""> -->
                        <span v-show="!ortherBank" class="vertical-m">
                            <span v-show="form.type !== 1">{{ form.type | payType}}</span>
                            <span v-show="form.type === 1">ABA</span>
                        </span>
                        <span v-show="ortherBank">{{$t('common.otherBank')}}</span>
                    </Select>
                </div>
                <template v-if="form.type === 1">
                    <div class="form-item">
                        <div class="lable" v-t="'payway.name'"></div>
                        <Inputs v-model="form.real_name" :autofocus="true"></Inputs>
                    </div>
                    <div class="form-item">
                        <div class="lable" v-t="'payway.bank'"></div>
                        <Select v-if="!ortherBank" @click="$router.push(`/payway/banks?id=${bankInfo.id}`)">
                            <!-- <img class="app-img-50" src="../../assets/img/mine/del.png" alt=""> -->
                            <span class="vertical-m">{{ bankInfo.title }}</span>
                        </Select>
                        <Inputs maxlength="50" v-if="ortherBank" v-model="form.bank"></Inputs>
                    </div>
                    <div class="form-item">
                        <div class="lable" v-t="'payway.account'"></div>
                        <Inputs maxlength="50" v-model="form.account"></Inputs>
                    </div>
                    <div class="form-item">
                        <div class="lable" v-t="'payway.sub_bank'"></div>
                        <Inputs maxlength="100" v-model="form.sub_bank"></Inputs>
                    </div>
                </template>
                <template v-if="form.type === 4">
                    <div class="form-item">
                        <div class="lable" v-t="'payway.name'"></div>
                        <Inputs v-model="form.real_name" :autofocus="true"></Inputs>
                    </div>
                    <div class="form-item">
                        <div class="lable" v-t="'payway.account'"></div>
                        <Inputs maxlength="50" v-model="form.account"></Inputs>
                    </div>
                    <div class="form-item">
                        <div class="lable" v-t="'payway.qrc'"></div>
                        <V-Uploader :max-count="1" v-model="fileList" multiple :after-read="afterRead"></V-Uploader>
                    </div>
                </template>
                <template v-if="form.type === 5">
                    <div class="form-item">
                        <div class="lable" v-t="'payway.name'"></div>
                        <Inputs readonly v-model="form.real_name"></Inputs>
                    </div>
                    <div class="form-item">
                        <div class="lable" v-t="'payway.contact'"></div>
                        <Inputs maxlength="50" :placeholder="$t('payway.placeTel')" v-model="form.account"></Inputs>
                    </div>
                    <div class="form-item">
                        <div class="lable" v-t="'payway.address'"></div>
                        <Inputs maxlength="50" :placeholder="$t('payway.placeAddress')" v-model="form.bank"></Inputs>
                    </div>
                    <div class="form-item">
                        <div class="lable" v-t="'payway.fullAddress'"></div>
                        <V-Field
                            v-model="form.sub_bank"
                            rows="3"
                            autosize
                            type="textarea"
                            maxlength="100"
                            :placeholder="$t('payway.placeFullAddress')"
                            show-word-limit
                        />
                    </div>
                </template>
            </form>
            <user-auth ref="UserAuth" :type="5" @save="addHandle"></user-auth>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button
                @click="authHandle"
                v-t="'common.ok'"
                :disabled="disabled"></Button>
        </div>
        <SelectPopup v-model="payPopup">
            <SelectPopupItem @click="selectPayType(1)">ABA</SelectPopupItem>
            <SelectPopupItem
                v-for="item in PayType.filter(item => item !== 1)"
                :key="item"
                @click="selectPayType(item)"
            >{{ item | payType }}</SelectPopupItem>
            <SelectPopupItem @click="selectOrtherBank">{{$t('common.otherBank')}}</SelectPopupItem>
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
    addressList: any[];
    ortherBank: boolean;
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
    name: 'PaywayAdd',
    data(): data {
        return {
            PayType,
            payPopup: false,
            bankInfo: {},
            symbol: this.$route.query.symbol as string,
            needMede: this.$route.query.needMede as string,
            fileList: [],
            ortherBank: false,
            addressList: [
                {
                    id: 1,
                    tel: '',
                    address: '',
                },
                {
                    id: 2,
                    tel: '',
                    address: '',
                },
                {
                    id: 3,
                    tel: '',
                    address: '',
                },
            ],
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
    computed: {
        disabled(): boolean {
            const {
                real_name,
                account,
                bank,
                sub_bank,
                type,
            } = this.form;
            if (this.ortherBank) {
                return !real_name || !account || !sub_bank || !bank;
            }
            if (type === 1) {
                return !real_name || !account || !sub_bank;
            }
            if (type === 4 || type === 3 || type === 2) {
                return !real_name || !account || !this.fileList.length;
            }
            if (type === 5) {
                return !real_name || !account || !sub_bank || !bank;
            }
            return !real_name || !account || (!sub_bank && type === 1) || (!bank && this.ortherBank) || (!this.fileList.length && type === 4);
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            vm.getVerStutas();
            if (from.name === 'PaywayBanks') {
                vm.changeBankInfo();
            } else if (from.name !== 'minesafepass') {
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
                        msg: this.$t('payway.bank'),
                        value: this.ortherBank ? this.form.bank : this.bankInfo.name,
                    },
                ]);
                if (!vfi) return;
            }
            (this.$refs.UserAuth as any).open();
        },
        selectPayType(type: any) {
            this.form.type = type;
            this.ortherBank = false;
        },
        selectOrtherBank() {
            this.selectPayType(1);
            this.ortherBank = true;
        },
        addHandle(data: any) {
            let params: any = null;
            const list = {
                type: this.form.type, // type: [int] 类型：1.银行卡 2.支付宝 3.微信 4.汇旺
                real_name: this.form.real_name, // real_name: [string] 持卡人姓名
                bank: ((this.ortherBank || this.form.type === 5) ? this.form.bank : this.bankInfo.title) || '', // bank: [string] 银行名称
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
