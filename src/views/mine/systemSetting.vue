<template>
    <div class="set-payment-add">
        <TitleHeader :title="$t('mine.systemSetting')" />
        <ul class="app-padding40">
            <li class="flex-between-c">
                <div v-t="'mine.hideAmount'"></div>
                <div>
                    <Switchs></Switchs>
                </div>
            </li>
            <li class="flex-between-c">
                <div v-t="'mine.changeLang'"></div>
                <div>
                    <span class="vertical-m">简体中文</span>
                    <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                </div>
            </li>
            <li class="flex-between-c">
                <div v-t="'mine.unitPrice'"></div>
                <div>
                    <span class="vertical-m">USD</span>
                    <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                </div>
            </li>
            <li class="flex-between-c">
                <div v-t="'mine.logout'"></div>
                <div>
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
