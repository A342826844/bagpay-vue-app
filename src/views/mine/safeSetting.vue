<template>
  <div class="set-payment-add">
    <TitleHeader :title="$t('mine.safeSetting')">
      <ul class="app-padding40 payment_cont">
        <li class="flex-between-c payment_item">
          <div v-t="'mine.phone'"></div>
          <div>
            {{_getPhone | formatName}}<span style="display: inline-block" class="app-img-50"></span>
          </div>
        </li>
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
          <div v-t="_userInfo.pay_password !== '1' ? 'mine.setSafePass' : 'mine.safePass'"></div>
          <div>
            <span class="vertical-m" :class="_userInfo.pay_password !== '1' ? 'red-color' : 'primary-color'">{{
              _userInfo.pay_password === '1' ? $t('mine.set') : $t('mine.notSet')
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
            <span class="vertical-m primary-color">{{$t('mine.set')}}</span>
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
            <span class="vertical-m" :class="verLvClass">{{verLvTxt}}</span>
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
  verLvTxt: string;
  verLvClass: string;
  verLvStatus: any;
};

export default Vue.extend({
    name: 'MineSafeSetting',
    data(): data {
        return {
            isLoading: false,
            verLvTxt: '',
            verLvClass: '',
            verLvStatus: null,
        };
    },
    mounted() {
        this.initUserInfo();
        this.init();
    },
    methods: {
        init() {
            this.isLoading = true;
            this.changeLoading(true);
            this.$api.getVerStutas().then((res: any) => {
                if (res.code === 0) {
                    this.verLvStatus = res.data;
                    const verLv = this._userInfo.ver_lv < 3 ? this._userInfo.ver_lv + 1 : this._userInfo.ver_lv;
                    if (this._userInfo.ver_lv === 0) {
                        this.verLvTxt = `${this.$t('mine.notCertified1')}`;
                        this.verLvClass = 'red-color';
                    } else if (this.verLvStatus.status_lv_1 === 1 || this.verLvStatus.status_lv_2 === 1 || this.verLvStatus.status_lv_3 === 1) {
                        this.verLvTxt = `${this.$t('mine.underReview')}(LV${verLv})`;
                        this.verLvClass = 'primary-color';
                    } else if (this.verLvStatus.status_lv_1 === 3 || this.verLvStatus.status_lv_2 === 3 || this.verLvStatus.status_lv_3 === 3) {
                        this.verLvTxt = `${this.$t('mine.failed')}(LV${verLv})`;
                        this.verLvClass = 'red-color';
                    } else if (this.verLvStatus.status_lv_1 === 2 || this.verLvStatus.status_lv_2 === 2 || this.verLvStatus.status_lv_3 === 2) {
                        this.verLvTxt = `${this.$t('mine.certified')}(LV${this._userInfo.ver_lv})`;
                        this.verLvClass = 'primary-color';
                    }
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
                const verLv = this._userInfo.ver_lv < 3 ? this._userInfo.ver_lv + 1 : this._userInfo.ver_lv;
                this.$router.push({
                    path: '/mine/verLvStatus',
                    query: {
                        verLv,
                        reason: this.verLvStatus.reject_reason,
                        status: this.verLvStatus[`status_lv_${verLv}`],
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
