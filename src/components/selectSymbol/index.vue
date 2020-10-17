<template>
    <div class="com-select-symbol app-padding40">
        <div class="com-select-symbol-tab">
            <img
                v-for="item in symbolList"
                @click="changeHandle(item)"
                :key="item.symbol"
                :src="getImg(item)"
                alt=""
            >
        </div>
        <ul>
            <li class="flex-between-c app-padding40" :class="`${activeItem.symbol}-bg`" v-for="item in addrList" :key="item">
                <div class="address-item">
                    <h5>USDT</h5>
                    <p>2215jijiadf2op43o23ko</p>
                </div>
                <!-- <img :src="activeItem.img2" alt=""> -->
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type lsitItm = {
    img: unknown;
    img1: unknown;
    // img2: unknown;
    symbol: string;
    color: string;
}

type data = {
    symbolList: Array<any>;
    addrList: Array<any>;
    colorList: any;
    activeItem: any;
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
            symbolList: [],
            addrList: [],
            colorList: {
                btc: {
                    color: '#FFA47A',
                },
                eth: {
                    color: '#FFA47A',
                },
                usdt: {
                    color: '#FFA47A',
                },
                tusd: {
                    color: '#22B67E',
                },
                usdc: {
                    color: '#2876CA',
                },
                pax: {
                    color: '#FFA47A',
                },
                busd: {
                    color: '#FFA47A',
                },
                husd: {
                    color: '#FFA47A',
                },
            },
            activeItem: {},
        };
    },
    mounted() {
        this.getCoinList();
    },
    methods: {
        getCoinList() {
            this.$api.getCoinList().then((res: any) => {
                if (res.code === 0) {
                    this.symbolList = res.data.filter((item: any) => item.out_enable === 1);
                    console.log(this.symbolList);
                    if (this.defaultSymbol) {
                        // this.changeItem(this.defaultSymbol);
                        this.activeItem = this.symbolList.find((item: any) => item.symbol === this.defaultSymbol) || this.symbolList[0];
                    } else {
                        this.activeItem = { ...this.symbolList[0] };
                    }
                    this.getAddrList();
                }
            });
        },
        getAddrList() {
            this.$api.getAddrList({
                coin: this.activeItem.symbol,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.addrList = res.data;
                }
            });
        },
        getImg(item: any) {
            return require(`@/assets/img/symbol/${
                this.activeItem.symbol === item.symbol ? item.symbol : `${item.symbol}1`
            }.png`);
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
    display: flex;
    text-align: left;
    &-tab{
        width: 130px;
        border-right: 1px solid #EBEBEB;
        overflow: hidden;
        overflow-y: auto;
        margin-right: 20px;
        img{
            width: 100px;
            margin-bottom: 20px;
        }
    }
    &>ul{
        flex: 1;
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
