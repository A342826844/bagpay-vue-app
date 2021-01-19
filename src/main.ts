import Vue from 'vue';
import md5 from 'md5';

import { Store } from 'vuex';
import 'lib-flexible';
// Vant 桌面端适配
import '@vant/touch-emulator';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

import * as Api from '@/api/index.ts';
import verification, { hasBindValue } from '@/utils/verification.ts';
import Headers from '@/components/headers/index.vue';
import TopBar from '@/components/topBar/index.vue';
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
import { MoblepreForCountryType } from '@/commons/config/index';

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
        $hasBindValue: Function;
        $app_mark: string;
        $app_public: boolean;
        $invitationUrl: string;
        _userInfo: any;
        _configCommon: any;
        _loading: boolean;
        _isLogin: boolean;
        _isplus: boolean;
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

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);
Vue.component('Headers', Headers);
Vue.component('TitleHeader', TitleHeader);
Vue.component('TopBar', TopBar);
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
            return (this.$store as Store<any>).getters.getCurrencyTypeInfo.coin;
        },
        _getPhone() {
            return (this.$store as Store<any>).getters.getPhone || '';
        },
        _unitIcon() {
            return (this.$store as Store<any>).getters.getCurrencyTypeInfo.unit;
        },
        _configCommon() {
            return (this.$store as Store<any>).state.configCommon;
        },
        _isplus() {
            return !!(window as any).plus;
        },
        _isLogin() {
            return !!(this.$store as Store<any>).state.loginStatus;
        },
        _showTopBar(): string {
            return (this.$store as Store<any>).state.showTopBar;
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
                    const moblepre = res.data.phone.split('-')[0];
                    const type = (MoblepreForCountryType as any)[moblepre] || 1;
                    this.$store.commit('changeCountryType', type);
                }
            });
        },
        getUserBankList() {
            return this.$api.getUserBankList().then((res: any) => {
                if (res.data) {
                    this.$store.commit('setBankList', res.data);
                } else {
                    this.$store.commit('setBankList', []);
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
Vue.prototype.$hasBindValue = hasBindValue;
Vue.prototype.$app_mark = process.env.VUE_APP_MARK;
Vue.prototype.$app_public = !!Number(process.env.VUE_APP_PUBLIC); // 是否在浏览器公开使用
Vue.prototype.$invitationUrl = `${process.env.NODE_ENV === 'production' ? process.env.VUE_APP_ORIGIN_URL : location.origin}/register`; // 邀请链接
Vue.prototype.$isServe = window.location.protocol !== 'file:';

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
