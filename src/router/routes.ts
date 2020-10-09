import { RouteConfig } from 'vue-router';

const Home = () => import('@/views/home/index.vue');
const Mine = () => import('@/views/mine/index.vue');

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            showFooter: true,
        },
    },
    {
        path: '/mine',
        name: 'mine',
        component: Mine,
        meta: {
            showFooter: true,
            needLogin: true,
        },
    },
];

export default routes;
