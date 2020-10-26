<template>
  <span class="primary-color" @click="sendHandle">{{codeTxt}}</span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        phone: {
            type: String,
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
    methods: {
        sendHandle() {
            if (this.isLoading) return;
            if (this.type === 1 && !this.$verification.notEmpty(this.imgCode, this.$t('login.imgCode'))) return;
            if (this.$verification.phoneVfi(this.phone)) {
                const data: any = {
                    phone: `${this.country.tel}-${this.phone}`,
                    type: this.type,
                };
                if (this.type === 1) {
                    data.captcha = this.imgCode;
                    data.captcha_id = this.imgCodeId;
                }
                this.isLoading = true;
                this.changeLoading(true);
                this.$api.registerCode(data).then((res: any) => {
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
                    }
                }).finally(() => {
                    this.isLoading = false;
                    this.changeLoading(false);
                });
            }
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
