import { normalToast } from '@/commons/dom/index';
import i18n from '@/i18n/index';
// 手机号验证
function phoneVfi(phone: string) {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    const vfi: boolean = reg.test(phone);
    if (vfi === false) normalToast(i18n.t('error.phoneErr'));
    return vfi;
}

// 邮箱验证
function emailVfi(email: string) {
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    const vfi: boolean = reg.test(email);
    if (vfi === false) normalToast(i18n.t('error.emailErr'));
    return vfi;
}

// 密码验证
function pwdVfi(pwd: string) {
    const reg = /^[0-9a-zA-Z]{6,16}$/;
    const vfi: boolean = reg.test(pwd);
    if (vfi === false) normalToast(i18n.t('error.pwdErr'));
    return vfi;
}

// 再次输入是否一致
function pwd2Vfi(pwd: string, pwd2: string) {
    const vfi: boolean = pwd2 === pwd;
    if (vfi === false) normalToast(i18n.t('error.pwd2Err'));
    return vfi;
}

// 身份证验证
function idCardVfi(idCard: string) {
    const reg = /^[A-Za-z0-9]{4,40}$/;
    const vfi: boolean = reg.test(idCard);
    if (vfi === false) normalToast(i18n.t('error.idCardErr'));
    return vfi;
}

// 昵称验证
function nameVfi(name: string) {
    const reg = /^[\u4e00-\u9fa5]|[A-Za-z]$/;
    const vfi: boolean = reg.test(name);
    if (vfi === false) normalToast(i18n.t('error.nameErr'));
    return vfi;
}

// 支付密码验证
function payVfi(payPwd: string) {
    const reg = /^[0-9]{6}$/;
    const vfi: boolean = reg.test(payPwd);
    if (vfi === false) normalToast(i18n.t('error.payErr'));
    return vfi;
}

// 手机短信验证码
function codeVfi(code: string) {
    const reg = /^[0-9]{4}$/;
    const vfi: boolean = reg.test(code);
    if (vfi === false) normalToast(i18n.t('error.codeErr'));
    return vfi;
}

function fromVfi(arr: any) {
    for (let i = 0; i < arr.length; i++) {
        const item: any = arr[i];
        switch (item.type) {
        case 'phone':
            if (!phoneVfi(item.value)) return false;
            break;
        case 'pwd':
            if (!pwdVfi(item.value)) return false;
            break;
        case 'pwd2':
            if (!pwd2Vfi(item.value1, item.value2)) return false;
            break;
        case 'icCard':
            if (!idCardVfi(item.value)) return false;
            break;
        case 'name':
            if (!nameVfi(item.value)) return false;
            break;
        case 'pay':
            if (!payVfi(item.value)) return false;
            break;
        case 'code':
            if (!codeVfi(item.value)) return false;
            break;
        default:
            return false;
        }
    }
    return true;
}

export default {
    phoneVfi,
    emailVfi,
    pwdVfi,
    pwd2Vfi,
    idCardVfi,
    nameVfi,
    payVfi,
    codeVfi,
    fromVfi,
};