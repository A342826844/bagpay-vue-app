<template>
    <div class="adv-manage">
        <Drawer position="right" v-model="isShow">
            <OrderFilter
                ref="historyRef"
                :title="'筛选'"
                @choose="filterSubmit"
                :renderData="renderDataTree"
            ></OrderFilter>
        </Drawer>
        <TitleHeader :title="'场外订单'">
            <img slot="header" @click="isShow=!isShow" class="chooss" src="@/assets/img/common/screen.png" alt="">
            <div @scroll.capture="scrollLoad" class="lxa-history-body lxa-refresh-box">
                <div class="body-content-slot" slot="history">
                    <PullRefresh
                        v-model="isLoading"
                        @refresh="onRefresh"
                    >
                        <NCardItem :showArrow="true" @click="goAdvState(item)" v-for="(item, index) in list" :key="index">
                            <template slot="title">
                                <span>USDT</span>
                                <span :class="1|orderSideColor">买入</span>
                            </template>
                            <template slot="right">
                                <span>待付款</span>
                            </template>
                            <template slot="lable">
                                <span>{{"价格"}} {{1|depositState}} (CNY)</span>
                                <span>{{"数量"}} ({{item.coin && item.coin.toUpperCase()}})</span>
                                <span>{{"成交额"}} (CNY)</span>
                            </template>
                            <template slot="value">
                                <span>21312</span>
                                <span>42121</span>
                                <span>55</span>
                            </template>
                        </NCardItem>
                        <div class="loadMore-loading"><Loading type='component' :loading='loadMore'></Loading></div>
                        <p v-if="isEnd && list.length" class="color-gray">{{'暂无更多'}}</p>
                        <noData v-if="!_loading" :moDataShow='!list.length'  />
                    </PullRefresh>
                </div>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { otcDealsList } from '@/api/index';
import { axiosGoPromiseArr } from '@/api/axios';
import Loading from '@/components/loading/index.vue';
// import navFilter from '../component/filter.vue';
import Drawer from '@/components/commons/Drawer.vue';
import OrderFilter from '@/components/Orders/OrderFilter.vue';
import NCardItem from '@/components/card/index.vue';

export default Vue.extend({
    components: {
        Loading,
        Drawer,
        OrderFilter,
        NCardItem,
    },
    data() {
        return {
            state: '-1',
            navText: '广告管理',
            isShow: false,
            showBorder: false,
            loadMore: false,
            side: 0,
            coin: '',
            page: 1,
            size: 10,
            isEnd: false,
            isLoading: false,
            // eslint-disable-next-line @typescript-eslint/camelcase
            list: [{ taker_side: 1 }, { taker_side: 1 }, { taker_side: 1 }, { taker_side: 1 }, { taker_side: 1 },
            // eslint-disable-next-line @typescript-eslint/camelcase
                { taker_side: 1 }, { taker_side: 1 }, { taker_side: 1 }, { taker_side: 1 }, { taker_side: 1 }, { taker_side: 1 }],
            renderDataTree: [{
                title: '状态',
                key: 'state',
                value: -1,
                data: [
                    { title: '待付款', state: 0 },
                    { title: '待释放', state: 1 },
                    { title: '已完成', state: 2 },
                    { title: '已取消', state: 3 },
                    { title: '申诉中', state: 4 },
                    { title: '全部', state: -1 },
                ],
            }, {
                title: '币种',
                key: 'coin',
                value: 0,
                data: [
                    { title: 'USDT', coin: 'usdt' },
                    { title: 'USDC', coin: 'usdc' },
                    { title: 'USTC', coin: 'ustc' },
                ],
            }],
        };
    },
    created() {
        this.$store.commit('changeLoading', true);
        this.loadData();
    },
    computed: {
        tabList() {
            return [{
                title: '场外订单',
                value: 'history',
            }];
        },
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
            }, 3000);
            // this.initParams();
        },
        takerSide(renderData: { taker_id: any; taker_side: 1|2 }, type = 0) {
            const side = [
                {
                    1: ['购买', 1],
                    2: ['出售', 2],
                },
                {
                    2: ['买入', 1],
                    1: ['卖出', 2],
                }];
            if ((renderData.taker_id === this._userInfo.userId)) {
                return side[0][renderData.taker_side][type];
            }
            return side[1][renderData.taker_side][type];
        },
        // 筛选币种和交易类型
        filterSubmit(value: { side: number; coin: string; state: string }) {
            this.side = value.side;
            this.coin = value.coin;
            this.state = value.state;
            this.initParams();
        },
        // 滚动懒加载
        scrollLoad(e: { target: any }) {
            const
                scroll = e.target;
            const { scrollTop } = scroll;
            const { scrollHeight } = scroll;
            const { clientHeight } = scroll;
            if ((clientHeight + scrollTop > scrollHeight - 50) && (clientHeight + scrollTop !== scrollHeight) && !this.loadMore && !this.isEnd) {
                this.loadMore = true;
                this.loadData();
            }
        },
        // 请求参数初始化
        initParams() {
            this.page = 1; // 页码
            this.list = [];
            this.$store.commit('changeLoading', true);
            this.isEnd = false;
            this.loadMore = false;
            this.loadData();
        },
        // 加载数据
        loadData() {
            const params = {
                coin: this.coin, // 币种
                country: 1, // 国家代码
                currency: 1, // 货币代码
                // eslint-disable-next-line @typescript-eslint/camelcase
                pay_type: 0, // 支付类型
                state: this.state, // 订单状态 0交易中 1已支付 2已释放 3已取消 4申诉中
                // eslint-disable-next-line @typescript-eslint/camelcase
                taker_side: this.side, // taker的交易方向 1:buy 2:sell
                page: this.page, // 页码
                size: this.size, // 每页显示数量
            };
            // 取消请求
            if (axiosGoPromiseArr) {
                axiosGoPromiseArr.forEach((ele, index) => {
                    ele.cancel('001');
                    delete axiosGoPromiseArr[index];
                });
            }
            otcDealsList(params).then((res) => {
                this.$store.commit('changeLoading', false);
                this.isLoading = false;
                if (res.data.status === 200 && res.data.data.list) {
                    this.loadMore = false;
                    this.list = this.list.concat(res.data.data.list);
                    this.page += 1;
                    if (this.list.length >= res.data.data.total) {
                        this.isEnd = true;
                    }
                }
            }).catch(() => {
                this.$store.commit('changeLoading', false);
                this.isLoading = false;
                this.loadMore = false;
            });
        },
        // tabbar切换
        tabClick(type: string) {
            this.state = type;
            this.initParams();
        },
        // 去广告详情页
        goAdvState(item: { id: any }) {
            console.log(item);
            // this.$router.push({
            //     name: 'orderState',
            //     params: { id: item.id },
            // });
        },
    },
    // methods: {
    //     loadData() {
    //         console.log(12);
    //     },
    // },
});

</script>

<style lang="less" scoped>
.adv-manage{
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #fff;
  .chooss{
        width: 60px;
        height: auto;
        padding: 15px;
        vertical-align: middle;
    }
  .overlay{
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right: 0;
        background-color:rgba(0,0,0,.5);
        z-index: 1;
    }
  .header{
      position: absolute;
      width: 100%;
      z-index: 2;
      background-color: white;
        .nav-header {
        font-size: 34px;
        color: #202025;
        background-color: #fff;
        text-align: left;
        width: 100%;
        }
        .header-top{
        padding: 0 21px 0 41px;
        display: flex;
        justify-content: space-between;
        align-items:center;
        height: 80px;
        }
        .scale-half{
        width: 30px;
        }
        .back-img{
            width: 19px;
            height: 33px;
        }
        .nav-bottom{
            padding: 20px 0 40px 28px;
            font-size: 45px;
            font-weight: bold;
            position: relative;
            span{
            padding-right: 48px;
            }
        }
  }
  .color1{
    color: #FF6565;
  }
  .color2{
    color:#3BD1AB;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0.3;
  }
}

</style>
<style lang="less">
.adv-manage{
  .tab-wrap{
    padding-top: 180px;
    flex: 1;
    background-color: white;
    overflow: hidden;
    .van-tabs{
      height: 100%;
    }
    .van-sticky{
      position: relative;
    }
    .dot{
      display:inline-block;
      width:7px;
      height:7px;
      background:rgba(216,118,117,1);
      border-radius:50%;
      vertical-align: middle;
    }
    .loadMore-loading{
      height: 40px;
      line-height: 40px;
      margin: 20px ;
    }
  .van-tabs__wrap{
        height:90px;
        .van-tab{
        font-size: 28px;
        line-height:90px;
        flex: auto;
        &:nth-of-type(1){
          text-align: left;
          }
        &:nth-of-type(5){
          text-align: right;
          }
        }
        .van-tabs__nav{
          justify-content: space-between;
          padding: 0 22px;
        }
      }
  .list{
    .top{
      line-height:48px;
      font-size:34px;
      font-weight:bold;
      display: flex;
      justify-content: space-between;
      padding: 32px 0 40px 0;
      .left{
        .coin{
          padding-left: 50px;
          color: black;
        }
      }
      .right{
        font-size: 24px;
        font-weight: 400;
        color: #333333;;
        .arrow{
          padding-left: 23px;
          height: 19px;
        }
      }
    }
    .middle{
      display: flex;
      justify-content: space-between;
      color: #CACACA;
      font-size: 22px;
      .col1{
        text-align: left
      }
      .col3{
        text-align: right;
      }
    }
    .bottom{
      display: flex;
      padding:30px 0;
      justify-content: space-between;
      color: #8D8D8D;
      font-size: 28px;
      .col1{
        text-align: left
      }
      .col3{
        text-align: right;
        color: #3BD1AB;
      }
    }
  }
  }
  .van-tabs__content{
        padding: 0 22px;
        height: calc(100% - 90px);
        overflow: scroll;
        .van-pull-refresh{
            min-height: 100%;
        }
        .van-tab__pane{
            min-height: 100%;
        }
  }

}
.lxa-refresh-box {
  .van-pull-refresh{
      min-height: 100%;
  }
  .van-tab__pane{
      height: 100%;
  }
}
.lxa-history-body{
  padding-top: 45px;
  height: calc(100% - 88px);
  .body-content-slot{
    height: 100%;
  }
}

</style>
