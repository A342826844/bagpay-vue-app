<template>
    <div v-show="show" class="app-no-data" :class="{'padding-b': paddingB}">
        <img src="../../assets/img/common/noData.png" alt/>
        <p v-text="text ? text : $t(textTitle[renderType])"></p>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    props: {
        show: {
            type: Boolean,
            default: true,
        },
        noWebAns: {
            type: Boolean,
            default: false,
        },
        paddingB: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
        },
    },
    data() {
        return {
            textTitle: {
                1: 'common.webErQua', // 网络问题
                2: 'common.noData', // 暂无数据
            },
        };
    },
    computed: {
        renderType() {
            if (this.noWebAns) return 1;
            return 2;
        },
    },
});

</script>

<style lang='less' scoped>
.app-no-data {
    padding-top: 80px;
    & > img {
        width: 200px;
        height: auto;
    }
    & > p {
        margin-top: 25px;
        font-size: 24px;
        color: #575757;
    }
    &.padding-b{
        padding-bottom: 140px;
    }
}
</style>
