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
          <Inputs readonly value="版本更新" @click.native="saveHandle">
            <img
              class="app-img-50"
              src="../../assets/img/common/arrow_right.png"
              alt=""
            />
          </Inputs>
        </div>
      </div>
    </TitleHeader>
    <van-dialog v-model="show" :title="force_update ? '强制更新' : '更新'" :show-confirm-button="!force_update">
        <van-circle v-model="rate" :rate="progress" :speed="100" :text="toastOperateTitle" />
    </van-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

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
};

export default Vue.extend({
    name: 'Aboutus',
    data(): data {
        return {
            isLoading: false,
            show: false,
            force_update: false,
            toastOperateTitle: '正在下载 0%',
            form: {
                userName: '',
                idCard: '',
            },
            version: '',
            progress: 1,
            rate: 1,
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
        saveHandle() {
            // TODO 打包时在调试
            this.isLoading = true;
            this.changeLoading(true);
            this.$api.version({
                channel: (window as any).plus.runtime.channel,
                build: (window as any).plus.runtime.versionCode,
                version: (window as any).plus.runtime.version,
            }).then((res: any) => {
                if (res.code === 0) {
                    if (!res.data) {
                        this.$normalToast('当前已是最新版本');
                        return;
                    }
                    if (res.data.force_update) {
                        this.show = true;
                        this.force_update = true;
                        this.downlaodApp(res.data.url);
                    } else {
                        this.$dialog.confirm({
                            title: '版本更新',
                            message: '检测到新版本， 是否更新',
                        }).then(() => {
                            this.show = true;
                            this.downlaodApp(res.data.url);
                        });
                    }
                }
            }).finally(() => {
                this.isLoading = false;
                this.changeLoading(false);
            });
        },
        downlaodApp(downlaodUrl: string) {
            if (this.isLoading) return;
            const dtask = (window as any).plus.downloader.createDownload(downlaodUrl, {}, (d: { filename: any }, status: number) => {
                this.isLoading = false;
                if (status === 200) {
                    (window as any).plus.runtime.install(d.filename, null, () => {
                    // window.plus.runtime.quit();
                        this.show = false;
                    }, () => {
                        this.$normalToast('安装失败');
                        this.show = false;
                    });
                }
            });
            dtask.start();
            dtask.addEventListener('statechanged', (download: { downloadedSize: number; totalSize: number }) => {
                // eslint-disable-next-line no-mixed-operators
                const temp = download.downloadedSize / download.totalSize * 100;
                this.progress = temp ? Number(temp.toFixed(2)) : 0;
                this.toastOperateTitle = `正在下载 ${this.progress}%`;
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
</style>
