import Vue from 'vue';

import {
    Dialog, Toast, Switch, Field, Button, Tab, Tabs, PullRefresh, Popup, Uploader, PasswordInput, NumberKeyboard, Checkbox,
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
import 'vant/lib/image-preview/style';
import 'vant/lib/password-input/style';
import 'vant/lib/number-keyboard/style';
import 'vant/lib/toast/style';
import 'vant/lib/checkbox/style';

// import Dialog from 'vant/lib/dialog';

declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
    interface Vue {
        $dialog: Dialog;
        $toast: Toast;
        // $imagePreview: ImagePreview;
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
Vue.component('V-Pass-Input', PasswordInput);
Vue.component('V-Num-Key', NumberKeyboard);
Vue.component('V-Checkbox', Checkbox);
Vue.use(Dialog);
Vue.use(Toast);
// Vue.use(ImagePreview);
