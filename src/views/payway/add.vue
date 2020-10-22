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
                    <Inputs v-model="form.real_name"></Inputs>
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
                    <V-Uploader :max-count="3" v-model="fileList" multiple :after-read="afterRead"></V-Uploader>
                </div>
            </form>
            <user-auth ref="UserAuth" :type="6" @save="addHandle"></user-auth>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button @click="authHandle" v-t="'common.save'"></Button>
        </div>
        <SelectPopup v-model="payPopup">
            <SelectPopupItem v-for="item in PayType" :key="item" @click="selectPayType(item)">{{ item | payType }}</SelectPopupItem>
        </SelectPopup>
    </div>
</template>

<script lang="ts">
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
        qrc: string;
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
            this.form.bank = '';
            this.form.sub_bank = '';
            this.form.qrc = '';
        },
        changeBankInfo() {
            this.bankInfo = this.$store.state.bankInfo;
        },
        afterRead(file: any) {
            console.log(file);
        },
        authHandle() {
            if (this.form.type === 1) {
                const vfi: boolean = this.$verification.fromVfi([
                    {
                        type: 'empty',
                        msg: this.$t('payway.pName'),
                        value: this.form.real_name,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('login.pBank'),
                        value: this.form.bank,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('login.pAccount'),
                        value: this.form.account,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('login.pSub_bank'),
                        value: this.form.sub_bank,
                    },
                ]);
                if (!vfi) return;
            } else {
                const vfi: boolean = this.$verification.fromVfi([
                    {
                        type: 'empty',
                        msg: this.$t('payway.pName'),
                        value: this.form.real_name,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('login.pAccount'),
                        value: this.form.account,
                    },
                    {
                        type: 'empty',
                        msg: this.$t('login.pQrc'),
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
            const params = {
                type: this.form.type, // type: [int] 类型：1.银行卡 2.支付宝 3.微信 4.汇旺
                real_name: this.form.real_name, // real_name: [string] 持卡人姓名
                bank: this.form.bank, // bank: [string] 银行名称
                sub_bank: this.form.sub_bank, // sub_bank: [string] 支行名称
                account: this.form.account, // account: [string] 账号
                qrc: this.form.qrc, // qrc: [file] 二维码
                ...data,
            };
            this.$api.addUserBank(params).then((res: any) => {
                console.log(res);
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
