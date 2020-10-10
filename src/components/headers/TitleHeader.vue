<template>
    <div class="app-title-headers">
        <Headers @back="goback"></Headers>
        <h3 class="app-title-headers-title" v-if="!$slots.default" @click="testHandle">{{title}}</h3>
        <div>
            <slot></slot>
        </div>
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
    },
    methods: {
        testHandle() {
            console.log(this.$slots);
        },
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
.app-title-headers {
    &-title{
        text-align: left;
        padding-left: 40px;
        margin-top: 62px;
        font-size: 45px;
        line-height: 45px;
        color: #282828;
        font-weight: bold;
    }
}
</style>
