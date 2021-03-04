<template>
    <div class="login">
        <TitleHeader :title="'手机号修改'"></TitleHeader>
        <div class="login-box app-padding40">
            <p class="login-tip">{{'修改绑定新的手机号,更换手机号后,需重新 登录,请谨慎操作！'}}</p>
            <form @submit.prevent="" class="login-form" action="">
                <p class="login-form-item">当前手机号</p>
                <Inputs
                    class="login-form-item"
                    v-show="!type"
                    :placeholder="$t('login.phone')"
                    clearable
                    v-model="_userInfo.phone"
                    :autofocus="true"
                    autocomplete="username" type="tel"
                >
                    <!-- <span @click="$router.push('/login/search')" class="primary-color login-form-item-country">+ {{country.tel}} </span> -->
                </Inputs>
                <Inputs
                    class="login-form-item"
                    v-show="type"
                    :placeholder="$t('login.email')"
                    clearable
                    v-model="_userInfo.email"
                    :autofocus="true"
                    autocomplete="username" type="email"
                />
            </form>
        </div>
        <div class="lxa-footer-btn">
            <Button @click="auth" v-t="'mine.nextStep'"></Button>
        </div>
        <user-auth ref="UserAuth" :type="1" @save="loginHandle"></user-auth>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type form = {
    phone: string;
    password: string;
    email: string;
    code: string;
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
                code: '',
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
                code: '',
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
        auth() {
            (this.$refs.UserAuth as any).open();
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
.login{
    position: relative;
    height: 100%;
    overflow: auto;
    font-size: 34px;
    &-box{
        text-align: left;
        margin-top: 35px;
        &-tip{
            color: #575757;
        }
        &-link{
            margin-top: 58px;
            text-align: right;
        }
    }
    &-form{
        margin-top: 42px;
        &-check{
            justify-content: center;
        }
        &-item{
            margin-bottom: 30px;
            &:last-child{
                margin-bottom: 0;
            }
            &-country{
                &::after {
                    content: '';
                    // vertical-align: middle;
                    display: inline-block;
                    border: 10px solid;
                    width: 0;
                    height: 0;
                    border-left-color: transparent;
                    border-right-color: transparent;
                    border-bottom-color: transparent;
                }
            }
        }
    }
    &-protocol{
        font-size: 28px;
        line-height: 28px;
        margin: 30px 0;
    }
}
</style>
