<template>
    <div class="otc-business-detail">
        <TitleHeader>
            <template #title>
                <span>小艾</span>
                <span class="otc-business-detail-tel">1355***2626</span>
            </template>
            <div slot="right">
                <img class="app-img-50" src="../../../assets/img/otc/vfy_business.png" alt="">
                <img class="app-img-50" src="../../../assets/img/otc/vfy_real.png" alt="">
            </div>
            <div class="otc-business-detail-top">
                <p class="otc-business-detail-time text-align-l app-padding40">{{$t('otc.vfytime')}}:2020-05-06 11:11:11</p>
                <div class="app-border-margin16 border-b"></div>
                <div class="app-padding40 detail-info">
                    <div class="flex-between-c">
                        <span>{{$t('otc.cumulative')}}</span>
                        <span>{{$t('otc.tradeOrderNum')}}</span>
                        <span>{{$t('otc.tradeOrderRate')}}</span>
                    </div>
                    <div class="flex-between-c value">
                        <span>{{12}}</span>
                        <span>{{33}}</span>
                        <span>{{90}}%</span>
                    </div>
                </div>
                <div class="detail-top-empty"></div>
            </div>
            <TabList
                size="big"
                border
                :defaultVal="side"
                class="otc-business-detail-tabbar"
                @change="tabChangeHandle"
                :tabList="bodyTabList"
            >
                <div v-for="item in bodyTabList" :key="item.side" :slot="item.value">
                    <div
                        v-for="(subItem, index) in renderData[item.side]"
                        :key="index"
                    >
                        <GoodsCard
                            :renderData="subItem"
                            @click="goTradeHandle(subItem)"
                        ></GoodsCard>
                        <div class="app-border-margin16 border-b"></div>
                    </div>
                    <p class="content-list-nodata gray-color" v-show="!_loading && renderData[item.side].length">
                        {{$t('common.noMore')}}
                    </p>
                    <NoData v-if="!_loading && !renderData[item.side].length"/>
                </div>
            </TabList>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GoodsCard from '../component/GoodsCard.vue';

type data = {
    renderData: any;
    paramsData: any;
    side: 1|2;
}

export default Vue.extend({
    name: 'TransferHistory',
    components: {
        GoodsCard,
    },
    data(): data {
        return {
            renderData: {
                1: [],
                2: [],
            },
            paramsData: {
                1: 0,
                2: 0,
            },
            side: 1,
        };
    },
    computed: {
        sideKey(): 'form1'| 'form2' {
            return (`form${this.side}` as 'form1'| 'form2');
        },
        bodyTabList(): any {
            return [
                {
                    title: this.$t('common.sideBuyT'),
                    value: 'buy',
                    side: 2,
                }, {
                    title: this.$t('common.sideSellT'),
                    value: 'sell',
                    side: 1,
                },
            ];
        },
        userBank(): Array<any> {
            return this.$store.getters.getBankEnableList;
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            console.log(from.name);
            if (from.name !== 'otcsubmit') {
                vm.initData();
            }
            vm.loadData();
        });
    },
    methods: {
        tabChangeHandle(item: any) {
            this.side = item.side;
            this.loadData();
        },
        initData() {
            this.renderData = {
                1: [],
                2: [],
            };
            this.paramsData = {
                1: 0,
                2: 0,
            };
        },
        goTradeHandle(item: any) {
            if (!this._userInfo.pay_password) {
                this.$dialog.confirm({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('otc.payPwd')}`,
                    confirmButtonText: `${this.$t('otc.bind')}`,
                    cancelButtonText: `${this.$t('common.cancle2')}`,
                }).then(() => {
                    this.$router.push('/mine/safepass');
                });
                return;
            }
            const bankRes = this.userBank.some((subItem) => subItem.type === Number(item.pay_types));
            if (!bankRes) {
                this.$dialog.confirm({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('otc.noPayWay')}`,
                    confirmButtonText: `${this.$t('otc.bind')}`,
                }).then(() => {
                    this.$router.push('/payway');
                });
                return;
            }
            this.$router.push({
                name: 'otcsubmit',
                params: item,
            });
        },
        loadData(refresh?: boolean) {
            if (!refresh) {
                this.changeLoading(true);
            }
            const params = {
                side: this.side,
                coin: 'usdt',
                offset: refresh ? 0 : this.renderData[this.side].length,
                limit: 10,
            };
            this.$api.getOtcOrderList(params).then((res: any) => {
                this.changeLoading(false);
                if (res.data.list) {
                    if (refresh) {
                        this.renderData[this.side] = res.data.list;
                    } else {
                        this.renderData[this.side] = this.renderData[this.side].concat(res.data.list);
                    }
                }
            }).catch((err: any) => {
                if (err.message.cancleId) return;
                this.changeLoading(false);
            });
        },
    },
});
</script>

<style lang="less" scoped>
.otc-business-detail{
    height: 100%;
    width: 100%;
    &-tel{
        font-size: 28px;
        line-height: 28px;
        font-weight: normal;
        color: #333333;
        margin-left: 44px;
    }
    &-top{
        color: #A5A5A5;
        .detail-info{
            line-height: 55px;
            padding-top: 25px;
            padding-bottom: 25px;
            .value{
                font-size: 28px;
                color: #575757;
            }
        }
        .detail-top-empty{
            height: 24px;
            background: #f8f8f8;
        }
    }
    &-time{
        height: 102px;
        line-height: 102px;
    }
    &-tabbar{
        padding-top: 35px;
    }
}
</style>
