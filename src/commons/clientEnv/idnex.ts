const { userAgent } = window.navigator;

// 判断是否微信登陆
export function isWeiXin() {
    return /MicroMessenger/i.test(userAgent);
}

// 是否为移动终端;
export function isApp() {
    return userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
}

// 是否为android终端
export function isAndroid() {
    return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
}

// 是否为ios终端
export function isiOS() {
    return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

// 原生iOS
export function isNativeiOS() {
    return /Native_iOS/.test(userAgent);
}
// 原生ios APP
export function isNativeAppiOS() {
    return /Native_iOS_App/.test(userAgent);
}
// 原生 android
export function isNativeAndroid() {
    return /Native_Android/.test(userAgent);
}
// 原生 android App
export function isNativeAppAndroid() {
    return /Native_Android_App/.test(userAgent);
}

// 判断QQ浏览器
export function isQQBrowser() {
    return /MQQbrowser/i.test(userAgent);
}

// 判断原生版本
export function nativeVersion() {
    if (isNativeiOS() || isNativeAndroid()) {
        // eslint-disable-next-line no-useless-escape
        const res = userAgent.match(/Native_V[\d+][\.\d+]*/);
        // eslint-disable-next-line no-useless-escape
        if (res && /[\d+][\.\d+]*/.test(res[0].split('Native_V')[1])) {
            return res[0].split('Native_V')[1];
        }
    }
    return '';
}

const clientEnv = {
    android: isAndroid(),
    weixin: isWeiXin(),
    ios: isiOS(),
    QQBrowser: isQQBrowser(),
    isApp: isApp(),
    isNativeiOS: isNativeiOS(),
    isNativeAndroid: isNativeAndroid(),
    version: nativeVersion(),
    isNativeAppAndroid: isNativeAppAndroid(),
    isNativeAppiOS: isNativeAppiOS(),
};

export default clientEnv;
