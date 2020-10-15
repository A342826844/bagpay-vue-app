import {
    getJava, postJava, postGolang, getGolang,
} from './http';

type params = {
    [elem: string]: any;
}

export const getTestData = (data: params) => getJava('/test', data);
export const getUploadToken = () => getJava('/test');
export const postTestUpdate = (id: string) => postJava(`/test/${id}/update`);
export const personalized = (data: params) => postJava('/weapi/personalized/newsong', data, { formdata: true });
export const loginCellphone = (data: params) => getJava('/login/cellphone', data);

// 场外
export const getOtcOrderList = (data: params) => postGolang('/wi/otc/v1/orders/book', data); // otc未登录广告列表
export const otcOrder = (data: params) => postGolang('/otc/v1/orders/place', data); // 资金划转，币币合约互转
export const postMerchantData = (data: params) => postGolang('/otc/merchant/apply', data); // 商户申请
export const cancelMerchant = (id: string) => postGolang(`/otc/merchant/cancel/${id}`); // 商户申请
export const getMerchantInfo = () => getGolang('/otc/merchant/info');// 查询用户填些资料信息,暂时不用
export const getMerchantProgress = () => getGolang('/otc/merchant/progress');// 查询用户广告商家申请状态
export const postMerchantConfirm = (data: params) => postGolang('/otc/merchant/confirm', data);// 商户保证金支付确认
export const otcOrdersPlace = (data: params) => postGolang('/wi/otc/v1/orders/place', data); // 发布广告
export const otcOrdersUpdate = (data: params) => postGolang('/wi/otc/v1/orders/update', data); // 发布广告
export const otcOrderTrade = (data: params) => postGolang('/wi/otc/v1/deals/place', data); // otc取消申诉
export const otcDealsList = (data: params) => getGolang('/wi/otc/v1/deals/list', data); // otc查询订单列表
export const appealSubmit = (data: params) => postGolang('/wi/otc/v1/appeal/submit', data); // 提交订单申诉
export const otcDealsRelease = (data: params) => postGolang('/wi/otc/v1/deals/release', data); // 提交订单申诉
export const otcDealsPayed = (data: params) => postGolang('/wi/otc/v1/deals/payed', data); // 标记为已支付

export const otcCoinsMenu = (data: params) => getGolang('/wi/otc/v1/coins/menu', data); // 下单
export const otcOrdersInfo = (id: string) => getGolang(`/wi/otc/v1/orders/info/${id}`); // otc获取广告信息
export const otcOrdersDeals = (id: string, data: params) => getGolang(`/wi/otc/v1/orders/deals/${id}`, data); // otc查询指定广告下的订单信息
export const otcDealsInfo = (data: params) => getGolang('/wi/otc/v1/deals/info', data); // otc 订单详
export const otcDealsCancel = (id: string) => postGolang(`/wi/otc/v1/deals/cancel/${id}`); // 下单
export const otcPostMyAdv = (data: params) => postGolang('/wi/otc/v1/orders/list', data); // otc登录广告列表
export const otcPostAdvClose = (id: string) => postGolang(`/wi/otc/v1/orders/close/${id}`); // 关闭广告
export const otcPostAdvReload = (id: string) => postGolang(`/wi/otc/v1/orders/reload/${id}`); // 重新上架广告
export const otcPostAdvCancel = (id: string) => postGolang(`/wi/otc/v1/orders/cancel/${id}`); // 下架广告
export const merchantTradesInfo = (data: params) => getGolang('/otc/merchant/trades/info', data); // 查看商户信息
export const otcConfig = () => getGolang('/otc/cfg');

// 注册验证码
export const registerCode = (data: params) => postGolang('/verification-code/phone/VerifyCodeTypeRegister', data);
// 获取图片验证
export const getImages = (data: params) => postGolang('/verification-code/captcha', data);
// 注册
export const register = (data: params) => postGolang('/user/sign-up', data);
// 登录
export const login = (data: params) => getJava('/VerifyCodeTypeLogin', data);
