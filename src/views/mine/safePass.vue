<template>
    <div class="realname">
        <TitleHeader :title="$t('mine.safePass')">
            <p class="app-padding40 realname-tip">设置/修改安全密码，用于提现、交易。</p>
            <form class="realname-form app-padding40" action="">
                <div class="form-item">
                    <Inputs readonly v-model="form.phone" placeholder="手机号"></Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.code"  placeholder="验证码">
                        <Code :phone="this.form.phone" :type="1"></Code>
                    </Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.password" maxlength="6" placeholder="安全密码" clearable type="password"></Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.confirmPassword" maxlength="6" placeholder="再次输入" clearable type="password"></Inputs>
                </div>
            </form>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button @click="saveHandle" v-t="'common.save'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Code from '@/components/code/index.vue';

type data = {
    form: {
        phone: string;
        code: string;
        password: string;
        confirmPassword: string;
    };
}

export default Vue.extend({
    name: 'RealName',
    components: {
        Code,
    },
    data(): data {
        return {
            form: {
                phone: '',
                code: '',
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
    methods: {
        saveHandle() {
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
                    type: 'pay',
                    value: this.form.password,
                },
                {
                    type: 'pwd2',
                    value1: this.form.password,
                    value2: this.form.confirmPassword,
                },
            ]);
            if (val) {
                this.$api.forgetPayPwd({
                    passport: `86-${this.form.phone}`,
                    new_password: this.$md5(`${this.form.password}bagpaysol`),
                    sms_code: this.form.code,
                }).then((res: any) => {
                    if (res.code === 0) {
                        this.$router.go(-1);
                    }
                });
            }
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
