<template>
    <div class="login">
        <TitleHeader :title="$t('login.loginTitle')" />
        <div class="login-box app-padding40">
            <p class="login-tip">{{$t('login.loginTip')}}(USDT、USDC、TUSD......)</p>
            <form @submit.prevent="" class="login-form" action="">
                <Inputs
                    class="login-form-item"
                    :placeholder="$t('login.phone')"
                    clearable
                    v-model="form.phone"
                    autocomplete="username" type="text"
                />
                <Inputs
                    class="login-form-item"
                    :placeholder="$t('login.password')"
                    clearable
                    v-model="form.password"
                    autocomplete="current-password"
                    type="password"
                />
            </form>
            <p class="login-box-link">
                <span @click="goFindAccount" class="primary-color" href="javascript:void(0)" v-t="'login.findAccount'"></span>
            </p>
        </div>
        <div class="lxa-footer-btn">
            <Button @click="loginHandle" v-t="'login.login'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type form = {
    phone: string;
    password: string;
}

type data = {
    islogin: boolean;
    form: form;
}

export default Vue.extend({
    name: 'Login',
    data(): data {
        return {
            islogin: false,
            form: {
                phone: '',
                password: '',
            },
        };
    },
    methods: {
        loginHandle() {
            this.$api.login({
                passport: `86-${this.form.phone}`,
                password: this.$md5(`${this.form.password}bagpaysol`),
            }).then((res: any) => {
                if (res.code === 0) {
                    this.$router.push({
                        name: 'home',
                    });
                }
                console.log(res);
            });
        },
        goFindAccount() {
            this.$router.push(`/findaccount?phone=${this.form.phone}`);
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
