<template>
    <div class="payway">
        <TitleHeader :title="$t('mine.payManaged')">
            <img slot="header" @click="addHandle" class="app-img-50" src="../../assets/img/common/add.png" alt="">
            <!-- <img v-show="item.status" @click="delHandle" src="../../assets/img/common/del.png" alt=""> -->
            <ul class="payway-box app-padding40 text-align-l">
                <li @click="selectBank(item)" class="payway-li" v-for="item in renderList" :key="item.id">
                    <div class="payway-li-title flex-between-c">
                        <h5 class="app-size-34" v-if="item.type === 1">{{`${item.bank}`}}</h5>
                        <h5 class="app-size-34" v-else>
                            <span class="vertical-m">{{item.type | payType}}</span>
                            <img
                                v-if="item.type === 2 || item.type === 3 || item.type === 4"
                                @click.stop="showImg(item)"
                                class="payway-ercode app-img-50"
                                src="../../assets/img/common/ercode.png"
                                alt=""
                            >
                        </h5>
                        <img v-show="idList.includes(item.id)" class="app-img-50" src="../../assets/img/setting/ok.png" alt="">
                    </div>
                    <div class="payway-info">
                        <span v-if="item.type !== 5">{{`${item.real_name} ${item.account}`}}</span>
                        <span class="ellipsis-1" v-if="item.type === 5">
                            {{`${item.account} ${item.bank} ${item.sub_bank}`}}
                        </span>
                    </div>
                </li>
            </ul>
            <noData v-if="!_loading && (!renderList.length)"/>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ImagePreview } from 'vant';

type data = {
    // list: Array<any>;
    // id: number;
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            // list: [],
            // id: 0,
        };
    },
    computed: {
        renderList(): Array<any> {
            const data = this.list.filter((item) => item.status);
            if (!this.$route.query.pay_types) return data;
            return data.filter((item) => this.$route.query.pay_types.includes(item.type));
        },
        list(): Array<any> {
            return this.$store.state.bankList;
        },
        idList(): number[] {
            return this.$store.state.otcPayTypes.map((item: any) => item.id);
        },
    },
    created() {
        this.getList();
    },
    methods: {
        selectBank(item: any) {
            if (Number(this.$route.query.type) === 1) {
                this.singleHandle(item);
            } else {
                this.multipleHandle(item);
            }
        },
        singleHandle(item: any) {
            this.$store.commit('changeOtcPayTypes', item);
            setTimeout(() => {
                this.$router.go(-1);
            }, 300);
        },
        multipleHandle(item: any) {
            if (this.idList.includes(item.id)) {
                this.$store.commit('filterOtcPayTypes', item.id);
            } else {
                this.$store.commit('addOtcPayTypes', item);
            }
        },
        showImg(item: any) {
            ImagePreview({
                images: [`${this.$api.getFile}${item.qrc}`],
            });
        },
        getList() {
            this.changeLoading(true);
            this.getUserBankList().then(() => {
                this.changeLoading(false);
                // 选择默认的收款方式
                if (this.$route.query.selectType) {
                    const res = this.$store.state.bankList.find((item: any) => item.type === Number(this.$route.query.selectType));
                    if (res) {
                        this.$store.commit('changeOtcPayTypes', res);
                    }
                }
            }).catch((err: any) => {
                this.changeLoading(false);
                if (!err.data) {
                    this.$normalToast(this.$t('common.collectionFailure'));
                }
            });
        },
        addHandle() {
            if (this._userInfo.ver_lv < 1) {
                this.$dialog.confirm({
                    title: `${this.$t('common.poptip')}`,
                    message: `${this.$t('mine.notCertified', { num: 1 })}`,
                    confirmButtonText: `${this.$t('mine.toAuthenticate')}`,
                    cancelButtonText: `${this.$t('common.cancle2')}`,
                }).then(() => {
                    this.$router.push('/mine/safesetting?type=1');
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
