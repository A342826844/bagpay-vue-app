<template>
    <div>
        <Headers></Headers>
        <!-- <div class="telegram-login">
            <VueTelegramLogin
                mode="callback"
                telegram-login="bagpayBot"
                :userpic="false"
                ref="bagpayBot"
                @callback="loginCallbackHanlde">
                    test
                </VueTelegramLogin>
        </div> -->
        <div class="entry">
        <div @click="$router.push('/telegramLogin')" class="entry-hide-btn"></div>
        <div class="entry-banner">
            <ul>
                <li class="entry-banner-item">
                    <img src="@/assets/img/entry/banner3.png" alt="">
                    <p>点击使用 Telegram 登录 <span class="primary-color">{{$app_mark}}</span></p>
                </li>
            </ul>
        </div>
        <div class="entry-btn app-size-34">
            <VueTelegramLogin
                mode="callback"
                telegram-login="bagpayBot"
                :userpic="false"
                ref="bagpayBot"
                @callback="loginCallbackHanlde" />
        </div>
    </div>
    </div>
</template>

<script>
import { vueTelegramLogin } from 'vue-telegram-login';

export default {
    name: 'Telegram',
    components: {
        VueTelegramLogin: vueTelegramLogin,
    },
    data() {
        return {
            error: false,
        };
    },
    created() {
        // this.toast = this.$toast.loading({
        //     message: `${this.$t('common.logging')}···`,
        //     duration: 0,
        //     // forbidClick: true,
        // });
    },
    destroyed() {
        this.toast.clear();
    },
    mounted() {
        // console.log(this.$refs.bagpayBot);
        // setInterval(() => {
        //     console.log(this.$refs.bagpayBot);
        // }, 1000);
        window.addEventListener('error', this.windowErr);
    },
    methods: {
        windowErr(err) {
            console.log(err);
        },
        getInitData() {
            return Promise.all([
                this.getCoinList(),
                this.initUserInfo(),
                this.getUserBankList(),
            ]).then(() => {
                const loginPath = sessionStorage.getItem('loginPath');
                if (loginPath) {
                    if (isNaN(Number(loginPath))) {
                        // 先返回引导页，再替换路由，这样用户点返回键就是返回到进入引导页前的那个页面
                        this.$router.go(-1);
                        setTimeout(() => {
                            // 不使用setTimeout 就会报错或者不跳转
                            this.$router.replace(loginPath);
                        }, 100);
                    } else {
                        this.$router.go(Number(loginPath));
                    }
                    sessionStorage.removeItem('loginPath');
                    return;
                }
                this.$router.push({
                    name: 'home',
                });
            });
        },
        loginCallbackHanlde(data) {
            console.log(data, 'aaaaaaaaaaaa');
            this.$api.loginQuickTelegram(data).then((res) => {
                this.$store.commit('setsessionId', res.data);
                this.$store.commit('setLoginState', 1);
                this.getInitData().catch(() => {
                    setTimeout(() => {
                        this.getInitData();
                    }, 1000);
                });
            });
        },
    },
};
</script>

<style lang="less" scoped>
.entry{
    position: relative;
    height: 100%;
    min-height: 1280px;
    &-hide-btn{
        position: absolute;
        height: 50px;
        width: 50px;
        background: transparent;
        top: 0;
        left: 50%;
        z-index: 2000;
    }
    &-banner{
        width: 100%;
        height: 800px;
        overflow: hidden;
        margin-top: 120px;
        &>ul{
            position: relative;
            transition-property: all;
            width: 300%;
            &.active0{
                transform: translateX(0);
            }
            &.active1{
                transform: translateX(-100vw);
            }
            &.active2{
                transform: translateX(-200vw);
            }
            &>li{
                position: absolute;
                width: 100vw;
                // height: 400px;
                img{
                    width: 650px;
                }
                h5{
                    font-size: 45px;
                    line-height: 1;
                }
                p{
                    margin-top: 47px;
                    font-size: 34px;
                    line-height: 1;
                }
                &.item0{
                    left: 0;
                }
                &.item1{
                    left: 100vw;
                }
                &.item2{
                    left: 200vw;
                }
            }
        }
    }
    &-btn{
        margin: 120px 0 60px;
        &-item{
            &:last-child{
                margin-top: 30px;
            }
        }
    }
    &-next{
        padding: 0 60px 0 72px;
        position: absolute;
        bottom: 180px;
        width: 100%;
        font-size: 28px;
        &-tab{
            position: relative;
            width: 54px;
            &>.active-tip, &>p{
                width: 42px;
                height: 11px;
                border-radius: 6px;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                &.active0{
                    transform: translateX(-62px);
                }
                &.active1{
                    transform: translateX(0);
                }
                &.active2{
                    transform: translateX(62px);
                }
            }
            &>.active-tip{
                transition: all 0.3s;
            }
            &>p{
                display: inline-block;
                background: #EEF3FB;
                // &:nth-child(2) {
                //     margin: 0 20px;
                // }
            }
        }
    }
}
</style>
