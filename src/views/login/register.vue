<template>
  <div class="login">
    <TitleHeader :title="$t('login.registerTitle')" />
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
          type="text"
        />
        <Inputs
          class="login-form-item"
          :placeholder="$t('login.phone')"
          clearable
          v-model="form.phone"
          autocomplete="username"
          type="text"
        />
        <Inputs
          class="login-form-item"
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
          <span
            @click="sendHandle"
            class="primary-color"
            v-t="'login.send'"
          ></span>
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
    <div class="lxa-footer-btn">
      <Button @click="loginHandle" v-t="'login.register'"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type form = {
  code: string;
  nickname: string;
  phone: string;
  password: string;
  confirmPassword: string;
  imgCode: string;
};

type data = {
  islogin: boolean;
  imgUrl: string;
  imgCode: string;
  isImgCode: boolean;
  form: form;
};

export default Vue.extend({
    name: 'Register',
    components: {},
    data(): data {
        return {
            islogin: false,
            imgUrl: '',
            imgCode: '',
            isImgCode: true,
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
    created() {
        this.getImg();
        this.form.phone = (this.$route.query.phone as string) || '';
    },
    methods: {
        loginHandle() {
            if (!this.form.nickname) {
                console.log('请输入昵称');
            } else if (!this.form.phone) {
                console.log('请输入手机号');
            } else if (!this.form.imgCode) {
                console.log('请输入图形码');
            } else if (!this.form.code) {
                console.log('请输入验证码');
            } else if (!this.form.password) {
                console.log('请输入登录密码');
            } else if (this.form.password !== this.form.confirmPassword) {
                console.log('请再次输入登录密码且一致');
            } else {
                this.$api.register();
            }
        },
        // 获取图片
        getImg() {
            this.$api
                .getImages()
                .then((res: any) => {
                    console.log(321, res);
                    this.imgUrl = res.data.data;
                    this.imgCode = res.data.id;
                });
        },
        sendHandle() {
            if (!this.form.phone) {
                console.log('请输入手机号');
            } else if (!this.form.imgCode) {
                console.log('请输入图形码');
            } else {
                this.$api.registerCode({
                    phone: `86-${this.form.phone}`,
                    type: 1,
                    captcha: this.imgUrl,
                    captcha_id: this.form.imgCode,
                });
            }
            // TODO
        },
    },
});
</script>

<style lang="less" scoped>
@import "./index.less";
.code-img {
  background-color: #5894ee;
  vertical-align: middle;
  margin-bottom: 5px;
  margin-right: 10px;
}
</style>
