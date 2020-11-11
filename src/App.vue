<template>
    <div id="app" :class="[lang]">
        <div id="main">
            <keep-alive :include="keepAlive">
                <router-view></router-view>
            </keep-alive>
            <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
        </div>
        <van-dialog v-model="show" :title="force_update ? $t('mine.forceUpdate') : $t('mine.update')" :show-confirm-button="!force_update">
            <van-circle v-model="rate" :rate="progress" :text="toastOperateTitle" />
        </van-dialog>
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
            progress: 0,
            rate: 0,
            show: false,
            force_update: false,
            toastOperateTitle: '',
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
        keepAlive(): Array<string> {
            return this.$store.state.keepAlive;
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
                this.saveHandle();
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
                if (process.env.NODE_ENV === 'production') {
                    this.$router.push('/home');
                }
            }).catch((error) => {
                if (error.response && error.response.status === 403) {
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
        saveHandle() {
            this.$api.version({
                channel: ((window as any).plus.os.name || '').toLowerCase(),
                build: (window as any).plus.runtime.versionCode,
                version: (window as any).plus.runtime.version,
            }).then((res: any) => {
                if (res.code === 0) {
                    if (!res.data) return;
                    if (res.data.force_update) {
                        this.show = true;
                        this.force_update = true;
                        this.uploadApp(res.data.url);
                    } else {
                        this.$dialog.confirm({
                            title: `${this.$t('mine.updateV')}`,
                            message: `${this.$t('mine.updateTip')}`,
                        }).then(() => {
                            this.show = true;
                            this.uploadApp(res.data.url);
                        });
                    }
                }
            }).finally(() => {
                this.changeLoading(false);
            });
        },
        iosDown(url: string) {
            window.open(url);
        },
        downloadHandle(url: string, name?: string) {
            const a = document.createElement('a');
            a.style.display = 'none';
            document.body.appendChild(a);
            a.download = name || `${this.$app_mark}.apk`;
            a.href = url;
            a.click();
            document.body.removeChild(a);
        },
        uploadApp(downlaodUrl: string) {
            if ((window as any).plus.os.name === 'Android') {
                this.downlaodApp(downlaodUrl);
            } else {
                (window as any).plus.runtime.openURL(downlaodUrl, () => {
                    this.$normalToast('更新失败,请开启浏览器权限');
                });
            }
        },
        downlaodApp(downlaodUrl: string) {
            const dtask = (window as any).plus.downloader.createDownload(downlaodUrl, {}, (d: { filename: any }, status: number) => {
                if (status === 200) {
                    (window as any).plus.runtime.install(d.filename, null, () => {
                    // window.plus.runtime.quit();
                        this.show = false;
                    }, () => {
                        this.$normalToast(this.$t('mine.installFailed'));
                        this.show = false;
                    });
                }
            });
            dtask.start();
            dtask.addEventListener('statechanged', (download: { downloadedSize: number; totalSize: number }) => {
                // eslint-disable-next-line no-mixed-operators
                const temp = download.downloadedSize / download.totalSize * 100;
                this.progress = temp ? Number(temp.toFixed(2)) : 0;
                this.toastOperateTitle = `${this.$t('mine.downloading')} ${this.progress}%`;
            });
        },
    },
});
</script>
