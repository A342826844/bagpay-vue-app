import Vue from 'vue';

import i18n from '@/i18n';
import { DateForamt } from '@/utils/tool';

// 时间
Vue.filter('date', (dateTime: any, fmt = 'yyyy-MM-dd') => {
    const dateForamt = new DateForamt(dateTime);
    return dateForamt.getDateForamt(fmt);
});
// 倒计时
Vue.filter('timeDown', (dateTime: any, fmt = 'hh:mm:ss') => {
    const dateForamt = new DateForamt(dateTime);
    return dateForamt.getTimeDown(fmt);
});
// 处理科学计数法
Vue.filter('toNonExponential', (n: string|number) => {
    let num = n;
    if (typeof num !== 'number') {
        num = parseFloat(num);
    }
    /*  eslint-disable */
    if (isNaN(num)) return '--';
    if (!isFinite(num)) return '--';
    const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, ((m as any)[1] || '').length - (m as any)[2]));
});

// 充值状态类型 DepositState
Vue.filter('depositState', (state: 0|1|2) => {
    // DepositStateWaitReview   = 0 //等待审核
	// DepositStateWaitConfirm  = 2 //等待确认
    // DepositStateDone         = 1 //已完成
    const states = {
        0: 'common.waitReview',
        1: 'common.waitComfirm',
        2: 'common.done',
    };
    return i18n.t(states[state]);
});

// 充值类型 DepositType
Vue.filter('depositState', (state: 0|1) => {
    // DepositTypeNormal      DepositType = 0 //链上转入
	// DepositTypeInternal    DepositType = 1 //内部转入
    const states = {
        0: 'common.typeNormal',
        1: 'common.typeInternal',
    };
    return i18n.t(states[state]);
});

// 提现状态 WithdrawState
Vue.filter('withdrawState', (state: -1|0|1|2|3|4|5) => {
	// WithdrawStateWaitSend    = -1 //等待发送
    // WithdrawStateWaitReview  = 0  //等待审核
	// WithdrawStateDone        = 1  //已完成
	// WithdrawStateSending     = 2  //发送中
	// WithdrawStateSent        = 3  //已发送
	// WithdrawStateCanceled    = 4  //已取消
	// WithdrawStateRejected    = 5  //已拒绝
    const states = {
        '-1': 'common.waitSend',
        0: 'common.waitReview',
        1: 'common.done',
        2: 'common.sending',
        3: 'common.sented',
        4: 'common.canceled',
        5: 'common.rejected',
    };
    return i18n.t(states[state]);
});

// 提现类型 WithdrawType
Vue.filter('withdrawType', (state: 0|1) => {
	// WithdrawTypeNormal    = 0 //链上转出
	// WithdrawTypeInternal  = 1 //内部转出
    const states = {
        0: 'common.withdrawTypeNormal',
        1: 'common.withdrawTypeInternal',
    };
    return i18n.t(states[state]);
});

// otc申诉类型 OtcAppealType
Vue.filter('otcAppealType', (state: 1|2|3|4) => {
	// OtcAppealTypeNoResponse         = 1 //一直不响应
	// OtcAppealTypePaidButNotRelease  = 2 //已付款不放币
	// OtcAppealTypeMaliciousOrder     = 3 //恶意下单
	// OtcAppealTypeFalsePaid          = 4 //恶意点击已付款
    const states = {
        1: 'common.typeNoResponse',
        2: 'common.typePaidButNotRelease',
        3: 'common.typeMaliciousOrder',
        4: 'common.typeFalsePaid',
    };
    return i18n.t(states[state]);
});

// otc申诉状态 OtcAppealState
Vue.filter('otcAppealState', (state: 0|1|2|3|4|5|6) => {
	// OtcAppealStateNoProcess     = 0 //未处理
	// OtcAppealStateProcessing    = 1 //处理中
	// OtcAppealStateReject        = 2 //驳回
	// OtcAppealStateReleaseCoin   = 3 //放币
	// OtcAppealStateCancelDeal    = 4 //取消订单
	// OtcAppealStateSolvedByUser  = 5 //用户已自行解决
	// OtcAppealStateCanceled      = 6 //已撤消
    const states = {
        0: 'common.stateNoProcess',
        1: 'common.stateProcessing',
        2: 'common.stateReject',
        3: 'common.stateReleaseCoin',
        4: 'common.stateCancelDeal',
        5: 'common.stateSolvedByUser',
        6: 'common.stateCanceled',
    };
    return i18n.t(states[state]);
});

// otc订单状态 OtcDealState
Vue.filter('otcDealState', (state: 0|1|2|3) => {
	// OtcDealStateTrading   = 0 //交易中
	// OtcDealStatePayed     = 1 //已支付
	// OtcDealStateDone      = 2 //已放币,已完成
	// OtcDealStateCanceled  = 3 //已取消
    const states = {
        0: 'common.stateTrading',
        1: 'common.statePayed',
        2: 'common.done',
        3: 'common.canceled',
    };
    return i18n.t(states[state]);
});

// 订单方向 OrderSide
Vue.filter('orderSide', (state: 1|2) => {
	// OrderSideBuy   = 1 // 买入
	// OrderSideSell  = 2 // 卖出
    const states = {
        1: 'common.sideBuy',
        2: 'common.sideSell',
    };
    return i18n.t(states[state]);
});

// 订单方向渲染颜色 OrderSide
Vue.filter('orderSideColor', (state: 1|2) => {
	// OrderSideBuy   = 1 // 买入
	// OrderSideSell  = 2 // 卖出
    const states = {
        1: 'green-color',
        2: 'red-color',
    };
    return i18n.t(states[state]);
});

// otc申诉用户类型 OtcAppealUserType
Vue.filter('otcAppealUserType', (state: 1|2) => {
	// OtcAppealUserTypeBuyer   = 1 //买家
	// OtcAppealUserTypeSeller  = 2 //卖家
    const states = {
        1: 'common.typeBuyer',
        2: 'common.typeSeller',
    };
    return i18n.t(states[state]);
});
