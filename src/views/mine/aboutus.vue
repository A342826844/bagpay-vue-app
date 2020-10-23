<template>
  <div class="aboutus">
    <TitleHeader :title="$t('mine.aboutus')">
      <div class="aboutus-box">
        <img
          class="aboutus-box-logo"
          src="../../assets/img/logo/logo.png"
          alt=""
        />
        <p class="aboutus-box-version">v 1.0.3</p>
        <div class="aboutus-box-upload app-padding40">
          <Inputs readonly value="版本更新" @click.native="saveHandle">
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

type data = {
  isLoading: boolean;
  form: {
    userName: string;
    idCard: string;
  };
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            isLoading: false,
            form: {
                userName: '',
                idCard: '',
            },
        };
    },
    methods: {
        saveHandle() {
            // TODO 打包时在调试
            this.isLoading = true;
            this.changeLoading(true);
            this.$api.version({
                channel: (window as any).plus.runtime.channel,
                build: (window as any).plus.runtime.versionCode,
                version: (window as any).plus.runtime.version,
            }).then((res: any) => {
                if (res.code === 0) {
                    if (!res.data) {
                        this.$normalToast('当前已是最新版本');
                    }
                }
            }).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
    },
});
</script>

<style lang="less" scoped>
.aboutus {
  height: 100%;
  font-size: 34px;
  &-box {
    margin-top: 118px;
    &-logo {
      width: 220px;
    }
    &-version {
      margin-top: 35px;
    }
    &-upload {
      margin-top: 112px;
    }
  }
}
</style>
