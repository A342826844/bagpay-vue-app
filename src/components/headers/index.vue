<template>
    <div class="app-headers app-padding40" :class="[theme, {[`header-position-${position}`]: position}]">
        <img
            v-if="isBack"
            @click="goback"
            class="goBack"
            :src="theme === 'light' ? previous_page : baise_go" alt=""
        >
        <div class="app-headers-left">
            <slot name="left"></slot>
        </div>
        <span class="title ellipsis" :style="{opacity: opacityTtitle}" :class="[{'bold-title': bold}]">{{title}}</span>
        <span class="rightTitle" @click="$emit('right-click')">{{value}}</span>
        <span class="right" :class="{ 'no-padding': noRightPadding }"><slot></slot></span>
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
            default: 'light', // light dark primary red
        },
        noRightPadding: {
            type: Boolean,
            default: false,
        },
        bold: {
            type: Boolean,
        },
        title: {
            type: String,
        },
        opacityTtitle: {
            type: Number,
            default: 1,
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
        background: @primary-bg;
        color: #fff;
    }
    &.red{
        background: @red;
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
        // top:25px;
        left:44px;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .title {
        display: inline-block;
        transform: translateX(-50%);
        font-size: 34px;
        font-weight: normal;
        position: absolute;
        left:50%;
        transition: opacity 0.5s;
        width: 50%;
        text-align: center;
        &.bold-title{
            font-size: 45px;
            font-weight: bold;
        }
    }
    &-left{
        display: inline-block;
        margin-left: 52px;
        vertical-align: middle;
    }
    .right {
        float: right;
        &.no-padding{
            margin-right: 0;
        }
    }
}
</style>
