<template>
    <div class="app-headers app-padding40" :class="[theme, {[`header-position-${position}`]: position}]">
        <img
            v-if="isBack"
            @click="goback"
            class="goBack"
            :src="theme === 'light' ? previous_page : baise_go" alt=""
        >
        <span class="title" :class="[{'bold-title': bold}]">{{title}}</span>
        <span class="rightTitle" @click="$emit('right-click')">{{value}}</span>
        <span class="right"><slot></slot></span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const previous_page = require('@/assets/img/common/previous_page.png');
const baise_go = require('@/assets/img/common/baise_go.png');

export default Vue.extend({
    name: 'layout',
    props: {
        isBack: {
            type: Boolean,
            default: true,
        },
        theme: {
            type: String,
            default: 'light', // light dark primary
        },
        bold: {
            type: Boolean,
        },
        title: {
            type: String,
        },
        value: {
            type: String,
        },
        position: {
            type: String,
        },
    },
    data() {
        return {
            previous_page,
            baise_go,
        };
    },
    methods: {
        /** */
        goback() {
            if (typeof this.$listeners.back === 'function') {
                this.$emit('back');
                return;
            }
            this.$router.go(-1);
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/color.less';
.app-headers {
    background: #fff;
    height: 88px;
    width: 100%;
    text-align: left;
    line-height: 88px;
    padding-right: 21px;
    position: sticky;
    color: #202025;
    top: 0;
    z-index: 1000;
    &.dark{
        background: transparent;
        color: #fff;
    }
    &.primary{
        background: @primary;
        color: #fff;
    }
    &.header-position-fixed{
        position: fixed;
    }
    .rightTitle, .right{
        font-size: 28px;
        position: absolute;
        right: 0;
        height: 100%;
        margin-right: 30px;
    }
    .goBack {
        width: 19px;
        height: 33px;
        position: absolute;
        top:25px;
        left:41px
    }
    .title {
        display: inline-block;
        transform: translateX(-50%);
        font-size: 34px;
        font-weight: normal;
        position: absolute;
        left:50%;
        &.bold-title{
            font-size: 45px;
            font-weight: bold;
        }
    }
    .right {
        float: right;
    }
}
</style>
