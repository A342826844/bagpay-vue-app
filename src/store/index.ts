import Vue from 'vue';
import Vuex from 'vuex';

const symbolListStr = localStorage.getItem('symbolList');
let symbolList = [];
if (symbolListStr) {
    symbolList = JSON.parse(symbolListStr);
}

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: 'zh-cn',
        loading: false,
        unit: 'USD', // 计价单位
        unitDecimal: 4, // 计价单位小数位数
        userInfo: {
            id: '',
            nickname: '',
            password: '',
            pay_password: '',
            phone: '',
            status: '',
        },
        symbolList,
    },
    mutations: {
        changeLoading(state, loading) {
            state.loading = loading;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setSymbolList(state, list) { // Array<CoinInfo>
            state.symbolList = list;
            localStorage.setItem('symbolList', JSON.stringify(list));
        },
    },
    getters: {
        getCoinInfo: (state) => (coin: string) => {
            const coinInfo = state.symbolList.find((item: CoinInfo) => item.symbol === coin);
            return coinInfo || { a: 1 };
        },
        getOtcEnableList: (state) => state.symbolList.filter((item: CoinInfo) => item.enable_otc),
    },
    actions: {
    },
    modules: {
    },
});
