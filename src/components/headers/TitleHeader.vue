<template>
    <div class="app-title-headers" :class="[theme, {fill}]">
        <Headers ref="headers" v-bind="$attrs" :opacityTtitle="opacity" :title="title" :theme="theme" @back="goback">
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
    data() {
        return {
            opacity: 0,
        };
    },
    mounted() {
        if (!this.$route.meta.keepAlive) {
            window.addEventListener('scroll', this.scrollHandle, true);
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandle, true);
    },
    activated() {
        window.addEventListener('scroll', this.scrollHandle, true);
    },
    deactivated() {
        window.removeEventListener('scroll', this.scrollHandle, true);
        this.opacity = 0;
    },
    // activated,deactivated
    methods: {
        goback() {
            if (typeof this.$listeners.back === 'function') {
                this.$emit('back');
                return;
            }
            this.$router.go(-1);
        },
        scrollHandle(event: Event) {
            if (event.target) {
                const { scrollTop } = (event.target as HTMLElement);
                const { offsetTop, offsetHeight } = (this.$refs.title as HTMLElement);
                const { clientHeight } = ((this.$refs.headers as any).$el);
                // 滚动条高度 - title距离顶部高度 + header高度 - title高度
                if (scrollTop - offsetTop + clientHeight - offsetHeight >= 0) {
                    this.opacity = 1;
                } else {
                    this.opacity = 0;
                }
            }
        },
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
        overflow: scroll;
    }
}
</style>
