<template>
    <div class="register">
        <h1>register</h1>
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
