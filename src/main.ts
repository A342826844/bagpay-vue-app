import Vue from 'vue';
import md5 from 'md5';

import { Store } from 'vuex';
import 'lib-flexible';

import * as Api from '@/api/index.ts';
import verification from '@/utils/verification.ts';
import Headers from '@/components/headers/index.vue';
import TitleHeader from '@/components/headers/TitleHeader.vue';
import Titles from '@/components/headers/Titles.vue';
import Button from '@/components/commons/Button.vue';
import Input from '@/components/commons/Input.vue';
import Select from '@/components/commons/Select.vue';
import Switch from '@/components/commons/Switch.vue';
import TabList from '@/components/TabList/index.vue';
import PullRefresh from '@/components/pull-refresh/index.vue';
import NoData from '@/components/NoData/index.vue';
import UserAuth from '@/components/userAuth/index.vue';
import IconImg from '@/components/iconUrl/iconImg.vue';
import { Poptip, PoptipItem } from '@/components/Poptip/index';
import { SelectPopup, SelectPopupItem } from '@/components/SelectPopup/index';

import i18n from './i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vant';
import './assets/less/index.less';
import './commons/index';

declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
    interface Vue {
        $api: any;
        $md5: any;
        $verification: any;
        $app_mark: string;
        _userInfo: any;
        _configCommon: any;
        _loading: boolean;
        _unit: string;
        _unitIcon: string;
        _getPhone: string;
        changeLoading: Function;
        initUserInfo: Function;
        getCoinList: Function;
        getUserBankList: Function;
        otcGetMerchant: Function;
    }
}

// 跳转下载页
if ((!(window as any).plus) && (process.env.NODE_ENV === 'production')) {
    window.location.href = `${window.location.origin}/download/`;
}

Vue.config.productionTip = false;

Vue.component('Headers', Headers);
Vue.component('TitleHeader', TitleHeader);
Vue.component('Titles', Titles);
Vue.component('Button', Button);
Vue.component('Inputs', Input);
Vue.component('Select', Select);
Vue.component('Switchs', Switch);
Vue.component('TabList', TabList);
Vue.component('PullRefresh', PullRefresh);
Vue.component('NoData', NoData);
Vue.component('Poptip', Poptip);
Vue.component('PoptipItem', PoptipItem);
Vue.component('SelectPopup', SelectPopup);
Vue.component('SelectPopupItem', SelectPopupItem);
Vue.component('UserAuth', UserAuth);
Vue.component('IconImg', IconImg);

Vue.mixin({
    computed: {
        _userInfo() {
            return (this.$store as Store<any>).state.userInfo;
        },
        _loading() {
            return (this.$store as Store<any>).state.loading;
        },
        _unit() {
            return (this.$store as Store<any>).state.unit;
        },
        _getPhone() {
            return (this.$store as Store<any>).getters.getPhone || '';
        },
        _unitIcon() {
            return (this.$store as Store<any>).state.unitIcon;
        },
        _configCommon() {
            return (this.$store as Store<any>).state.configCommon;
        },
        _isplus() {
            return !!(window as any).plus;
        },
    },
    methods: {
        changeLoading(state) {
            this.$store.commit('changeLoading', state);
        },
        // 获取用户信息
        initUserInfo() {
            return this.$api.getUserInfo().then((res: any) => {
                if (res.code === 0) {
                    this.$store.commit('setUserInfo', res.data);
                }
            });
        },
        getUserBankList() {
            return this.$api.getUserBankList().then((res: any) => {
                if (res.data) {
                    this.$store.commit('setBankList', res.data);
                }
            });
        },
        otcGetMerchant() {
            return this.$api.otcGetMerchant().then((res: any) => {
                if (res.data) {
                    this.$store.commit('setMerchant', res.data);
                }
            });
        },
        getCoinList() {
            return this.$api.getCoinList().then((res: any) => {
                if (res.data) {
                    this.$store.commit('setSymbolList', res.data);
                }
            });
        },
    },
});

Vue.prototype.$api = Api;
Vue.prototype.$md5 = md5;
Vue.prototype.$verification = verification;
Vue.prototype.$app_mark = process.env.VUE_APP_MARK;

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
