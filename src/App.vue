<template>
    <div id="app">
        <div id="main" :class="lang === 'en-us'?'en-us':''">
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

export default Vue.extend({
    name: 'Home',
    components: {
        Loading,
        Footer,
    },
    created() {
        if (this.$store.state.loginStatus) {
            this.getCoinList();
            this.initUserInfo();
            // this.$router.push('/home');
        }
    },
    computed: {
        lang(): string {
            return this.$store.state.lang;
        },
    },
});
</script>
