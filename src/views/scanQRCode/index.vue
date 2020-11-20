<template>
    <div ref="qrcode" style="background-color:#000000;">
        <div id="bcid">
            <div style="height:40%"></div>
            <p class="tip">...loading...</p>
        </div>
    </div>
</template>

<script>
// import Headers from '@/component/header';
import {
    getQueryUrl,
    isHttpUrl,
} from '@/utils/tool';

export default {
    // components: {
    //     Headers,
    // },
    data() {
        return {
            ws: null,
            wo: null,
            scan: null,
            header: null,
            bFlash: false, // 闪光灯状态
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$store.commit('changgeQrcodeResult', '');
            // H5 plus事件处理
            vm.$nextTick(() => {
                if (window.plus) {
                    vm.plusReady();
                } else {
                    document.addEventListener('plusready', vm.plusReady, false);
                }
            });
        });
    },
    // created() {
    //     setTimeout(() => {
    //         const result = 'pagpay://addr?&address=0xe1472c66b811bb40a2c709b4a1b89a36502c06f1&symbol=eth&value=&memo=';
    //         // const value = result.split('?')[1] || '';
    //         // this.$router.replace(`/transferout?${value}`);
    //         const value = result.split('?')[1] || '';
    //         const data = getQueryUrl(getQueryValue(result));
    //         this.$store.commit('setAddress', {
    //             address: data.address,
    //             memo: data.memo,
    //         });
    //         this.$router.replace(`/transferout?${value}`);
    //     }, 2000);
    // },
    beforeDestroy() {
        if (window.plus) {
            window.plus.key.removeEventListener('backbutton', this.goBackHandle, false);
        }
    },
    methods: {
        plusReady() {
            window.plus.key.addEventListener('backbutton', this.goBackHandle, false);
            // 获取窗口对象
            this.ws = window.plus.webview.currentWebview();
            // this.ws = this.$refs.qrcode;
            this.scan = window.plus.barcode.create('barcode',
                [
                    window.plus.barcode.QR,
                    window.plus.barcode.AZTEC,
                    window.plus.barcode.DATAMATRIX,
                    window.plus.barcode.CODABAR,
                    window.plus.barcode.MAXICODE,
                ], {
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    scanbarColor: '#1DA7FF',
                    position: 'static',
                    frameColor: '#1DA7FF',
                });
            this.scan.onmarked = this.onmarked;
            this.ws.append(this.scan);
            this.createSubview();
            this.scan.start();
        },
        scanPicture() {
            window.plus.gallery.pick((path) => {
                window.plus.barcode.scan(path, this.onmarked, () => {
                    window.plus.nativeUI.toast(this.$t('common.unrecognized'));
                });
            }, (err) => {
                console.log(`Failed: ${err.message}`);
            });
        },
        // 二维码扫描成功
        onmarked(type, res) {
            // switch (type) {
            // case window.plus.barcode.QR:
            //     type = 'QR';
            //     break;
            // case window.plus.barcode.EAN13:
            //     type = 'EAN13';
            //     break;
            // case window.plus.barcode.EAN8:
            //     type = 'EAN8';
            //     break;
            // default:
            //     type = `其它${type}`;
            //     break;
            // }
            const result = res.replace(/\r\n/g, '');
            const data = getQueryUrl(result);
            if (data.address) {
                if (Number(this.$route.query.type) === 1) {
                    this.$store.commit('setAddress', {
                        address: data.address,
                        memo: data.memo,
                    });
                    this.$router.replace(`/transfer/payment?symbol=${data.symbol}`);
                    this.goBackHandle();
                } else {
                    this.$store.commit('changgeQrcodeResult', data.address);
                    this.goBackHandle();
                    this.$router.go(-1);
                }
            } else if (Number(this.$route.query.type) === 1) {
                if (isHttpUrl(result)) {
                    window.plus.runtime.openURL(result, () => {
                        this.$normalToast('更新失败,请开启浏览器权限');
                    });
                }
                this.$router.replace(`/scanvalue?value=${result}`);
                this.goBackHandle();
            } else {
                this.$store.commit('changgeQrcodeResult', result);
                this.goBackHandle();
                this.$router.go(-1);
            }
        },
        createSubview() {
            const baise_go = window.location.origin === 'file://' ? 'baise_go.png' : `${window.location.origin}/baise_go.png`;
            this.view = new window.plus.nativeObj.View('nbutton', {
                bottom: '0px',
                left: '0px',
                width: '100%',
                height: '44px',
            }, [{
                tag: 'rect',
                id: 'rect',
                left: '0px',
                width: '100%',
                rectStyles: {
                    radius: '8px 8px 0px 0px',
                    color: 'rgba(0,0,0,0.7)',

                },
            }, {
                tag: 'font',
                id: 'text-left',
                text: this.$t('common.bFlash'),
                position: {
                    width: '50%',
                    left: '0px',
                },
                textStyles: {
                    color: '#FFFFFF',
                },
            }, {
                tag: 'font',
                id: 'text-right',
                text: this.$t('common.scanPicture'),
                position: {
                    width: '50%',
                    left: '50%',
                },
                textStyles: {
                    color: '#FFFFFF',
                },
            },
            ]);
            const barHeight = window.plus.navigator.getStatusbarHeight();
            this.header = new window.plus.nativeObj.View('header', {
                top: window.plus.os.name === 'iOS' ? `${barHeight}px` : '0px',
                left: '0px',
                width: '100%',
                // backgroundColor: '#FF0000',
                height: '44px',
            }, [
                {
                    tag: 'img',
                    id: 'img',
                    src: baise_go,
                    position: {
                        top: '10px', left: '24px', width: '15px', height: '26px',
                    },
                },
                {
                    tag: 'font', id: 'font', text: this.$t('common.scan'), textStyles: { size: '18px', color: '#FFFFFF' },
                },
            ]);
            // 处理事件
            this.header.addEventListener('click', (e) => {
                // 左上角返回键事件
                if (e.pageX >= 15 && e.pageX <= 60 && e.pageY >= 5 && e.pageY <= 40 + barHeight) {
                    this.goBackHandle(true);
                }
            });
            this.view.addEventListener('click', (e) => {
                const { clientWidth } = this.$refs.qrcode;
                // 相册
                if (e.pageX >= clientWidth / 2) {
                    this.scanPicture();
                } else { // 闪光灯
                    this.bFlash = !this.bFlash;
                    this.scan.setFlash(this.bFlash);
                }
            }, false);
            this.ws.append(this.view);
            this.ws.append(this.header);
        },
        goBackHandle(flag) {
            this.view.close();
            this.header.close();
            this.scan.close();
            if (flag === true) {
                this.ws.back();
            }
        },
    },
};
</script>

<style scoped>
#bcid {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    text-align: center;
}
.tip {
    color: #3E80CA;
    font-weight: bold;
    text-shadow: 0px -1px #103E5C;
}
.footer-btn{
    height: 100px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #00000033;
}
.footer-btn div{
    flex: 1;
}
</style>
