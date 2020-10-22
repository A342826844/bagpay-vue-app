<template>
    <div class="payway">
        <TitleHeader :title="$t('mine.payManaged')">
            <img slot="header" @click="addHandle" class="app-img-50" src="../../assets/img/common/add.png" alt="">
            <!-- <img v-show="item.status" @click="delHandle" src="../../assets/img/common/del.png" alt=""> -->
            <ul class="payway-box app-padding40 text-align-l">
                <li class="payway-li" v-for="item in list" :key="item.id">
                    <div class="flex-between-c">
                        <h5 class="app-size-34" v-if="item.type === 1">{{`${item.bank} ${item.sub_bank}`}}</h5>
                        <h5 class="app-size-34" v-if="item.type !== 1">{{item.type | payType}}</h5>
                        {{item.status}}
                        <Switchs @on-change="changeHandle(item)" :value="!!item.status"></Switchs>
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
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            list: [],
        };
    },
    created() {
        this.getList();
    },
    methods: {
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
        changeHandle(value: any) {
            console.log(value);
        },
        bankUserDisable(id: number) {
            console.log(id);
            this.$api.bankUserDisable(id).then(() => {
                this.changeLoading(false);
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast('禁用失败，请稍后重试');
                }
            });
        },
        bankUserEnable(id: number) {
            this.$api.bankUserEnable(id).then(() => {
                this.changeLoading(false);
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast('启用失败，请稍后重试');
                }
            });
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
