<template>
  <div class="aboutus">
    <TitleHeader :title="$t('mine.aboutus')">
      <div class="aboutus-box">
        <img
          class="aboutus-box-logo"
          src="../../assets/img/logo/logo.png"
          alt=""
        />
        <p class="aboutus-box-version">v {{version}}</p>
        <div class="aboutus-box-upload app-padding40">
          <Inputs readonly :value="$t('mine.updateV')" @click.native="checkVersion">
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </Inputs>
        </div>
      </div>
    </TitleHeader>
    <van-dialog v-model="show" :title="force_update ? $t('mine.forceUpdate') : $t('mine.update')" :show-confirm-button="!force_update">
        <van-circle class="van-circle" v-model="rate" :rate="progress" :text="file ? $t('mine.downloaded') : toastOperateTitle" />
        <Button v-show="file" @click="installHandle(file)" size="fill">{{$t('mine.clickInstall')}}</Button>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import clientEnv from '@/commons/clientEnv/idnex';

type data = {
  isLoading: boolean;
  show: boolean;
  version: string;
  toastOperateTitle: string;
  force_update: boolean;
  progress: any;
  rate: any;
  form: {
    userName: string;
    idCard: string;
  };
  file: any;
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            isLoading: false,
            show: false,
            force_update: false,
            toastOperateTitle: `${this.$t('mine.downloading')} 0%`,
            form: {
                userName: '',
                idCard: '',
            },
            version: '',
            progress: 0,
            file: null,
            rate: 0,
        };
    },
    created() {
        if ((window as any).plus) {
            this.version = (window as any).plus.runtime.version;
        } else {
            this.version = '1.0.0';
        }
    },
    methods: {
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
                version: (window as any).plus.runtime.version,
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
.aboutus {
  height: 100%;
  font-size: 34px;
  &-box {
    margin-top: 118px;
    &-logo {
      width: 220px;
    }
    &-version {
      margin-top: 35px;
    }
    &-upload {
      margin-top: 112px;
    }
  }
}
.van-circle{
    margin: 18px 0 18px;
}
</style>
