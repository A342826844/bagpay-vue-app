<template>
    <V-Popup
        position="bottom" :get-container="container"
        :overlay-style="{ background: 'rgba(62, 62, 62, 0.3)' }"
        v-model="show"
        class="select-popup"
    >
        <div @click="selectHide" class="select-popup-box">
            <slot></slot>
        </div>
        <div class="select-popup-cancle" >
            <Button size="fill" @click="cancleHandle" type="reinfo" v-t="'common.cancle'"></Button>
        </div>
    </V-Popup>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SelectPopup',
    props: {
        msg: String,
        value: Boolean,
        container: [String, Function],
        autoHide: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            show: false,
        };
    },
    watch: {
        value(value) {
            if (value !== this.show) {
                this.show = value;
            }
        },
        show(value) {
            if (value !== this.value) {
                this.$emit('input', value);
            }
        },
    },
    methods: {
        selectHide() {
            if (this.autoHide) {
                this.show = false;
            }
        },
        cancleHandle() {
            this.show = false;
            this.$emit('cancle');
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.select-popup{
    font-size: 34px;
    background: transparent;
    text-align: center;
    &-box{
        border-radius: 20px;
        overflow: hidden;
        width: calc(100% - 30px);
        margin: auto 15px;
        // margin: auto;
    }
    &-cancle{
        width: calc(100% - 30px);
        margin: 15px;
    }
}
</style>
