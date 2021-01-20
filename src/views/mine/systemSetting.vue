<template>
  <div class="set-payment-add">
    <TitleHeader :title="$t('mine.systemSetting')">
      <ul class="app-padding40 sys_cont">
        <li class="flex-between-c sys_item">
          <div v-t="'mine.hideAmount'"></div>
            <V-Switch v-model="hideBalance"
              active-value="1"
              inactive-value="0"
              size="20px"
              @change="_change"
              active-color="#5894EE"
              inactive-color="#EDF3FB"/>
        </li>
        <li  @click="isShowLang = true" class="flex-between-c sys_item">
          <div v-t="'mine.changeLang'"></div>
          <div>
            <span class="vertical-m">{{ $t('language')}}</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
        <li class="flex-between-c sys_item">
          <div v-t="'mine.unitPrice'"></div>
          <div>
            <span class="vertical-m">{{_unit}}</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
        <li v-if="true" @click="changeShowTopBar" class="flex-between-c sys_item">
          <div>{{$t('mine.navLayout')}}</div>
          <div>
            <span class="vertical-m">{{_showTopBar ? $t('mine.navLayoutForTop') : $t('mine.navLayoutForBottom')}}</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
      </ul>
      <div class="sys-empty"></div>
      <ul class="app-padding40 sys_cont no-margin-top">
        <li @click="checkVersion" class="flex-between-c sys_item">
          <div v-t="'mine.updateV'"></div>
          <div>
            <span class="vertical-m">{{version}}</span>
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </div>
        </li>
        <li class="flex-between-c sys_item" @click="logout">
          <div v-t="'mine.logout'"></div>
          <div>
            <img
              class="app-img-50"
              src="../../assets/img/common/logout.png"
              alt=""
            />
          </div>
        </li>
      </ul>
    </TitleHeader>
    <van-dialog v-model="show" :title="force_update ? $t('mine.forceUpdate') : $t('mine.update')" :show-confirm-button="!force_update">
        <van-circle class="van-circle" v-model="rate" :rate="progress" :text="file ? $t('mine.downloaded') : toastOperateTitle" />
        <Button v-show="file" @click="installHandle(file)" size="fill">{{$t('mine.clickInstall')}}</Button>
    </van-dialog>
    <SelectPopup v-model="isShowLang">
      <SelectPopupItem
        v-for="item in langType"
        @click="setLang(item)"
        :key="item.value"
        >{{ item.label }}</SelectPopupItem>
    </SelectPopup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n, { langType } from '@/i18n/index';
import clientEnv from '@/commons/clientEnv/idnex';

export default Vue.extend({
    name: 'SystemSetting',
    data() {
        return {
            langType,
            isShowLang: false,
            lang: this.$store.state.lang,
            hideBalance: this.$store.state.hideBalance,
            isLoading: false,
            show: false,
            force_update: false,
            toastOperateTitle: `${this.$t('mine.downloading')} 0%`,
            version: '',
            progress: 0,
            file: null,
            rate: 0,
        };
    },
    created() {
        if ((window as any).plus) {
            this.version = `v${(window as any).plus.runtime.version}`;
        } else {
            this.version = '';
        }
    },
    methods: {
        _change(val: any) {
            this.$store.commit('setHideBalance', val);
        },
        setLang(item: any) {
            this.lang = item.value;
            this.$store.commit('setLang', item.value);
            i18n.locale = item.value;
        },
        logout() {
            this.$dialog.confirm({
                message: `${this.$t('mine.logoutTip')}`,
                className: 'confirm_34',
                confirmButtonText: `${this.$t('common.ok')}`,
                cancelButtonText: `${this.$t('common.cancle2')}`,
            }).then(() => {
                this.$api.logout().then((res: any) => {
                    if (res.code === 0) {
                        // this.$store.commit('setHideBalance', '');
                        this.$logoutHandle();
                        this.$router.push({
                            name: 'home',
                        });
                    }
                });
            });
        },
        changeShowTopBar() {
            this.$store.commit('changeShowTopBar', !this._showTopBar);
        },
        checkVersion() {
            if (this._loading) return;
            this.progress = 0;
            this.rate = 0;
            this.changeLoading(true);
            if ((window as any).plus) {
                this.saveHandle();
            } else {
                this.browerDownload();
            }
        },
        browerDownload() {
            this.$api.version({
                channel: clientEnv.ios ? 'ios' : 'android',
                // version: this.version,
                build: 100,
            }).then((res: any) => {
                if (res.code === 0) {
                    if (!res.data) {
                        this.$normalToast(this.$t('mine.newestV'));
                        return;
                    }
                    if (clientEnv.ios) {
                        this.iosDown(res.data.url);
                        return;
                    }
                    this.downloadHandle(res.data.url);
                }
            }).finally(() => {
                this.changeLoading(false);
            });
        },
        saveHandle() {
            this.$api.version({
                channel: ((window as any).plus.os.name || '').toLowerCase(),
                build: (window as any).plus.runtime.versionCode,
                // version: (window as any).plus.runtime.version,
            }).then((res: any) => {
                if (res.code === 0) {
                    if (!res.data) {
                        this.$normalToast(this.$t('mine.newestV'));
                        return;
                    }
                    if (res.data.force_update) {
                        this.force_update = true;
                        this.$dialog.alert({
                            title: `${this.$t('mine.updateV')}`,
                            message: `${this.$t('mine.updateTip1')}`,
                            confirmButtonText: `${this.$t('common.ok')}`,
                        }).then(() => {
                            this.show = true;
                            this.uploadApp(res.data.url);
                        });
                    } else {
                        this.$dialog.confirm({
                            title: `${this.$t('mine.updateV')}`,
                            message: `${this.$t('mine.updateTip')}`,
                            confirmButtonText: `${this.$t('common.ok')}`,
                            cancelButtonText: `${this.$t('common.cancle2')}`,
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
@import "../../assets/less/excludecss/index.less";
.set-payment-add {
  height: 100%;
  font-size: 34px;
  .sys_cont {
    margin-top: 50px;
    &.no-margin-top{
        margin-top: 0px;
    }
    .sys_item {
      height: 117px;
    }
  }
  .sys-empty{
    height: 16px;
    background: #f8f8f8;
  }
}
</style>
