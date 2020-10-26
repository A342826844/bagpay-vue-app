<template>
    <div class="payway">
        <TitleHeader :title="$t('mine.payManaged')">
            <img slot="header" @click="addHandle" class="app-img-50" src="../../assets/img/common/add.png" alt="">
            <!-- <img v-show="item.status" @click="delHandle" src="../../assets/img/common/del.png" alt=""> -->
            <ul class="payway-box app-padding40 text-align-l">
                <li class="payway-li" v-for="item in list" :key="item.id">
                    <div class="flex-between-c">
                        <h5 class="app-size-34" v-if="item.type === 1">{{`${item.bank} ${item.sub_bank}`}}</h5>
                        <h5 class="app-size-34" v-if="item.type !== 1">
                            <span class="vertical-m">{{item.type | payType}}</span>
                            <img @click="showImg(item)" class="payway-ercode app-img-50" src="../../assets/img/common/ercode.png" alt="">
                        </h5>
                        <!-- {{item.status}} -->
                        <!-- <Switchs @on-change="changeHandle(item)" :value="!!item.status"></Switchs> -->
                        <V-Switch
                            :value="item.status"
                            :active-value="1"
                            :inactive-value="0"
                            size="24px"
                            @change="changeHandle(item)"
                            active-color="#5894EE"
                            inactive-color="#EDF3FB"/>
                    </div>
                    <div class="payway-info">{{`${item.real_name}  ${item.account}`}}</div>
                </li>
            </ul>
            <noData v-if="!_loading && (!list.length)"/>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ImagePreview } from 'vant';

// type data = {
//     list: Array<any>;
// };

export default Vue.extend({
    name: 'Aboutus',
    // data(): data {
    //     return {
    //         // list: [],
    //     };
    // },
    created() {
        this.getList();
    },
    computed: {
        list(): Array<any> {
            return this.$store.state.bankList;
            // return [];
        },
    },
    methods: {
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
            // this.$api.getUserBankList().then((res: any) => {
            //     this.changeLoading(false);
            //     this.list = res.data;
            // }).catch((err: any) => {
            //     this.changeLoading(false);
            //     if (!err.data) {
            //         this.$normalToast('收款方式获取失败');
            //     }
            // });
        },
        showImg(item: any) {
            ImagePreview({
                images: [`${this.$api.getFile}${item.qrc}`],
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
        changeHandle(item: any) {
            this.changeLoading(true);
            if (item.status === 1) {
                this.bankUserDisable(item.id);
            } else {
                this.bankUserEnable(item.id);
            }
        },
        bankUserDisable(id: number) {
            this.$api.bankUserDisable(id).then(() => {
                // this.changeLoading(false);
                this.getList();
                // this.list = this.list.map((item: any) => {
                //     if (item.id === id) {
                //         return {
                //             ...item,
                //             status: 0,
                //         };
                //     }
                //     return item;
                // });
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast('禁用失败，请稍后重试');
                }
            });
        },
        bankUserEnable(id: number) {
            this.$api.bankUserEnable(id).then(() => {
                // this.changeLoading(false);
                this.getList();
                // this.list = this.list.map((item: any) => {
                //     if (item.id === id) {
                //         return {
                //             ...item,
                //             status: 1,
                //         };
                //     }
                //     return item;
                // });
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
