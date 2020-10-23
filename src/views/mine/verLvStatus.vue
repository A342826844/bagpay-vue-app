<template>
  <div class="adv_status">
    <TitleHeader :title="`${$t('mine.realName')}(LV${verLv})`">
        <img :src="getImg()" alt="" class="img_cont">
        <div class="status_txt">{{statusTxt}}</div>
        <div class="reason_title" v-if="reason">拒绝理由</div>
        <div class="status_reason" v-if="reason">{{reason}}</div>
    </TitleHeader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            status: this.$route.query.status,
            verLv: this.$route.query.verLv,
            reason: this.$route.query.reason,
            statusTxt: '',
        };
    },
    methods: {
        getImg() {
            switch (this.status) {
            case '0':
                this.statusTxt = '审核已提交，等待客服处理';
                return require(`@/assets/img/mine/status${this.status}.png`);
            case '1':
                this.statusTxt = '您已认证成功';
                return require(`@/assets/img/mine/status${this.status}.png`);
            case '2':
                this.statusTxt = '审核未通过';
                return require(`@/assets/img/mine/status${this.status}.png`);
            default:
                this.statusTxt = '审核未通过';
                return require('@/assets/img/mine/status2.png');
            }
        },
    },
});
</script>

<style lang='less' scoped>
    .img_cont{
        margin-top: 200px;
        margin-bottom: 100px;
        width: 150px;
    }
    .status_txt{
        font-size: 34px;
    }
    .reason_title{
        font-size: 34px;
        margin-top: 20px;
    }
    .status_reason{
        font-size: 28px;
        margin-top: 5px;
        padding: 0 100px;
        line-height: 50px;
    }
</style>
