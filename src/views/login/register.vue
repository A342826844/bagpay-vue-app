<template>
  <div class="login">
    <TitleHeader :title="$t('login.registerTitle')">
      <span slot="header" @click="type = (1 - type/1)" class="primary-color app-size-34">{{type?'手机注册':'邮箱注册'}}</span>
      <div class="login-box app-padding40">
        <p class="login-tip">
          {{ $t("login.loginTip") }}(USDT、USDC、TUSD......)
        </p>
        <form @submit.prevent="" class="login-form" action="">
          <Inputs
            class="login-form-item"
            :placeholder="$t('login.nickname')"
            clearable
            v-model="form.nickname"
            autocomplete="username"
            :autofocus="true"
            type="text"
          />
          <Inputs
            class="login-form-item"
            :placeholder="$t('login.phone')"
            v-show="!type"
            clearable
            v-model="form.phone"
            autocomplete="username"
            type="text"
          >
            <span @click="$router.push('/login/search')" class="primary-color login-form-item-country">+ {{country.tel}} </span>
          </Inputs>
          <Inputs
            class="login-form-item"
            v-show="type"
            :placeholder="$t('login.email')"
            clearable
            v-model="form.email"
            :autofocus="true"
            autocomplete="username" type="email"
          />
          <Inputs
            class="login-form-item img_code_input"
            :placeholder="$t('login.imgCode')"
            v-model="form.imgCode"
            autocomplete="username"
            type="text"
          >
            <img class="code-img" :src="imgUrl" alt="" @click="getImg" />
          </Inputs>
          <Inputs
            class="login-form-item"
            :placeholder="$t('login.vCode')"
            v-model="form.code"
            autocomplete="username"
            type="text"
          >
            <Code
              :phone="type ? form.email : form.phone"
              :imgCode="form.imgCode"
              :vType="type ? 'email' : 'phone'"
              :imgCodeId="imgCode"
              :type="1"
            ></Code>
          </Inputs>
          <Inputs
            class="login-form-item"
            :placeholder="$t('login.password')"
            password
            v-model="form.password"
            autocomplete="current-password"
            type="password"
          />
          <Inputs
            class="login-form-item"
            :placeholder="`${$t('login.invite_code')} (${$t('common.optional')})`"
            clearable
            v-model="form.invite_code"
            autocomplete="username" type="text"
          />
        </form>
      </div>

    </TitleHeader>
    <div class="lxa-footer-btn">
      <p class="login-protocol">
        注册及同意 《<span class="primary-color" @click.stop="$router.push('/mine/protocol')">{{$app_mark}}{{ $t("login.userProtocol") }}</span>》
      </p>
      <Button @click="loginHandle" v-t="'login.register'"
        :disabled="disabled"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Code from '@/components/code/index.vue';

const assetsS = require('@/assets/img/common/confirm.gif');

type form = {
  code: string;
  nickname: string;
  phone: string;
  email: string;
  password: string;
  imgCode: string;
  invite_code: string;
};

type data = {
  imgUrl: string;
  imgCode: string;
  type: 0|1;
  form: form;
  checked: boolean;
};

export default Vue.extend({
    name: 'Register',
    components: {
        Code,
    },
    data(): data {
        return {
            imgUrl: '',
            imgCode: '',
            checked: true,
            type: 0,
            form: {
                code: '',
                nickname: '',
                phone: '',
                email: '',
                password: '',
                imgCode: '',
                invite_code: '',
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'entry') {
                vm.clear();
            }
        });
    },
    created() {
        this.getImg();
        this.form.phone = (this.$route.query.phone as string) || '';
    },
    computed: {
        country() {
            return this.$store.state.country;
        },
        disabled(): boolean {
            if (this.type) return !(this.form.nickname && this.form.email && this.form.imgCode && this.form.code && this.form.password);
            return !(this.form.nickname && this.form.phone && this.form.imgCode && this.form.code && this.form.password);
        },
    },
    methods: {
        clear() {
            this.form = {
                code: '',
                nickname: '',
                phone: '',
                email: '',
                password: '',
                imgCode: '',
                invite_code: '',
            };
        },
        loginHandle() {
            if (this._loading) return;
            const vfi: boolean = this.$verification.fromVfi([
                {
                    type: 'empty',
                    value: this.form.nickname,
                },
                {
                    type: this.type ? 'email' : 'phone',
                    value: this.type ? this.form.email : this.form.phone,
                },
                {
                    type: 'empty',
                    value: this.form.imgCode,
                },
                {
                    type: 'code',
                    value: this.form.code,
                },
                {
                    type: 'pwd',
                    value: this.form.password,
                },
            ]);
            if (vfi) {
                this.changeLoading(true);
                this.$api.register({
                    nickname: this.form.nickname,
                    passport: this.type ? this.form.email : `${this.country.tel}-${this.form.phone}`,
                    password: this.$md5(`${this.form.password}bagpaysol`),
                    verification_code: this.form.code,
                    invite_code: this.form.invite_code,
                }).then((res: any) => {
                    if (res.code === 0) {
                        this.$toast({
                            message: `${this.$t('login.registSuccess')}`,
                            icon: assetsS,
                            onClose: () => {
                                this.$router.replace(`/login?phone=${this.form.phone}&email=${this.form.email}&type=${this.type}`);
                            },
                        });
                    }
                }).finally(() => {
                    this.changeLoading(false);
                });
            }
        },
        // 获取图片
        getImg() {
            this.$api
                .getImages()
                .then((res: any) => {
                    this.form.imgCode = '';
                    this.imgUrl = res.data.data;
                    this.imgCode = res.data.id;
                });
        },
    },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
