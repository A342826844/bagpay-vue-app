<template>
  <div class="login">
    <TitleHeader :title="$t('mine.changePwd')">
      <div class="login-box app-padding40">
        <p class="login-tip">{{ $t("mine.changePwdTip") }}</p>
        <form @submit.prevent="" class="login-form" action="">
          <Inputs
            class="login-form-item"
            :placeholder="$t('login.newPwd')"
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
      <Button @click="auth" v-t="'login.done'" :disabled="!form.password || !form.confirmPassword"></Button>
    </div>
    <user-auth ref="UserAuth" :type="1" @save="loginHandle"></user-auth>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type form = {
  password: string;
  confirmPassword: string;
};

type data = {
  isLoading: boolean;
  form: form;
};

export default Vue.extend({
    name: 'ChangePwd',
    data(): data {
        return {
            isLoading: false,
            form: {
                password: '',
                confirmPassword: '',
            },
        };
    },
    computed: {
        country() {
            return this.$store.state.country;
        },
    },
    methods: {
        auth() {
            if (this.isLoading) return;
            const vfi: boolean = this.$verification.fromVfi([
                {
                    type: 'pay',
                    value: this.form.password,
                },
                {
                    type: 'pwd2',
                    value1: this.form.password,
                    value2: this.form.confirmPassword,
                },
            ]);
            if (vfi) {
                (this.$refs.UserAuth as any).open();
            }
        },
        loginHandle(auth: any) {
            if (this.isLoading) return;
            this.isLoading = true;
            this.changeLoading(true);
            this.$api.changePwd({
                new_password: this.$md5(`${this.form.password}bagpaysol`),
                ...auth,
            })
                .then((res: any) => {
                    if (res.code === 0) {
                        this.$router.push({
                            name: 'login',
                        });
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                    this.changeLoading(false);
                });
        },
    },
});
</script>

<style lang="less" scoped>
@import "../login/index.less";
</style>
