<template>
    <div class="red-envelope flex-column">
        <Headers bold theme="red" :title="sender ? $t('common.envelopeSender', {sender}) : ''"/>
        <!-- <div class="red-envelope-top red-bg">
            <div>
                <img class="red-envelope-logo" src="@/assets/img/logo/logo2x.png" alt="">
            </div>
        </div> -->
        <div class="red-envelope-fringe red-bg"></div>
        <div class="red-envelope-info app-padding40">
            <p class="text-align-l red-envelope-shares">{{$t('common.envelopeShares', {shares, took_shares})}}</p>
            <ul class="red-envelope-ul">
                <li v-for="item in list" :key="item.nickname" class="red-envelope-li light-grey-bg">
                    <div class=" flex-between-c">
                        <div>{{item.nickname}}</div>
                        <h5>
                            <img v-show="win === item.nickname" class="app-img-50" src="@/assets/img/common/crown.png" alt="">&nbsp;
                            <span class="vertical-m">{{item.amount}}</span>
                        </h5>
                    </div>
                    <div class=" flex-between-c">
                        <div>{{item.time | date('MM-dd hh:ss')}}</div>
                        <div>{{coin && coin.toUpperCase()}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    list: any[]; // 转出
    sender: string;
    coin: string;
    shares: number;
    took_shares: number;
}

export default Vue.extend({
    name: 'RedEnvelope',
    data(): data {
        return {
            list: [],
            sender: '',
            coin: '',
            shares: 0,
            took_shares: 0,
        };
    },
    created() {
        this.redEnvelopeLogList();
    },
    computed: {
        win(): string {
            if (this.list.length === this.shares) {
                const max = this.list.concat().sort((a: any, b: any) => a.amount - b.amount)[0];
                return max.nickname;
            }
            return '';
        },
    },
    methods: {
        redEnvelopeLogList() {
            this.$api.redEnvelopeLogList(7).then((res: any) => {
                console.log(res);
                this.list = res.data.list;
                this.list = this.list.concat(this.list).concat(this.list).concat(this.list);
                this.sender = res.data.sender;
                this.coin = res.data.coin;
                this.shares = res.data.shares;
                this.took_shares = res.data.took_shares;
            });
        },
    },
});
</script>

<style lang="less" scoped>
.red-envelope{
    position: relative;
    height: 100%;
    overflow: auto;
    &-top{
        // border-radius: 0 0 50px 50px;
    }
    &-fringe{
        border-radius: 0 0 50% 50%;
        height: 1500px;
        width: 1500px;
        left: -50%;
        position: absolute;
        top: -1300px;
    }
    &-logo{
        width: 180px;
        margin-top: 60px;
    }
    &-shares{
        padding: 60px 0 30px;
    }
    &-li{
        padding: 32px;
        border-radius: 10px;
        margin-bottom: 40px;
    }
}
</style>
