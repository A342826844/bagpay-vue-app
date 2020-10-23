import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    store.commit('changeLoading', false);
    if (!store.state.loginStatus && (!to.meta.noLogin)) {
        next('/');
        return;
    }
    next();
});

export default router;
