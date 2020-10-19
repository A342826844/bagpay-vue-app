import Vue from 'vue';

import { Dialog } from 'vant';
import 'vant/lib/dialog/style';

import Button from 'vant/lib/button';
import 'vant/lib/button/style';

import Tab from 'vant/lib/tab';
import 'vant/lib/tab/style';

import Tabs from 'vant/lib/tabs';
import 'vant/lib/tabs/style';

import PullRefresh from 'vant/lib/pull-refresh';
import 'vant/lib/pull-refresh/style';

import Popup from 'vant/lib/popup';
import 'vant/lib/popup/style';

import Uploader from 'vant/lib/uploader';
import 'vant/lib/uploader/style';

// import Dialog from 'vant/lib/dialog';

declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
    interface Vue {
        $dialog: Dialog;
    }
}

Vue.component('V-Button', Button);
Vue.component('V-Tab', Tab);
Vue.component('V-Tabs', Tabs);
Vue.component('V-Pull-Refresh', PullRefresh);
Vue.component('V-Popup', Popup);
Vue.component('V-Uploader', Uploader);
Vue.use(Dialog);
