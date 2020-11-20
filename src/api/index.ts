import {
    getJava, postJava, postGolang, getGolang, URL,
} from './http';

type params = {
    [elem: string]: any;
}

export const getTestData = (data: params) => getJava('/test', data);
export const getUploadToken = () => getJava('/test');
export const postTestUpdate = (id: string) => postJava(`/test/${id}/update`);
export const personalized = (data: params) => postJava('/weapi/personalized/newsong', data, { formdata: true });
export const loginCellphone = (data: params) => getJava('/login/cellphone', data);

/** 场外 */
// 获取可交易的广告列表
export const getOtcOrderList = (data: params) => getGolang('/otc/order/trade/list', data);
// 发布广告
export const otcOrderPlace = (data: params) => postGolang('/otc/order/place', data);
// 其它货币对美元汇率
export const getExchangeRate = (data: params) => getGolang('/exchange-rate/usd', data);
// 获取订单列表
export const otcOrderDealList = (data: params) => postGolang('/otc/deal/list', data);
// 获取订单列表
export const otcOrderList = (data: params) => postGolang('/otc/order/list', data);
// 获取广告信息
export const otcOrderGetById = (id: number) => postGolang(`/otc/order/get/${id}`, { id });
// 获取商户状态
export const otcMerchantStat = (uid: number) => getGolang(`/otc/merchant/stat/${uid}`, { uid });
// 获取订单信息
export const otcDealGetById = (id: number) => postGolang(`/otc/deal/get/${id}`, { id });
// 广告下架
export const otcOrderCancel = (id: number) => postGolang(`/otc/order/cancel/${id}`, { id });
// 取消订单
export const otcDealCancel = (id: number) => postGolang(`/otc/deal/cancel/${id}`, { id });
// 释放订单
export const otcDealRelease = (id: number, data: params) => postGolang(`/otc/deal/release/${id}`, { id, ...data });
// 标记为已付款(仅买家可调用)
export const otcDealPadi = (id: number) => getGolang(`/otc/deal/paid/${id}`, { id });
// 广告下单
export const otcDealSubmit = (data: params) => postGolang('/otc/deal/submit', data);
// 申请商家
export const otcMerchant = (data: params) => postGolang('/otc/merchant/submit', data);
// 申请商家更新
export const otcMerchantUpdate = (data: params) => postGolang('/otc/merchant/update', data);
// 获取商家申请信息
export const otcGetMerchant = (data?: params) => postGolang('/otc/merchant/get', data);
// 提交申诉
export const otcAppealSubmit = (data: params) => postGolang('otc/appeal/submit', data);
// 根据订单id获取申诉
export const otcAppealByOrderId = (id: number) => postGolang(`/otc/appeal/get-by-deal/${id}`, { id });
// 取消申诉
export const otcAppealCancel = (id: number) => postGolang(`/otc/appeal/cancel/${id}`, { id });
// 获取配置信息
export const getConfigCommon = () => getGolang('/config/common');
// 获取文件
export const getFile = `${URL}/file/get/`;

/** 支付方式 */
// 获取支付方式列表
export const getBankList = () => getGolang('/bank/list');
// 获取指定已添加的支付方式信息
export const getBankListById = (id: number) => getGolang(`/bank/user/get/${id}`, { id });
// 根据类型获取已添加的支付方式信息(只返回开用状态的一条)
export const getBankListByType = (type: number) => getGolang(`/bank/user/get-by-type/${type}`, { type });
// 获取用户支付方式列表
export const getUserBankList = () => getGolang('/bank/user/list');
// 添加支付方式
export const addUserBank = (data: params) => postGolang('/bank/user/add', data);
// 禁用指定的支付方式
export const bankUserDisable = (id: number) => getGolang(`/bank/user/disable/${id}`, { id });
// 启用指定的支付方式
export const bankUserEnable = (id: number) => postGolang(`/bank/user/enable/${id}`, { id });
// 注册验证码
export const registerCode = (data: params) => postGolang(`/verification-code/phone/${data.type}`, data);
// 注册验证码
export const registerCodeEmail = (data: params) => postGolang(`/verification-code/email/${data.type}`, data);
// 获取图片验证
export const getImages = (data: params) => postGolang('/verification-code/captcha', data);
// 注册
export const register = (data: params) => postGolang('/user/sign-up', data);
// 登录
export const login = (data: params) => postGolang('/user/sign-in', data);
// 退出
export const logout = (data: params) => postGolang('/user/sign-out', data);
// 找回密码
export const forgetPwd = (data: params) => postGolang('/user/forget-password', data);
// 获取安全认证项目
export const getOption = (data: params) => postGolang(`/user/auth/option/${data.operate}`, data);

// 获取用户信息
export const getUserInfo = (data: params) => postGolang('/user/profile', data);
// 修改登录密码
export const changePwd = (data: params) => postGolang('/user/change-password', data);
// 支付密码
export const changePayPwd = (data: params) => postGolang('/user/change-pay-password', data);
// 忘记支付密码
export const forgetPayPwd = (data: params) => postGolang('/user/forget-pay-password', data);
// 添加提币地址
export const addAddress = (data: params) => postGolang('/withdraw/address/add', data);
// 删除提币地址
export const delAddr = (data: params) => getGolang(`/withdraw/address/del/${data.id}`, data);
// 获取指定币种地址列表
export const getAddrList = (data: params) => getGolang(`/withdraw/address/list/${data.coin}`, data);
// 获取实名信息
export const getVerStutas = (data: params) => getGolang('/verification/get', data);
// 提交lv1认证
export const postVerLv1 = (data: params) => postGolang('/verification/lv1/submit', data);
// 提交lv2认证
export const postVerLv2 = (data: params) => postGolang('/verification/lv2/submit', data);
// 提交lv3认证
export const postVerLv3 = (data: params) => postGolang('/verification/lv3/submit', data);
// 版本更新
export const version = (data: params) => getGolang('/app/version/check', data);

// 获取所有币种余额
export const getBalances = (data: params) => postGolang('/user/balances', data);
// 获取指定币种支持的协议
export const getCoinProtocols = (data: params) => getGolang(`/coin/${data.coin}/protocols`, data);
// 获取指定币种余额
export const getCoinBalances = (data: params) => postGolang(`/user/balance/${data.coin}`, data);
// 获取指定币种余额变动
export const getCoinLog = (data: params) => postGolang(`/user/balance-log/${data.coin}`, data);
// 获取指定币种转入记录
export const getCoinHistory = (data: params) => postGolang(`/deposit/history/${data.coin}`, data);
// 获取指定币种转出记录
export const getWithdrawHistory = (data: params) => postGolang(`/withdraw/history/${data.coin}`, data);
// 获取所有币种
export const getCoinList = (data: params) => getGolang('/coin/list', data);
// 获取充币地址
export const getDeposit = (data: params) => getGolang(`/deposit/address/${data.coin}`, data);
// 提交提币申请
export const withdrawSubmit = (data: params) => getGolang('/withdraw/submit', data);
// 取消提币申请
export const withdrawCcancel = (data: params) => getGolang(`/withdraw/cancel/${data.id}`, data);
// 获取指定币种信息
export const getCoinOne = (data: params) => getGolang(`/coin/one/${data.coin}`, data);
// 获取指定币种已转出数量
export const getDayAmount = (data: params) => getGolang(`/withdraw/day-amount/${data.coin}`, data);

// 取文章分类列表
export const getArticleCategories = (data: params) => getGolang(`/article/categories/${data.type}`, data);
// 获取文章列表
export const getArticleList = (data: params) => getGolang(`/article/list/${data.category}`, data);
// 获取文章列表
export const getArticleDetail = (id: number) => getGolang(`/article/get//${id}`, { id });

/**
 * JAVA 接口
 */
// 邀请
// 获取用户邀请信息
export const getExtUser = () => getJava('/ext_user/getLoginUser');
// 获取邀请规则
export const getGradeComm = () => getJava('/grade_comm');
// 获取邀请人员列表
export const getExtChildren = (data: params) => getJava('/ext_user/getChildren', data);
// 获取邀请返佣明细
export const getCommDetail = (data: params) => getJava('/comm_detail', data);
// 获取海报列表
export const getCommPoster = (data: params) => getJava('/comm_poster', data);
