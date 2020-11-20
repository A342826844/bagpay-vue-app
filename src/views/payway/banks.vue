<template>
    <div class="payway">
        <TitleHeader :title="$t('payway.banksSelect')">
            <ul class="payway-box app-padding40 text-align-l">
                <li @click="selectBank(item)" class="payway-li" v-for="item in list" :key="item.id">
                    <div class="flex-between-c">
                        <div>
                            <!-- <img class="app-img-50" :src="item.img" alt=""> -->
                            <h5 style="display: inline-block" class="app-size-34">{{item.title}}</h5>
                        </div>
                        <img v-show="id === item.id" class="app-img-50" src="../../assets/img/setting/ok.png" alt="">
                    </div>
                </li>
            </ul>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    id: number;
    list: Array<any>;
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            id: 0,
            list: [],
        };
    },
    created() {
        this.getBankList();
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            vm.setId(to.query.id);
        });
    },
    methods: {
        getBankList() {
            this.changeLoading(true);
            this.$api.getBankList().then((res: any) => {
                this.changeLoading(false);
                if (res.data) {
                    this.list = res.data;
                }
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast(this.$t('mine.banksFailed'));
                }
            });
        },
        setId(id: string|number) {
            this.id = Number(id);
        },
        selectBank(item: any) {
            this.setId(item.id);
            this.$store.commit('selectBank', item);
            setTimeout(() => {
                this.$router.go(-1);
            }, 300);
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
