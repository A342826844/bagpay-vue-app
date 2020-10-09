<template>
    <div class="home">
        <h1>home</h1>
        <p @click="clickTest">{{testValue}}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    testValue: number;
}

export default Vue.extend({
    name: 'Home',
    data(): data {
        return {
            testValue: 2113,
        };
    },
    methods: {
        clickTest() {
            this.testValue += 1;
        },
    },
});
</script>
