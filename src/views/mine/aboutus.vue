<template>
  <div class="aboutus">
    <TitleHeader :title="$t('mine.aboutus')">
      <div class="aboutus-box">
        <img
          class="aboutus-box-logo"
          src="../../assets/img/logo/logo.png"
          alt=""
        />
        <!-- <p class="aboutus-box-version">v {{version}}</p> -->
        <div class="aboutus-box-upload app-padding40">
          <Inputs class="form-item" readonly :value="$t('mine.protocol')" @click.native="$router.push('/mine/protocol')">
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </Inputs>
          <Inputs class="form-item" readonly :value="$t('mine.contact')" @click.native="contactHandle">
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </Inputs>
        </div>
      </div>
    </TitleHeader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Aboutus',
    methods: {
        contactHandle() {
            // TODO
        },
    },
});
</script>

<style lang="less" scoped>
.aboutus {
  height: 100%;
  font-size: 34px;
  &-box {
    margin-top: 58px;
    &-logo {
      width: 350px;
    }
    &-version {
      margin-top: 35px;
    }
    &-upload {
      margin-top: 58px;
      .form-item{
          margin-bottom: 44px;
      }
    }
  }
}
.van-circle{
    margin: 18px 0 18px;
}
</style>
