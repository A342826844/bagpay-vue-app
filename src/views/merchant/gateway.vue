<template>
    <div class="merchant-gateway">
        <TitleHeader :title="$t('merchant.gatewayAPI')">
        <div class="app-padding40">
            <h4 class="merchant-gateway-lable app-size-34">{{$t('common.introduction')}}</h4>
            <div class="merchant-gateway-card light-grey-bg app-size-28">
                <p>
                    {{$t('merchant.safeTip5')}}
                </p>
                <p class="merchant-gateway-mt32">
                    {{$t('merchant.safeTip6')}}
                </p>
            </div>
            <h4 class="merchant-gateway-lable app-size-34">{{$t('common.instructions')}}</h4>
            <div class="merchant-gateway-card light-grey-bg app-size-28">
                <p>{{$t('merchant.safeTip7')}}</p>
                <p>{{$t('merchant.safeTip8')}}</p>
            </div>
        </div>
        </TitleHeader>
        <div class="app-size-34 lxa-footer-btn">
            <Button @click="$router.push('/merchant/apply')">{{$t('merchant.downloadAPI')}}</Button>
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
    name: 'MerchantGateway',
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
.merchant-gateway{
    height: 100%;
    text-align: left;
    &-mt32{
        margin-top: 32px;
    }
    &-lable{
        margin: 38px 0;
        &:first-child{
            margin-top: 72px;
        }
    }
    &-card{
        padding: 32px 52px 36px 32px;
        border-radius: 10px;
    }
}
</style>
