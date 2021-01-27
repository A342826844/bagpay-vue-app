<template>
    <div class="telegram-login">
        <!-- <VueTelegramLogin
            mode="callback"
            telegram-login="bagpayBot"
            @callback="yourCallbackFunction" /> -->
    </div>
</template>

<script>
// import { vueTelegramLogin } from 'vue-telegram-login';
import i18n, { langType } from '@/i18n/index';

export default {
    name: 'Telegram',
    components: {
        // VueTelegramLogin: vueTelegramLogin,
    },
    data() {
        return {
            error: false,
        };
    },
    created() {
        this.setLang(this.$route.query.lang);
        const type = Number(this.$route.query.type);
        if (type === 8) {
            this.routerPush();
            return;
        }
        const lang = localStorage.getItem('lang');
        if (!lang) {
            this.setLang(this.$route.query.lang);
        }
        this.toast = this.$toast.loading({
            message: `${this.$t('common.logging')}···`,
            duration: 0,
            forbidClick: true,
        });
        this.loginTelegram(this.$route.query.ac);

        // if (this.$route.query.ac) {
        //     // this.$router.push('/otc/entry');
        //     // TODO:
        //     this.loginTelegram(this.$route.query.ac);
        //     // setTimeout(() => {
        //     //     }, 0);
        //     // setTimeout(() => {
        //     //     this.$router.push('/otc/submit?id=54');
        //     // }, 10);
        // }
    },
    methods: {
        routerPush() {
            const type = Number(this.$route.query.type);
            const coin = this.$route.query.coin || 'usdt';
            let defaultPath = '/otc/entry';
            let path = '/otc/entry'; // 跳转路由
            let needTowPush = false; // 需要2次跳转
            switch (type) {
            case 1:
                path = '/otc/entry?type=buy';
                break;
            case 2:
                path = '/otc/entry?type=sell';
                break;
            case 3:
                path = `/otc/submit?id=${this.$route.query.id}`;
                needTowPush = true;
                break;
            case 4:
                path = `/otc/order/detail?id=${this.$route.query.id}`;
                needTowPush = true;
                break;
            case 5:
                path = '/home';
                break;
            case 6:
                path = `/payment?symbol=${coin}`; // 充值
                needTowPush = true;
                defaultPath = '/home';
                break;
            case 7:
                path = `/transferout?symbol=${coin}`; // 提现
                needTowPush = true;
                defaultPath = '/home';
                break;
            case 8:
                path = `/redEnvelope?id=${this.$route.query.id}`; // 红包记录
                // needTowPush = true;
                // defaultPath = '/home';
                break;
            // case 9:
            //     path = '/invitation'; // 邀请
            //     needTowPush = true;
            //     defaultPath = '/home';
            //     break;
            // case 10:
            //     path = '/payway'; // 收付款管理
            //     needTowPush = true;
            //     defaultPath = '/mine';
            //     break;
            // case 11:
            //     path = '/mine/protocol'; // 用户协议
            //     needTowPush = true;
            //     defaultPath = '/mine';
            //     break;
            // case 12:
            //     path = '/mine/help'; // 新手教程
            //     needTowPush = true;
            //     defaultPath = '/mine';
            //     break;
            default:
                path = defaultPath;
                break;
            }
            if (!needTowPush) {
                this.$router.replace(path);
                return;
            }
            this.$router.replace(defaultPath);
            setTimeout(() => {
                this.$router.push(path);
            }, 50);
        },
        loginTelegram(ac) {
            this.$api.loginTelegram({ ac }).then((res) => {
                this.$store.commit('setsessionId', res.data);
                this.$store.commit('setLoginState', 1);
                this.$store.commit('changeShowTopBar', true);
                this.getInitData().catch(() => {
                    setTimeout(() => {
                        this.getInitData();
                    }, 1000);
                });
            }).catch((err) => {
                if (!this.error) {
                    this.$notify(`${err.message || err}`);
                    this.error = true;
                }
                setTimeout(() => {
                    this.loginTelegram(ac);
                }, 10000);
            });
        },
        getInitData() {
            return Promise.all([
                this.getCoinList(),
                this.initUserInfo(),
                this.getUserBankList(),
            ]).then(() => {
                this.routerPush();
                this.toast.clear();
            });
        },
        setLang(value) {
            const hasLang = langType.some((item) => item.value === value);
            if (!hasLang) return;
            this.lang = value;
            this.$store.commit('setLang', value);
            i18n.locale = value;
        },
    },
};
</script>

<style lang="less">

</style>
