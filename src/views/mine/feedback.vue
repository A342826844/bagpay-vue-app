<template>
    <div class="feedback">
        <TitleHeader :title="$t('mine.feedback')">
            <form class="feedback-form app-padding40" action="">
                <div class="form-item">
                    <div class="lable">意见问题</div>
                    <Inputs v-model="form.userName" placeholder="姓名" clearable></Inputs>
                </div>
                <div class="form-item">
                    <div class="lable">意见</div>
                    <Inputs v-model="form.idCard"  placeholder="ID 号码" clearable></Inputs>
                </div>
            </form>
            <div class="lxa-footer-btn">
                <Button @click="saveHandle" v-t="'common.send'"></Button>
            </div>
        </TitleHeader>
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
