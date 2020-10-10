import Vue from 'vue';
import 'lib-flexible';

import i18n from './i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/less/index.less';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
