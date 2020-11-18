function normalToast(text, time = 2000) {
    /**
     * 弹窗;
     * @param  {Object} text 弹窗文本
     * 
     */
    let vDiv = document.getElementById('app-normal-shade');
    let content = document.getElementById('app-normal-toast');
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
    content.style.top = '0';
    const vDisplay = vDiv.style.display;
    if (!vDisplay || vDisplay === 'none') {
        content.innerText = `${text}`;
        vDiv.setAttribute('style', 'display: block');
        setTimeout(() => {
            vDiv.setAttribute('style', 'display: none');
        }, time);
    }
    const app = document.getElementById('app');
    app.appendChild(vDiv);
    return true;
};

// 手机号验证
function phoneVfi(phone, tel) {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    const reg1 = /^[0-9]{4,16}$/;
    const vfi = tel === '86' ? reg.test(phone) : reg1.test(phone);
    if (vfi === false) normalToast('请输入正确的手机号');
    return vfi;
}

// 邮箱验证
function emailVfi(email) {
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    const vfi = reg.test(email);
    if (vfi === false) normalToast('请输入正确的邮箱');
    return vfi;
}

// 密码验证
function pwdVfi(pwd) {
    const reg = /^[0-9a-zA-Z]{6,16}$/;
    const vfi = reg.test(pwd);
    if (vfi === false) normalToast('请输入大于6位小于16位字母或数字的密码');
    return vfi;
}

// 手机短信验证码
function codeVfi(code) {
    const reg = /^[0-9]{4}$/;
    const vfi = reg.test(code);
    if (vfi === false) normalToast('请输入4位数字验证码');
    return vfi;
}

// 必填验证
function notEmpty(value, msg) {
    const vfi = !!value;
    if (vfi === false) normalToast(msg + '不能为空');
    return vfi;
}

function fromVfi(arr) {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        switch (item.type) {
        case 'phone':
            if (!phoneVfi(item.value)) return false;
            break;
        case 'email':
            if (!emailVfi(item.value)) return false;
            break;
        case 'pwd':
            if (!pwdVfi(item.value)) return false;
            break;
        case 'code':
            if (!codeVfi(item.value)) return false;
            break;
        case 'empty':
            if (!notEmpty(item.value, item.msg)) return false;
            break;
        default:
            return false;
        }
    }
    return true;
}