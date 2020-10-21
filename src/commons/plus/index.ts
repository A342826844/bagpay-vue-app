const randomString = (e = 32) => {
    // e = e || 32;

    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';

    const a = t.length;

    let n = '';

    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));

    return n;
};

const bigmapToSave = (bitmap: any, success: any, error: any) => {
    const name = randomString(10);
    bitmap.save(`_doc/${name}.jpg`, { overwrite: false }, (event: any) => {
        if (typeof success === 'function') {
            success(event.target);
        }
        bitmap.clear();
    }, (err: any) => {
        if (typeof error === 'function') {
            error(err);
        }
    });
};

/**
 * 保存图片 http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Bitmap
 * @param  {string} base64 图片base64
 * @param  {Function} successCB 保存成功回调
 * @param  {Function} errorCB 保存失败回调
 * @return {void}
 */
const saveImg = (base64: any, successCB: any, errorCB: any) => {
    const bitmap = new (window as any).plus.nativeObj.Bitmap('image');
    bitmap.loadBase64Data(base64, () => {
        bigmapToSave(bitmap, successCB, errorCB);
    }, (err: any) => {
        console.log(err);
    });
};

/**
 * 下载网络图片保存到手机 http://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.createDownload
 * @param  {string} url 下载地址
 * @param  {Object} options 下载任务的参数
 * @param  {Function} completedCB 下载任务完成回调函数,当下载任务下载完成时触发，成功或失败都会触发。
 * @return {void}
 */
const downloadImg = (url: string, option = {}, completedCB: any) => {
    const dtask = (window as any).plus.downloader.createDownload(url, option, (d: any, status: any) => {
        if (status === 200) {
            (window as any).plus.gallery.save(d.filename, () => { // 保存到相册方法
                completedCB(d, status);
            }, () => {
                completedCB(d, 401);
            });
        } else {
            completedCB(d, status);
        }
    });
    // dtask.addEventListener("statechanged", onStateChanged, false);
    dtask.start();
};

/**
 * 调用系统分享组件发送分享消息 http://www.html5plus.org/doc/zh_cn/share.html#plus.share.sendWithSystem
 * @param  {ShareMessage} data 要分享的消息对象
 * @param  {Function} successCB 分享操作成功回调(注意：此回调并不表示分享消息已经发送成功，只表示成功请求系统发送成功。)
 * @param  {Function} errorCB 分享操作失败回调
 * @return {void}
 */
const shareDataHandle = (data: any, successCB: any, errorCB: any) => {
    (window as any).plus.share.sendWithSystem(data, successCB, errorCB);
};

export {
    saveImg,
    downloadImg,
    shareDataHandle,
};
