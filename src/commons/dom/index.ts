import { TranslateResult } from 'vue-i18n';
import i18n from '@/i18n/index';
import clientEnv from '../clientEnv/idnex';

export const overflowScrolling = (needTouch: boolean) => {
    if (needTouch) {
        document.body.className = 'ios-touch';
    } else {
        document.body.className = 'ios-auto';
    }
};
export const normalToast = (text: string|TranslateResult, time = 2000, config?: { top: string}) => {
    /**
     * 弹窗;
     * @param  {Object} config
     * config => top 距离屏幕中间的位置
     */
    let vDiv = (document.getElementById('app-normal-shade') as HTMLElement);
    let content = (document.getElementById('app-normal-toast') as HTMLElement);
    if (!vDiv) {
        vDiv = document.createElement('div');
        vDiv.setAttribute('id', 'app-normal-shade');
        vDiv.setAttribute('class', 'app-toast-shade');
        // vDiv.setAttribute('style', 'z-index: 9999');
        content = document.createElement('div');
        content.setAttribute('id', 'app-normal-toast');
        content.setAttribute('class', 'app-normal-toast');
        vDiv.appendChild(content);
    }
    if (config && config.top) {
        content.style.top = config.top;
    } else {
        content.style.top = '0';
    }
    const vDisplay = vDiv.style.display;
    if (!vDisplay || vDisplay === 'none') {
        content.innerText = `${text}`;
        vDiv.setAttribute('style', 'display: block');
        setTimeout(() => {
            vDiv.setAttribute('style', 'display: none');
        }, time);
    }
    const app = (document.getElementById('app') as HTMLElement);
    app.appendChild(vDiv);
    return true;
};

export const copyText = (value: string) => {
    if (clientEnv.ios) {
        const a = document.createElement('a');
        a.className = 'copy-a-ele';
        a.style.position = 'absolute';
        a.style.top = '-9999px';
        a.style.left = '-9999px';
        a.innerText = value;
        document.body.append(a);
        const range = document.createRange();
        range.selectNode(a);
        (window.getSelection() as Selection).removeAllRanges();
        (window.getSelection() as Selection).addRange(range);
        const msg = document.execCommand('copy') ? i18n.t('common.copySuccessful') : i18n.t('common.copyUnsuccessful');
        normalToast(msg, 1000);
        document.body.removeChild(a);
        if (document.execCommand('copy')) {
            return true;
        }
        return false;
    }
    const textarea = document.createElement('textarea');
    textarea.style.position = 'absolute';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.readOnly = true;
    textarea.innerText = value;
    document.body.append(textarea);
    textarea.select();
    const msg = document.execCommand('copy') ? i18n.t('common.copySuccessful') : i18n.t('common.copyUnsuccessful');
    normalToast(msg, 1000);
    document.body.removeChild(textarea);
    if (document.execCommand('copy')) {
        return true;
    }
    return false;
};
