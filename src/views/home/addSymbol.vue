<template>
    <div class="add-symbol">
        <TitleHeader :title="$t('home.addSymbol')" />
        <div class="add-symbol-list assets-symbol-list app-padding40">
            <ul>
                <li class="flex-between-c" v-for="item in symbolList" :key="item.symbol">
                    <div class="flex-start-c">
                        <img :src="symbolImgList[item.symbol]" alt="">
                        <div class="list-values values1">
                            <h5 class="lable">{{item.symbol.toUpperCase()}}</h5>
                            <p class="value">{{item.title}}</p>
                        </div>
                    </div>
                    <div class="list-values">
                        <img v-show="!item.status" @click="addHandle" src="../../assets/img/common/add.png" alt="">
                        <img v-show="item.status" @click="delHandle" src="../../assets/img/common/del.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
        <div class="lxa-footer-btn">
            <Button @click="saveHandle" v-t="'common.ok'"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const usdt = require('../../assets/img/symbol/usdt.png');
const tusd = require('../../assets/img/symbol/tusd.png');
const usdc = require('../../assets/img/symbol/usdc.png');

type data = {
    testValue: number;
    symbolImgList: {
        [elem: string]: any;
    };
    symbolList: Array<unknown>;

}

export default Vue.extend({
    name: 'AddSymbol',
    data(): data {
        return {
            testValue: 2113,
            symbolImgList: { usdt, tusd, usdc },
            symbolList: [{
                symbol: 'usdt',
                title: 'Tether',
                value: 72500.00,
                transfer: 72500.00,
                status: true,
            }, {
                symbol: 'tusd',
                title: 'USD Coin',
                value: 72500.00,
                transfer: 72500.00,
                status: false,
            }, {
                symbol: 'usdc',
                title: 'TrueUSD',
                value: 72500.00,
                transfer: 72500.00,
                status: false,
            }],
        };
    },
    methods: {
        addHandle() {
            // TODO
        },
        delHandle() {
            // TODO
        },
        saveHandle() {
            // TODO
        },
    },
});
</script>

<style lang="less" scoped>
@import './assets-symbol-list.less';
.add-symbol{
    position: relative;
    height: 100%;
}
</style>
