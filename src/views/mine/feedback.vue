<template>
    <div class="feedback">
        <TitleHeader :title="$t('mine.feedback')">
            <form class="feedback-form app-padding40" action="">
                <div class="form-item">
                    <div class="lable">{{$t('mine.opinionQuest')}}</div>
                    <Inputs v-model="form.userName" :placeholder="$t('payway.name')" clearable></Inputs>
                </div>
                <div class="form-item">
                    <div class="lable">{{$t('mine.opinion')}}</div>
                    <Inputs v-model="form.idCard" :placeholder="$t('mine.cardNum')" clearable></Inputs>
                </div>
            </form>
        </TitleHeader>
        <div class="lxa-footer-btn">
            <Button @click="saveHandle" v-t="'common.send'" :disabled="!form.userName || !form.idCard"></Button>
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
    name: 'Feedback',
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
.feedback{
    height: 100%;
    overflow: scroll;
    font-size: 34px;
    &-form{
        margin-top: 33px;
        text-align: left;
        .lable{
            margin-bottom: 43px;
        }
        .form-item{
            margin-top: 76px;
        }
    }
}
</style>
