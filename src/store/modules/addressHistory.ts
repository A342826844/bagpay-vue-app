interface AddressHistoryItem {
    time?: number; // 存储时间，时间戳
    expiress?: number; // 过期时间，时间戳 0 为永久存储
    address: string; // 存储地址
    coin: string; // 币种
    memo?: string; // 备注
    protocol?: string; // 协议
    remark?: string; // 标记
    type: 1|2; // 类型: 1: 地址 2: 账号
}
type AddressHistory = AddressHistoryItem[];
interface State {
    addressHistory: AddressHistory;
}

const ONE_HALF_YEAR = 1000 * 60 * 60 * 24 * 30 * 6; // 半年

const getAddressHistory = () => {
    const addressHistory = localStorage.getItem('addressHistory');
    if (addressHistory) {
        const value = JSON.parse(addressHistory);
        if (value instanceof Array) {
            const time = +new Date();
            return value.filter((item) => item.expiress >= time);
        }
        return [];
    }
    return [];
};

export default {
    state: (): State => ({
        addressHistory: getAddressHistory(), // 使用过的地址 做本地历史存储
    }),
    getters: {
        // 获取地址历史
        getAddressHistoryList: (state: State) => state.addressHistory.filter((item) => item.type === 1),
        // 获取账号历史
        getAccountHistoryList: (state: State) => state.addressHistory.filter((item) => item.type === 2),
    },
    mutations: {
        addAddressHistory(state: State, item: AddressHistoryItem) {
            state.addressHistory = state.addressHistory.filter((subItem) => item.address !== subItem.address);
            state.addressHistory = state.addressHistory.concat({
                time: +new Date(),
                expiress: +new Date() + ONE_HALF_YEAR,
                memo: '',
                protocol: '',
                remark: '',
                ...item,
            });
            localStorage.setItem('addressHistory', JSON.stringify(state.addressHistory));
        },
        delAddressHistory(state: State, item: AddressHistoryItem) {
            state.addressHistory = state.addressHistory.filter((subItem) => item.address === subItem.address);
            localStorage.setItem('addressHistory', JSON.stringify(state.addressHistory));
        },
    },
};
