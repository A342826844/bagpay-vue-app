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
const toBlob = (basestr: string) => {
    const arr: any = basestr.split(',');
    const bstr = atob(arr[1]);
    const mime = arr[0].match(/:(.*?);/)[1];
    const buffer: any = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
        buffer[i] = bstr.charCodeAt(i);
    }
    return new Blob([buffer], { type: mime });
};
const defaultImg = [
    'png',
    'PNG',
    'jpg',
    'JPG',
    'bmp',
    'BMP',
    'gif',
    'GIF',
    'jpeg',
    'JPEG',
];
const cutDownImg = (file: File, encoder = 0.9, imgName = defaultImg) => new Promise((resolve, reject) => {
    if (!file) return;
    const str1 = file.name.split('.');
    const letn = str1.length;
    const geImg = str1[letn - 1];
    const isFlase = imgName.indexOf(geImg);
    if (isFlase === -1) {
        normalToast(i18n.t('common.imgErr'));
        reject(new Error('1'));
    }
    let img: any = new Image();
    const callback = () => {
        const data = compress(img, encoder); // base64
        const res = toBlob(data);
        if (res.size > IMAGE_MAX) {
            normalToast(i18n.t('common.imgTooBig'));
            reject(new Error('2'));
        }
        const newFile = new window.File(
            [res],
            file.name,
            { type: res.type },
        );
        resolve(newFile);
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
