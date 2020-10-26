<template>
    <div class="payway">
        <TitleHeader :title="$t('mine.payManaged')">
            <img slot="header" @click="addHandle" class="app-img-50" src="../../assets/img/common/add.png" alt="">
            <!-- <img v-show="item.status" @click="delHandle" src="../../assets/img/common/del.png" alt=""> -->
            <ul class="payway-box app-padding40 text-align-l">
                <li @click="selectBank(item)" class="payway-li" v-for="item in renderList" :key="item.id">
                    <div class="flex-between-c">
                        <h5 class="app-size-34" v-if="item.type === 1">{{`${item.bank} ${item.sub_bank}`}}</h5>
                        <h5 class="app-size-34" v-else>{{item.type | payType}}</h5>
                        <img v-show="id === item.id" class="app-img-50" src="../../assets/img/setting/ok.png" alt="">
                    </div>
                    <div class="payway-info">{{`${item.real_name}  ${item.account}`}}</div>
                </li>
            </ul>
            <noData v-if="!_loading && (!renderList.length)"/>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    // list: Array<any>;
    id: number;
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            // list: [],
            id: 0,
        };
    },
    computed: {
        renderList(): Array<any> {
            return this.list.filter((item) => item.status);
        },
        list(): Array<any> {
            return this.$store.state.bankList;
        },
    },
    created() {
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
            this.getUserBankList().then(() => {
                this.changeLoading(false);
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast('收款方式获取失败');
                }
            });
        },
        addHandle() {
            console.log(this._userInfo.ver_lv);
            if (this._userInfo.ver_lv < 1) {
                this.$dialog.confirm({
                    title: '温馨提示',
                    message: '您还未进行LV1认证，请先认证',
                    confirmButtonText: '去认证',
                }).then(() => {
                    this.$router.push('/mine/safesetting');
                });
                return;
            }
            this.$router.push('/payway/add');
        },
    },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
