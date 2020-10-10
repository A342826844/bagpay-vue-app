import { RouteConfig } from 'vue-router';

const Home = () => import('@/views/home/index.vue');
const Mine = () => import('@/views/mine/index.vue');
const Otc = () => import('@/views/otc/index.vue');
const Entry = () => import('@/views/entry/index.vue');
const Login = () => import('@/views/login/index.vue');
const Register = () => import('@/views/login/register.vue');

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'entry',
        component: Entry,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            showFooter: true,
            needLogin: true,
        },
    },
    {
        path: '/otc',
        name: 'otc',
        component: Otc,
        meta: {
            showFooter: true,
            needLogin: true,
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
