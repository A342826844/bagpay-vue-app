import Vue from 'vue';

import {
    Dialog, Switch, Field, Button, Tab, Tabs, PullRefresh, Popup, Uploader,
} from 'vant';
import 'vant/lib/dialog/style';
import 'vant/lib/switch/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/tab/style';
import 'vant/lib/tabs/style';
import 'vant/lib/pull-refresh/style';
import 'vant/lib/popup/style';
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
Vue.component('V-Switch', Switch);
Vue.component('V-Field', Field);
Vue.use(Dialog);
