import { RouteConfig } from 'vue-router';
import store from '@/store/index';

import Home from '@/views/home/index.vue'; // 首页
// import Entry from '@/views/entry/index.vue'; // 入口页

// import Login from '@/views/login/index.vue'; // 登录
// import Register from '@/views/login/register.vue'; // 注册

// 使用这种引入无法读到 component 的name
const Login = () => import('@/views/login/index.vue'); // 登录
const Register = () => import('@/views/login/register.vue'); // 注册
const Entry = () => import('@/views/entry/index.vue'); // 入口页

const LoginSearch = () => import('@/views/login/search.vue');
const Findaccount = () => import('@/views/login/findaccount.vue');

const AddSymbol = () => import('@/views/home/addSymbol.vue'); // 添加币种
const TransferHistory = () => import('@/views/home/transferHistory.vue'); // 转入转出记录
const transferFrozen = () => import('@/views/home/transferFrozen.vue'); // 转入转出冻结
const Payment = () => import('@/views/home/payment.vue'); // 收款地址二维码
const TransferOut = () => import('@/views/home/transferOut.vue'); // 转出
const AddrList = () => import('@/views/home/addressList.vue'); // 选择转出地址

const Mine = () => import('@/views/mine/index.vue');
const SafeSetting = () => import('@/views/mine/safeSetting.vue');
const SafePass = () => import('@/views/mine/safePass.vue');
const ForgetSafePass = () => import('@/views/mine/forgetSafePass.vue');
const SystemSetting = () => import('@/views/mine/systemSetting.vue');
const Feedback = () => import('@/views/mine/feedback.vue');
const Aboutus = () => import('@/views/mine/aboutus.vue');
const ChangePwd = () => import('@/views/mine/changePwd.vue');
const VerLv1 = () => import('@/views/mine/verLv1.vue');
const VerLv2 = () => import('@/views/mine/verLv2.vue');
const VerLv3 = () => import('@/views/mine/verLv3.vue');
const VerLvStatus = () => import('@/views/mine/verLvStatus.vue');
const Payway = () => import('@/views/payway/index.vue');
const PaywayAdd = () => import('@/views/payway/add.vue');
const PaywayBanks = () => import('@/views/payway/banks.vue');
const PaywaySelect = () => import('@/views/payway/select.vue');
const MineProtocol = () => import('@/views/mine/protocol.vue');
const MineHelp = () => import('@/views/mine/help.vue');
const MinHelpDetail = () => import('@/views/mine/helpDetail.vue');

const SetPayment = () => import('@/views/setPayment/index.vue');
const SetPaymentAdd = () => import('@/views/setPayment/add.vue');
const SetPaymentEdit = () => import('@/views/setPayment/edit.vue');
const ChoiseSymbol = () => import('@/views/setPayment/choiseSymbol.vue');

const OtcEntry = () => import('@/views/otc/page/entry.vue');
const OtcOrder = () => import('@/views/otc/page/order.vue');
const OtcAdv = () => import('@/views/otc/page/advertising.vue');
const AdvManage = () => import('@/views/otc/page/advManage.vue');
const OtcOrderDetail = () => import('@/views/otc/page/orderDetail.vue');
const OtcSubmit = () => import('@/views/otc/page/submit.vue');
const OtcAdvDetail = () => import('@/views/otc/page/advDetail.vue');
const OtcAppeal = () => import('@/views/otc/page/appeal.vue');
const AdvBusiness = () => import('@/views/otc/page/business/advBusiness.vue');
const VfyBus = () => import('@/views/otc/page/business/vfyBus.vue');
const AdvStatus = () => import('@/views/otc/page/business/advStatus.vue');
const OtcProtocol = () => import('@/views/otc/page/protocol.vue');
const BusinessDetail = () => import('@/views/otc/page/businessDetail.vue');

const ScanQRCode = () => import('@/views/scanQRCode/index.vue'); // 扫描二维码
const ScanValue = () => import('@/views/scanQRCode/value.vue'); // 扫描结果

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'entry',
        component: Entry,
        meta: {
            keepAlive: true,
            noLogin: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            keepAlive: true,
            noLogin: true,
        },
    },
    {
        path: '/findaccount',
        name: 'findaccount',
        component: Findaccount,
        meta: {
            keepAlive: true,
            noLogin: true,
        },
    },
    {
        path: '/mine/protocol',
        name: 'mineprotocol',
        component: MineProtocol,
        meta: {
            noLogin: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            keepAlive: true,
            noLogin: true,
        },
    },
    {
        path: '/login/search',
        name: 'loginsearch',
        component: LoginSearch,
        meta: {
            noLogin: true,
        },
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
        meta: {
            keepAlive: true,
        },
    },
    {
        path: '/addrList',
        name: 'addrList',
        component: AddrList,
    },
    {
        path: '/transferhistory',
        name: 'transferhistory',
        component: TransferHistory,
    },
    {
        path: '/transferFrozen',
        name: 'transferFrozen',
        component: transferFrozen,
    },
    {
        path: '/otc/entry',
        name: 'otcentry',
        component: OtcEntry,
        meta: {
            showFooter: true,
            keepAlive: true,
            needLogin: true,
            name: 'otcentry',
        },
    }, {
        path: '/otc/order',
        name: 'otcOrder',
        component: OtcOrder,
    }, {
        path: '/otc/submit',
        name: 'otcsubmit',
        component: OtcSubmit,
    }, {
        path: '/otc/order/appeal',
        name: 'otcappeal',
        component: OtcAppeal,
    }, {
        path: '/otc/order/detail',
        name: 'orderdetail',
        component: OtcOrderDetail,
    }, {
        path: '/otc/adv',
        name: 'otcAdv',
        component: OtcAdv,
        meta: {
            keepAlive: true,
        },
    }, {
        path: '/otc/adv/detail',
        name: 'otcAdvDetail',
        component: OtcAdvDetail,
    }, {
        path: '/otc/protocol',
        name: 'OtcProtocol',
        component: OtcProtocol,
    }, {
        path: '/otc/business/detail',
        name: 'businessDetail',
        component: BusinessDetail,
        meta: {
            keepAlive: true,
        },
    }, {
        path: '/otc/advBusiness',
        name: 'otcAdvBusiness',
        component: AdvBusiness,
    }, {
        path: '/otc/vfyBus',
        name: 'otcVfyBus',
        component: VfyBus,
        meta: {
            keepAlive: true,
        },
    }, {
        path: '/otc/advStatus',
        name: 'otcAdvStatus',
        component: AdvStatus,
    }, {
        path: '/otc/advManage',
        name: 'otcAdvManage',
        component: AdvManage,
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
        path: '/mine/verLv1',
        name: 'verLv1',
        component: VerLv1,
    },
    {
        path: '/mine/help',
        name: 'minehelp',
        component: MineHelp,
    },
    {
        path: '/mine/helpdetail',
        name: 'MinHelpDetail',
        component: MinHelpDetail,
    },
    {
        path: '/mine/verLv2',
        name: 'verLv2',
        component: VerLv2,
    },
    {
        path: '/mine/verLv3',
        name: 'verLv3',
        component: VerLv3,
    },
    {
        path: '/mine/verLvStatus',
        name: 'verLvStatus',
        component: VerLvStatus,
    },
    {
        path: '/mine/safesetting',
        name: 'minesafesetting',
        component: SafeSetting,
    },
    {
        path: '/mine/safepass',
        name: 'minesafepass',
        component: SafePass,
    },
    {
        path: '/mine/forgetSafepass',
        name: 'mineforgetSafepass',
        component: ForgetSafePass,
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
        path: '/payway',
        name: 'payway',
        component: Payway,
    },
    {
        path: '/payway/add',
        name: 'paywayadd',
        component: PaywayAdd,
        meta: {
            keepAlive: true,
        },
    },
    {
        path: '/payway/banks',
        name: 'PaywayBanks',
        component: PaywayBanks,
    },
    {
        path: '/payway/select',
        name: 'PaywaySelect',
        component: PaywaySelect,
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
        meta: {
            keepAlive: true,
        },
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
    {
        path: '/scanQRCode',
        name: 'scanQRCode',
        component: ScanQRCode,
    },
    {
        path: '/scanvalue',
        name: 'scanvalue',
        component: ScanValue,
    },
];

// 获取需要keepAlive的页面  保存到 vuex里
const keepAlive: any = [];
routes.forEach((item: any) => {
    if (item.meta && item.meta.keepAlive) {
        keepAlive.push(item.component.name);
    }
});
store.commit('setKeepAlive', keepAlive);

export default routes;
