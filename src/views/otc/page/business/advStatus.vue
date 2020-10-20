<template>
  <div class="adv_status">
    <TitleHeader :title="$t('otc.business')">
        <img :src="getImg()" alt="" class="img_cont">
        <div class="status_txt">{{statusTxt}}</div>
    </TitleHeader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            status: this.$route.query.status,
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
                this.statusTxt = '您已认证广告商家';
                return require(`@/assets/img/mine/status${this.status}.png`);
            case '2':
                this.statusTxt = '审核未通过';
                return require(`@/assets/img/mine/status${this.status}.png`);
            case '3': case '4': case '5':
                this.statusTxt = '审核未通过';
                return require('@/assets/img/mine/status2.png');
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
</style>
