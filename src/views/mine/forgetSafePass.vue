<template>
    <div class="realname">
        <TitleHeader :title="step === 1 ? $t('mine.forgetSafePass') : $t('mine.confirmSafePass')">
            <p class="app-padding40 realname-tip" v-show="step === 1">{{$t('mine.payPwdTip3')}}</p>
            <p class="app-padding40 realname-tip" v-show="step === 2">{{$t('mine.payPwdTip2')}}</p>
            <form class="realname-form app-padding40" action="" v-show="step === 1">
               <!-- 密码输入框 -->
                <V-Pass-Input
                gutter="10"
                :value="form.password"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
                />
                <!-- 数字键盘 -->
                <V-Num-Key
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false"
                />
            </form>
            <form class="realname-form app-padding40" action="" v-show="step === 2">
               <!-- 密码输入框 -->
                <V-Pass-Input
                gutter="10"
                :value="form.confirmPassword"
                :focused="showKeyboard2"
                @focus="showKeyboard2 = true"
                />
                <!-- 数字键盘 -->
                <V-Num-Key
                :show="showKeyboard2"
                @input="onInput2"
                @delete="onDelete2"
                @blur="showKeyboard2 = false"
                />
                <div class="re_input" @click="clear">{{$t('mine.reInput')}}</div>
            </form>
        </TitleHeader>
        <!-- <div class="lxa-footer-btn">
            <Button @click="auth" v-t="'common.ok'"></Button>
        </div> -->
        <user-auth ref="UserAuth" :type="4" @save="saveHandle"></user-auth>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    isLoading: boolean;
    step: number;
    showKeyboard: boolean;
    showKeyboard2: boolean;
    form: {
        phone: string;
        password: string;
        confirmPassword: string;
    };
}

export default Vue.extend({
    name: 'ForgetSafePass',
    data(): data {
        return {
            isLoading: false,
            step: 1,
            showKeyboard: true,
            showKeyboard2: false,
            form: {
                phone: '',
                password: '',
                confirmPassword: '',
            },
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.form.phone = this._getPhone;
        });
    },
    computed: {
        country() {
            return this.$store.state.country;
        },
    },
    methods: {
        clear() {
            this.form.password = '';
            this.form.confirmPassword = '';
            this.showKeyboard = true;
            this.step = 1;
        },
        onInput(key: any) {
            this.form.password = (this.form.password + key).slice(0, 6);
            if (this.form.password.length === 6) {
                this.showKeyboard2 = true;
                this.step = 2;
            }
        },
        onInput2(key: any) {
            this.form.confirmPassword = (this.form.confirmPassword + key).slice(0, 6);
            if (this.form.confirmPassword.length === 6) {
                this.auth();
            }
        },
        onDelete() {
            this.form.password = this.form.password.slice(0, this.form.password.length - 1);
        },
        onDelete2() {
            this.form.confirmPassword = this.form.confirmPassword.slice(0, this.form.confirmPassword.length - 1);
        },
        auth() {
            if (this.isLoading) return;
            const vfi: boolean = this.$verification.fromVfi([
                {
                    type: 'phone',
                    value: this.form.phone,
                },
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
        saveHandle(auth: any) {
            if (this.isLoading) return;
            this.isLoading = true;
            this.changeLoading(true);
            this.$api.forgetPayPwd({
                passport: `${this.country.tel}-${this.form.phone}`,
                new_password: this.$md5(`${this.form.password}bagpaysol`),
                ...auth,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.initUserInfo();
                    this.$router.go(-1);
                }
            }).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
    },
});
</script>

<style lang="less" scoped>
.realname{
    height: 100%;
    overflow: scroll;
    font-size: 34px;
    &-tip{
        margin-top: 34px;
        text-align: left;
    }
    &-form{
        margin-top: 109px;
        .form-item{
            margin-top: 30px;
        }
    }
    .re_input{
        color: #5894EE;
        margin-top: 90px;
    }
}
</style>
