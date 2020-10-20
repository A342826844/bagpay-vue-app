<template>
  <div class="login">
    <TitleHeader :title="$t('login.findAccountTitle')" />
    <div class="login-box app-padding40">
      <p class="login-tip">{{ $t("login.findAccountTip") }}</p>
      <form @submit.prevent="" class="login-form" action="">
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
      <Button @click="loginHandle" v-t="'login.done'"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type form = {
  code: string;
  phone: string;
  password: string;
  confirmPassword: string;
  imgCode: string;
};

type data = {
  islogin: boolean;
  imgUrl: string;
  imgCode: string;
  form: form;
};

export default Vue.extend({
    name: 'Findaccount',
    data(): data {
        return {
            islogin: false,
            imgUrl: '',
            imgCode: '',
            form: {
                code: '',
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
            if (this.form.phone.length !== 11) {
                console.log('请输入正确手机号');
            } else if (!this.form.imgCode) {
                console.log('请输入图形码');
            } else if (this.form.code.length !== 4) {
                console.log('请输入正确验证码');
            } else if (!this.form.password) {
                console.log('请输入登录密码');
            } else if (this.form.password !== this.form.confirmPassword) {
                console.log('请再次输入登录密码且一致');
            } else {
                this.$api
                    .forgetPwd({
                        passport: `86-${this.form.phone}`,
                        new_password: this.$md5(`${this.form.password}bagpaysol`),
                        sms_code: this.form.code,
                    })
                    .then((res: any) => {
                        if (res.code === 0) {
                            this.$router.push({
                                name: 'login',
                            });
                        }
                        console.log(res);
                    });
            }
        },
        // 获取图片
        getImg() {
            this.$api.getImages().then((res: any) => {
                this.form.imgCode = '';
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
                this.$api
                    .registerCode({
                        phone: `86-${this.form.phone}`,
                        type: 1,
                        captcha: this.form.imgCode,
                        captcha_id: this.imgCode,
                    })
                    .then((res: any) => {
                        if (res.code === 0) {
                            console.log('发送成功');
                        }
                    });
            }
        },
    },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
