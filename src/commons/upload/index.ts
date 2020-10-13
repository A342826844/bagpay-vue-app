import { getUploadToken } from '@/api';
import { axiosOfThird } from '@/api/axios';

// uid
function generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now(); // use high-precision timer if available
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // eslint-disable-next-line
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        // eslint-disable-next-line
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

// 上传图片到七牛云
export default (file: File, uploadProgress: any, that: any, name: any) => getUploadToken().then((res) => {
    if (res.status === 200) {
        return res.data;
    }
    throw new Error();
}).then((token) => {
    const type = (file.name.substr(file.name.lastIndexOf('.'))).toLowerCase();
    const key = token.dir + generateUUID() + type;
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('key', key);
    formData.append('policy', token.policy);
    formData.append('OSSAccessKeyId', token.accessid);
    formData.append('success_action_status', '200');
    formData.append('signature', token.signature);
    // formData.append("callback",token.callback);
    formData.append('file', file);
    return axiosOfThird({
        url: token.host,
        data: formData,
        method: 'post',
        onUploadProgress(progressEvent) { // 原生获取上传进度的事件
            if (progressEvent.lengthComputable) {
                const percent = Math.floor((progressEvent.loaded / progressEvent.total) * 90);
                uploadProgress.call(that, percent, name);
            }
        },
    }).then((res) => {
        if (res.status === 200) {
            return {
                isOk: true,
                name: key,
            };
        }
        return {
            isOk: false,
            name: '',
        };
    });
});
