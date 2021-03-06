import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { SHARE_RED_ENVELOPE_TEXT } from '../commons/config';

Vue.use(VueI18n);

declare module 'vue/types/vue' {
    // 3. 声明为 Vue 补充的东西
    interface Vue {
        $t: typeof VueI18n.prototype.t;
    }
}

const loadLocaleMessages = () => {
    const locales = require.context('@/assets/lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const langs: string[] = [];
    const langType: Array<any> = [];
    const shareRedEnvelope: any = {};
    const messages: any = {};
    locales.keys().forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
            langType.push({
                value: locale,
                label: messages[locale].language,
            });
            shareRedEnvelope[locale] = messages[locale][SHARE_RED_ENVELOPE_TEXT];
            langs.push(locale);
        }
    });
    const message = JSON.stringify(messages).replace(/_mark/g, (process.env.VUE_APP_MARK as string));
    return {
        messages: JSON.parse(message),
        langType,
        langs,
        shareRedEnvelope,
    };
};

export const {
    langs, messages, langType, shareRedEnvelope,
} = loadLocaleMessages();

/**
 * 获取默认语言
 * @param _lang 备选语言
 *
 */
export const defaultLang = (_lang: string): string => {
    let lang = '';
    const thinkLanguage = window.localStorage.getItem('lang') || navigator.language.toLowerCase() || '';
    if (langs.indexOf(thinkLanguage) !== -1) {
        lang = thinkLanguage;
    } else if (thinkLanguage.indexOf('zh') !== -1 && langs.indexOf('zh-CN') !== -1) {
        lang = 'zh-CN';
    }
    if (langs.indexOf(_lang) !== -1) {
        return lang || _lang || langs[0];
    }
    return lang || langs[0];
};

const locale = defaultLang((process.env.VUE_APP_I18N_LOCALE as string));

export default new VueI18n({
    locale,
    fallbackLocale: locale,
    messages,
});
