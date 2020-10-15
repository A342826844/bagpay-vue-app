<template>
    <div class="home app-padding40">
        <div class="home-header flex-between-c">
            <div>
                <img src="../../assets/img/common/menu.png" alt="">
                <h3 class="home-header-coin">USDT</h3>
            </div>
            <div>
                <img src="../../assets/img/common/qrcode1.png" alt="">
            </div>
        </div>
        <div class="home-assets flex-around-s flex-column">
            <h4 class="home-assets-account">$ <span class="home-assets-value">72 500.00</span></h4>
            <div class="home-assets-address flex-between-c">
                <p>2lsifmsoedfjsefo;jknhfoipaosidj</p>
                <img @click="$router.push('/payment')" src="../../assets/img/common/qrcode.png" alt="">
            </div>
        </div>
        <div class="assets-symbol-list">
            <div class="list-assets flex-between-c">
                <h4 v-t="'home.assets'"></h4>
                <div>
                    <img @click="addSymbol" src="../../assets/img/common/add.png" alt="">
                </div>
            </div>
            <ul>
                <li
                    @click="$router.push(`/transferHistory?symbol=${item.symbol}`)"
                    class="flex-between-c"
                    v-for="item in symbolList"
                    :key="item.symbol"
                >
                    <div class="flex-start-c">
                        <img :src="symbolImgList[item.symbol]" alt="">
                        <div class="list-values values1">
                            <h5 class="lable">{{item.symbol.toUpperCase()}}</h5>
                            <p class="value">{{item.title}}</p>
                        </div>
                    </div>
                    <div class="list-values">
                        <h5 class="lable">{{item.value}}</h5>
                        <p class="value">{{item.transfer}}</p>
                    </div>
                </li>
            </ul>
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
    name: 'Home',
    created() {
        this.init();
    },
    data(): data {
        return {
            testValue: 2113,
            symbolImgList: { usdt, tusd, usdc },
            symbolList: [{
                symbol: 'usdt',
                title: 'Tether',
                value: 72500.00,
                transfer: 72500.00,
            }, {
                symbol: 'tusd',
                title: 'USD Coin',
                value: 72500.00,
                transfer: 72500.00,
            }, {
                symbol: 'usdc',
                title: 'TrueUSD',
                value: 72500.00,
                transfer: 72500.00,
            }],
        };
    },
    methods: {
        init() {
            this.$api.getUserInfo().then((res: any) => {
                console.log(res);
            });
        },
        clickTest() {
            this.testValue += 1;
        },
        addSymbol() {
            this.$router.push('/addsymbol');
        },
    },
});
</script>

<style lang="less" scoped>
@import './assets-symbol-list.less';
.home{
    &-header{
        font-size: 45px;
        height: 100px;
        // background: pink;
        img{
            width: 50px;
            // vertical-align: middle;
        }
        &-coin{
            vertical-align: middle;
            display: inline-block;
        }
    }
    &-assets{
        color: #fff;
        margin-top: 20px;
        height: 311px;
        border-radius: 50px;
        background-image: url(../../assets/img/home/banner.png);
        background-size: 100% 100%;
        text-align: left;
        padding: 50px 50px 50px 65px;
        img{
            width: 50px;
        }
        &-account{
            font-size: 30px;
        }
        &-value{
            font-size: 60px;
        }
        &-address{
            width: 100%;
        }
    }
}
</style>
