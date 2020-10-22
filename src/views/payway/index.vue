<template>
    <div class="payway">
        <TitleHeader :title="$t('mine.payManaged')">
            <img slot="header" @click="addHandle" class="app-img-50" src="../../assets/img/common/add.png" alt="">
            <!-- <img v-show="item.status" @click="delHandle" src="../../assets/img/common/del.png" alt=""> -->
            <ul class="payway-box app-padding40 text-align-l">
                <li class="payway-li" v-for="item in list" :key="item.id">
                    <div class="flex-between-c">
                        <h5 class="app-size-34">Huione Pay</h5>
                        <img class="app-img-50" src="../../assets/img/mine/del.png" alt="">
                    </div>
                    <div class="payway-info">廖小艾     26595924325429d595252</div>
                </li>
            </ul>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    list: Array<any>;
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            list: [],
        };
    },
    created() {
        for (let i = 0; i <= 10; i++) {
            this.list.push({
                id: i,
            });
        }
    },
    methods: {
        addHandle() {
            this.$router.push('/payway/add');
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
