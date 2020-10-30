<template>
    <div class="app-title-headers" :class="[theme, {fill}]">
        <Headers v-bind="$attrs" :theme="theme" @back="goback">
            <slot name="header"></slot>
        </Headers>
        <div
            class="app-title-headers-title app-padding40 flex-between-end"
            :class="[{'border-b': border}, {'border-padding': border}]"
        >
            <h3 ref="title">
                <template v-if="title">{{title}}</template>
                <slot name="title"></slot>
            </h3>
            <slot name="right"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'layout',
    props: {
        title: {
            type: String,
        },
        border: {
            type: Boolean,
            default: false,
        },
        fill: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String,
            default: 'light', // light dark
        },
    },
    // mounted() {
    //     window.addEventListener('scroll', this.scrollHandle, true);
    // },
    // beforeDestroy() {
    //     window.removeEventListener('scroll', this.scrollHandle, true);
    // },
    methods: {
        goback() {
            if (typeof this.$listeners.back === 'function') {
                this.$emit('back');
                return;
            }
            this.$router.go(-1);
        },
        // scrollHandle(event: Event) {
        //     if (event.target) {
        //         console.log(event.target.scrollX);
        //     }
        //     console.log((this.$refs.title as HTMLElement).offsetTop);
        // },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/color.less';
.app-title-headers {
    &-title{
        background: #ffffff;
        text-align: left;
        padding-top: 62px;
        // font-weight: bold;
        h3{
            color: #282828;
            line-height: 45px;
            font-size: 45px;
        }
        &.border-padding{
            padding-bottom: 28px;
        }
    }
    &.dark{
        background: transparent;
        .app-title-headers-title{
            background: transparent;
        }
        h3{
            color: #ffffff;
        }
    }
    &.primary{
        background: @primary;
        .app-title-headers-title{
            background: @primary;
        }
        h3{
            color: #ffffff;
        }
    }
    &.fill{
        height: 100%;
    }
}
</style>
