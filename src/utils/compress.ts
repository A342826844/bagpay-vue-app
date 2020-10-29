/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
/* eslint-disable no-mixed-operators */
/* eslint-disable spaced-comment */
/* eslint-disable spaced-comment */

import i18n from '@/i18n';
import { normalToast } from '@/commons/dom/index';

const IMAGE_MAX = 2 * 1024 * 1024; // 图片最大上传大小

// 压缩函数
const compress = (img: any, encoder = 0.9) => {
    let canvas: any = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    //    瓦片canvas
    let tCanvas: any = document.createElement('canvas');
    const tctx: any = tCanvas.getContext('2d');
    let { width } = img;
    let { height } = img;
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    //        铺底色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        const nw = ~~(width / count);
        const nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    // 进行最小压缩
    const ndata = canvas.toDataURL('image/jpeg', encoder);
    canvas = null;
    tCanvas = null;
    return ndata;
};

// 将base64的图片转成二进制对象
const toBlob = (basestr: string, type: any) => {
    const text = window.atob(basestr.split(',')[1]);
    const buffer: any = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
        buffer[i] = text.charCodeAt(i);
    }
    const blob = new Blob(buffer, { type });
    return blob;
};

const cutDownImg = (file: File, encoder = 0.9) => new Promise((resolve, reject) => {
    if (!file) return;
    let img: any = new Image();
    const callback = () => {
        const data = compress(img, encoder); // base64
        const res = toBlob(data, file.type);
        if (res.size > IMAGE_MAX) {
            normalToast(i18n.t('common.imgTooBig'));
            reject();
        }
        resolve(res);
        img = null;
    };
    try {
        img.src = URL.createObjectURL(file);
        if (img.complete) {
            callback();
        } else {
            img.onload = callback;
        }
    } catch (err) {
        reject(err);
    }
});

export default cutDownImg;
