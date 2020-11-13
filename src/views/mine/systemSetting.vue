<template>
  <div class="set-payment-add">
    <TitleHeader :title="$t('mine.systemSetting')">
      <ul class="app-padding40 sys_cont">
        <li class="flex-between-c sys_item">
          <div v-t="'mine.hideAmount'"></div>
            <V-Switch v-model="hideBalance"
              active-value="1"
              inactive-value="0"
              size="20px"
              @change="_change"
              active-color="#5894EE"
              inactive-color="#EDF3FB"/>
        </li>
        <li  @click="isShowLang = true" class="flex-between-c sys_item">
          <div v-t="'mine.changeLang'"></div>
          <div>
            <span class="vertical-m">{{ $t('language')}}</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
        <li class="flex-between-c sys_item">
          <div v-t="'mine.unitPrice'"></div>
          <div>
            <span class="vertical-m">{{_unit}}</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
        <li class="flex-between-c sys_item" @click="logout">
          <div v-t="'mine.logout'"></div>
          <div>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
      </ul>
    </TitleHeader>
    <SelectPopup v-model="isShowLang">
      <SelectPopupItem
        v-for="item in langType"
        @click="setLang(item)"
        :key="item.value"
        >{{ item.label }}</SelectPopupItem>
    </SelectPopup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n, { langType } from '@/i18n/index';

export default Vue.extend({
    name: 'SystemSetting',
    data() {
        return {
            langType,
            isShowLang: false,
            lang: this.$store.state.lang,
            hideBalance: this.$store.state.hideBalance,
        };
    },
    methods: {
        _change(val: any) {
            this.$store.commit('setHideBalance', val);
        },
        setLang(item: any) {
            this.lang = item.value;
            this.$store.commit('setLang', item.value);
            i18n.locale = item.value;
        },
        logout() {
            this.$dialog.confirm({
                message: `${this.$t('mine.logoutTip')}`,
                className: 'confirm_34',
            }).then(() => {
                this.$api.logout().then((res: any) => {
                    if (res.code === 0) {
                        // this.$store.commit('setHideBalance', '');
                        this.$logoutHandle();
                        this.$router.push({
                            name: 'entry',
                        });
                    }
                });
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
  .sys_cont {
    margin-top: 50px;
    .sys_item {
      height: 117px;
    }
  }
}
</style>
