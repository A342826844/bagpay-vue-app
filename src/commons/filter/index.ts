import Vue from 'vue';

import i18n from '@/i18n';
import { DateForamt } from '@/utils/tool';

// 时间
Vue.filter('date', (dateTime: any, fmt = 'yyyy-MM-dd') => {
    const dateForamt = new DateForamt(dateTime, true);
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

// 币种大写展示
Vue.filter('toUpperCase', (n: string) => {
    if  (typeof n === 'string') return n.toUpperCase();
    return '';
});

// 充值状态类型 DepositState
Vue.filter('depositState', (state: 0|1|2) => {
    // DepositStateWaitReview   = 0 //等待确认
    // DepositStateDone         = 1 //已到账
	// DepositStateAbnormal  = 2 //异常
    const states = {
        0: 'common.waitReview',
        1: 'common.waitComfirm',
        2: 'common.abnormal',
    };
    return i18n.t(states[state]);
});

// 充值类型 DepositType
Vue.filter('depositType', (state: 0|1) => {
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
	// OtcDealStateTrading   = 0 //交易中, 待支付
	// OtcDealStatePayed     = 1 //已支付
	// OtcDealStateDone      = 2 //已放币,已完成
	// OtcDealStateCanceled  = 3 //已取消
    const states = {
        0: 'common.statePaying',
        1: 'common.statePayed',
        2: 'common.done',
        3: 'common.canceled',
    };
    return i18n.t(states[state]);
});
// otc订单状态 OtcDealState
Vue.filter('otcDealStateColor', (state: 0|1|2|3) => {
	// OtcDealStateTrading   = 0 //交易中, 待支付
	// OtcDealStatePayed     = 1 //已支付
	// OtcDealStateDone      = 2 //已放币,已完成
	// OtcDealStateCanceled  = 3 //已取消
    const states = {
        0: 'primary-color',
        1: 'red-color',
        2: 'green-color',
        3: '',
    };
    return states[state];
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
// 广告方向 OrderSide
Vue.filter('orderSideType', (state: 1|2) => {
	// OrderSideSell  = 1 // 出售
	// OrderSideBuy   = 2 // 购买
    const states = {
        1: 'common.sideSellT',
        2: 'common.sideBuyT',
    };
    return i18n.t(states[state]);
});
// 广告方向 OrderSide
Vue.filter('orderTypeSideT', (state: 1|2) => {
	// OrderSideSell  = 1 // 出售
	// OrderSideBuy   = 2 // 购买
    const states = {
        1: 'common.typeSellT',
        2: 'common.typeBuyT',
    };
    return i18n.t(states[state]);
});
// 广告方向用户自己看到的 OrderSide
Vue.filter('orderSideTypeUser', (state: 1|2) => {
	// OrderSideBuy   = 1 // 购买
	// OrderSideSell  = 2 // 出售
    const states = {
        1: 'common.sideBuyT',
        2: 'common.sideSellT',
    };
    return i18n.t(states[state]);
});
// 订单方向 OrderSide
Vue.filter('orderSideUser', (state: 1|2, taker_id: number, user_id: number) => {
	// OrderSideBuy   = 1 // 买入
	// OrderSideSell  = 2 // 卖出
    const states1 = {
        1: 'common.sideBuy',
        2: 'common.sideSellT',
    };
    const states2 = {
        1: 'common.sideSell',
        2: 'common.sideBuyT',
    };
    if (taker_id === user_id) {
        return i18n.t(states1[state]);
    }
    return i18n.t(states2[state]);
});
// 订单方向 OrderSide
Vue.filter('orderSideUserLable', (state: 1|2, taker_id: number, user_id: number) => {
	// OrderSideBuy   = 1 // 买入
	// OrderSideSell  = 2 // 卖出
    const states1 = {
        1: 'common.typeSeller',
        2: 'common.typeBuyer',
    };
    const states2 = {
        1: 'common.typeBuyer',
        2: 'common.typeSeller',
    };
    if (taker_id === user_id) {
        return i18n.t(states1[state]);
    }
    return i18n.t(states2[state]);
});

// 订单方向渲染颜色 OrderSide
Vue.filter('orderSideColor', (state: 1|2) => {
	// OrderSideBuy   = 1 // 买入
	// OrderSideSell  = 2 // 卖出
    const states = {
        1: 'green-color',
        2: 'red-color',
    };
    return states[state];
});
// 订单方向渲染颜色 OrderSide
Vue.filter('orderSideUserColor', (state: 1|2, taker_id: number, user_id: number) => {
	// OrderSideSell  = 1 // 卖出
	// OrderSideBuy   = 2 // 买入
    const states1 = {
        1: 'green-color',
        2: 'red-color',
    };
    const states2 = {
        1: 'red-color',
        2: 'green-color',
    };
    if (taker_id === user_id) {
        return states1[state];
    }
    return states2[state];
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

// 支付方式类型 PayType
Vue.filter('payType', (state: 0|1|2|3|4) => {
	// PayTypeSelect     = 0 //选择支付方式
	// PayTypeBank       = 1 //银行卡
	// PayTypeAlipay     = 2 //支付宝
	// PayTypeWechatPay  = 3 //微信
	// PayTypeHuione     = 4 //汇旺
	// PayTypeHuione     = 5 //其他银行
    const states = {
        0: 'common.selectPayType',
        1: 'common.bank',
        2: 'common.alipay',
        3: 'common.weixin',
        4: 'common.huione',
        5: 'common.cash',
    };
    return i18n.t(states[state]);
});

// 广告状态 OtcOrderState
Vue.filter('otcOrderState', (state: 0|1|2|3|4|5) => {
    // OtcOrderStateWait        = 0 //等待中
    // OtcOrderStateTrading     = 1 //交易中
    // OtcOrderStateFinished    = 2 //已完成
    // OtcOrderStateCanceled    = 3 //已取消
    // OtcOrderStateClosed      = 4 //已关闭
    // OtcOrderStatePlatClosed  = 5 //平台强制关闭
    const states = {
        0: 'common.stateWait',
        1: 'common.stateTrading',
        2: 'common.stateFinished',
        3: 'common.otcStateCanceled',
        4: 'common.stateClosed',
        5: 'common.statePlatClosed',
    };
    return i18n.t(states[state]);
});
// 广告状态 OtcOrderState
Vue.filter('otcOrderStateColor', (state: 0|1|2|3|4|5) => {
    // OtcOrderStateWait        = 0 //等待中
    // OtcOrderStateTrading     = 1 //交易中
    // OtcOrderStateFinished    = 2 //已完成
    // OtcOrderStateCanceled    = 3 //已取消
    // OtcOrderStateClosed      = 4 //已关闭
    // OtcOrderStatePlatClosed  = 5 //平台强制关闭
    const states = {
        0: 'primary-color',
        1: 'red-color',
        2: '',
        3: 'gray-color',
        4: 'gray-color',
        5: 'gray-color',
    };
    return states[state];
});

// 社交类型 SocialType
Vue.filter('socialType', (state: 0|1) => {
    //"wechat",             = 0 //微信
    //"telegram",           = 1 //telegram
    const states = {
        0: 'common.wechat',
        1: 'common.telegram',
    };
    return i18n.t(states[state]);
});

// 与本人关系 Relationship
Vue.filter('relationship', (state: 0|1) => {
    //"朋友",             = 0 //朋友
    //"亲人",             = 1 //亲人
    const states = {
        0: 'common.friend',
        1: 'common.relatives',
    };
    return i18n.t(states[state]);
});

// 证据类型
Vue.filter('cardType', (state: 1|2) => {
    //"身份证",            = 1 // 身份证
    //"护照",              = 2 // 护照
    const states = {
        1: 'common.ID',
        2: 'common.passport',
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
        1: 'common.appealTypeNoResponse',
        2: 'common.appealTypePaidButNotRelease',
        3: 'common.appealTypeMaliciousOrder',
        4: 'common.appealTypeFalsePaid',
    };
    return i18n.t(states[state]);
});

// 返佣类型 CommType
Vue.filter('invitaCommTypeTeam', (state: 0|1|2|3) => {
	// CommTypeTeam    = 0  //团队
	// CommTypeFirst   = 1  //一级返佣 直推
	// CommTypeSecond  = 2  //二级返佣 间推
	// CommTypeThress  = 3  //三级返佣 间推
    const states = {
        0: 'invitation.commTypeTeam',
        1: 'invitation.commTypeFirst',
        2: 'invitation.commTypeSecond',
        3: 'invitation.commTypeThress',
    };
    return i18n.t(states[state]);
});

// 返佣类型 CommType
Vue.filter('articleType', (state: 0|1) => {
	// ArticleTypeArt    = 0  //普通文章
	// ArticleTypeNotice   = 1  //公告
    const states = {
        0: 'common.article',
        1: 'common.notice',
    };
    return i18n.t(states[state]);
});

// 返佣类型 CommType
Vue.filter('balanceLogType', (state: number) => {
	// ArticleTypeArt    = 0  //普通文章
	// ArticleTypeNotice   = 1  //公告
    const states: any = {
        1: 'common.balanceLogTypeDeposit',
        2: 'common.balanceLogTypeWithdraw',
        3: 'common.balanceLogTypeOtcBuy',
        4: 'common.balanceLogTypeOtcSell',
        5: 'common.balanceLogTypeMerchantBail',
        6: 'common.balanceLogTypePenalty',
        7: 'common.balanceLogTypeReward',
        10: 'common.balanceLogTypeSendRedEnvelope',
        11: 'common.balanceLogTypeRedEnvelopeRefund',
        12: 'common.balanceLogTypeGotRedEnvelope',
    };
    return i18n.t(states[state]);
});

// redEnvelopeType 0.固定金额 1.拼手气
Vue.filter('redEnvelopeType', (state: 0|1) => {
	// ArticleTypeArt    = 0  //普通文章
	// ArticleTypeNotice   = 1  //公告
    const states = {
        0: 'common.fixedAmount',
        1: 'common.byLuck',
    };
    return i18n.t(states[state]);
});

// 手机号加密处理
Vue.filter('formatName', (str='') => {
    const index = str.indexOf('-') === -1 ? 0 : str.indexOf('-');
    // return str.replace(str.slice(3, 7), "***");
    const before = str.slice(0,3 + index)+'***';
    const temp = before.length - str.length;
    const start = temp <= -4 ? -4 : Math.min(temp, -1);
    return before + str.slice(start, str.length);
});
// 去掉区号
Vue.filter('sliceMoblepre', (phone='') => {
    // XXX: 需求更改，不需要去掉区号了
    // const index = phone.indexOf('-');
    // if (phone.indexOf('-') !== -1) {
    //     return phone.slice(index + 1);
    // }
    return phone;
});