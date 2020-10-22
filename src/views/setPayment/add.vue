<template>
  <div class="set-payment-add">
    <TitleHeader :title="$t('payment.addAddress')">
      <form class="set-payment-add-form app-padding40">
        <div class="form-item">
          <div class="lable" v-t="'payment.choiceAddress'"></div>
          <div
            @click="$router.push(`/choisesymbol?symbol=${symbol}`)"
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
        <div class="form-item form-item-card">
          <div class="lable" v-t="'payment.chequesAddr'"></div>
          <Inputs
            v-model="form.address"
            :placeholder="`${symbol.toUpperCase()} ${$t('payment.address')}`"
          >
            <img
              class="app-img-50"
              src="../../assets/img/common/qrcode1.png"
              alt=""
            />
          </Inputs>
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
      <div class="lxa-footer-btn">
        <Button @click="auth()" v-t="'common.save'"></Button>
      </div>
      <user-auth ref="UserAuth" :type="6" @save="saveHandle"></user-auth>
    </TitleHeader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
  symbol: string;
  needMede: string;
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
            symbol: '',
            needMede: '',
            form: {
                address: '',
                memoAddr: '',
                remark: '',
            },
        };
    },
    activated() {
        this.symbol = this.$store.state.addAddr.symbol || '';
        this.needMede = this.$store.state.addAddr.needMede || '';
    },
    mounted() {
    // this.init();
    },
    methods: {
        init() {
            this.$api.getCoinProtocols({
                coin: this.symbol,
            });
        },
        auth() {
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
            this.$api.addAddress({
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
