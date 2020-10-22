import Vue from 'vue';
import Vuex from 'vuex';

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

const lang = localStorage.getItem('lang') || 'zh-cn';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang,
        loading: false,
        unit: 'USD', // 计价单位
        unitIcon: '$', // 计价单位符号
        unitDecimal: 4, // 计价单位小数位数
        userInfo: {
            id: '',
            nickname: '',
            password: '',
            pay_password: '',
            phone: '',
            status: '',
        },
        addAddr: {}, // 添加提币地址
        address: {}, // 转出使用
        hideBalance,
        symbolList,
        configCommon,
    },
    mutations: {
        changeLoading(state, loading) {
            state.loading = loading;
        },
        setLang(state, langStr) {
            state.lang = langStr;
            localStorage.setItem('lang', langStr);
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
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
        setSymbolList(state, list) { // Array<CoinInfo>
            state.symbolList = list;
            localStorage.setItem('symbolList', JSON.stringify(list));
        },
        setConfigCommon(state, config) {
            state.configCommon = config;
            localStorage.setItem('configCommon', JSON.stringify(config));
        },
    },
    getters: {
        getCoinInfo: (state) => (coin: string) => {
            const coinInfo = state.symbolList.find((item: CoinInfo) => item.symbol === coin);
            return coinInfo || {};
        },
        getOtcEnableList: (state) => state.symbolList.filter((item: CoinInfo) => item.enable_otc),
    },
    actions: {
    },
    modules: {
    },
});
