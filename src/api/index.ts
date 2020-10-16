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

/** 场外 */
// 获取所有币种列表
export const getCoinList = () => getGolang('/coin/list');
// 获取可交易的广告列表
export const getOtcOrderList = (data: params) => getGolang('/otc/order/trade/list', data);
// 获取可交易的广告列表
export const otcOrderPlace = (data: params) => postGolang('/otc/order/place', data);

// 注册验证码
export const registerCode = (data: params) => postGolang('/verification-code/phone/VerifyCodeTypeRegister', data);
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

// 获取用户信息
export const getUserInfo = (data: params) => postGolang('/user/profile', data);
