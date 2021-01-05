<template>
  <span class="primary-color" @click="sendHandle">{{codeTxt}}</span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        phone: {
            type: [String, Number],
            required: true,
        },
        imgCode: {
            type: String,
        },
        imgCodeId: {
            type: String,
        },
        type: {
            type: Number,
            required: true,
        },
        vType: {
            type: String,
            default: 'phone',
        },
    },
    data() {
        return {
            isLoading: false,
            codeTxt: `${this.$t('common.send2')}`,
            timer: null,
            timeNum: 0,
        };
    },
    computed: {
        country(): any {
            return this.$store.state.country;
        },
    },
    activated() {
        this.isLoading = false;
        if (this.timer) {
            clearInterval(this.timer as any);
        }
        this.codeTxt = `${this.$t('common.send2')}`;
        this.timeNum = 0;
    },
    methods: {
        sendHandle() {
            if (this.isLoading) return;
            if (this.timeNum > 0) return;
            if (this.type === 1 && !this.$verification.notEmpty(this.imgCode, this.$t('login.imgCode'))) return;
            if (this.verification()) {
                const data: any = {
                    type: this.type,
                };
                if (this.vType === 'phone') {
                    data.phone = this.hasMoblepre(`${this.phone}`) ? this.phone : `${this.country.tel}-${this.phone}`;
                } else if (this.vType === 'email') {
                    data.email = this.phone;
                }
                if (this.type === 1) {
                    data.captcha = this.imgCode;
                    data.captcha_id = this.imgCodeId;
                }
                this.isLoading = true;
                this.changeLoading(true);
                this.apiHandle(data).then((res: any) => {
                    if (res.code === 0) {
                        this.timeNum = 60;
                        this.timer = setInterval(() => {
                            this.timeNum -= 1;
                            if (this.timeNum === 0) {
                                this.codeTxt = `${this.$t('common.repeat')}`;
                                clearInterval(this.timer as any);
                            } else {
                                this.codeTxt = `${this.$t('common.repeat')}(${this.timeNum})`;
                            }
                        }, 1000) as any;
                        this.$normalToast(this.$t('common.sendSuccess'));
                        if (res.data && res.data.code) {
                            this.$dialog.alert({
                                title: '验证码',
                                message: res.data.code,
                            });
                        }
                    }
                }).finally(() => {
                    this.isLoading = false;
                    this.changeLoading(false);
                });
            }
        },
        hasMoblepre(phone: string) {
            if (phone.indexOf('-') !== -1) {
                return true;
            }
            return false;
        },
        sliceMoblepre(phone: string) {
            const index = phone.indexOf('-');
            if (phone.indexOf('-') !== -1) {
                return phone.slice(index + 1);
            }
            return phone;
        },
        verification() {
            if (this.vType === 'phone' && this.$verification.phoneVfi(this.phone)) return true;
            if (this.vType === 'email' && this.$verification.emailVfi(this.phone)) return true;
            if (this.vType === 'telegram') return true;
            return false;
        },
        apiHandle(data: any) {
            if (this.vType === 'email') return this.$api.registerCodeEmail(data);
            if (this.vType === 'telegram') return this.$api.registerCodeTelegram(data);
            return this.$api.registerCode(data);
        },
    },
    destroyed() {
        if (this.timer) {
            clearInterval(this.timer as any);
        }
    },
});
</script>

<style>

</style>
