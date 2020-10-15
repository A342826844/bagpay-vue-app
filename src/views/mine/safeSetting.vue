<template>
    <div class="set-payment-add">
        <TitleHeader :title="$t('mine.safeSetting')" />
        <ul class="app-padding40">
            <li @click="$router.push('/mine/safepass')" class="flex-between-c">
                <div v-t="'mine.safePass'"></div>
                <div>
                    <span class="vertical-m primary-color">已设置</span>
                    <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                </div>
            </li>
            <li @click="$router.push('/mine/changePwd')" class="flex-between-c">
                <div v-t="'mine.changePwd'"></div>
                <div>
                    <span class="vertical-m primary-color">已设置</span>
                    <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                </div>
            </li>
            <li @click="$router.push('/mine/realname')" class="flex-between-c">
                <div v-t="'mine.realName'"></div>
                <div>
                    <span class="vertical-m red-color">未认证</span>
                    <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {

}

export default Vue.extend({
    name: 'SetPaymentAdd',
    data(): data {
        return {

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
@import '../../assets/less/excludecss/index.less';
.set-payment-add{
    height: 100%;
    font-size: 34px;
    &>ul{
        margin-top: 50px;
        &>li{
            height: 117px;
        }
    }
}
</style>
