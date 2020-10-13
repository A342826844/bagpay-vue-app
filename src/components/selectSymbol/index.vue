<template>
    <div class="com-select-symbol app-padding40">
        <div class="com-select-symbol-tab">
            <img
                v-for="item in list"
                @click="changeHandle(item)"
                :key="item.symbol"
                :src="activeItem.symbol === item.symbol ? item.img : item.img1"
                alt=""
            >
        </div>
        <ul>
            <li class="flex-between-c app-padding40" :class="`${activeItem.symbol}-bg`" v-for="item in 4" :key="item">
                <div class="address-item">
                    <h5>USDT</h5>
                    <p>2215jijiadf2op43o23ko</p>
                </div>
                <img :src="activeItem.img2" alt="">
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const usdt = require('../../assets/img/symbol/usdt.png');
const tusd = require('../../assets/img/symbol/tusd.png');
const usdc = require('../../assets/img/symbol/usdc.png');
const usdt1 = require('../../assets/img/symbol/usdt1.png');
const tusd1 = require('../../assets/img/symbol/tusd1.png');
const usdc1 = require('../../assets/img/symbol/usdc1.png');
const usdt2 = require('../../assets/img/symbol/usdt2.png');
const tusd2 = require('../../assets/img/symbol/tusd2.png');
const usdc2 = require('../../assets/img/symbol/usdc2.png');

type lsitItm = {
    img: unknown;
    img1: unknown;
    img2: unknown;
    symbol: string;
    color: string;
}

type data = {
    list: Array<lsitItm>;
    activeItem: lsitItm|{};
}

export default Vue.extend({
    name: 'SelectSymbol',
    props: {
        /** 默认币种， 不传就默认是第一个 */
        defaultSymbol: {
            type: String,
            default: '',
        },
    },
    data(): data {
        return {
            list: [
                {
                    img: usdt,
                    img1: usdt1,
                    img2: usdt2,
                    symbol: 'usdt',
                    color: '#FFA47A',
                }, {
                    img: tusd,
                    img1: tusd1,
                    img2: tusd2,
                    symbol: 'tusd',
                    color: '#22B67E',
                }, {
                    img: usdc,
                    img1: usdc1,
                    img2: usdc2,
                    symbol: 'usdc',
                    color: '#2876CA',
                },
            ],
            activeItem: {},
        };
    },
    created() {
        this.activeItem = { ...this.list[0] };
        if (this.defaultSymbol) {
            this.changeItem(this.defaultSymbol);
        }
    },
    methods: {
        changeItem(symbol: string) {
            const res = this.list.find((item: lsitItm) => item.symbol === symbol);
            this.activeItem = { ...res };
        },
        changeHandle(item: lsitItm) {
            this.activeItem = { ...item };
            this.$emit('change', item);
        },
    },
});
</script>

<style scoped lang="less">

.com-select-symbol{
    text-align: left;
    &-tab{
        img{
            width: 100px;
            margin-right: 46px;
        }
    }
    &>ul{
        margin-top: 86px;
        &>li{
            height: 147px;
            margin-bottom: 40px;
            line-height: 50px;
            border-radius: 30px;
            img{
                height: 147px;
                margin-right: -40px;
            }
            .address-item{
                &>h5{
                    font-size: 34px;
                    color: #ffffff;
                }
                &>p{
                    color: #EDF3FB;
                    font-size: 29px;
                }
            }
        }
    }
}
</style>
