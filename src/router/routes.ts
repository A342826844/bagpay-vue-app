import { RouteConfig } from 'vue-router';

const Home = () => import('@/views/home/index.vue'); // 首页
const AddSymbol = () => import('@/views/home/addSymbol.vue'); // 添加币种
const TransferHistory = () => import('@/views/home/transferHistory.vue'); // 转入转出记录
const Payment = () => import('@/views/home/payment.vue'); // 收款地址二维码
const TransferOut = () => import('@/views/home/transferOut.vue'); // 转出

const Mine = () => import('@/views/mine/index.vue');
const Otc = () => import('@/views/otc/index.vue');
const Entry = () => import('@/views/entry/index.vue');
const Login = () => import('@/views/login/index.vue');
const Findaccount = () => import('@/views/login/findaccount.vue');
const SetPayPassword = () => import('@/views/login/setPayPassword.vue');
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
        meta: {
            keepAlive: true,
        },
    },
    {
        path: '/findaccount',
        name: 'findaccount',
        component: Findaccount,
    },
    {
        path: '/setpaypassword',
        name: 'setpaypassword',
        component: SetPayPassword,
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
            name: 'home',
        },
    },
    {
        path: '/addsymbol',
        name: 'addsymbol',
        component: AddSymbol,
    },
    {
        path: '/payment',
        name: 'payment',
        component: Payment,
    },
    {
        path: '/transferOut',
        name: 'transferOut',
        component: TransferOut,
    },
    {
        path: '/transferhistory',
        name: 'transferhistory',
        component: TransferHistory,
    },
    {
        path: '/otc',
        name: 'otc',
        component: Otc,
        meta: {
            showFooter: true,
            needLogin: true,
            name: 'otc',
        },
    },
    {
        path: '/mine',
        name: 'mine',
        component: Mine,
        meta: {
            showFooter: true,
            needLogin: true,
            name: 'mine',
        },
    },
];

export default routes;
