<template>
    <div class="transfer-history primary-bg flex-column">
        <Headers bold theme="dark" :title="symbol.toUpperCase()"/>
        <div class="transfer-history-box flex-item-1 flex-column">
            <div class="transfer-history-top">
                <h3 class="value">72 500.00</h3>
                <p class="sub-value">$72500.00</p>
            </div>
            <div class="transfer-history-card flex-item-1">
                <TabList
                    swipeable
                    size="big"
                    sticky
                    sticky-top="sub"
                    :defaultVal="active"
                    @change="tabChangeHandle"
                    @on-click="clickHandle"
                    tabTitle="name"
                    tabName="value"
                    class="transfer-tab"
                    :tabList="bodyTabList"
                >
                    <div class="transfer-list" slot="transferIn">
                        <ul>
                            <li class="flex-between-c" v-for="(item, index) in renderList" :key="index">
                                <div class="values">
                                    <h5 class="value" :class="sideMap[item.side].color">{{$t(sideMap[item.side].title)}}</h5>
                                    <p class="sub-value">E2jijdi2o1...23jiwajid</p>
                                </div>
                                <div class="values">
                                    <h5 class="value">364.24</h5>
                                    <p class="sub-value">2020-06-26 05:22</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="transfer-list" slot="transferOut">
                        <ul>
                            <li class="flex-between-c" v-for="(item, index) in renderList" :key="index">
                                <div class="values">
                                    <h5 class="value" :class="sideMap[item.side].color">{{$t(sideMap[item.side].title)}}</h5>
                                    <p class="sub-value">E2jijdi2o1...23jiwajid</p>
                                </div>
                                <div class="values">
                                    <h5 class="value">364.24</h5>
                                    <p class="sub-value">2020-06-26 05:22</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </TabList>
                <div></div>
            </div>
        </div>
        <div class="lxa-footer-btn transfer-history-btn flex-between-c">
            <Button @click="goLink('/otc')" size="auto">
                <img src="../../assets/img/home/coin.png" alt="">
            </Button>
            <Button v-for="item in sideMap" :key="item.side" @click="goLink(item.path)" :type="item.type" size="small" v-t="item.title"></Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    address: string;
    symbol: string;
    active: string;
    size: number;
    sideMap: {
        [elem: string]: any;
    };
}

export default Vue.extend({
    name: 'TransferHistory',
    data(): data {
        return {
            address: '3W236F536R56WR52139E5A9D592QEE595',
            size: 100,
            symbol: '',
            active: 'transferIn',
            sideMap: {
                1: {
                    value: 1,
                    color: 'green-color',
                    bgColor: 'green-bg',
                    title: 'home.transferIn',
                    type: 'up',
                    path: '/payment',
                },
                2: {
                    value: 1,
                    color: 'red-color',
                    bgColor: 'red-bg',
                    title: 'home.transferOut',
                    type: 'down',
                    path: '/transferout',
                },
            },
        };
    },
    computed: {
        renderList() {
            return [{ side: 2 }, { side: 1 }, { side: 2 },
                { side: 2 }, { side: 1 }, { side: 2 }, { side: 2 }, { side: 1 },
                { side: 2 }, { side: 2 }, { side: 1 }, { side: 2 },
            ];
        },
        bodyTabList() {
            return [
                {
                    name: this.$t('home.transferIn'),
                    value: 'transferIn',
                }, {
                    name: this.$t('home.transferOut'),
                    value: 'transferOut',
                },
            ];
        },
    },
    created() {
        this.symbol = (this.$route.query.symbol as string) || '';
    },
    methods: {
        tabChangeHandle(value: any) {
            console.log(value);
        },
        clickHandle(value: any) {
            console.log(value);
        },
        goLink(path: string) {
            this.$router.push(`${path}?symbol=${this.symbol}`);
        },
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.transfer-history{
    height: 100%;
    position: relative;
    &-box{
        overflow: scroll;
    }
    &-top{
        margin: 50px 0;
        .value{
            font-size: 60px;
        }
        .sub-value{
            font-size: 29px;
        }
    }
    &-card{
        background: #ffffff;
        color: #585858;
        border-radius: 50px 50px 0 0;
        padding-top: 50px;
        .transfer-list{
            background: #ffffff;
            padding-bottom: 180px;
            &>ul{
                &>li{
                    height: 142px;
                    padding: 0 40px;
                    .values{
                        &:first-child{
                            text-align: left;
                        }
                        &:last-child{
                            text-align: right;
                        }
                        .value{
                            font-size: 34px;
                        }
                        .sub-value{
                            margin-top: 17px;
                            color: #A6A6A6;
                        }
                    }
                }
            }
        }
    }
    &-btn{
        padding: 38px 52px;
        bottom: 0;
        background: #ffffff;
        font-size: 34px;
        img{
            width: 50px;
        }
    }
}
</style>
