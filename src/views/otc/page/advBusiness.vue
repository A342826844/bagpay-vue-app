<template>
  <div class="adv_business">
    <TitleHeader :title="$t('otc.business')">
      <div class="bg_color">
        <div class="top_bor"></div>
        <div class="adv_top">
          <div class="adv_t1">无限发布广告</div>
          <div class="adv_t2">所有币种</div>
          <div class="adv_t2">每日发布0限制</div>
          <div class="adv_t2">方便快捷</div>
        </div>
        <div class="top_bor"></div>
        <ul class="tab_cont">
          <li class="tab_item">
            <img class="tab_img" src="@/assets/img/otc/vfy_1.png" alt="" />
            <div class="tab_text">1.身份认证</div>
          </li>
          <li class="tab_item">
            <img class="tab_img" src="@/assets/img/otc/vfy_2.png" alt="" />
            <div class="tab_text">2.提交资料</div>
          </li>
          <li class="tab_item">
            <img class="tab_img" src="@/assets/img/otc/vfy_3.png" alt="" />
            <div class="tab_text">3.缴纳保证金</div>
          </li>
          <li class="tab_item">
            <img class="tab_img" src="@/assets/img/otc/vfy_4.png" alt="" />
            <div class="tab_text">4.成为商家</div>
          </li>
        </ul>
      </div>
      <div class="adv_bottom">
        <Poptip>
          <PoptipItem>
            为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。
          </PoptipItem>
          <PoptipItem>
            请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
          </PoptipItem>
        </Poptip>
        <Button @click="vfyBus" class="app-size-34" v-t="'otc.vfyBus'"></Button>
      </div>
    </TitleHeader>
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
            status: null,
        };
    },
    methods: {
        getInfo() {
            this.$api.otcGetMerchant().then((res: any) => {
                console.log(111);
            });
        },
        vfyBus() {
            this.$router.push('/otc/vfyBus');
        },
    },
});
</script>

<style lang='less' scoped>
.adv_business {
  min-height: 100%;
  background-color: #f8f8f8;
  padding-bottom: 100px;
}
.adv_bottom {
  background-color: #f8f8f8;
}
.bg_color {
  background-color: #fff;
}
.top_bor {
  border-top: 1px solid #dcdcdc;
  margin-top: 40px;
}
.adv_top {
  height: 380px;
  text-align: right;
  padding-right: 40px;
  background: url("../../../assets/img/otc/adv.png") no-repeat;
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
