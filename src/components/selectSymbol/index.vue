<template>
    <div class="com-select-symbol app-padding40">
        <div class="com-select-symbol-tab">
            <img
                v-for="item in symbolList"
                @click="initActive(item)"
                :key="item.symbol"
                :src="getImg(item)"
                alt=""
            >
        </div>
        <div class="select-symbol-right">
        <ul class="symbol_list">
            <li class="flex-between-c app-padding40 symbol_item"
                :class="`${activeItem.symbol}-bg`"
                v-for="item in addrList"
                :key="item.id" @click="detail(item)">
                <div class="address-item">
                    <h5>{{item.remark}}</h5>
                    <p>{{item.address}}</p>
                </div>
                <!-- <img :src="activeItem.img2" alt=""> -->
            </li>
        </ul>
        <noData v-if="!isLoading && (!addrList.length)"/>
        </div>
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
    addrList: Array<any>;
    isLoading: boolean;
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
    computed: {
        symbolList(): Array<CoinInfo> {
            return this.$store.state.symbolList;
        },
    },
    data(): data {
        return {
            addrList: [],
            isLoading: false,
            activeItem: null,
        };
    },
    mounted() {
        this.initActive();
    },
    methods: {
        initActive(activeItem?: any) {
            if (activeItem) {
                this.activeItem = { ...activeItem };
                this.$emit('change', activeItem);
            } else if (this.defaultSymbol) {
                this.activeItem = this.symbolList.find((item: any) => item.symbol === this.defaultSymbol) || this.symbolList[0];
            } else {
                this.activeItem = { ...this.symbolList[0] };
            }
            this.getAddrList();
        },
        getAddrList() {
            this.isLoading = true;
            this.changeLoading(true);
            this.addrList = [];
            this.$api.getAddrList({
                coin: this.activeItem.symbol,
            }).then((res: any) => {
                if (res.code === 0) {
                    this.addrList = res.data || [];
                }
            }).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
        detail(item: any) {
            this.$router.push({
                path: '/setpayment/edit',
                query: {
                    id: item.id,
                    remark: item.remark,
                    address: item.address,
                    symbol: item.coin,
                    needMemo: this.activeItem.need_memo,
                    memo: item.memo,
                },
            });
        },
        getImg(item: any) {
            if (this.activeItem) {
                return require(`@/assets/img/symbol/${
                    item.symbol === this.activeItem.symbol ? item.symbol : `${item.symbol}1`
                }.png`);
            }
            return '';
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
    .select-symbol-right{
        flex: 1;
        overflow: hidden;
    }
    .symbol_list{
        overflow: hidden;
        .symbol_item{
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
