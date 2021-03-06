/**
 *
 * APP路由
 * meta: 路由配置信息
 *  @showFooter 是否显示底部导航栏，true为显示， 默认不显示
 *  @activeName 显示底部导航栏激活激活状态，当name和footer中name相等时处于激活状态
 *  @keepAlive 是否使用keepAlive保留状态， true为使用，默认不使用 XXX: 如果使用import引入， 就不能读取组件名
 *  使用@keepAlive 注意事项:
 *      需要使用keepAlive,必需设置componentName属性值
 *
 *  @index 路由切换动画
 *      如果to索引大于from索引,判断为前进状态
 *      如果to索引小于from索引,判断为后退状态
 *      如果to索引等于from索引,判断为同级,没有切换动画
 *      如果to没有索引,from有索引,判断为后退状态
 *      如果to和from都没有索引,判断为同级,没有切换动画
 *
 */
import { RouteConfig } from 'vue-router';

import Home from '@/views/home/index.vue'; // 首页
import Entry from '@/views/entry/index.vue'; // 入口页

import Login from '@/views/login/index.vue'; // 登录
import Telegram from '@/views/login/telegram.vue'; // 使用telegram登录
import telegramLogin from '@/views/login/telegramLogin.vue'; // 使用telegram登录
import Register from '@/views/login/register.vue'; // 注册
import Mine from '@/views/mine/index.vue'; // 注册
import ScanQRCode from '@/views/scanQRCode/index.vue'; // 扫描二维码
import ChoiseSymbol from '@/views/setPayment/choiseSymbol.vue'; // 选择币种
import TransferOut from '@/views/home/transferOut.vue'; // 转出

import invitation from './invitation';
import news from './news';

// 使用这种引入无法读到 component 的name
// const Login = () => import('@/views/login/index.vue'); // 登录
// const Register = () => import('@/views/login/register.vue'); // 注册
// const Entry = () => import('@/views/entry/index.vue'); // 入口页

const LoginSearch = () => import('@/views/login/search.vue');
const Findaccount = () => import('@/views/login/findaccount.vue');
// const LoginForCode = () => import('@/views/login/loginForCode.vue');

const AddSymbol = () => import('@/views/home/addSymbol.vue'); // 添加币种
const TransferHistory = () => import('@/views/home/transferHistory.vue'); // 转入转出记录
const transferFrozen = () => import('@/views/home/transferFrozen.vue'); // 转入转出冻结
const Payment = () => import('@/views/home/payment.vue'); // 收付款地址二维码
const AddrList = () => import('@/views/home/addressList.vue'); // 选择转出地址
const Allapplist = () => import('@/views/home/allAppList.vue'); // 选择转出地址

// const Mine = () => import('@/views/mine/index.vue');
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
const PaywayDetail = () => import('@/views/payway/detail.vue');
const PaywayBanks = () => import('@/views/payway/banks.vue');
const PaywaySelect = () => import('@/views/payway/select.vue');
const MineProtocol = () => import('@/views/mine/protocol.vue');
const MineHelp = () => import('@/views/mine/help.vue');
const MinHelpDetail = () => import('@/views/mine/helpDetail.vue');

const SetPayment = () => import('@/views/setPayment/index.vue');
const SetPaymentAdd = () => import('@/views/setPayment/add.vue');
const SetPaymentEdit = () => import('@/views/setPayment/edit.vue');

const OtcEntry = () => import('@/views/otc/page/entry.vue');
const OtcOrder = () => import('@/views/otc/page/order.vue');
const OtcAdv = () => import('@/views/otc/page/advertising.vue');
const OtcMerchant = () => import('@/views/otc/page/merchant.vue');
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

const ScanValue = () => import('@/views/scanQRCode/value.vue'); // 扫描结果

const Envelope = () => import('@/views/envelope/index.vue'); // 领取红包
const EnvelopeSend = () => import('@/views/envelope/send.vue'); // 发红包
const EnvelopeLogs = () => import('@/views/envelope/logs.vue'); // 红包记录
const EnvelopeDetail = () => import('@/views/envelope/detail.vue'); // 红包详情

const RedEnvelopeLog = () => import('@/views/logs/redEnvelope.vue'); // 抢红包记录
const UserBalanceLog = () => import('@/views/logs/userBalanceLog.vue'); // 账单

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'entry',
        component: Entry,
        meta: {
            keepAlive: true,
            componentName: 'Entry',
            noLogin: true,
        },
    },
    {
        path: '/entrylogin',
        name: 'entrylogin',
        component: Entry,
        meta: {
            keepAlive: true,
            componentName: 'Entry',
            noLogin: true,
            index: 8,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            keepAlive: true,
            componentName: 'Login',
            noLogin: true,
            index: 10,
        },
    },
    {
        path: '/findaccount',
        name: 'findaccount',
        component: Findaccount,
        meta: {
            keepAlive: true,
            noLogin: true,
            componentName: 'Findaccount',
            index: 100,
        },
    },
    // {
    //     path: '/loginForCode',
    //     name: 'loginForCode',
    //     component: LoginForCode,
    //     meta: {
    //         keepAlive: true,
    //         noLogin: true,
    //         componentName: 'LoginForCode',
    //         index: 100,
    //     },
    // },
    {
        path: '/mine/protocol',
        name: 'mineprotocol',
        component: MineProtocol,
        meta: {
            noLogin: true,
            index: 1100,
            hasWeb: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            keepAlive: true,
            noLogin: true,
            componentName: 'Register',
            index: 10,
        },
    },
    {
        path: '/telegram',
        name: 'telegram',
        component: Telegram,
        meta: {
            keepAlive: true,
            noLogin: true,
            componentName: 'Telegram',
            index: 10,
        },
    },
    {
        path: '/telegramLogin',
        name: 'telegramLogin',
        component: telegramLogin,
        meta: {
            noLogin: true,
            componentName: 'telegramLogin',
            index: 10,
        },
    },
    {
        path: '/redEnvelopeLog',
        name: 'redEnvelopeLog',
        component: RedEnvelopeLog,
        meta: {
            noLogin: true,
            componentName: 'RedEnvelopeLog',
            index: 500,
        },
    },
    {
        path: '/userBalanceLog',
        name: 'userBalanceLog',
        component: UserBalanceLog,
        meta: {
            noLogin: true,
            componentName: 'UserBalanceLog',
            index: 600,
        },
    },
    {
        path: '/login/search',
        name: 'loginsearch',
        component: LoginSearch,
        meta: {
            index: 1000,
            noLogin: true,
        },
    },
    {
        path: '/envelope',
        name: 'envelope',
        component: Envelope,
        meta: {
            index: 100,
        },
    },
    {
        path: '/envelope/send',
        name: 'envelopeSend',
        component: EnvelopeSend,
        meta: {
            index: 200,
            keepAlive: true,
            componentName: 'EnvelopeSend',
        },
    },
    {
        path: '/envelope/logs',
        name: 'envelopeLogs',
        component: EnvelopeLogs,
        meta: {
            index: 400,
            keepAlive: true,
            componentName: 'EnvelopeLogs',
        },
    },
    {
        path: '/envelope/detail',
        name: 'envelopeDetail',
        component: EnvelopeDetail,
        meta: {
            index: 500,
        },
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            showFooter: true,
            activeName: 'home',
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
        meta: {
            index: 100,
        },
    },
    {
        path: '/transferOut',
        name: 'transferOut',
        component: TransferOut,
        meta: {
            index: 100,
            componentName: 'TransferOut',
            keepAlive: true,
        },
    },
    {
        path: '/transfer/payment',
        name: 'transferpayment',
        component: TransferOut,
        meta: {
            index: 100,
        },
    },
    {
        path: '/addrList',
        name: 'addrList',
        component: AddrList,
        meta: {
            index: 110,
        },
    },
    {
        path: '/allapplist',
        name: 'allapplist',
        component: Allapplist,
        meta: {
            index: 5,
        },
    },
    {
        path: '/transferhistory',
        name: 'transferhistory',
        component: TransferHistory,
        meta: {
            index: 10,
        },
    },
    {
        path: '/transferFrozen',
        name: 'transferFrozen',
        component: transferFrozen,
        meta: {
            index: 100,
        },
    },
    {
        path: '/otc/entry',
        name: 'otcentry',
        component: OtcEntry,
        meta: {
            showFooter: true,
            keepAlive: true,
            activeName: 'otcentry',
            componentName: 'OtcEntry',
        },
    }, {
        path: '/otc/order',
        name: 'otcOrder',
        component: OtcOrder,
        meta: {
            index: 100,
        },
    }, {
        path: '/otc/submit',
        name: 'otcsubmit',
        component: OtcSubmit,
        meta: {
            index: 20,
            keepAlive: true,
            componentName: 'OtcSubmit',
        },
    }, {
        path: '/otc/merchant',
        name: 'OtcMerchant',
        component: OtcMerchant,
        meta: {
            index: 20,
            keepAlive: true,
            componentName: 'OtcMerchant',
        },
    }, {
        path: '/otc/order/appeal',
        name: 'otcappeal',
        component: OtcAppeal,
        meta: {
            index: 1000,
        },
    }, {
        path: '/otc/order/detail',
        name: 'orderdetail',
        component: OtcOrderDetail,
        meta: {
            index: 150,
        },
    }, {
        path: '/otc/adv',
        name: 'otcAdv',
        component: OtcAdv,
        meta: {
            index: 30,
            keepAlive: true,
            componentName: 'OtcAdv',
        },
    }, {
        path: '/otc/adv/detail',
        name: 'otcAdvDetail',
        component: OtcAdvDetail,
        meta: {
            index: 100,
        },
    }, {
        path: '/otc/protocol',
        name: 'OtcProtocol',
        component: OtcProtocol,
        meta: {
            index: 1000,
        },
    }, {
        path: '/otc/business/detail',
        name: 'businessDetail',
        component: BusinessDetail,
        meta: {
            index: 10,
            keepAlive: true,
            componentName: 'BusinessDetail',
        },
    }, {
        path: '/otc/advBusiness',
        name: 'otcAdvBusiness',
        component: AdvBusiness,
        meta: {
            index: 30,
        },
    }, {
        path: '/otc/vfyBus',
        name: 'otcVfyBus',
        component: VfyBus,
        meta: {
            index: 100,
            keepAlive: true,
            componentName: 'VfyBus',
        },
    }, {
        path: '/otc/advStatus',
        name: 'otcAdvStatus',
        component: AdvStatus,
        meta: {
            index: 200,
        },
    }, {
        path: '/otc/advManage',
        name: 'otcAdvManage',
        component: AdvManage,
        meta: {
            index: 10,
        },
    },
    {
        path: '/mine',
        name: 'mine',
        component: Mine,
        meta: {
            showFooter: true,
            activeName: 'mine',
        },
    },
    {
        path: '/mine/changePwd',
        name: 'changePwd',
        component: ChangePwd,
        meta: {
            index: 100,
        },
    },
    {
        path: '/mine/verLv1',
        name: 'verLv1',
        component: VerLv1,
        meta: {
            index: 110,
        },
    },
    {
        path: '/mine/help',
        name: 'minehelp',
        component: MineHelp,
        meta: {
            index: 200,
        },
    },
    {
        path: '/mine/helpdetail',
        name: 'MinHelpDetail',
        component: MinHelpDetail,
        meta: {
            index: 300,
        },
    },
    {
        path: '/mine/verLv2',
        name: 'verLv2',
        component: VerLv2,
        meta: {
            index: 120,
        },
    },
    {
        path: '/mine/verLv3',
        name: 'verLv3',
        component: VerLv3,
        meta: {
            index: 130,
        },
    },
    {
        path: '/mine/verLvStatus',
        name: 'verLvStatus',
        component: VerLvStatus,
        meta: {
            index: 140,
        },
    },
    {
        path: '/mine/safesetting',
        name: 'minesafesetting',
        component: SafeSetting,
        meta: {
            index: 50,
        },
    },
    {
        path: '/mine/safepass',
        name: 'minesafepass',
        component: SafePass,
        meta: {
            index: 500,
        },
    },
    {
        path: '/mine/forgetSafepass',
        name: 'mineforgetSafepass',
        component: ForgetSafePass,
        meta: {
            index: 500,
        },
    },
    {
        path: '/mine/systemsetting',
        name: 'systemsetting',
        component: SystemSetting,
        meta: {
            index: 100,
        },
    },
    {
        path: '/mine/feedback',
        name: 'feedback',
        component: Feedback,
        meta: {
            index: 120,
        },
    },
    {
        path: '/mine/aboutus',
        name: 'aboutus',
        component: Aboutus,
        meta: {
            index: 100,
        },
    },
    {
        path: '/payway',
        name: 'payway',
        component: Payway,
        meta: {
            index: 50,
        },
    },
    {
        path: '/payway/add',
        name: 'paywayadd',
        component: PaywayAdd,
        meta: {
            index: 100,
            keepAlive: true,
            componentName: 'PaywayAdd',
        },
    },
    {
        path: '/payway/detail',
        name: 'PaywayDetail',
        component: PaywayDetail,
        meta: {
            index: 100,
            keepAlive: false,
            componentName: 'PaywayDetail',
        },
    },
    {
        path: '/payway/banks',
        name: 'PaywayBanks',
        component: PaywayBanks,
        meta: {
            index: 200,
        },
    },
    {
        path: '/payway/select',
        name: 'PaywaySelect',
        component: PaywaySelect,
        meta: {
            index: 60,
        },
    },
    {
        path: '/setpayment',
        name: 'setpayment',
        component: SetPayment,
        meta: {
            index: 50,
        },
    },
    {
        path: '/setpayment/add',
        name: 'setpaymentadd',
        component: SetPaymentAdd,
        meta: {
            keepAlive: true,
            index: 150,
            componentName: 'SetPaymentAdd',
        },
    },
    {
        path: '/setpayment/edit',
        name: 'setpaymentedit',
        component: SetPaymentEdit,
        meta: {
            index: 100,
        },
    },
    {
        path: '/choisesymbol',
        name: 'choisesymbol',
        component: ChoiseSymbol,
        meta: {
            index: 200,
        },
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
        meta: {
            index: 10,
        },
    },
    {
        path: '/otcbuy',
        redirect: '/otc/entry?type=buy',
    },
    {
        path: '/otcsell',
        redirect: {
            name: 'otcentry',
        },
    },
];

// routes.push(...invitation);

export default routes.concat(invitation).concat(news);
