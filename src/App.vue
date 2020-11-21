<template>
    <div id="app" :class="[lang]">
        <div id="main">
            <transition :name="transitionName">
                <keep-alive :include="keepAlive">
                    <router-view class="app-view"></router-view>
                </keep-alive>
            </transition>
            <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
        </div>
        <van-dialog v-model="show" :title="force_update ? $t('mine.forceUpdate') : $t('mine.update')" :show-confirm-button="!force_update">
            <van-circle class="van-circle" v-model="rate" :rate="progress" :text="file ? $t('mine.downloaded') : toastOperateTitle" />
            <Button v-show="file" @click="installHandle(file)" size="fill">{{$t('mine.clickInstall')}}</Button>
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
            transitionName: '',
            file: null,
        };
    },
    created() {
        if (location.href.indexOf('/mine/protocol') !== -1) return;
        if (this._isLogin) {
            if (process.env.NODE_ENV === 'production') {
                this.$router.push('/home');
            }
            this.init();
        } else if (localStorage.getItem('isinit')) {
            this.$router.push('/home');
            this.plusInitHandle();
        } else {
            this.plusInitHandle();
        }
    },
    watch: { // 使用watch 监听$router的变化
        $route(to, from) {
            /**
             * 路由切换动画
             *
             * 如果to索引大于from索引,判断为前进状态
             * 如果to索引小于from索引,判断为后退状态
             * 如果to索引等于from索引,判断为同级,没有切换动画
             * 如果to没有索引,from有索引,判断为后退状态
             * 如果to和from都没有索引,判断为同级,没有切换动画
             */
            if (to.meta.index || from.meta.index) {
                if (!to.meta.index || to.meta.index < from.meta.index) {
                    this.transitionName = 'slide-right';
                } else if (to.meta.index === from.meta.index) {
                    this.transitionName = '';
                } else {
                    this.transitionName = 'slide-left';
                }
            } else {
                this.transitionName = '';
            }
            const isPlus = navigator.userAgent.indexOf('Html5Plus') < 0;
            // 不支持5+ API
            if (isPlus && process.env.NODE_ENV === 'production' && location.href.indexOf('/mine/protocol') < 0) {
                location.replace(`${location.origin}/download/`);
            }
        },
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
            }).catch((error) => {
                if (error.response && error.response.status === 403) {
                    this.plusInitHandle();
                    this.$router.push('/home');
                } else {
                    this.total += 1;
                    if (this.total >= 5) {
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
                // version: (window as any).plus.runtime.version,
            }).then((res: any) => {
                if (res.code === 0) {
                    if (!res.data) return;
                    if (res.data.force_update) {
                        this.force_update = true;
                        this.$dialog.alert({
                            title: `${this.$t('mine.updateV')}`,
                            message: `${this.$t('mine.updateTip1')}`,
                        }).then(() => {
                            this.show = true;
                            this.uploadApp(res.data.url);
                        });
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
        installHandle(file: any) {
            (window as any).plus.runtime.install(file, null, () => {
            // window.plus.runtime.quit();
                // this.show = false;
            }, () => {
                this.$normalToast(this.$t('mine.installFailed'));
                this.show = false;
            });
        },
        downlaodApp(downlaodUrl: string) {
            const dtask = (window as any).plus.downloader.createDownload(downlaodUrl, {}, (d: { filename: any }, status: number) => {
                if (status === 200) {
                    this.file = d.filename;
                    this.installHandle(this.file);
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

<style lang="less" scoped>
.app-view{
    width: 100%;
    position: absolute !important;
    top: 0;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all .3s;
    position: absolute;
}
.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.van-circle{
    margin: 18px 0 18px;
}
</style>
