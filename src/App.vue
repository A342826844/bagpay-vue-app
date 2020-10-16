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

type data = {
    testValue: number|string;
}

export default Vue.extend({
    name: 'Home',
    components: {
        Loading,
        Footer,
    },
    updated() {
        const userInfo = sessionStorage.getItem('userInfo');
        console.log(userInfo);
        if (userInfo) {
            this.$store.commit('setUserInfo', JSON.parse(userInfo));
        } else {
            this.$store.commit('setUserInfo', {});
        }
    },
    data(): data {
        return {
            testValue: 2113,
        };
    },
    created() {
        this.getCoinList();
    },
    methods: {
        getCoinList() {
            this.$api.getCoinList().then((res: any) => {
                this.$store.commit('setSymbolList', res.data);
            });
        },
    },
    computed: {
        lang(): string {
            return this.$store.state.lang;
        },
    },
});
</script>
