<template>
    <div class="app-headers">
        <!-- <img
            v-if="isBack"
            @click="goback"
            v-show="theme === 'dark'"
            class="goBack"
            src="@/assets/img/common/baise_go.png" alt=""
        > -->
        <img
            v-if="isBack"
            @click="goback"
            v-show="theme === 'light'"
            class="goBack"
            src="@/assets/img/common/previous_page.png" alt=""
        >
        <span class="title">{{title}}</span>
        <span class="rightTitle" @click="$emit('right-click')">{{value}}</span>
        <span class="right"><slot></slot></span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'layout',
    props: {
        isBack: {
            type: Boolean,
            default: true,
        },
        theme: {
            type: String,
            default: 'light', // light dark
        },
        title: {
            type: String,
        },
        value: {
            type: String,
        },
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
.app-headers {
    background: #fff;
    height: 88px;
    width: 100%;
    text-align: left;
    line-height: 88px;
    padding-left: 40px;
    padding-right: 21px;
    position: sticky;
    color: #202025;
    top: 0;
    z-index: 1000;
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
    }
    .right {
        float: right;
    }
}
</style>
