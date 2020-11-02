<template>
    <div id="app" :class="[lang]">
        <div id="main">
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
    data() {
        return {
            total: 0,
        };
    },
    created() {
        if (this.$store.state.loginStatus) {
            this.init();
        } else {
            this.plusInitHandle();
        }
    },
    computed: {
        lang(): string {
            return this.$store.state.lang;
        },
    },
    methods: {
        plusInitHandle() {
            const plusReady = () => {
                // Android处理返回键
                let count = 0;
                (window as any).plus.key.addEventListener('backbutton', () => {
                    if (count === 0) {
                        if (!this.$route.meta.showFooter && (this.$route.name !== 'entry')) {
                            this.$router.go(-1);
                        } else {
                            count += 1;
                            this.$normalToast(this.$t('common.exitProgram'), 2000);
                            setTimeout(() => {
                                count = 0;
                            }, 2000);
                        }
                    } else if (count === 1) {
                        (window as any).plus.runtime.quit();
                    }
                }, false);
                // (window as any).plus.navigator.setStatusBarBackground(plusConfig.DEFAULT_BAR_BACKGROUND);
                // (window as any).plus.navigator.setStatusBarStyle(plusConfig.DARK);
                // 关闭启动界面
                setTimeout(() => {
                    (window as any).plus.navigator.closeSplashscreen();
                }, 200);
            };
            if ((window as any).plus) {
                plusReady();
            } else {
                document.addEventListener('plusready', plusReady, false);
            }
        },
        init() {
            this.otcGetMerchant();
            Promise.all([
                this.getCoinList(),
                this.initUserInfo(),
                this.getUserBankList(),
            ]).then(() => {
                this.plusInitHandle();
                this.$router.push('/home');
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    this.plusInitHandle();
                    // this.$router.push('/');
                } else {
                    this.total += 1;
                    if (this.total >= 5) {
                        this.$router.push('/');
                        this.plusInitHandle();
                        return;
                    }
                    this.init();
                }
            });
        },
    },
});
</script>
