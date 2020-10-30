<template>
  <div class="ver_lv">
    <TitleHeader :title="`${$t('mine.realName')}`" />
    <p class="realname-tip app-padding40">{{$t('mine.currentLv', {num: '1'})}}</p>
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
        <Inputs v-model="form.idCard" :placeholder="$t('mine.cardNum')" clearable></Inputs>
      </div>
    </div>
    <Poptip>
      <PoptipItem>
        {{ $t("mine.verLv1Tip") }}
      </PoptipItem>
    </Poptip>
    <div class="lxa-footer-btn">
      <Button @click="save" v-t="'common.ok'" :disabled="!form.userName || !form.idCard"></Button>
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
                            this.$dialog.confirm({
                                title: `${this.$t('mine.auditSuccess')}`,
                                message: `${this.$t('mine.auditTip1')}`,
                                confirmButtonText: `${this.$t('mine.nextStep')}`,
                                confirmButtonColor: '#5894EE',
                                className: 'confirm_34',
                                beforeClose: (action: any, done: any) => {
                                    if (action === 'confirm') {
                                        this.$router.replace('/mine/verlv2');
                                    } else {
                                        this.$router.go(-1);
                                    }
                                    done();
                                },
                            });
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
  padding-top: 34px;
}
.realname-form {
  margin-top: 100px;
  .form-item {
    margin-top: 30px;
  }
}
</style>
