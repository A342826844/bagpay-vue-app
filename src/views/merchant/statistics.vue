<template>
    <div class="merchant light-grey-bg">
        <div class="merchant-header">
            <Headers bold theme="primary">
                <h4 slot="left">
                    <span class="app-size-45 vertical-m">统计</span>
                </h4>
            </Headers>
            <div class="merchant-header-fringe primary-bg"></div>
        </div>
        <div>
            <!-- <Histogram :data="datas"></Histogram> -->
            <!-- <Bar :data="datas"></Bar> -->
        </div>
        <div class="app-size-34 lxa-footer-btn">
            <Button @click="$router.push('/merchant/apply')">立即申请</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import Histogram from 'v-charts/lib/histogram.common';
// import Bar from 'v-charts/lib/bar.common';

// TODO:
type data = {
    // datas: any;
    address: string;
    loading: boolean;
    symbol: string;
    qrValue: string;
    memo: string;
    value: string;
    size: number;
}

// const datas = {
//     columns: ['日期', '访问用户'],
//     rows: [
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-22', '访问用户': 32371 },
//         { '日期': '2018-05-23', '访问用户': 12328 },
//         { '日期': '2018-05-24', '访问用户': 92381 }
//     ]
// };

export default Vue.extend({
    name: 'MerchantStatistics',
    components: {
        // Histogram,
        // Bar,
    },
    data(): data {
        return {
            // datas,
            address: '',
            symbol: '',
            loading: true,
            qrValue: '',
            value: '',
            memo: '',
            size: 100,
        };
    },
});
</script>

<style lang="less" scoped>
.merchant{
    height: 100%;
    position: relative;
    overflow: auto;
    .margin-b40{
        margin-bottom: 40px;
    }
    .margin-t24{
        margin-top: 24px;
    }
    &-header-fringe{
        height: 220px;
        border-radius: 0 0 50px 50px;
    }
    &-body{
        position: absolute;
        // background: pink;
        max-height: calc(100% - 220px);
        overflow: scroll;
        top: 150px;
        width: 658px;
        left: 0;
        right: 0;
        margin: 0 auto;
        &-mark{
            .mark1{
                width: 430px;
                &-title{
                    margin-bottom: 28px;
                }
            }
            .mark2{
                width: 200px;
            }
            .img1{
                width: 92px;
                flex-shrink: 0;
                margin-right: 20px;
            }
            .img2{
                width: 100px;
            }
        }
        &-gateway{
            .path{
                width: 580px;
                margin-top: 52px;
            }
            .path-img{
                width: 100%;
            }
            // .path-lable{
            //     width: 100%;
            // }
        }
        &-api{
            .api-li{
                margin-bottom: 32px;
                &-tip{
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>
