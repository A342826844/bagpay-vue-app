<template>
  <div class="login">
    <TitleHeader :title="$t('login.registerTitle')">
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
            clearable
            v-model="form.phone"
            autocomplete="username"
            type="text"
          >
            <span @click="$router.push('/login/search')" class="primary-color login-form-item-country">+ {{country.tel}} </span>
          </Inputs>
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
            <Code :phone="form.phone" :imgCode="form.imgCode" :imgCodeId="imgCode" :type="1"></Code>
          </Inputs>
          <Inputs
            class="login-form-item"
            :placeholder="$t('login.password')"
            clearable
            v-model="form.password"
            autocomplete="current-password"
            type="password"
          />
          <Inputs
            class="login-form-item"
            :placeholder="$t('login.againEnter')"
            clearable
            v-model="form.confirmPassword"
            autocomplete="current-password"
            type="password"
          />
        </form>
      </div>

    </TitleHeader>
    <div class="lxa-footer-btn">
      <Button @click="loginHandle" v-t="'login.register'"
        :disabled="!form.nickname || !form.phone || !form.imgCode || !form.code || !form.password || !form.confirmPassword"></Button>
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
  password: string;
  confirmPassword: string;
  imgCode: string;
};

type data = {
  imgUrl: string;
  imgCode: string;
  form: form;
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
            form: {
                code: '',
                nickname: '',
                phone: '',
                password: '',
                confirmPassword: '',
                imgCode: '',
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
        console.log(navigator.appVersion);
        this.getImg();
        this.form.phone = (this.$route.query.phone as string) || '';
    },
    computed: {
        country() {
            return this.$store.state.country;
        },
    },
    methods: {
        clear() {
            this.form = {
                code: '',
                nickname: '',
                phone: '',
                password: '',
                confirmPassword: '',
                imgCode: '',
            };
        },
        loginHandle() {
            if (this._loading) return;
            const vfi: boolean = this.$verification.fromVfi([
                {
                    type: 'name',
                    value: this.form.nickname,
                },
                {
                    type: 'phone',
                    value: this.form.phone,
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
                {
                    type: 'pwd2',
                    value1: this.form.password,
                    value2: this.form.confirmPassword,
                },
            ]);
            if (vfi) {
                this.changeLoading(true);
                this.$api.register({
                    nickname: this.form.nickname,
                    passport: `${this.country.tel}-${this.form.phone}`,
                    password: this.$md5(`${this.form.password}bagpaysol`),
                    verification_code: this.form.code,
                }).then((res: any) => {
                    if (res.code === 0) {
                        this.$toast({
                            message: '注册成功',
                            icon: assetsS,
                            onClose: () => {
                                this.$router.replace(`/login?phone=${this.form.phone}`);
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
