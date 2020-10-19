export type PayType = Array<number>;
export type CountryType = Array<number>;
export type OtcOrderState = Array<number>;
export type SocialType = Array<number>;
export type Relationship = Array<number>;
export const PayType = [
    1, // PayTypeBank       = 1 //银行卡
    2, // PayTypeAlipay     = 2 //支付宝
    3, // PayTypeWechatPay  = 3 //微信
    4, // PayTypeHuione     = 4 //汇旺
];

export const CountryType = [
    1, // CountryChina         = 1  //中国
    2, // CountryUSA           = 2  //美国
    3, // CountrySingapore     = 3  //新加坡
    4, // CountryIndia         = 4  //印度
    5, // CountryVietnam       = 5  //越南
    6, // CountryCanada        = 6  //加拿大
    7, // CountryAustralia     = 7  //澳大利亚
    8, // CountryKorea         = 8  //韩国
    9, // CountrySwitzerland   = 9  //瑞士
    10, // CountryHolland       = 10 //荷兰
    11, // CountryTaiwan        = 11 //台湾
    12, // CountryRussia        = 12 //俄罗斯
    13, // CountryUnitedKingdom = 13 //英国
    14, // CountryHongKong      = 14 //香港
    15, // CountryNigeria       = 15 //尼日利亚
    16, // CountryPhilippines   = 16 //菲律宾
    17, // CountryCambodia      = 17 //柬埔寨
    18, // CountryBrazil        = 18 //巴西
    19, // CountryMalaysia      = 19 //马来西亚
    20, // CountryMiddleEast    = 20 //中东
    21, // CountryTurkey        = 21 //土耳其
    22, // CountryNewZealand    = 22 //新西兰
    23, // CountryBurma         = 23 //缅甸
];

// otc 广告状态
export const OtcOrderState = [
    0, // OtcOrderStateWait        = 0 //等待中
    1, // OtcOrderStateTrading     = 1 //交易中
    2, // OtcOrderStateFinished    = 2 //已完成
    3, // OtcOrderStateCanceled    = 3 //已取消
    4, // OtcOrderStateClosed      = 4 //已关闭
    5, // OtcOrderStatePlatClosed  = 5 //平台强制关闭
];

// otc 社交账号类型
export const SocialType = [
    0, // "wechat",               //微信
    1, // "telegram",             //telegram
];
// otc 与本人关系
export const Relationship = [
    0, // '朋友', //朋友
    1, // '亲人', //亲人
];
