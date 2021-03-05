<template>
    <div class="merchant-apply">
        <TitleHeader :title="$t('merchant.applyMerchant')">
        <div class="app-padding40">
            <form @submit.prevent="" class="login-form" action="">
                <div class="text-align-l app-size-34 merchant-apply-lable">{{$t('common.name1')}}</div>
                <Inputs
                    class="login-form-item"
                    :placeholder="$t('common.nameErr')"
                    clearable
                    v-model="form.name"
                    autocomplete="username"
                    :autofocus="true"
                    type="text"
                />
                <div class="text-align-l app-size-34 merchant-apply-lable">{{$t('common.contact')}}</div>
                <Inputs
                    class="login-form-item"
                    :placeholder="$t('common.placeTel')"
                    clearable
                    v-model="form.name"
                    autocomplete="username"
                    type="text"
                />
                <div class="text-align-l app-size-34 merchant-apply-lable">{{$t('common.webUrl')}}</div>
                <Inputs
                    class="login-form-item"
                    :placeholder="$t('common.placeUrl')"
                    clearable
                    v-model="form.name"
                    autocomplete="username"
                    type="text"
                />
            </form>
        </div>
        </TitleHeader>
        <div class="app-size-34 lxa-footer-btn">
            <Button @click="$router.push('/merchant/apply')">{{$t('common.submit')}}</Button>
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
    name: 'MerchantApply',
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
