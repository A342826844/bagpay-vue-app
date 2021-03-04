<template>
    <div class="merchant light-grey-bg">
        <div class="merchant-header">
            <Headers bold theme="primary">
                <h4 slot="left">
                    <span class="app-size-45 vertical-m" v-t="'merchant.title'"></span>
                </h4>
            </Headers>
            <div class="merchant-header-fringe primary-bg"></div>
        </div>
        <div class="merchant-body">
            <ShowCard class="margin-b40" divider direction="row">
                <div class="text-align-l" slot="slot1">
                    <p>{{$t('merchant.balance')}}(USDT) <span class="triangle-r margin-l16"></span></p>
                    <b @click="$router.push('/merchant/fund?symbol=usdt')" class="primary-color app-size-45">72 500.00</b>
                    <Button @click="$router.push('/merchant/fund')" class="app-size-22" size="micro">{{$t('merchant.fund')}}</Button>
                </div>
                <div class="text-align-r" slot="slot2">
                    <p>{{$t('merchant.balanceToday')}}(USDT) <span class="triangle-r margin-l16"></span></p>
                    <b @click="$router.push('/merchant/record')" class="primary-color app-size-45">72 500.00</b>
                    <Button @click="$router.push('/merchant/record')" class="app-size-22" size="micro">{{$t('merchant.balanceRecord')}}</Button>
                </div>
            </ShowCard>
            <div class="flex-between merchant-body-mark margin-b40">
                <ShowCard class="mark1 text-align-l">
                    <h5 class="app-size-28 mark1-title">{{$t('merchant.fastAndSafe')}}</h5>
                    <div class="flex-between-c">
                        <img class="img1" src="@/assets/img/merchant/otc.png" alt="">
                        <p>
                            {{$t('merchant.fastAndSafe')}}
                            ·{{$t('merchant.safeTip1')}}
                            <br/>
                            ·{{$t('merchant.safeTip2')}}
                            <br/>
                            ·{{$t('merchant.safeTip3')}}
                        </p>
                    </div>
                </ShowCard>
                <ShowCard class="mark2">
                    <img class="img2" src="@/assets/img/merchant/gobal.png" alt="">
                    <div class="text-align-l">{{$t('merchant.safeTip4')}}</div>
                </ShowCard>
            </div>
            <ShowCard class="merchant-body-gateway margin-b40">
                <div class="flex-between app-size-28">
                    <h5>{{$t('merchant.gateway')}}</h5>
                    <div @click="$router.push('/merchant/gateway')">
                        {{$t('merchant.viewAPI')}}
                        <img class="app-img-50" src="@/assets/img/common/arrow_right_p.png" alt="">
                    </div>
                </div>
                <div class="text-align-l c9c9c9-color margin-t24">
                    {{$t('merchant.safeTip5')}}
                </div>
                <div class="path">
                    <img class="path-img" src="@/assets/img/merchant/path.png" alt="">
                    <div class="path-lable flex-between-c">
                        <span>{{$t('merchant.member')}}</span>
                        <span>{{$t('merchant.exchange')}}</span>
                        <span>{{$app_mark}}</span>
                        <span>{{$t('merchant.platform')}}</span>
                    </div>
                </div>
            </ShowCard>
            <ShowCard class="merchant-body-api margin-b40">
                <div class="flex-between app-size-28">
                    <h5>{{$t('merchant.gateway')}}</h5>
                    <div @click="$router.push('/merchant/gateway')">
                        {{$t('merchant.downloadAPI')}}
                        <img class="app-img-50" src="@/assets/img/common/arrow_right_p.png" alt="">
                    </div>
                </div>
                <div class="text-align-l margin-t24">
                    <ul>
                        <li class="api-li" v-for="item in 3" :key="item">
                            <div class="primary-color">CreateLabelTask</div>
                            <p class="c9c9c9-color api-li-tip">调用CreateLabelTask提交内容结构化任务。</p>
                        </li>
                    </ul>
                </div>
            </ShowCard>
            <!-- <div v-for="item in 200" :key="item" >test</div> -->
        </div>
        <div class="app-size-34 lxa-footer-btn">
            <Button @click="$router.push('/merchant/apply')">{{$t('merchant.apply')}}</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    address: string;
    loading: boolean;
    symbol: string;
    qrValue: string;
    memo: string;
    value: string;
    size: number;
}

export default Vue.extend({
    name: 'Merchant',
    data(): data {
        return {
            address: '',
            symbol: '',
            loading: true,
            qrValue: '',
            value: '',
            memo: '',
            size: 100,
        };
    },
});
</script>

<style lang="less" scoped>
.merchant{
    height: 100%;
    position: relative;
    overflow: auto;
    .margin-l16 {
        margin-left: 16px;
    };
    .margin-b40{
        margin-bottom: 40px;
    }
    .margin-t24{
        margin-top: 24px;
    }
    &-header-fringe{
        height: 220px;
        border-radius: 0 0 50px 50px;
    }
    &-body{
        position: absolute;
        // background: pink;
        max-height: calc(100% - 220px);
        overflow: scroll;
        top: 150px;
        width: 658px;
        left: 0;
        right: 0;
        margin: 0 auto;
        &-mark{
            .mark1{
                width: 430px;
                &-title{
                    margin-bottom: 28px;
                }
            }
            .mark2{
                width: 200px;
            }
            .img1{
                width: 92px;
                flex-shrink: 0;
                margin-right: 20px;
            }
            .img2{
                width: 100px;
            }
        }
        &-gateway{
            .path{
                width: 580px;
                margin-top: 52px;
            }
            .path-img{
                width: 100%;
            }
            // .path-lable{
            //     width: 100%;
            // }
        }
        &-api{
            .api-li{
                margin-bottom: 32px;
                &-tip{
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>
