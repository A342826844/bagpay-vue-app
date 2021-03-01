<template>
  <div class="set-payment-add">
    <TitleHeader :title="$t('payment.addAddress')">
      <form @submit.prevent="" class="set-payment-add-form app-padding40">
        <div class="form-item">
          <div class="lable" v-t="'payment.choiceAddress'"></div>
          <div
            @click="$router.push(`/choisesymbol?symbol=${symbol}&form=1`)"
            class="form-item-select app-padding40 flex-between-c"
          >
            <div>
              <icon-img class="app-img-50" :symbol="symbol"></icon-img>
              <span class="select-symbol vertical-m">{{
                symbol.toUpperCase()
              }}</span>
            </div>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </div>
        <div :class="hasProtocol ? 'chainshow' : 'chainhide' " class="form-item">
            <Select @click="showPopupHandle">
                <div class="flex-between-c">
                    <span>
                        链名称
                    </span>
                    <span class="vertical-m">
                        {{activeProtocol.protocol && activeProtocol.protocol.toUpperCase()}}
                    </span>
                </div>
            </Select>
        </div>
        <div class="form-item form-item-card">
          <div class="lable" v-t="'payment.chequesAddr'"></div>
          <V-Field
              v-model="form.address"
              rows="2"
              autosize
              :autofocus="true"
              type="textarea"
              maxlength="64"
              :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`"
              show-word-limit
          >
          <div slot="button" class="button_cont">
              <img class="app-img-50" @click="$router.push('/scanQRCode')" src="@/assets/img/common/qrcode1.png" alt="">
          </div>
          </V-Field>
        </div>
        <div class="form-item form-item-card" v-show="needMede === '1'">
          <div class="lable" v-t="'payment.memoAddr'"></div>
          <Inputs
            v-model="form.memoAddr"
            :placeholder="`${symbol.toUpperCase()} ${$t('payment.memoAddr')}`"
          >
            <img
              class="app-img-50"
              src="../../assets/img/common/qrcode1.png"
              alt=""
            />
          </Inputs>
        </div>
        <div class="form-item">
          <div class="lable" v-t="'common.name'"></div>
          <Inputs
            v-model="form.remark"
            maxlength="10"
            :isShowLength="true"
            :placeholder="$t('payment.remark')"
          ></Inputs>
        </div>
      </form>
      <user-auth ref="UserAuth" :type="6" @save="saveHandle"></user-auth>
    </TitleHeader>
    <div class="lxa-footer-btn">
      <Button @click="auth()" v-t="'common.ok'" :disabled="!form.address || (needMede === '1' && !form.memoAddr) || !form.remark"></Button>
    </div>
    <SelectPopup v-model="chainPopup">
        <SelectPopupItem
            v-for="item in chainList"
            :key="item.id"
            class="select-box"
            @click="selectChain(item)"
        >
            {{ item.protocol.toUpperCase() }}
        </SelectPopupItem>
    </SelectPopup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
  chainPopup: boolean; // 显示协议弹出
  hasProtocol: boolean; // 是否有协议
  activeProtocol: any; // 所选协议
  chainList: any[]; // 协议列表
  symbol: string;
  needMede: string;
  isLoading: boolean;
  form: {
    address: string;
    memoAddr: string;
    remark: string;
  };
};

export default Vue.extend({
    name: 'SetPaymentAdd',
    data(): data {
        return {
            chainPopup: false,
            hasProtocol: false,
            activeProtocol: {},
            chainList: [],
            symbol: '',
            needMede: '',
            isLoading: false,
            form: {
                address: '',
                memoAddr: '',
                remark: '',
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            // eslint-disable-next-line no-param-reassign
            vm.symbol = to.query.symbol || 'usdt';
            if (from.name === 'choisesymbol') {
                vm.initPramis();
                vm.getDataHandle();
            }
            if (from.name === 'scanQRCode') {
                // eslint-disable-next-line no-param-reassign
                vm.form.address = vm.$store.state.qrcodeResult || '';
            }
            if (!(from.name === 'choisesymbol' || from.name === 'scanQRCode' || from.name === 'minesafepass')) {
                vm.clear();
                vm.getDataHandle();
            }
        });
    },

    methods: {
        clear() {
            this.form = {
                address: '',
                memoAddr: '',
                remark: '',
            };
        },
        initPramis() {
            this.symbol = this.$store.state.addAddr.symbol || '';
            this.needMede = this.$store.state.addAddr.needMede || '';
        },
        selectChain(item: any) {
            this.activeProtocol = { ...item };
        },
        showPopupHandle() {
            if (this.hasProtocol) {
                this.chainPopup = true;
            }
        },
        getDataHandle() {
            return this.getCoinProtocols().then((res: any) => {
                if (res.length) {
                    this.activeProtocol = { ...res[0] };
                    this.hasProtocol = true;
                    this.chainList = res;
                } else {
                    this.activeProtocol = {};
                    this.hasProtocol = false;
                    this.chainList = [];
                }
            });
        },
        getCoinProtocols() {
            return this.$api.getCoinProtocols(this.symbol).then((res: any) => {
                if (res.data) return res.data;
                return [];
            }).catch(() => []);
        },
        auth() {
            if (this.isLoading) return;
            const data: Array<any> = [
                {
                    type: 'empty',
                    msg: this.$t('payment.chequesAddr'),
                    value: this.form.address,
                },
            ];
            if (this.needMede === '1') {
                data.push({
                    type: 'empty',
                    msg: this.$t('payment.memoAddr'),
                    value: this.form.memoAddr,
                });
            }
            data.push({
                type: 'empty',
                msg: this.$t('common.name'),
                value: this.form.remark,
            });
            const vfi: boolean = this.$verification.fromVfi(data);
            if (vfi) {
                (this.$refs.UserAuth as any).open();
            }
        },
        saveHandle(auth: any) {
            if (this.isLoading) return;
            this.isLoading = true;
            this.changeLoading(true);
            this.$api
                .addAddress({
                    coin: this.symbol,
                    remark: this.form.remark,
                    address: this.form.address,
                    memo: this.form.memoAddr,
                    ...auth,
                })
                .then((res: any) => {
                    if (res.code === 0) {
                        this.$router.go(-1);
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                    this.changeLoading(false);
                });
        },
    },
});
</script>

<style lang="less" scoped>
@import "../../assets/less/excludecss/index.less";
.set-payment-add {
  height: 100%;
  font-size: 34px;
  &-form {
    margin-top: 58px;
    text-align: left;
    .chainshow{
        margin-top: 60px !important;
        height: 99px;
        opacity: 1;
        transition: all 0.3s;
    }
    .chainhide{
        height: 0;
        transition: all 0.3s;
        margin-top: 0 !important;
        opacity: 0;
    }
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
