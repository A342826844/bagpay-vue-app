<template>
  <div class="adv_business">
    <TitleHeader :title="$t('otc.business')">
      <div class="bg_color">
        <div class="top_bor"></div>
        <div class="adv_top">
          <div class="adv_t1">{{ $t("business.advTitle1") }}</div>
          <div class="adv_t2">{{ $t("business.advTitle2") }}</div>
          <div class="adv_t2">{{ $t("business.advTitle3") }}</div>
          <div class="adv_t2">{{ $t("business.advTitle4") }}</div>
        </div>
        <div class="top_bor"></div>
        <ul class="tab_cont">
          <li class="tab_item">
            <img class="tab_img" src="@/assets/img/otc/vfy_1.png" alt="" />
            <div class="tab_text">1.{{ $t("business.advTitle5") }}</div>
          </li>
          <li class="tab_item">
            <img class="tab_img" src="@/assets/img/otc/vfy_2.png" alt="" />
            <div class="tab_text">2.{{ $t("business.advTitle6") }}</div>
          </li>
          <li class="tab_item">
            <img class="tab_img" src="@/assets/img/otc/vfy_3.png" alt="" />
            <div class="tab_text">3.{{ $t("business.advTitle7") }}</div>
          </li>
          <li class="tab_item">
            <img class="tab_img" src="@/assets/img/otc/vfy_4.png" alt="" />
            <div class="tab_text">4.{{ $t("business.advTitle8") }}</div>
          </li>
        </ul>
      </div>
      <div class="adv_bottom">
        <Poptip>
          <PoptipItem>
            {{$t('business.busTip1')}}
          </PoptipItem>
          <PoptipItem>
            {{$t('business.busTip2')}}
          </PoptipItem>
          <PoptipItem>
            {{$t('business.busTip3')}}
          </PoptipItem>
        </Poptip>
      </div>
    </TitleHeader>
    <div class="lxa-footer-btn">
          <Button @click="vfyBus()" class="app-size-34" v-t="'otc.vfyBus'"></Button>
          <!-- <Button @click="loginHandle" v-t="'login.login'"></Button> -->
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    created() {
        this.getInfo();
    },
    data() {
        return {
            isLoading: false,
            status: null,
        };
    },
    methods: {
        getInfo() {
            this.changeLoading(true);
            this.isLoading = false;
            this.$api.otcGetMerchant().then((res: any) => {
                if (res.code === 0) {
                    this.status = res.data ? res.data.status : null;
                    this.isLoading = true;
                }
            }).finally(() => {
                this.changeLoading(false);
            });
        },
        vfyBus() {
            if (!this.isLoading) {
                this.getInfo();
            } else if (this.status === null) {
                this.$router.push('/otc/vfyBus');
            } else {
                this.$router.push({
                    path: '/otc/advStatus',
                    query: {
                        status: this.status,
                    },
                });
            }
        },
    },
});
</script>

<style lang='less' scoped>
.adv_business {
  min-height: 100%;
  background-color: #f8f8f8;
//   padding-bottom: 100px;
}
.adv_bottom {
  background-color: #f8f8f8;
}
.bg_color {
  background-color: #fff;
}
.top_bor {
  border-bottom: 1px solid #dcdcdc;
  padding-top: 40px;
}
.adv_top {
  height: 380px;
  text-align: right;
  padding-right: 40px;
  background: url("../../../../assets/img/otc/adv.png") no-repeat;
  background-size: 440px 380px;
  margin-top: 40px;
  color: #3e80ca;
  .adv_t1 {
    font-size: 64px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .adv_t2 {
    font-size: 34px;
    line-height: 80px;
  }
}
.tab_cont {
  display: flex;
  padding: 50px 0;
  box-shadow: 1px 4px 13px 0px rgba(198, 194, 216, 0.5);
  .tab_item {
    flex: 0 0 25%;
    color: #3f80ca;
    font-size: 24px;
    .tab_img {
      height: 60px;
      margin-bottom: 45px;
    }
  }
}
</style>
