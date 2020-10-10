<template>
    <div class="login">
        <TitleHeader :title="$t('login.loginTitle')" />
        <div class="login-box">
            <p class="login-">你将会拥有多链钱包(USDT、USDC、TUSD等......)</p>
            <form class="login-form" action="">
                <Input class="login-form-item" clearable v-model="phone" autocomplete="username" type="text"/>
                <Input class="login-form-item" clearable v-model="password" autocomplete="current-password" type="password"/>
            </form>
        </div>
        <div class="login-btn">
            <Button @click="loginHandle">登录</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    islogin: boolean;
    phone: string;
    password: string;
}

export default Vue.extend({
    name: 'Home',
    data(): data {
        return {
            islogin: false,
            phone: '',
            password: '',
        };
    },
    methods: {
        loginHandle() {
            console.log(this.phone);
            console.log(this.password);
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
