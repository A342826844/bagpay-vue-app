<template>
    <div class="merchant-gateway">
        <TitleHeader title="支付网关API">
        <div class="app-padding40">
            <h4 class="merchant-gateway-lable app-size-34">简介</h4>
            <div class="merchant-gateway-card light-grey-bg app-size-28">
                <p>
                    Bagpay是使用USDT的最佳支付系统，不论收
                    款或付款，我们通通包办到好，不管您是电脑网
                    站还是APP，我们都有提供API与SDK的模式让
                    您快速接入。
                </p>
                <p class="merchant-gateway-mt32">
                    支付API(Support API)，是Bagpay对外提供带
                    收款，付款业务。您可以通过本文档提供的简单
                    的接口提交支付、买卖、交易等API接口。
                </p>
            </div>
            <h4 class="merchant-gateway-lable app-size-34">使用说明</h4>
            <div class="merchant-gateway-card light-grey-bg app-size-28">
                <p>我们支持 HTTP 或者 HTTPS 请求，允许 GET 和 POST 方法。</p>
                <p>详细请前往下载API文档。</p>
            </div>
        </div>
        </TitleHeader>
        <div class="app-size-34 lxa-footer-btn">
            <Button @click="$router.push('/merchant/apply')">下载API文档</Button>
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
