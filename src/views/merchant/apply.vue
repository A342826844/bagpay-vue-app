<template>
    <div class="merchant-apply">
        <TitleHeader title="商户申请">
        <div class="app-padding40">
            <form @submit.prevent="" class="login-form" action="">
                <div class="text-align-l app-size-34 merchant-apply-lable">姓名</div>
                <Inputs
                    class="login-form-item"
                    placeholder="请填写真实姓名"
                    clearable
                    v-model="form.name"
                    autocomplete="username"
                    :autofocus="true"
                    type="text"
                />
                <div class="text-align-l app-size-34 merchant-apply-lable">联系方式</div>
                <Inputs
                    class="login-form-item"
                    placeholder="请填写联系电话"
                    clearable
                    v-model="form.name"
                    autocomplete="username"
                    type="text"
                />
                <div class="text-align-l app-size-34 merchant-apply-lable">网站地址</div>
                <Inputs
                    class="login-form-item"
                    placeholder="填写您的平台网址"
                    clearable
                    v-model="form.name"
                    autocomplete="username"
                    type="text"
                />
            </form>
        </div>
        </TitleHeader>
        <div class="app-size-34 lxa-footer-btn">
            <Button @click="$router.push('/merchant/apply')">提 交</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    form: {
        name: string;
        tel: string;
        url: string;
    };
}

export default Vue.extend({
    name: 'Payment',
    data(): data {
        return {
            form: {
                name: '',
                tel: '',
                url: '',
            },
        };
    },
});
</script>

<style lang="less" scoped>
.merchant-apply{
    height: 100%;
    &-lable{
        margin-top: 55px;
        margin-bottom: 42px;
    }
}
</style>
