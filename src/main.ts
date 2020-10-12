import Vue from 'vue';
import 'lib-flexible';

import Headers from '@/components/headers/index.vue';
import TitleHeader from '@/components/headers/TitleHeader.vue';
import Button from '@/components/commons/Button.vue';
import Input from '@/components/commons/Input.vue';
import TabList from '@/components/TabList/index.vue';

import i18n from './i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/less/index.less';

Vue.config.productionTip = false;

Vue.component('Headers', Headers);
Vue.component('TitleHeader', TitleHeader);
Vue.component('Button', Button);
Vue.component('Inputs', Input);
Vue.component('TabList', TabList);

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
