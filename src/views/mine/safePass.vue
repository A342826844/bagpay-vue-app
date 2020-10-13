<template>
    <div class="realname">
        <TitleHeader :title="$t('mine.safePass')">
            <p class="app-padding40 realname-tip">设置/修改安全密码，用于提现、交易。</p>
            <form class="realname-form app-padding40" action="">
                <div class="form-item">
                    <Inputs readonly v-model="form.phone" placeholder="手机号"></Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.code"  placeholder="验证码" clearable>
                        <span class="primary-color">发送</span>
                    </Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.password"  placeholder="安全密码" clearable></Inputs>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.confirmPassword"  placeholder="再次输入" clearable></Inputs>
                </div>
            </form>
            <div class="lxa-footer-btn">
                <Button @click="saveHandle" v-t="'common.save'"></Button>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

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
    methods: {
        saveHandle() {
            // TODO
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
