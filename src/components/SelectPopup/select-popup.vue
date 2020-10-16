<template>
    <V-Popup position="bottom" :overlay-style="{ background: 'rgba(62, 62, 62, 0.3)' }" v-model="show" class="select-popup">
        <div @click="show = false" class="select-popup-box">
            <slot></slot>
        </div>
        <Button @click="cancleHandle" class="select-popup-cancle" type="info" v-t="'common.cancle'"></Button>
    </V-Popup>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SelectPopup',
    props: {
        msg: String,
        value: Boolean,
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
        cancleHandle() {
            this.$emit('cancle');
            this.show = false;
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.select-popup{
    font-size: 34px;
    background: transparent;
    padding-bottom: 28px;
    &-box{
        border-radius: 10px;
        overflow: hidden;
        width: 662px;
        margin: auto;
    }
    &-cancle{
        margin-top: 28px;
    }
}
</style>
