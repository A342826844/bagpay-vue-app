import axios, { AxiosRequestConfig } from 'axios';
import Dialog from 'vant/lib/dialog';
import i18n from '@/i18n/index';
import { normalToast } from '@/commons/dom/index';
import { genID } from '@/utils/tool';
import store from '../store';

axios.defaults.timeout = 30 * 1000;
axios.defaults.withCredentials = false;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get.Accept = 'application/json';

/**
 * resetConfig
 */

interface AxiosConfig extends AxiosRequestConfig{
    cancleId?: string;
}

function resetConfig(config: AxiosConfig, lang: string, Authorization?: string) {
    const resConfig: AxiosConfig = {
        ...config,
    };
    if (!resConfig.data) {
        resConfig.data = {};
    }
    if (!resConfig.params) {
        resConfig.params = {};
    }
    if (resConfig.method === 'post') {
        resConfig.data.lang = lang;
        resConfig.params.lang = lang;
    } else if (resConfig.method === 'get') {
        resConfig.params.lang = lang;
    }
    if (Authorization) {
        resConfig.headers.sid = `${Authorization}`;
    }
    return resConfig;
}

const axiosJavaPromiseArr: Array<any> = [];
const axiosGoPromiseArr: { value: Array<any> } = {
    value: [],
};

const axiosOfJava = axios.create();
axiosOfJava.interceptors.request.use(
    (config) => {
        // eslint-disable-next-line no-param-reassign
        config.cancelToken = new axios.CancelToken((cancel) => {
            axiosJavaPromiseArr.push({ cancel });
        });
        // 语言国际化
        const { lang } = store.state;
        // 新增权限验证
        // const AUTH_TOKEN = store.state.userInfo.token;
        return resetConfig(config, lang);
    },
    (error) => Promise.reject(error),
);
// Add a response interceptor
axiosOfJava.interceptors.response.use(
    (response) => {
        if (response.data.code !== 200) {
            return Promise.reject(response.data);
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // TODO:
            // loginOut();
        }
        // Do something with response error
        return Promise.reject(error);
    },
);

const axiosOfGoLang = axios.create();
axiosOfGoLang.interceptors.request.use(
    (config: AxiosConfig) => {
        const cancleId = genID();
        // eslint-disable-next-line no-param-reassign
        config.cancelToken = new axios.CancelToken((cancel) => {
            axiosGoPromiseArr.value.push({ cancel, cancleId });
        });
        // eslint-disable-next-line no-param-reassign
        config.cancleId = cancleId;

        // 语言国际化
        const { lang } = store.state;
        const AUTH_TOKEN = store.state.sessionId;
        return resetConfig(config, lang, AUTH_TOKEN);
    },
    (error) => Promise.reject(error),
);
// Add a response interceptor
axiosOfGoLang.interceptors.response.use(
    (response) => {
        // 过滤请求完成的CancelToken
        axiosGoPromiseArr.value = axiosGoPromiseArr.value.filter((item: any) => (response.config as AxiosConfig).cancleId !== item.cancleId);

        if (response.data.code !== 0) {
            if (response.data.message && /^ERR/.test(response.data.message)) {
                normalToast(i18n.t(`error.${response.data.message}`));
            }
            return Promise.reject(response.data);
        }
        return response.data;
    },
    (error) => {
        // 过滤请求完成的CancelToken
        const cancleId = error.message.cancleId || (error.response.config as AxiosConfig).cancleId;
        axiosGoPromiseArr.value = axiosGoPromiseArr.value.filter((item: any) => cancleId !== item.cancleId);
        if (error.response && error.response.status === 403) {
            Dialog.alert({
                title: i18n.t('common.poptip'),
                message: i18n.t('common.loginExpired'),
            }).then(() => {
                store.commit('setLoginState', 0);
                window.location.href = '/';
            });
        }
        return Promise.reject(error);
    },
);

const axiosOfThird = axios.create();
// Add a response interceptor
axiosOfThird.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

// const initPromiseArr = () => {
//     // 清空里面的token
//     axiosGoPromiseArr.length = 0;
// };

export {
    axiosOfJava,
    axiosOfGoLang,
    axiosOfThird,
    axiosJavaPromiseArr,
    axiosGoPromiseArr,
};
