import Vue from 'vue';
import { Store } from 'vuex';
import 'lib-flexible';

import Headers from '@/components/headers/index.vue';
import TitleHeader from '@/components/headers/TitleHeader.vue';
import Button from '@/components/commons/Button.vue';
import Input from '@/components/commons/Input.vue';
import Switch from '@/components/commons/Switch.vue';
import TabList from '@/components/TabList/index.vue';
import NoData from '@/components/NoData/index.vue';
import * as Api from '@/api/index.ts';
import md5 from 'md5';

import i18n from './i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/less/index.less';
import './plugins/vant';
import './commons/index';

declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
    interface Vue {
        $api: any;
        $md5: any;
        _userInfo: any;
        _loading: boolean;
    }
}

Vue.config.productionTip = false;

Vue.component('Headers', Headers);
Vue.component('TitleHeader', TitleHeader);
Vue.component('Button', Button);
Vue.component('Inputs', Input);
Vue.component('Switchs', Switch);
Vue.component('TabList', TabList);
Vue.component('NoData', NoData);

Vue.mixin({
    computed: {
        _userInfo() {
            return (this.$store as Store<any>).state.userInfo;
        },
        _loading() {
            return (this.$store as Store<any>).state.loading;
        },
    },
});

Vue.prototype.$api = Api;
Vue.prototype.$md5 = md5;

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
