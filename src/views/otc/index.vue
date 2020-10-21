<template>
    <div class="otc-index">
        <router-view></router-view>
    </div>
</template>

<script>
// import { otcConfig } from '@/api/index';

export default {
    methods: {
        getConfigData() {
            this.$api.getConfigCommon().then((res) => {
                if (res.data) {
                    this.$store.commit('setConfigCommon', res.data);
                }
            }).catch(() => {
                setTimeout(() => {
                    this.getConfigData();
                }, 10 * 1000);
            });
        },
    },
    created() {
        this.getConfigData();
    },
};

</script>

<style lang='less' scopde>
.otc-index{
    height: 100%;
}

</style>
