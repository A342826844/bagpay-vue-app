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
    <div class="lxa-footer-btn">
      <Button @click="loginHandle" v-t="'login.done'"
        :disabled="!form.phone || !form.imgCode || !form.code || !form.password || !form.confirmPassword"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Code from '@/components/code/index.vue';

type form = {
  code: string;
  phone: string;
  password: string;
  confirmPassword: string;
  imgCode: string;
};

type data = {
  isLoading: boolean;
  imgUrl: string;
  imgCode: string;
  form: form;
};

export default Vue.extend({
    name: 'Findaccount',
    components: {
        Code,
    },
    data(): data {
        return {
            isLoading: false,
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
    computed: {
        country() {
            return this.$store.state.country;
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'login') {
                vm.clear();
            }
        });
    },
    methods: {
        clear() {
            this.form = {
                code: '',
                phone: '',
                password: '',
                confirmPassword: '',
                imgCode: '',
            };
        },
        loginHandle() {
            if (this.isLoading) return;
            this.isLoading = true;
            this.changeLoading(true);
            const vfi: boolean = this.$verification.fromVfi([
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
                this.$api
                    .forgetPwd({
                        passport: `${this.country.tel}-${this.form.phone}`,
                        new_password: this.$md5(`${this.form.password}bagpaysol`),
                        sms_code: this.form.code,
                    })
                    .then((res: any) => {
                        if (res.code === 0) {
                            this.$router.go(-1);
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                        this.changeLoading(false);
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
    },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
