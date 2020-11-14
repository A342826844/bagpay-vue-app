import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
});

const getKeepAlices = (list: Array<any>): Array<string> => {
    let res: Array<string> = [];
    list.forEach((item: any) => {
        if (item.children && item.children.length) {
            res = res.concat(getKeepAlices(item.children));
        }
        if (item.meta && item.meta.keepAlive) {
            res.push(item.meta.componentName);
        }
    });
    return res;
};
// 获取需要keepAlive的组件名
const keepAlive: Array<string> = getKeepAlices(routes);
// "Entry", "Login", "Findaccount", "Register", "TransferOut", "OtcEntry", "OtcAdv", "BusinessDetail", "VfyBus", "PaywayAdd", "SetPaymentAdd"
store.commit('setKeepAlive', keepAlive); // 设置vuex中的keepAlive

router.beforeEach((to, from, next) => {
    store.commit('changeLoading', false);
    if (!store.state.loginStatus && (!to.meta.noLogin)) {
        next('/');
        return;
    }
    next();
});

export default router;
