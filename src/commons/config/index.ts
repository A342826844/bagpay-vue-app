export type PayType = Array<number>; // 支付方式
export type CountryType = Array<number>; // 国家/地区类型
export type MoblepreForCountryType = { // 更加手机区号匹配国家/地区类型
    [elem: string]: number;
};
export type CurrencyType = Array<number>; // 法币类型
export type Currency = {
    unit: string; // 计价单位符号
    coin: string; // 计价单位英文
    value: string; // 计价单位小写
    type: number; // CurrencyType
    decaimal: number; // 计价单位小数位数
}
export type CurrencyTypeMap = {
    [elem: string]: Currency;
}; // 法币类型
export type OtcOrderState = Array<number>;
export type OtcDealState = Array<number>;
export type SocialType = Array<number>;
export type Relationship = Array<number>;
export type OtcAppealType = Array<number>;
export type CardType = Array<number>;
export type LangType = Array<number>;

export const PayType = [
    1, // PayTypeBank       = 1 //银行卡
    // 2, // PayTypeAlipay     = 2 //支付宝
    // 3, // PayTypeWechatPay  = 3 //微信
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

//
export const MoblepreForCountryType = {
    86: 1, // CountryChina          = 1  //中国
    1: 2, // CountryUSA             = 2  //美国
    65: 3, // CountrySingapore      = 3  //新加坡
    91: 4, // CountryIndia          = 4  //印度
    84: 5, // CountryVietnam        = 5  //越南
    // 6, // CountryCanada          = 6  //加拿大 加拿大和美国手机区号一样，所以默认都是美国
    61: 7, // CountryAustralia      = 7  //澳大利亚
    82: 8, // CountryKorea          = 8  //韩国
    41: 9, // CountrySwitzerland    = 9  //瑞士
    31: 10, // CountryHolland       = 10 //荷兰
    886: 11, // CountryTaiwan       = 11 //台湾
    7: 12, // CountryRussia         = 12 //俄罗斯
    44: 13, // CountryUnitedKingdom = 13 //英国
    852: 14, // CountryHongKong     = 14 //香港
    234: 15, // CountryNigeria      = 15 //尼日利亚
    63: 16, // CountryPhilippines   = 16 //菲律宾
    855: 17, // CountryCambodia     = 17 //柬埔寨
    55: 18, // CountryBrazil        = 18 //巴西
    60: 19, // CountryMalaysia      = 19 //马来西亚
    // 20, // CountryMiddleEast     = 20 //中东 中东地区包含多个国家，暂时不好区分
    90: 21, // CountryTurkey        = 21 //土耳其
    64: 22, // CountryNewZealand    = 22 //新西兰
    94: 23, // CountryBurma         = 23 //缅甸
};

// 法币类型 CurrencyType
export const CurrencyType = [
    1, // CurrencyCNY = 1  //人民币
    2, // CurrencyUSD = 2  //美元
    3, // CurrencyEUR = 3  //欧元
    4, // CurrencySGD = 4  //新加坡元
    5, // CurrencyINR = 5  //印度卢比
    6, // CurrencyVND = 6  //越南盾
    7, // CurrencyCAD = 7  //加元
    8, // CurrencyAUD = 8  //澳元
    9, // CurrencyKRW = 9  //韩元
    10, // CurrencyCHF = 10 //瑞郎
    11, // CurrencyTWD = 11 //新台币
    12, // CurrencyRUB = 12 //卢布
    13, // CurrencyGBP = 13 //英镑
    14, // CurrencyHKD = 14 //港币
    15, // CurrencyNGN = 15 //尼日利亚奈拉
    16, // CurrencyPHP = 16 //菲律宾比索
    17, // CurrencyKHR = 17 //柬埔寨瑞尔
    18, // CurrencyBRL = 18 //巴西雷亚尔
    19, // CurrencyMYR = 19 //马来西亚林吉特
    20, // CurrencyTRY = 20 //土耳其里拉
    21, // CurrencyNZD = 21 //新西兰元
    22, // CurrencyMMK = 22 //缅甸元
];

export const CurrencyTypeMap = {
    1: {
        unit: '￥',
        coin: 'CNY',
        value: 'cny',
        type: 1,
        decaimal: 2,
    },
    2: {
        unit: '$',
        coin: 'USD',
        value: 'usd',
        type: 2,
        decaimal: 4,
    },
};

// otc 广告状态
export const OtcOrderState = [
    0, // OtcOrderStateWait        = 0 //等待中
    1, // OtcOrderStateTrading     = 1 //交易中
    2, // OtcOrderStateFinished    = 2 //已完成
    3, // OtcOrderStateCanceled    = 3 //已取消
    4, // OtcOrderStateClosed      = 4 //已关闭
    5, // OtcOrderStatePlatClosed  = 5 //平台强制关闭
];

// otc otc订单状态
export const OtcDealState = [
    0, // OtcDealStateTrading   = 0 //交易中
    1, // OtcDealStatePaid      = 1 //已支付
    2, // OtcDealStateDone      = 2 //已放币,已完成
    3, // OtcDealStateCanceled  = 3 //已取消
];

// otc 社交账号类型
export const SocialType = [
    0, // "wechat",               //微信
    1, // "telegram",             //telegram
];
// otc 与本人关系
export const Relationship = [
    0, // 朋友
    1, // 亲人
];

// 证件类型
export const CardType = [
    1, // 身份证
    2, // 护照
];

export const OtcAppealType = [
    1, // tcAppealTypeNoResponse          = 1 //一直不响应
    2, // OtcAppealTypePaidButNotRelease  = 2 //已付款不放币
    3, // OtcAppealTypeMaliciousOrder     = 3 //恶意下单
    4, // OtcAppealTypeFalsePaid          = 4 //恶意点击已付款
];

// 语言类型
export const LangType = [
    'zh-CN', //           = 1 //简体中文
    'en-us', //           = 2 //英文
];
