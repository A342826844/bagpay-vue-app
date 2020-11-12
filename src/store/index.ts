import Vue from 'vue';
import Vuex from 'vuex';
import countryList from '@/commons/country/index';
import { CountryType, CurrencyTypeMap, Currency } from '@/commons/config/index';

const symbolListStr = localStorage.getItem('symbolList');
let symbolList = [];
if (symbolListStr) {
    symbolList = JSON.parse(symbolListStr);
}

const configCommonStr = localStorage.getItem('configCommon');
let configCommon = {};
if (configCommonStr) {
    configCommon = JSON.parse(configCommonStr);
}

const hideBalance = localStorage.getItem('hideBalance') || '0';
const lang = localStorage.getItem('lang') || 'zh-CN';
const symbol = localStorage.getItem('symbol') || 'usdt';

const defaultCountry = () => {
    const moblepre = localStorage.getItem('moblepre');
    const countryItem = {
        en: 'Kampuchea(Cambodia)',
        name: '柬埔寨',
        short: 'KH',
        tel: '855',
    };
    if (!moblepre || moblepre === 'undefined' || moblepre === 'null') return countryItem;
    for (let i = 0; i < countryList.length; i++) {
        if (`${countryList[i].tel}` === moblepre) {
            return countryList[i];
        }
    }
    return countryItem;
};

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang,
        loading: false,
        symbol, // 主页当前币种
        unit: 'USD', // 计价单位
        unitIcon: '$', // 计价单位符号
        unitDecimal: 4, // 计价单位小数位数
        sessionId: localStorage.getItem('sessionId') || '', // sessionId
        userInfo: {
            id: '',
            nickname: '',
            password: '',
            pay_password: '',
            phone: '',
            status: '',
        },
        merchant: {}, // otc 商户信息
        qrcodeResult: '', // 扫一扫结果
        country: defaultCountry(), // 国家/地区 区号
        countryType: CountryType[0], // 国家/地区类型
        currencyType: 2, // 法币类型, 默认美元
        loginStatus: Number(localStorage.getItem('loginStatus')),
        addAddr: {}, // 添加提币地址
        address: {}, // 转出使用
        hideBalance, // 显示隐藏余额
        bankInfo: {}, // 发布广告所选择的收款信息
        symbolList, // 可用币种列表
        configCommon, // OTC配置信息
        bankList: [], // 用户绑定的收付款方式
        keepAlive: [], // 使用keepAlive的页面数组
    },
    mutations: {
        /**
         * 更改全局loading
         * @param state
         * @param {Boolean} loading
         */
        changeLoading(state, loading) {
            state.loading = loading;
        },
        /**
         * 设置sessionId, 前后端用户信息交互
         * @param state
         * @param {String} value
         */
        setsessionId(state, value) {
            state.sessionId = value;
            localStorage.setItem('sessionId', value);
        },
        /**
         * 主页当前币种
         * @param state
         * @param {String} symbolStr
         */
        setSymbol(state, symbolStr) {
            state.symbol = symbolStr;
            localStorage.setItem('symbol', symbolStr);
        },
        /**
         * 设置语言
         * @param state
         * @param {String} langStr
         */
        setLang(state, langStr) {
            state.lang = langStr;
            localStorage.setItem('lang', langStr);
        },
        /**
         * 设置用户信息
         * @param state
         * @param {userInfo} userInfo
         */
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        /**
         * 设置 OTC 商户信息
         * @param state
         * @param { OTC商户信息 } merchant
         */
        setMerchant(state, merchant) {
            state.merchant = merchant;
        },
        /**
         * 设置登录状态， 和用户信息及sessionId不冲突
         * @param state
         * @param {1|0} status 1表示登录，0表示登出
         */
        setLoginState(state, status) {
            localStorage.setItem('loginStatus', JSON.stringify(status));
            state.loginStatus = status;
        },
        /**
         * 设置支付方式信息
         * @param state
         * @param {Array<支付方式信息>} list
         */
        setBankList(state, list) {
            state.bankList = list;
        },
        /**
         * 设置keepAlive页面数组
         * @param state
         * @param {Array<string>} keepAlive
         */
        setKeepAlive(state, keepAlive) {
            state.keepAlive = keepAlive;
        },
        /**
         * 设置扫一扫结果
         * @param state
         * @param {String} value
         */
        changgeQrcodeResult(state, value) {
            state.qrcodeResult = value;
        },
        /**
         * 转出地址信息
         * @param state
         * @param {地址信息} address
         */
        setAddress(state, address) {
            state.address = address;
        },
        /**
         * 添加提币地址信息
         * @param state
         * @param {地址信息} addAddr
         */
        setAddAddr(state, addAddr) {
            state.addAddr = addAddr;
        },
        /**
         * 设置显示隐藏余额
         * @param state
         * @param {0|1} status 1为显示，0为隐藏
         */
        setHideBalance(state, status) {
            state.hideBalance = status;
            localStorage.setItem('hideBalance', status);
        },
        /**
         * 更改手机国家/地区 区号
         * @param state
         * @param {Country} item
         */
        changeCountryHandle(state, item) {
            state.country = item;
            localStorage.setItem('moblepre', item.tel);
        },
        /**
         * 更改国家地区类型
         * @param state
         * @param {Number} type
         */
        changeCountryType(state, type) {
            state.countryType = type;
        },
        /**
         * 设置可用币种列表
         * @param state
         * @param {Array<CoinInfo>} list
         */
        setSymbolList(state, list) { // Array<CoinInfo>
            state.symbolList = list;
            localStorage.setItem('symbolList', JSON.stringify(list));
        },
        /**
         * 设置商户配置信息
         * @param state
         * @param {configCommon} config
         */
        setConfigCommon(state, config) {
            state.configCommon = config;
            localStorage.setItem('configCommon', JSON.stringify(config));
        },
        /**
         * 选择发布广告收款信息
         * @param state
         * @param {bankInfo} bankInfo
         */
        selectBank(state, bankInfo) {
            state.bankInfo = bankInfo;
        },
    },
    getters: {
        getCoinInfo: (state) => (coin: string) => {
            const coinInfo = state.symbolList.find((item: CoinInfo) => item.symbol === coin);
            return coinInfo || {};
        },
        getPhone: (state) => {
            const phone: string = state.userInfo.phone || '';
            const index = phone.indexOf('-');
            if (phone.indexOf('-') !== -1) {
                return phone.slice(index + 1);
            }
            return phone;
        },
        getCoinMap: (state) => {
            const coinMap: any = {};
            state.symbolList.forEach((item: CoinInfo) => {
                coinMap[item.symbol] = item.name;
            });
            return coinMap || {};
        },
        getOtcEnableList: (state) => state.symbolList.filter((item: CoinInfo) => item.enable_otc),
        getBankEnableList: (state) => state.bankList.filter((item: any) => item.status),
        // 获取 法币信息
        getCurrencyTypeInfo: (state): Currency => {
            const currencyType = (state.currencyType as 1|2);
            const currency = CurrencyTypeMap[currencyType];
            if (currency) return currency;
            return CurrencyTypeMap[2];
        },
    },
    actions: {
    },
    modules: {
    },
});
