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
            // otcConfig().then((res) => {
            //     if (res.data.status === 200) {
            //         otcConfig = res.data.data;
            //         // TODO
            //     }
            // });
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
