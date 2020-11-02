import Vue from 'vue';
import Vuex from 'vuex';
import countryList from '@/commons/country/index';

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
        qrcodeResult: '',
        country: defaultCountry(),
        loginStatus: Number(localStorage.getItem('loginStatus')),
        addAddr: {}, // 添加提币地址
        address: {}, // 转出使用
        hideBalance,
        bankInfo: {}, // 旋转支持的银行
        symbolList,
        configCommon,
        bankList: [],
    },
    mutations: {
        changeLoading(state, loading) {
            state.loading = loading;
        },
        setsessionId(state, value) {
            state.sessionId = value;
            localStorage.setItem('sessionId', value);
        },
        setSymbol(state, symbolStr) {
            state.symbol = symbolStr;
            localStorage.setItem('symbol', symbolStr);
        },
        setLang(state, langStr) {
            state.lang = langStr;
            localStorage.setItem('lang', langStr);
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setMerchant(state, merchant) {
            state.merchant = merchant;
        },
        setLoginState(state, status) {
            localStorage.setItem('loginStatus', JSON.stringify(status));
            state.loginStatus = status;
        },
        setBankList(state, list) {
            state.bankList = list;
        },
        changgeQrcodeResult(state, value) {
            state.qrcodeResult = value;
        },
        setAddress(state, address) {
            state.address = address;
        },
        setAddAddr(state, addAddr) {
            state.addAddr = addAddr;
        },
        setHideBalance(state, status) {
            state.hideBalance = status;
            localStorage.setItem('hideBalance', status);
        },
        changeCountryHandle(state, item) {
            state.country = item;
            localStorage.setItem('moblepre', item.tel);
        },
        setSymbolList(state, list) { // Array<CoinInfo>
            state.symbolList = list;
            localStorage.setItem('symbolList', JSON.stringify(list));
        },
        setConfigCommon(state, config) {
            state.configCommon = config;
            localStorage.setItem('configCommon', JSON.stringify(config));
        },
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
    },
    actions: {
    },
    modules: {
    },
});
