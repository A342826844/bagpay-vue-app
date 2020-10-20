import { RouteConfig } from 'vue-router';

const Home = () => import('@/views/home/index.vue'); // 首页
const AddSymbol = () => import('@/views/home/addSymbol.vue'); // 添加币种
const TransferHistory = () => import('@/views/home/transferHistory.vue'); // 转入转出记录
const Payment = () => import('@/views/home/payment.vue'); // 收款地址二维码
const TransferOut = () => import('@/views/home/transferOut.vue'); // 转出

const Mine = () => import('@/views/mine/index.vue');
const SafeSetting = () => import('@/views/mine/safeSetting.vue');
const RealName = () => import('@/views/mine/realName.vue');
const SafePass = () => import('@/views/mine/safePass.vue');
const SystemSetting = () => import('@/views/mine/systemSetting.vue');
const Feedback = () => import('@/views/mine/feedback.vue');
const Aboutus = () => import('@/views/mine/aboutus.vue');
const ChangePwd = () => import('@/views/mine/changePwd.vue');

const SetPayment = () => import('@/views/setPayment/index.vue');
const SetPaymentAdd = () => import('@/views/setPayment/add.vue');
const SetPaymentEdit = () => import('@/views/setPayment/edit.vue');
const ChoiseSymbol = () => import('@/views/setPayment/choiseSymbol.vue');

const Otc = () => import('@/views/otc/index.vue');
const OtcEntry = () => import('@/views/otc/page/entry.vue');
const OtcOrder = () => import('@/views/otc/page/order.vue');
const Adv = () => import('@/views/otc/page/advertising.vue');
const AdvManage = () => import('@/views/otc/page/advManage.vue');
const AdvBusiness = () => import('@/views/otc/page/advBusiness.vue');
const OtcOrderDetail = () => import('@/views/otc/page/orderDetail.vue');
const OtcSubmit = () => import('@/views/otc/page/submit.vue');
const OtcAdvDetail = () => import('@/views/otc/page/advDetail.vue');
const OtcAppeal = () => import('@/views/otc/page/appeal.vue');
const VfyBus = () => import('@/views/otc/page/vfyBus.vue');

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
        meta: {
            keepAlive: true,
        },
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
        children: [{
            path: 'entry',
            name: 'otcentry',
            component: OtcEntry,
            meta: {
                showFooter: true,
                needLogin: true,
                name: 'otc',
            },
        }, {
            path: 'order',
            name: 'otcOrder',
            component: OtcOrder,
        }, {
            path: 'submit',
            name: 'otcsubmit',
            component: OtcSubmit,
        }, {
            path: 'order/appeal',
            name: 'otcappeal',
            component: OtcAppeal,
        }, {
            path: 'order/detail',
            name: 'orderdetail',
            component: OtcOrderDetail,
        }, {
            path: 'adv',
            name: 'otcAdv',
            component: Adv,
            meta: {
                keepAlive: true,
            },
        }, {
            path: 'adv/detail',
            name: 'otcAdvDetail',
            component: OtcAdvDetail,
        }, {
            path: 'advBusiness',
            name: 'otcAdvBusiness',
            component: AdvBusiness,
        }, {
            path: 'vfyBus',
            name: 'otcVfyBus',
            component: VfyBus,
        }, {
            path: 'advManage',
            name: 'otcAdvManage',
            component: AdvManage,
        }],
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
    {
        path: '/mine/changePwd',
        name: 'changePwd',
        component: ChangePwd,
    },
    {
        path: '/mine/safesetting',
        name: 'minesafesetting',
        component: SafeSetting,
    },
    {
        path: '/mine/realname',
        name: 'minerealname',
        component: RealName,
    },
    {
        path: '/mine/safepass',
        name: 'minesafepass',
        component: SafePass,
    },
    {
        path: '/mine/systemsetting',
        name: 'systemsetting',
        component: SystemSetting,
    },
    {
        path: '/mine/feedback',
        name: 'feedback',
        component: Feedback,
    },
    {
        path: '/mine/aboutus',
        name: 'aboutus',
        component: Aboutus,
    },
    {
        path: '/setpayment',
        name: 'setpayment',
        component: SetPayment,
    },
    {
        path: '/setpayment/add',
        name: 'setpaymentadd',
        component: SetPaymentAdd,
    },
    {
        path: '/setpayment/edit',
        name: 'setpaymentedit',
        component: SetPaymentEdit,
    },
    {
        path: '/choisesymbol',
        name: 'choisesymbol',
        component: ChoiseSymbol,
    },
];

export default routes;
