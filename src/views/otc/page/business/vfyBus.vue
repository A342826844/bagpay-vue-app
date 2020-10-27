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
          <van-checkbox v-model="checked" shape="square">
           {{ $t("business.vfiBusTip3") }}
           《<span class="primary-color" @click.stop="$router.push('/otc/protocol')">{{ $t("business.vfiBusTip4") }}</span>》
          </van-checkbox>
        </div>
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
import 'vant/lib/checkbox/style';
import { Checkbox } from 'vant';

export default Vue.extend({
    components: {
        VanCheckbox: Checkbox,
    },
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
    //         console.log(this._userInfo);
    //         this.form.email = this._userInfo.email;
    //     });
    // },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            vm.initForm();
        });
    },
    computed: {
        country(): any {
            return this.$store.state.country;
        },
    },
    methods: {
        initForm() {
            const phone = this._userInfo.phone.split('-');
            this.form.phone = phone[1] || '';
            this.form.email = this._userInfo.email;
        },
        deposit() {
            const val: boolean = this.$verification.fromVfi([
                {
                    type: 'phone',
                    value: this.form.phone,
                },
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
                    type: 'phone',
                    value: this.form.icePhone,
                },
                {
                    type: 'empty',
                    msg: this.$t('payment.address'),
                    value: this.form.address,
                },
            ]);
            if (this.checked === false) {
                this.$normalToast('请勾选广告发布方协议');
            } else if (val) {
                this.$dialog.confirm({
                    title: '确认申请',
                    messageAlign: 'left',
                    message: `<div class="app-reset-diolog-message">
                        需缴纳<span class="primary-color">
                            ${this._configCommon.OtcMerchantBailAmount} ${(this._configCommon.OtcMerchantBailCoin)}
                        </span>
                        保证金，保证金将从资金余额 扣除，请保证资金余额充足。
                        
                    </div>`,
                }).then(() => {
                    this.otcMerchant();
                });
            }
        },
        otcMerchant() {
            this.changeLoading(true);
            this.$api.otcMerchant({
                phone: `${this.country.tel}-${this.form.phone}`,
                email: this.form.email,
                social_type: this.form.socialType,
                social: this.form.social,
                ice_name: this.form.iceName,
                ice_phone: `${this.country.tel}-${this.form.icePhone}`,
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
