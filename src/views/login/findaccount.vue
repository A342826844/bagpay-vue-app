<template>
  <div class="login">
    <TitleHeader :title="$t('login.findAccountTitle')">
        <span slot="header" @click="type = (1 - type/1)" class="primary-color app-size-34">{{type?'手机找回':'邮箱找回'}}</span>
        <div class="login-box app-padding40">
        <p class="login-tip">{{ $t("login.findAccountTip") }}</p>
            <form @submit.prevent="" class="login-form" action="">
                <Inputs
                    class="login-form-item"
                    :placeholder="$t('login.phone')"
                    clearable
                    v-show="!type"
                    v-model="form.phone"
                    autocomplete="username"
                    type="tel"
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
                        :vType="type ? 'email' : 'phone'"
                        :phone="type ? form.email : form.phone"
                        :imgCode="form.imgCode"
                        :imgCodeId="imgCode"
                        :type="1"
                    ></Code>
                </Inputs>
                <Inputs
                    class="login-form-item"
                    :placeholder="$t('login.newPwd')"
                    password
                    v-model="form.password"
                    autocomplete="current-password"
                    type="password"
                />
            </form>
        </div>
    </TitleHeader>
    <div class="lxa-footer-btn">
      <Button @click="loginHandle" v-t="'login.done'"
        :disabled="disabled"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Code from '@/components/code/index.vue';

type form = {
  code: string;
  phone: string;
  email: string;
  password: string;
  imgCode: string;
};

type data = {
  isLoading: boolean;
  imgUrl: string;
  imgCode: string;
  form: form;
  type: 1|0; // 账号类型，1为邮箱，0位手机号
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
            type: 0,
            form: {
                code: '',
                phone: '',
                email: '',
                password: '',
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
        disabled(): boolean {
            if (this.type) return !(this.form.email && this.form.imgCode && this.form.code && this.form.password);
            return !(this.form.phone && this.form.imgCode && this.form.code && this.form.password);
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
                email: '',
                phone: '',
                password: '',
                imgCode: '',
            };
        },
        loginHandle() {
            if (this.isLoading) return;
            this.isLoading = true;
            this.changeLoading(true);
            const vfi: boolean = this.$verification.fromVfi([
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
                this.$api
                    .forgetPwd({
                        passport: this.type ? this.form.email : `${this.country.tel}-${this.form.phone}`,
                        new_password: this.$md5(`${this.form.password}bagpaysol`),
                        sms_code: this.form.code,
                        email_code: this.form.code,
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
