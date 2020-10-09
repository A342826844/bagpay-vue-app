<template>
    <div id="app">
        <div class="main-content views" :class="lang === 'en-us'?'en-us':''">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <Loading/>
        <Footer v-show="$route.meta.showFooter"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Loading from '@/components/loading/index.vue'; // @ is an alias to /src
import Footer from '@/components/footer/index.vue'; // @ is an alias to /src

type data = {
    testValue: number|string;
}

export default Vue.extend({
    name: 'Home',
    components: {
        Loading,
        Footer,
    },
    computed: {
        lang() {
            return this.$store.state.lang;
        },
    },
    data(): data {
        return {
            testValue: 2113,
        };
    },
    methods: {
        clickTest() {
            console.log(this.testValue);
            this.testValue = '12212';
            console.log(this.$store.state);
        },
    },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
