<template>
  <div class="vfy_bus">
    <TitleHeader :title="$t('otc.applyInfo')">
      <div class="info_cont">
        <Inputs
          class="info_item"
          :placeholder="$t('login.phone')"
          clearable
          v-model="form.phone"
          :autofocus="true"
          type="text"
        />
        <Inputs
          class="info_item"
          :placeholder="$t('login.email')"
          clearable
          v-model="form.email"
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
            >{{ item | socialType }}</SelectPopupItem>
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
            >{{ item | relationship }}</SelectPopupItem>
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
            {{ $t("business.vfiBusTip1") }}
          </PoptipItem>
          <PoptipItem>
            {{ $t("business.vfiBusTip2") }}
          </PoptipItem>
        </Poptip>
        <div class="check_cont">
          <V-Checkbox v-model="checked" shape="square">
           {{ $t("business.vfiBusTip3") }}
           《<span class="primary-color" @click.stop="$router.push('/otc/protocol')">{{ $t("business.vfiBusTip4") }}</span>》
          </V-Checkbox>
        </div>
        <Button
          @click="deposit"
          class="app-size-34"
          v-t="'otc.deposit'"
          :disabled="!form.phone || !form.email || !form.social || !form.iceName || !form.icePhone || !form.address"
        ></Button>
      </div>
    </TitleHeader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SocialType, Relationship } from '@/commons/config/index';
// import 'vant/lib/checkbox/style';
// import { Checkbox } from 'vant';

export default Vue.extend({
    name: 'VfyBus',
    data() {
        return {
            SocialType,
            Relationship,
            isSocialType: false,
            isRelationship: false,
            checked: false,
            form: {
                phone: '',
                email: '',
                socialType: '0',
                social: '',
                iceName: '',
                icePhone: '',
                iceRelation: '0',
                address: '',
            },
        };
    },
    // created() {
    //     this.$nextTick(() => {
    //         const phone = this._userInfo.phone.split('-');
    //         this.form.phone = phone[1] || '';
    //         this.form.email = this._userInfo.email;
    //     });
    // },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name !== 'OtcProtocol') {
                vm.initForm();
            }
        });
    },
    computed: {
        country(): any {
            return this.$store.state.country;
        },
    },
    methods: {
        initForm() {
            this.form.socialType = '0';
            this.form.social = '';
            this.form.iceName = '';
            this.form.icePhone = '';
            this.form.iceRelation = '0';
            this.form.address = '';
            this.form.phone = this.$hasBindValue(this._getPhone) ? `${this.sliceMoblepre(this._getPhone)}` : '';
            this.form.email = this.$hasBindValue(this._userInfo.email) ? this._userInfo.email : '';
        },
        sliceMoblepre(phone: string|number) {
            const index = `${phone}`.indexOf('-');
            if (`${phone}`.indexOf('-') !== -1) {
                return `${phone}`.slice(index + 1);
            }
            return phone;
        },
        deposit() {
            const val: boolean = this.$verification.fromVfi([
                // {
                //     type: 'phone',
                //     value: this.form.phone,
                // },
                {
                    type: 'email',
                    value: this.form.email,
                },
                {
                    type: 'empty',
                    msg: this.$t('otc.socialAccount'),
                    value: this.form.social,
                },
                {
                    type: 'name',
                    value: this.form.iceName,
                },
                {
                    type: 'empty',
                    msg: this.$t('otc.icePhone'),
                    value: this.form.icePhone,
                },
                {
                    type: 'empty',
                    msg: this.$t('payment.address'),
                    value: this.form.address,
                },
            ]);
            if (this.checked === false) {
                this.$normalToast(this.$t('business.checkAgree'));
            } else if (val) {
                this.$dialog.confirm({
                    title: `${this.$t('business.confirmApply')}`,
                    messageAlign: 'left',
                    confirmButtonText: `${this.$t('common.ok')}`,
                    cancelButtonText: `${this.$t('common.cancle2')}`,
                    message: `<div class="app-reset-diolog-message">
                        ${this.$t('business.needPay', {
        text: `<span class="primary-color">
                            ${this._configCommon.OtcMerchantBailAmount} ${(this._configCommon.OtcMerchantBailCoin)}
                        </span>`,
    })}
                      </div>`,
                }).then(() => {
                    if (Number(this.$route.query.type) === 1) {
                        this.otcMerchantUpdate();
                        return;
                    }
                    this.otcMerchant();
                });
            }
        },
        otcMerchant() {
            this.changeLoading(true);
            this.$api.otcMerchant({
                phone: `${this.form.phone}`,
                email: this.form.email,
                social_type: this.form.socialType,
                social: this.form.social,
                ice_name: this.form.iceName,
                ice_phone: `${this.form.icePhone}`,
                ice_relation: this.form.iceRelation,
                address: this.form.address,
            }).then((res: any) => {
                this.changeLoading(false);
                if (res.code === 0) {
                    this.$router.go(-1);
                }
            }).catch(() => {
                this.changeLoading(false);
            });
        },
        otcMerchantUpdate() {
            this.changeLoading(true);
            this.$api.otcMerchantUpdate({
                phone: `${this.form.phone}`,
                email: this.form.email,
                social_type: this.form.socialType,
                social: this.form.social,
                ice_name: this.form.iceName,
                ice_phone: `${this.form.icePhone}`,
                ice_relation: this.form.iceRelation,
                address: this.form.address,
            }).then((res: any) => {
                this.changeLoading(false);
                if (res.code === 0) {
                    this.$router.go(-1);
                }
            }).catch(() => {
                this.changeLoading(false);
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
  .check_cont{
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
}
</style>
