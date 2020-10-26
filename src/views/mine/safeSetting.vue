<template>
  <div class="set-payment-add">
    <TitleHeader :title="$t('mine.safeSetting')">
      <ul class="app-padding40 payment_cont">
        <li @click="$router.push('/mine/forgetSafePass')" v-if="_userInfo.pay_password === '1'" class="flex-between-c payment_item">
          <div v-t="'mine.forgetSafePass'"></div>
          <div>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
        <li @click="$router.push('/mine/safepass')" class="flex-between-c payment_item">
          <div v-t="_userInfo.pay_password === '0' ? 'mine.setSafePass' : 'mine.safePass'"></div>
          <div>
            <span class="vertical-m" :class="_userInfo.pay_password === '0' ? 'primary-color' : 'red-color'">{{
              _userInfo.pay_password ? "已设置" : "未设置"
            }}</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
        <li @click="$router.push('/mine/changePwd')" class="flex-between-c payment_item">
          <div v-t="'mine.changePwd'"></div>
          <div>
            <span class="vertical-m red-color">已设置</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
        <li @click="goVerLv" class="flex-between-c payment_item">
          <div v-t="'mine.realName'"></div>
          <div>
            <span class="vertical-m" :class="_userInfo.ver_lv === 0 ? 'primary-color' : 'red-color'">{{_userInfo.ver_lv === 0 ? '未认证' : '已认证'}}</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
      </ul>
    </TitleHeader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
  isLoading: boolean;
  verLvStatus: any;
};

export default Vue.extend({
    name: 'SetPaymentAdd',
    data(): data {
        return {
            isLoading: false,
            verLvStatus: {},
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.isLoading = true;
            this.changeLoading(true);
            this.$api.getVerStutas().then((res: any) => {
                if (res.data) {
                    this.verLvStatus = res.data;
                }
            }).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
        goVerLv() {
            if (this.isLoading) return;
            if (this._userInfo.ver_lv === 0) {
                this.$router.push('/mine/verlv1');
            } else if (this._userInfo.ver_lv === 1 && this.verLvStatus.status_lv_1 === 2 && this.verLvStatus.status_lv_2 === 0) {
                this.$router.push('/mine/verlv2');
            } else if (this._userInfo.ver_lv === 2 && this.verLvStatus.status_lv_2 === 2 && this.verLvStatus.status_lv_3 === 0) {
                this.$router.push('/mine/verlv3');
            } else {
                this.$router.push({
                    path: '/mine/verLvStatus',
                    query: {
                        verLv: this._userInfo.ver_lv < 3 ? this._userInfo.ver_lv + 1 : this._userInfo.ver_lv,
                        reason: this.verLvStatus.reject_reason,
                        status: this.verLvStatus[`status_lv_${this._userInfo.ver_lv}`],
                    },
                });
            }
        },
    },
});
</script>

<style lang="less" scoped>
@import "../../assets/less/excludecss/index.less";
.set-payment-add {
  height: 100%;
  font-size: 34px;
  .payment_cont {
    margin-top: 50px;
    .payment_item {
      height: 117px;
    }
  }
}
</style>
