<template>
    <div class="telegrame-login">
        <div></div>
    </div>
</template>

<script>

export default {
    name: 'Telegrame',
    data() {
        return {
            error: false,
        };
    },
    created() {
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
            const defaultPath = '/otc/entry';
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
            this.$api.loginTelegram({ ac }).then(() => {
                this.getInitData().catch(() => {
                    setTimeout(() => {
                        this.getInitData();
                    }, 1000);
                });
            }).catch((err) => {
                if (!this.error) {
                    this.$notify(`${err}`);
                    this.error = true;
                }
                setTimeout(() => {
                    this.loginTelegram();
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
    },
};
</script>

<style lang="less">

</style>
