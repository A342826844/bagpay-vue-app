<template>
  <div class="vfy_bus">
    <TitleHeader :title="$t('otc.applyInfo')">
      <div class="info_cont">
        <Inputs
          class="info_item"
          :placeholder="$t('login.phone')"
          clearable
          v-model="form.phone"
          type="text"
        />
        <div @click="isSocialType = !isSocialType" class="info_item">
          <Select>
            <span class="vertical-m">{{ form.socialType | socialType }}</span>
          </Select>
        </div>
        <SelectPopup v-model="isSocialType">
          <SelectPopupItem
            v-for="item in SocialType"
            @click="form.socialType = item"
            :key="item"
            >{{ item | socialType }}</SelectPopupItem
          >
        </SelectPopup>
        <Inputs
          class="info_item"
          :placeholder="$t('otc.socialAccount')"
          clearable
          v-model="form.social"
          type="text"
        />
        <Inputs
          class="info_item"
          :placeholder="$t('otc.iceName')"
          clearable
          v-model="form.iceName"
          type="text"
        />
        <Inputs
          class="info_item"
          :placeholder="$t('otc.icePhone')"
          clearable
          v-model="form.icePhone"
          type="text"
        />
        <div @click="isRelationship = !isRelationship" class="info_item">
          <Select>
            <span class="vertical-m">{{
              form.iceRelation | relationship
            }}</span>
          </Select>
        </div>
        <SelectPopup v-model="isRelationship">
          <SelectPopupItem
            v-for="item in Relationship"
            @click="form.iceRelation = item"
            :key="item"
            >{{ item | relationship }}</SelectPopupItem
          >
        </SelectPopup>
        <Inputs
          class="info_item"
          :placeholder="$t('payment.address')"
          clearable
          v-model="form.address"
          type="text"
        />
        <Poptip>
          <PoptipItem>
            为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。
          </PoptipItem>
          <PoptipItem>
            请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
          </PoptipItem>
        </Poptip>
        <Button
          @click="deposit"
          class="app-size-34"
          v-t="'otc.deposit'"
        ></Button>
      </div>
    </TitleHeader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SocialType, Relationship } from '@/commons/config/index';

export default Vue.extend({
    data() {
        return {
            SocialType,
            Relationship,
            isSocialType: false,
            isRelationship: false,
            form: {
                phone: '',
                socialType: '0',
                social: '',
                iceName: '',
                icePhone: '',
                iceRelation: '0',
                address: '',
            },
        };
    },
    methods: {
        deposit() {
            this.$api.otcMerchant({
                phone: this.form.phone,
                social_type: this.form.socialType,
                social: this.form.social,
                ice_name: this.form.iceName,
                ice_phone: this.form.icePhone,
                ice_relation: this.form.iceRelation,
                address: this.form.address,
            }).then((res: any) => {
                console.log('todo');
            });
        },
    },
});
</script>

<style lang='less' scoped>
.info_cont {
  padding: 0 40px 100px;
  font-size: 34px;
  .info_item {
    margin-top: 40px;
  }
}
</style>
