<template>
  <div class="login">
    <TitleHeader :title="$t('mine.changePwd')">
      <div class="login-box app-padding40">
        <p class="login-tip">{{ $t("mine.changePwdTip") }}</p>
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
            :placeholder="$t('login.vCode')"
            v-model="form.code"
            autocomplete="username"
            type="text"
          >
            <Code :phone="this.form.phone" :type="1"></Code>
          </Inputs>
          <Inputs
            class="login-form-item"
            :placeholder="$t('login.oldPwd')"
            clearable
            v-model="form.oldPwd"
            autocomplete="current-password"
            type="password"
          />
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
      <Button @click="loginHandle" v-t="'login.done'"></Button>
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
  oldPwd: string;
};

type data = {
  islogin: boolean;
  form: form;
};

export default Vue.extend({
    name: 'ChangePwd',
    components: {
        Code,
    },
    data(): data {
        return {
            islogin: false,
            form: {
                code: '',
                phone: '',
                password: '',
                confirmPassword: '',
                oldPwd: '',
            },
        };
    },
    created() {
        this.$nextTick(() => {
            const phone = this._userInfo.phone.split('-');
            this.form.phone = phone[1] || '';
        });
    },
    methods: {
        loginHandle() {
            const val: boolean = this.$verification.fromVfi([
                {
                    type: 'phone',
                    value: this.form.phone,
                },
                {
                    type: 'code',
                    value: this.form.code,
                },
                {
                    type: 'pwd',
                    value: this.form.oldPwd,
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
            if (val) {
                this.$api
                    .changePwd({
                        passport: `86-${this.form.phone}`,
                        password: this.$md5(`${this.form.oldPwd}bagpaysol`),
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
    },
});
</script>

<style lang="less" scoped>
@import "../login/index.less";
</style>
