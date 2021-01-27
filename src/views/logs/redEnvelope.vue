<template>
    <div class="red-envelope flex-column">
        <Headers ref="headers" bold theme="red" :title="title"/>
        <!-- <div class="red-envelope-top red-bg">
            <div>
                <img class="red-envelope-logo" src="@/assets/img/logo/logo2x.png" alt="">
            </div>
        </div> -->
        <div ref="fringe" class="red-envelope-fringe">
            <div class="red-envelope-fringe-info red-bg"></div>
        </div>
        <div @scroll="scrollHandle" class="red-envelope-info">
            <div class="-detail">
                <h3 ref="title" class="app-size-45 envelope-sender">{{$t('common.envelopeSender', {sender})}}</h3>
                <div class="envelope-took-amount">
                    <b class="app-size-100 yellow-color">{{amount}}</b>
                    <span class="envelope-coin color-light">{{coin && coin.toUpperCase()}}</span>
                </div>
                <!-- <p class="envelope-tip">已存入TG账号钱包余额</p> -->
            </div>
            <div class="light-grey-bg red-envelope-empty"></div>
            <div class=" app-padding40">
                <p class="text-align-l red-envelope-shares color-light">{{$t('common.envelopeShares', {shares, took_shares})}}</p>
                <ul class="red-envelope-ul">
                    <li v-for="item in list" :key="item.nickname" class="red-envelope-li light-grey-bg">
                        <div class=" flex-between-c">
                            <div>{{item.nickname}}</div>
                            <h5>
                                <img v-show="win === item.nickname" class="app-img-50" src="@/assets/img/common/crown.png" alt="">&nbsp;
                                <span class="vertical-m">{{item.amount}}</span>
                            </h5>
                        </div>
                        <div class="color-light flex-between-c">
                            <div>{{item.time | date('MM-dd hh:ss')}}</div>
                            <div>{{coin && coin.toUpperCase()}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    list: any[]; // 转出
    sender: string;
    title: any;
    coin: string;
    shares: number;
    amount: number;
    took_shares: number;
}

export default Vue.extend({
    name: 'RedEnvelope',
    data(): data {
        return {
            list: [],
            sender: '',
            coin: '',
            title: '',
            shares: 0,
            amount: 0,
            took_shares: 0,
        };
    },
    created() {
        this.redEnvelopeLogList();
    },
    computed: {
        win(): string {
            if (this.list.length === this.shares) {
                const max = this.list.concat().sort((a: any, b: any) => b.amount - a.amount)[0];
                return max.nickname;
            }
            return '';
        },
    },
    methods: {
        redEnvelopeLogList() {
            const id = Number(this.$route.query.id);
            this.changeLoading(true);
            this.$api.redEnvelopeLogList(id).then((res: any) => {
                this.list = res.data.list;
                // this.list = this.list.concat(this.list).concat(this.list).concat(this.list);
                this.sender = res.data.sender;
                this.coin = res.data.coin;
                this.shares = res.data.shares;
                this.amount = res.data.amount;
                this.took_shares = res.data.took_shares;
                this.changeLoading(false);
            }).catch(() => {
                this.changeLoading(false);
                this.$normalToast(this.$t('common.redenvelopefail'));
            });
        },
        scrollHandle(event: any) {
            if (event.target) {
                const { scrollTop } = (event.target as HTMLElement);
                const { offsetTop, offsetHeight } = (this.$refs.title as HTMLElement);
                const fringeClientHeight = (this.$refs.fringe as HTMLElement).clientHeight;
                const { clientHeight } = ((this.$refs.headers as any).$el);
                // 滚动条高度 - title距离顶部高度 + header高度 - title高度
                if (scrollTop - offsetTop + (clientHeight + fringeClientHeight) - offsetHeight >= 10) {
                    this.title = this.$t('common.envelopeSender', { sender: this.sender });
                } else {
                    this.title = '';
                }
            }
        },
    },
});
</script>

<style lang="less" scoped>
.red-envelope{
    height: 100%;
    overflow: scroll;
    .color-light{
        color: #A6A6A6;
    }
    &-fringe{
        height: 100px;
        left: 0;
        top: 68px;
        width: 100%;
        position: absolute;
        overflow: hidden;
        background: #fff;
        z-index: 2000;
        &-info{
            border-radius: 0 0 50% 50%;
            height: 1500px;
            width: 1500px;
            left: -50%;
            position: absolute;
            top: -1400px;
        }
    }
    &-empty{
        height: 13px;
    }
    &-logo{
        width: 180px;
        margin-top: 60px;
    }
    &-info{
        height: calc(100% - 100px);
        overflow: auto;
        margin-top: 70px;
        .envelope-sender{
            margin: 50px 0;
        }
        .envelope-took-amount{
            margin-bottom: 28px;
            .envelope-coin{
                margin-left: 40px;
            }
        }
        .envelope-tip{
            margin: 57px 0 75px;
        }
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
