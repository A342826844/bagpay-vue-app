import { getJava, postJava } from './http';

type params = {
    [elem: string]: any;
}

export const getTestData = (data: params) => getJava('/test', data);
export const getUploadToken = () => getJava('/test');
export const postTestUpdate = (id: string) => postJava(`/test/${id}/update`);
export const personalized = (data: params) => postJava('/weapi/personalized/newsong', data, { formdata: true });
export const loginCellphone = (data: params) => getJava('/login/cellphone', data);
