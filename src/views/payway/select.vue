<template>
    <div class="payway">
        <TitleHeader :title="$t('mine.payManaged')">
            <img slot="header" @click="addHandle" class="app-img-50" src="../../assets/img/common/add.png" alt="">
            <!-- <img v-show="item.status" @click="delHandle" src="../../assets/img/common/del.png" alt=""> -->
            <ul class="payway-box app-padding40 text-align-l">
                <li @click="selectBank(item)" class="payway-li" v-for="item in renderList" :key="item.id">
                    <div class="flex-between-c">
                        <h5 class="app-size-34" v-if="item.type === 1">{{`${item.bank} ${item.sub_bank}`}}</h5>
                        <img v-show="id === item.id" class="app-img-50" src="../../assets/img/setting/ok.png" alt="">
                    </div>
                    <div class="payway-info">{{`${item.real_name}  ${item.account}`}}</div>
                </li>
            </ul>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    list: Array<any>;
    id: number;
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            list: [],
            id: 0,
        };
    },
    computed: {
        renderList(): Array<any> {
            return this.list.filter((item) => item.status);
        },
    },
    created() {
        console.log(this.$route.query.id);
        this.setId(this.$route.query.id);
        this.getList();
    },
    methods: {
        selectBank(item: any) {
            this.setId(item.id);
            this.$store.commit('selectBank', item);
            setTimeout(() => {
                this.$router.go(-1);
            }, 300);
        },
        setId(id: any) {
            this.id = Number(id);
        },
        getList() {
            this.changeLoading(true);
            this.$api.getUserBankList().then((res: any) => {
                this.changeLoading(false);
                this.list = res.data;
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast('收款方式获取失败');
                }
            });
        },
        addHandle() {
            this.$router.push('/payway/add');
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
