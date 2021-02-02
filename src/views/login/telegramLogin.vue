<template>
  <div class="login">
    <TitleHeader :title="$t('login.tgLogin')">
        <!-- <span slot="header" @click="type = (1 - type/1)"
        class="primary-color app-size-34">{{type?$t('login.findPhone'):$t('login.findEmail')}}</span> -->
        <div class="login-box app-padding40">
            <!-- <p class="login-tip">{{ $t("验证码登录") }}</p> -->
            <p class="login-tip">{{$t('login.loginTip')}}(USDT、USDC、TUSD......)</p>
            <form @submit.prevent="loginHandle" class="login-form" action="">
                <Inputs
                    class="login-form-item"
                    :placeholder="$t('login.tgLoginId')"
                    clearable
                    v-show="!type"
                    v-model="form.phone"
                    autocomplete="username"
                    type="tel"
                >
                    <!-- <span @click="$router.push('/login/search')" class="primary-color login-form-item-country">+ {{country.tel}} </span> -->
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
                    <Code
                        :vType="'telegramId'"
                        :phone="form.phone"
                        :imgCode="form.imgCode"
                        :imgCodeId="imgCode"
                        :type="2"
                    ></Code>
                </Inputs>
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
    name: 'TelegramLogin',
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
            // if (this.type) return !(this.form.email && this.form.imgCode && this.form.code && this.form.password);
            // return !(this.form.phone && this.form.imgCode && this.form.code && this.form.password);
            if (this.type) return !(this.form.email && this.form.imgCode && this.form.code && this.form.password);
            return !(this.form.phone);
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
                    type: 'tId',
                    value: this.form.phone,
                },
                {
                    type: 'code',
                    value: this.form.code,
                },
            ]);
            if (vfi) {
                this.$api.loginTelegramId({
                    uid: this.form.phone,
                    code: this.form.code,
                }).then((res: any) => {
                    this.$store.commit('setsessionId', res.data);
                    this.getAllData();
                }).finally(() => {
                    this.isLoading = false;
                    this.changeLoading(false);
                });
            }
        },
        getAllData() {
            this.changeLoading(true);
            Promise.all([
                this.getCoinList(),
                this.initUserInfo(),
                this.getUserBankList(),
            ]).then(() => {
                this.$store.commit('setLoginState', 1);
                // this.$store.commit('setsessionId', data);
                const loginPath = sessionStorage.getItem('loginPath');
                if (loginPath) {
                    if (isNaN(Number(loginPath))) {
                        // 先返回引导页，再替换路由，这样用户点返回键就是返回到进入引导页前的那个页面
                        this.$router.go(-1);
                        setTimeout(() => {
                            // 不使用setTimeout 就会报错或者不跳转
                            this.$router.replace(loginPath);
                        }, 100);
                    } else {
                        this.$router.go(Number(loginPath));
                    }
                    sessionStorage.removeItem('loginPath');
                    return;
                }
                this.$router.push({
                    name: 'home',
                });
            }).catch(() => {
                this.$normalToast(this.$t('login.loginFailed'));
            }).finally(() => {
                this.changeLoading(false);
            });
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
