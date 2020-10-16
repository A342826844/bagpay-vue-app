import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: 'zh-cn',
        loading: false,
        userInfo: {
            id: '',
            nickname: '',
            password: '',
            pay_password: '',
            phone: '',
            status: '',
        },
    },
    mutations: {
        changeLoading(state, loading) {
            state.loading = loading;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
    },
    actions: {
    },
    modules: {
    },
});
