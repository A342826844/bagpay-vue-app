<template>
    <div class="notice">
        <TitleHeader title="公告列表">
            <div class="app-padding40">
                <ul class="notice-ul">
                    <li
                        @click="$router.push(`/news/noticedetail?id=${item}`)"
                        v-for="item in 10"
                        :key="item"
                        class="li app-padding40 light-grey-bg"
                    >
                        <div class="flex-between-c">
                            <span>BagPay预计12月12日开BTC、ETH... </span>
                            <img class=" app-img-50" src="../../assets/img/common/arrow_right.png" alt="">
                        </div>
                        <div class="time text-align-l">17:22 10/18</div>
                    </li>
                </ul>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {

}

export default Vue.extend({
    name: 'Notice',

});
</script>

<style lang="less" scoped>
.notice{
    &-ul{
        margin-top: 55px;
        font-size: 28px;
        .li{
            margin-top: 30px;
            padding-top: 28px;
            padding-bottom: 28px;
            .time{
                margin-top: 18px;
                font-size: 24px;
                color: #A6A6A6;
            }
        }
    }
    &-poptip{
        margin-top: 64px;
        font-size: 28px;
        &-item{
            margin-top: 52px;
        }
    }
}
</style>
