<template>
  <div class="adv_status">
    <TitleHeader :title="`${$t('mine.realName')}(LV${verLv})`">
        <img :src="getImg()" alt="" class="img_cont">
        <div class="status_txt">{{statusTxt}}</div>
        <div class="reason_title" v-if="reason">{{$t('mine.refusal')}}</div>
        <div class="status_reason" v-if="reason">{{reason}}</div>
    </TitleHeader>
    <div class="lxa-footer-btn" v-if="status === '3'">
        <Button @click="reset" v-t="'mine.resetReal'"></Button>
    </div>
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
        reset() {
            this.$router.replace(`/mine/verlv${this.verLv}`);
        },
        getImg() {
            switch (this.status) {
            case '1':
                this.statusTxt = `${this.$t('business.busStatus1')}`;
                return require(`@/assets/img/mine/status${this.status}.png`);
            case '2':
                this.statusTxt = `${this.$t('business.busStatus4')}`;
                return require(`@/assets/img/mine/status${this.status}.png`);
            case '3':
                this.statusTxt = `${this.$t('business.busStatus3')}`;
                return require(`@/assets/img/mine/status${this.status}.png`);
            default:
                this.statusTxt = `${this.$t('business.busStatus3')}`;
                return require('@/assets/img/mine/status3.png');
            }
        },
    },
});
</script>

<style lang='less' scoped>
    .adv_status {
        min-height: 100%;
    }
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
