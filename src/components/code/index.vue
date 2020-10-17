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
        type: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            codeTxt: '发送',
            timer: null,
            timeNum: 0,
        };
    },
    methods: {
        sendHandle() {
            if (this.timeNum !== 0) return;
            if (this.$verification.phoneVfi(this.phone)) {
                this.$api.registerCode({
                    phone: `86-${this.phone}`,
                    type: this.type,
                }).then((res: any) => {
                    if (res.code === 0) {
                        this.timeNum = 60;
                        this.timer = setInterval(() => {
                            this.timeNum -= 1;
                            if (this.timeNum === 0) {
                                this.codeTxt = '重新发送';
                            } else {
                                this.codeTxt = `重新发送(${this.timeNum})`;
                            }
                        }, 1000) as any;
                        console.log('发送成功');
                    }
                });
            }
        },
    },
});
</script>

<style>

</style>
