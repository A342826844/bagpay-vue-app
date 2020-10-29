import Vue from 'vue';

import compress from '@/utils/compress';
import './filter/index';
import { normalToast, copyText, overflowScrolling } from './dom/index';
import { shareDataHandle, downloadImg, saveImg } from './plus/index';

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
        $loginRoute: (path: string, loginPth?: string) => void;
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
Vue.prototype.$loginRoute = function (path: string, loginPth?: string) {
    sessionStorage.setItem('loginPath', path);
    this.$router.push(loginPth || '/login');
};
// eslint-disable-next-line func-names
Vue.prototype.$goback = function () {
    this.$router.go(-1);
};
// eslint-disable-next-line func-names
Vue.prototype.$logoutHandle = function () {
    sessionStorage.clear();
    this.$store.commit('setLoginState', 0);
    this.$store.commit('setHideBalance', '');
};
