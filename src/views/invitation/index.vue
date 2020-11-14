<template>
    <div class="invitation">
        <Headers bold theme="primary">
            <h4 class="invitation-header-left" slot="left">
                <span class=" vertical-m">料子</span>
                <img src="../../assets/img/invitation/v1.png" class="level app-img-50" alt="">
            </h4>
            <img src="../../assets/img/common/help.png" class="app-img-50" alt="">
        </Headers>
        <div class="invitation-top primary-bg app-padding40">
            <div class="flex-between-c title">
                <div @click="$router.push('/invitation/profit')">总收益(USDT)<span class="triangle-r invitation-top-triangle"></span></div>
                <div>邀请总人数</div>
            </div>
            <div class=" flex-between-c value">
                <h5 @click="$router.push('/invitation/profit')">72 500.00</h5>
                <h5>23</h5>
            </div>
        </div>
        <div class="invitation-body">
            <Titles theme="grey" class="invitation-body-title">邀请人数</Titles>
            <div class="invitation-body-bread text-align-l app-padding40">
                直推 > 2级(料子) > 3级(小艾)
            </div>
            <ul class=" app-padding40 invitation-body-ul">
                <!-- <li v-for="item in 15" :key="item" class=" app-padding40 li light-grey">
                    <div class=" flex-between-c title">
                        <span></span>
                        <div>
                            <span class="time">17:22 10/18</span>
                            <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                        </div>
                    </div>
                    <div class=" flex-between-c value">
                        <span>料子</span>
                        <h6 class=" app-size-34">0.781238432198</h6>
                    </div>
                </li> -->
                <LiItem>
                    <template #title>提现佣金</template>
                    <template #time>17:22 10/18</template>
                    <template #name>料子</template>
                    <template #value>0.781238432198</template>
                </LiItem>
            </ul>
        </div>
        <div class="lxa-footer-bottom flex-between-c app-padding40">
            <Button size="auto">
                <img class="app-img-50" src="../../assets/img/common/ercode1.png" alt="">
            </Button>
            <Button
                v-for="item in buttons"
                :key="item.value"
                @click="clickHandle(item.value)"
                :type="item.type"
                size="small"
                v-t="item.title"></Button>
        </div>
        <van-dialog class="invitation-ercode-dialog" v-model="erCodeShow" :title="'邀请二维码'" :show-confirm-button="false">
            <div class="ercode"></div>
            <div>
                <Button
                    v-for="item in buttons"
                    :key="item.value"
                    @click="clickHandle(item.value)"
                    :type="item.type"
                    class="ercode-btn"
                    size="small"
                    v-t="item.title"></Button>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LiItem from './components/Li-item.vue';

type data = {
    erCodeShow: boolean;
    buttons: Array<any>;
}

export default Vue.extend({
    name: 'Invitation',
    components: {
        LiItem,
    },
    data(): data {
        return {
            erCodeShow: true,
            buttons: [
                {
                    title: 'common.save',
                    type: 'up',
                    value: 'save',
                },
                {
                    title: 'common.share',
                    type: 'primary',
                    value: 'share',
                },
            ],
        };
    },
    methods: {
        clickHandle(value: string) {
            console.log(value);
            this.erCodeShow = !this.erCodeShow;
        },
    },

});
</script>

<style lang="less" scoped>
.invitation{
    &-header-left{
        font-size: 45px;
        .level{
            margin-left: 18px;
        }
    }
    &-top{
        padding-top: 60px;
        padding-bottom: 60px;
        border-radius: 0 0 50px 50px;
        &-triangle{
            margin-left: 20px;
        }
        .title{
            font-size: 28px;
            line-height: 28px;
        }
        .value{
            font-size: 45px;
            line-height: 45px;
            margin-top: 24px;
        }
    }
    &-body{
        &-bread{
            padding-top: 46px;
            font-size: 28px;
        }
        &-ul{
            line-height: 1;
            .li{
                margin-top: 30px;
                padding-top: 28px;
                padding-bottom: 32px;
                border-radius: 10px;
                .value{
                    margin-top: 12px;
                    font-size: 28px;
                }
                .title{
                    font-size: 24px;
                }
                .time{
                    color: #A6A6A6;
                }
            }
        }
    }
    &-ercode-dialog{
        .ercode{
            width: 393px;
            height: 393px;
            background: pink;
            margin: 45px auto 62px;
        }
        .ercode-btn{
            margin: 0 10px 52px;
        }
    }
}
</style>
