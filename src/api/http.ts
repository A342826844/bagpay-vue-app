import { axiosOfJava, axiosOfGoLang } from './axios';

// const baseURL = 'http://127.0.0.1:3000';
const baseURL = process.env.VUE_APP_GOLANG_DEVURL;
const javaBaseURL = 'http://192.168.10.157:8081';

interface Config {
    formdata?: boolean;
}

const getFormData = (data: { [x: string]: any }) => {
    const formdata = new FormData();
    Object.keys(data).forEach((item) => {
        formdata.append(item, data[item]);
    });
    return formdata;
};

export const getJava = (url: string, params?: object) => axiosOfJava({
    url,
    params,
    method: 'get',
    baseURL: process.env.VUE_APP_SERVE_DEV === 'DEV' ? javaBaseURL : process.env.VUE_APP_JAVA_apiUrl,
});

export const postJava = (url: string, data?: { [x: string]: any } | undefined, config: Config = {}) => {
    let formdata = null;
    if (config.formdata && data) {
        formdata = getFormData(data);
    }
    return axiosOfJava({
        url,
        data: formdata || data,
        method: 'post',
        baseURL: process.env.VUE_APP_SERVE_DEV === 'DEV' ? javaBaseURL : process.env.VUE_APP_JAVA_apiUrl,
        ...config,
    });
};

export const getGolang = (url: string, params?: object) => axiosOfGoLang({
    url,
    params,
    method: 'get',
    withCredentials: false,
    baseURL: process.env.VUE_APP_SERVE_DEV === 'DEV' ? baseURL : process.env.VUE_APP_GOLANG_DEVURL,
});
export const postGolang = (url: string, data?: object) => axiosOfGoLang({
    url,
    data,
    method: 'post',
    withCredentials: false,
    baseURL: process.env.VUE_APP_SERVE_DEV === 'DEV' ? baseURL : process.env.VUE_APP_GOLANG_DEVURL,
});

export const URL = process.env.VUE_APP_SERVE_DEV === 'DEV' ? baseURL : process.env.VUE_APP_GOLANG_DEVURL;
