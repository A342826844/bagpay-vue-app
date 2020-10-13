<template>
    <div class="aboutus">
        <TitleHeader :title="$t('mine.aboutus')" />
        <div class="aboutus-box">
            <img class="aboutus-box-logo" src="../../assets/img/logo/logo.png" alt="">
            <p class="aboutus-box-version">v 1.0.3 </p>
            <div class="aboutus-box-upload app-padding40">
                <Inputs readonly value="版本更新">
                    <img class="app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                </Inputs>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    form: {
        userName: string;
        idCard: string;
    };
}

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            form: {
                userName: '',
                idCard: '',
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
.aboutus{
    height: 100%;
    font-size: 34px;
    &-box{
        margin-top: 118px;
        &-logo{
            width: 220px;
        }
        &-version{
            margin-top: 35px;
        }
        &-upload{
            margin-top: 112px;
        }
    }
}
</style>
