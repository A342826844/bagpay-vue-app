<template>
  <div class="adv_status">
    <TitleHeader :title="$t('otc.business')">
        <img :src="getImg()" alt="" class="img_cont">
        <div class="status_txt">{{statusTxt}}</div>
    </TitleHeader>
    <div class="lxa-footer-btn app-size-34" v-if="status === '2'">
        <Button @click="reset" v-t="'mine.resetReal'"></Button>
    </div>
    <div v-show="merchant.status === 0" class="app-padding40">
        <ul class="adv_status-ul scale-1px">
            <li class="adv_status-li flex-between-c app-padding40" v-for="item in list" :key="item.key">
                <span class="defaultA5-color">
                    <span v-if="item.value !== 'social'">{{$t(item.title)}}</span>
                    <span v-else>{{merchant[item.title] | socialType}}</span>
                </span>
                <span class="default45-color">
                    <span v-if="item.value !== 'relation'">{{merchant[item.key]}}</span>
                    <span v-else>{{merchant[item.key] | relationship}}</span>
                </span>
            </li>
            <li class="text-align-l app-padding40 default45-color">
                {{merchant.address}}
            </li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            status: this.$route.query.status,
            statusTxt: '',
            list: [
                {
                    title: 'login.phone',
                    key: 'phone',
                },
                {
                    title: 'login.email',
                    key: 'email',
                },
                {
                    title: 'social_type', // 社交类型
                    key: 'social',
                    value: 'social',
                },
                {
                    title: 'otc.iceName',
                    key: 'ice_name',
                },
                {
                    title: 'otc.icePhone',
                    key: 'ice_phone',
                },
                {
                    title: 'otc.iceRelation',
                    key: 'ice_relation',
                    value: 'relation',
                },
                {
                    title: 'otc.address',
                    key: '',
                },
            ],
        };
    },
    computed: {
        merchant(): any {
            return this.$store.state.merchant;
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.otcGetMerchant();
        });
    },
    methods: {
        reset() {
            this.$router.replace('/otc/vfyBus?type=1');
        },
        getImg() {
            switch (this.status) {
            case '0':
                this.statusTxt = `${this.$t('business.busStatus1')}`;
                return require(`@/assets/img/mine/status${Number(this.status) + 1}.png`);
            case '1':
                this.statusTxt = `${this.$t('business.busStatus2')}`;
                return require(`@/assets/img/mine/status${Number(this.status) + 1}.png`);
            case '2':
                this.statusTxt = `${this.$t('business.busStatus3')}`;
                return require(`@/assets/img/mine/status${Number(this.status) + 1}.png`);
            case '3': case '4': case '5':
                this.statusTxt = `${this.$t('business.busStatus3')}`;
                return require('@/assets/img/mine/status3.png');
            default:
                this.statusTxt = `${this.$t('business.busStatus3')}`;
                return require('@/assets/img/mine/status3.png');
            }
        },
    },
});
</script>

<style lang='less' scoped>
    .adv_status{
        height: 100%;
        &-ul{
            margin-top: 88px;
            border-radius: 40px;
            line-height: 60px;
            padding: 32px 0;
        }
    }
    .img_cont{
        margin-top: 200px;
        margin-bottom: 100px;
        width: 150px;
    }
    .status_txt{
        font-size: 34px;
    }
</style>
