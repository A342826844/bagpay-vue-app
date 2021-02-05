import Vue from 'vue';

import compress from '@/utils/compress';
import { SHARE_RED_ENVELOPE_TEXT } from './config';
import './filter/index';
import { normalToast, copyText, overflowScrolling } from './dom/index';
import { shareDataHandle, downloadImg, saveImg } from './plus/index';
import { shareRedEnvelope, langs } from '../i18n/index';

declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
    interface Vue {
        $copyText: Function;
        $normalToast: Function;
        $goback: Function;
        $numPlus: Function;
        $numMinus: Function;
        $multipliedBy: Function;
        $dividedBy: Function;
        $toBignumber: Function;
        $shareDataHandle: Function;
        $downloadImg: Function;
        $saveImg: Function;
        $overflowScrolling: Function;
        $compress: Function;
        $logoutHandle: Function;
        $getRedEnvelopeCdk: Function;
        $setRedEnvelopeCdk: Function;
        $loginRoute: (path?: string, loginPth?: string) => void;
    }
}

Vue.prototype.$normalToast = normalToast;
Vue.prototype.$copyText = copyText;
Vue.prototype.$overflowScrolling = overflowScrolling;

Vue.prototype.$compress = compress; // 图片压缩

Vue.prototype.$downloadImg = downloadImg; // 下载网络图片
Vue.prototype.$shareDataHandle = shareDataHandle; // 分享
Vue.prototype.$saveImg = saveImg; // 保存本地图片

// eslint-disable-next-line func-names
Vue.prototype.$loginRoute = function (path?: string, loginPth?: string) {
    sessionStorage.setItem('loginPath', path || '-2'); // 如果没指定登录后跳转页面， 则默认返回进入登录前的页面
    this.$router.push(loginPth || '/entrylogin');
};
// eslint-disable-next-line func-names
Vue.prototype.$goback = function () {
    this.$router.go(-1);
};
// eslint-disable-next-line func-names
Vue.prototype.$logoutHandle = function () {
    sessionStorage.clear();
    this.$store.commit('reSetUserState');
};
// 设置分享文本
// eslint-disable-next-line func-names
Vue.prototype.$setRedEnvelopeCdk = function (cdk: string) {
    return this.$t(SHARE_RED_ENVELOPE_TEXT, { cdk });
};
// 获取红包口令
// eslint-disable-next-line func-names
Vue.prototype.$getRedEnvelopeCdk = function (text: string) {
    console.log(shareRedEnvelope, langs);
    let res = '';
    langs.forEach((item) => {
        const reg = new RegExp(`^${shareRedEnvelope[item].replace('{cdk}', '(.*?)')}$`);
        const cdk = text.replace(reg, '$1');
        if (cdk !== text) {
            res = cdk;
        }
    });
    return res;
};
