import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: 'zh-cn',
        loading: false,
        userInfo: {
            token: '',
        },
    },
    mutations: {
        changeLoading(state, loading) {
            state.loading = loading;
        },
    },
    actions: {
    },
    modules: {
    },
});
