<template>
  <div class="ver_lv">
    <TitleHeader :title="`${$t('mine.realName')}(LV1)`" />
    <div class="realname-form app-padding40">
      <div class="form-item">
        <Inputs v-model="form.userName" :placeholder="$t('payway.name')" clearable></Inputs>
      </div>
      <div @click="isCardType = !isCardType" class="form-item">
        <Select>
          <span class="vertical-m">{{ form.cardType | cardType }}</span>
        </Select>
      </div>
      <SelectPopup v-model="isCardType">
        <SelectPopupItem
          v-for="item in CardType"
          @click="form.cardType = item"
          :key="item"
          >{{ item | cardType }}</SelectPopupItem
        >
      </SelectPopup>
      <div class="form-item">
        <Inputs v-model="form.idCard" placeholder="证件号码" clearable></Inputs>
      </div>
    </div>
    <Poptip>
      <PoptipItem>
        {{ $t("mine.verLv1Tip") }}
      </PoptipItem>
    </Poptip>
    <div class="lxa-footer-btn">
      <Button @click="save" v-t="'common.ok'"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CardType } from '@/commons/config/index';

export default Vue.extend({
    data() {
        return {
            CardType,
            isCardType: false,
            form: {
                userName: '',
                cardType: 1,
                idCard: '',
            },
        };
    },
    methods: {
        save() {
            const vfi: boolean = this.$verification.fromVfi([
                {
                    type: 'name',
                    value: this.form.userName,
                },
                {
                    type: 'icCard',
                    value: this.form.idCard,
                },
            ]);
            if (vfi) {
                this.$api
                    .postVerLv1({
                        real_name: this.form.userName,
                        id_type: this.form.cardType,
                        id_num: this.form.idCard,
                    })
                    .then((res: any) => {
                        if (res.code === 0) {
                            this.initUserInfo();
                            this.$router.go(-1);
                        }
                    });
            }
        },
    },
});
</script>

<style lang="less" scoped>
.ver_lv {
  font-size: 34px;
  height: 100%;
}
.realname-tip {
  text-align: left;
}
.realname-form {
  margin-top: 109px;
  .form-item {
    margin-top: 30px;
  }
}
</style>
