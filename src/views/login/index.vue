<template>
    <div class="login">
        <TitleHeader :title="$t('login.loginTitle')">
            <span slot="header" @click="type = (1 - type/1)" class="primary-color app-size-34">
                {{type?$t('login.loginPhone'):$t('login.loginEmail')}}
            </span>
        </TitleHeader>
        <div class="login-box app-padding40">
            <p class="login-tip">{{$t('login.loginTip')}}(USDT、USDC、TUSD......)</p>
            <form @submit.prevent="" class="login-form" action="">
                <Inputs
                    class="login-form-item"
                    v-show="!type"
                    :placeholder="$t('login.phone')"
                    clearable
                    v-model="form.phone"
                    :autofocus="true"
                    autocomplete="username" type="tel"
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
                    class="login-form-item"
                    :placeholder="$t('login.password')"
                    password
                    v-model="form.password"
                    autocomplete="current-password"
                    type="password"
                />
            </form>
            <p class="login-box-link">
                <span @click="goFindAccount" class="primary-color"
                    href="javascript:void(0)" v-t="'login.findAccount'"></span>
            </p>
        </div>
        <div class="lxa-footer-btn">
            <Button :disabled="disabled" @click="loginHandle" v-t="'login.login'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type form = {
    phone: string;
    password: string;
    email: string;
}

type data = {
    islogin: boolean;
    type: 0|1;
    form: form;
}

export default Vue.extend({
    name: 'Login',
    data(): data {
        return {
            islogin: false,
            type: 0,
            form: {
                phone: '',
                password: '',
                email: '',
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'entrylogin') {
                vm.clear();
            }
            if (from.name === 'register') {
                vm.setPhone();
            }
        });
    },
    // beforeRouteLeave(to, from, next) {
    //     const enablePath = (to.name !== 'entry') && (to.name !== 'findaccount') && (to.name !== 'home');
    //     if (enablePath) {
    //         next('/');
    //     }
    //     next();
    // },
    computed: {
        country(): any {
            return this.$store.state.country;
        },
        disabled(): boolean {
            if (this.type) return !(this.form.email && this.form.password);
            return !(this.form.phone && this.form.password);
        },
    },
    methods: {
        clear() {
            this.form = {
                phone: '',
                password: '',
                email: '',
            };
        },
        setPhone() {
            if (Number(this.$route.query.type) === 0) {
                this.form.phone = this.$route.query.phone as string;
                this.type = 0;
            } else if (Number(this.$route.query.type) === 1) {
                this.form.email = this.$route.query.email as string;
                this.type = 1;
            }
        },
        loginHandle() {
            if (this._loading) return;
            const vfi: boolean = this.$verification.fromVfi([
                {
                    type: this.type ? 'email' : 'phone',
                    value: this.type ? this.form.email : this.form.phone,
                },
                {
                    type: 'empty',
                    msg: this.$t('login.password'),
                    value: this.form.password,
                },
            ]);
            if (vfi) {
                this.changeLoading(true);
                this.$api.login({
                    passport: this.type ? this.form.email : `${this.country.tel}-${this.form.phone}`,
                    password: this.$md5(`${this.form.password}bagpaysol`),
                }).then((res: any) => {
                    if (res.code === 0) {
                        // this.$store.commit('setLoginState', 1);
                        this.$store.commit('setsessionId', res.data);
                        this.getAllData();
                    }
                }).catch(() => {
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
        // 忘记密码
        goFindAccount() {
            this.$router.push(`/findaccount?phone=${this.form.phone}`);
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
