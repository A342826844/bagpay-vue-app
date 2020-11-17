<template>
    <li @click="$emit('click')" class="com-li app-padding40 light-grey-bg">
        <div class=" flex-between-c com-li-title">
            <span>
                <slot name="title"></slot>
            </span>
            <div class="com-li-right">
                <span class="time">
                    <slot name="time"></slot>
                </span>
                <img v-show="arrow" class="app-img-50" src="../../../assets/img/common/arrow_right.png" alt="">
            </div>
        </div>
        <div class=" flex-between-c value">
            <span>
                <slot name="name"></slot>
            </span>
            <h6 class=" app-size-34">
                <slot name="value"></slot>
            </h6>
        </div>
    </li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Li-item',
    props: {
        arrow: Boolean,
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.com-li{
    margin-top: 30px;
    padding-top: 32px;
    padding-bottom: 32px;
    border-radius: 10px;
    &-title{
        height: 50px;
        font-size: 24px;
    }
    .time{
        color: #A6A6A6;
    }
    .value{
        margin-top: 12px;
        font-size: 28px;
    }
}
</style>
