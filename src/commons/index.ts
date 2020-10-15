import Vue from 'vue';

import './filter/index';
import { normalToast } from './dom/index';

declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
    interface Vue {
        $normalToast: Function;
        $goback: Function;
        $loginRoute: (path: string, loginPth?: string) => void;
    }
}

Vue.prototype.$normalToast = normalToast;

// eslint-disable-next-line func-names
Vue.prototype.$loginRoute = function (path: string, loginPth?: string) {
    sessionStorage.setItem('loginPath', path);
    this.$router.push(loginPth || '/login');
};
// eslint-disable-next-line func-names
Vue.prototype.$goback = function () {
    this.$router.go(-1);
};
