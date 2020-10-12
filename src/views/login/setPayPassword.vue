<template>
    <div class="login">
        <TitleHeader :title="$t('login.setPayPassTitle')" />
        <div class="login-box app-padding40">
            <p class="login-tip">{{$t('login.setPayPassTip')}}</p>
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
                    :placeholder="$t('login.vCode')"
                    v-model="form.code"
                    autocomplete="username" type="text"
                >
                    <span @click="sendHandle" class="primary-color" v-t="'login.send'"></span>
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
}

type data = {
    islogin: boolean;
    form: form;
}

export default Vue.extend({
    name: 'SetPayPassword',
    data(): data {
        return {
            islogin: false,
            form: {
                code: '',
                phone: '',
                password: '',
                confirmPassword: '',
            },
        };
    },
    created() {
        this.form.phone = (this.$route.query.phone as string) || '';
    },
    methods: {
        loginHandle() {
            console.log(this.form);
        },
        sendHandle() {
            // TODO
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
