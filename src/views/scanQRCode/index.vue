<template>
    <div ref="qrcode" style="background-color:#000000;">
        <!-- <Headers style="background: #fff8" @back="$goBack" title="扫一扫"></Headers> -->
        <div id="bcid">
            <div style="height:40%"></div>
            <p class="tip">...loading...</p>
        </div>
        <!-- <div class="footer-btn">
            <div>打开闪光灯</div>
            <div>相册</div>
        </div> -->
    </div>
</template>

<script>
// import Headers from '@/component/header';
import {
    getQueryValue,
    isBagPayUrl,
    getQueryUrl,
    queryStringify,
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
            if (window.plus) {
                vm.plusReady();
            } else {
                document.addEventListener('plusready', vm.plusReady, false);
            }
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
            this.scan = new window.plus.barcode.Barcode('bcid');
            this.scan.onmarked = this.onmarked;
            this.scan.start();
            this.createSubview();
        },
        scanPicture() {
            window.plus.gallery.pick((path) => {
                window.plus.barcode.scan(path, this.onmarked, () => {
                    window.plus.nativeUI.toast(this.$t('无法识别此图片'));
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
            if (Number(this.$router.query.type) === 1) {
                const data = getQueryUrl(result);
                if (data.address) {
                    this.$store.commit('setAddress', {
                        address: data.address,
                        memo: data.memo,
                    });
                    this.$router.replace(`/transferout?${result}`);
                } else {
                    window.plus.nativeUI.toast('无法识别此图片');
                }
                return;
            }
            this.$store.commit('changgeQrcodeResult', result);
            this.$router.go(-1);
        },
        createSubview() {
            const baise_go = 'baise_go.png';
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
