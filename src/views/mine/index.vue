<template>
    <div class="mine">
        <h1>mine</h1>
        <p @click="loginHandle">{{islogin ? '已登录' : '未登录'}}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    islogin: boolean;
}

export default Vue.extend({
    name: 'Home',
    data(): data {
        return {
            islogin: false,
        };
    },
    methods: {
        loginHandle() {
            this.islogin = !this.islogin;
        },
    },
});
</script>
