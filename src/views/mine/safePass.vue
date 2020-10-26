<template>
    <div class="realname">
        <TitleHeader :title="$t('mine.safePass')">
            <p class="app-padding40 realname-tip">设置/修改安全密码，用于提现、交易。</p>
            <form class="realname-form app-padding40" action="">
                <!-- <div class="form-item">
                    <Inputs readonly v-model="form.phone" :placeholder="$t('login.phone')"></Inputs>
                </div> -->
                <!-- <div class="form-item">
                    <Inputs v-model="form.code"  placeholder="验证码">
                        <Code :phone="this.form.phone" :type="6"></Code>
                    </Inputs>
                </div> -->
                <div class="form-item">
                    <Inputs v-model="form.password" maxlength="6" :placeholder="$t('login.newPwd')" clearable type="password"></Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.confirmPassword" maxlength="6" :placeholder="$t('login.againEnter')" clearable type="password"></Inputs>
                </div>
            </form>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button @click="auth" v-t="'common.ok'"></Button>
        </div>
        <user-auth ref="UserAuth" :type="3" @save="saveHandle"></user-auth>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    isLoading: boolean;
    form: {
        phone: string;
        password: string;
        confirmPassword: string;
    };
}

export default Vue.extend({
    name: 'SafePass',
    data(): data {
        return {
            isLoading: false,
            form: {
                phone: '',
                password: '',
                confirmPassword: '',
            },
        };
    },
    mounted() {
        this.$nextTick(() => {
            const phone = this._userInfo.phone.split('-');
            this.form.phone = phone[1] || '';
        });
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
            this.$api.changePayPwd({
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
}
</style>
