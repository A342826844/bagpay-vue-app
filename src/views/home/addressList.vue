<template>
    <TitleHeader :title="`${symbol.toUpperCase()} ${$t('payment.address')}`">
        <img @click="add()" class="app-img-50" slot="header" src="../../assets/img/common/add.png" alt="">
        <div class="com-select-symbol app-padding40">
            <ul>
                <li class="flex-between-c app-padding40" :class="`${symbol}-bg`" v-for="item in addrList" :key="item.id" @click="selected(item)">
                    <div class="address-item">
                        <h5>{{item.remark}}</h5>
                        <p>{{item.address}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </TitleHeader>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    symbol: string;
    needMemo: string;
    addrList: Array<any>;
}

export default Vue.extend({
    name: 'AddressList',
    data(): data {
        return {
            symbol: '',
            needMemo: '',
            addrList: [],
        };
    },
    mounted() {
        this.getAddrList();
    },
    methods: {
        getAddrList() {
            this.symbol = this.$route.query.symbol as string;
            this.needMemo = this.$route.query.needMemo as string;
            this.$api.getAddrList({
                coin: this.symbol,
            }).then((res: any) => {
                if (res.data) {
                    this.addrList = res.data;
                }
            });
        },
        add() {
            this.$store.commit('setAddAddr', {
                symbol: this.symbol,
                needMemo: this.needMemo,
            });
            this.$router.push({
                path: '/setpayment/add',
            });
        },
        selected(item: any) {
            this.$store.commit('setAddress', item);
            this.$router.go(-1);
        },
    },
});
</script>

<style scoped lang="less">
.com-select-symbol{
    padding-top: 40px;
    text-align: left;
    &>ul{
        flex: 1;
        overflow: hidden;
        &>li{
            height: 147px;
            margin-bottom: 40px;
            line-height: 50px;
            border-radius: 30px;
            overflow: hidden;
            img{
                height: 147px;
                margin-right: -40px;
            }
            .address-item{
                overflow: hidden;
                &>h5{
                    font-size: 34px;
                    color: #ffffff;
                }
                &>p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #EDF3FB;
                    font-size: 29px;
                }
            }
        }
    }
}
</style>
