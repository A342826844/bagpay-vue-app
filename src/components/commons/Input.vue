<template>
    <div class="app-input">
        <input ref="input" v-bind="{...$attrs}" @focus="focusHandle" @blur="blurHandle" v-model="inputV" :type="type" >
        <img
            @click="clearHandle"
            :class="{focus}"
            v-show="clearable"
            class="app-input-clear app-input-right"
            src="@/assets/img/common/clear.png" alt=""
        >
        <div class="app-input-right">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    focus: boolean;
    inputV: string|number;
    timer: number;
}

const equal = (value1: unknown, value2: unknown) => String(value1) === String(value2);

export default Vue.extend({
    name: 'HelloWorld',
    props: {
        msg: String,
        type: {
            type: String,
            default: 'text', // text, password
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [Number, String],
            required: true,
        },
    },
    data(): data {
        return {
            focus: false,
            inputV: '',
            timer: 0,
        };
    },
    created() {
        this.inputV = this.value;
    },
    watch: {
        value(value) {
            if (!equal(value, this.inputV)) {
                this.inputV = value;
            }
        },
        inputV(value) {
            if (!equal(value, this.value)) {
                this.$emit('input', value);
            }
        },
    },
    methods: {
        focusHandle() {
            this.$emit('focus');
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.focus = true;
            }, 50);
        },
        blurHandle() {
            this.$emit('blur');
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.focus = false;
            }, 50);
        },
        clearHandle() {
            clearTimeout(this.timer);
            (this.$refs.input as HTMLInputElement).focus();
            if (!this.focus) return;
            this.inputV = '';
            this.$emit('input', '');
            this.$emit('clear');
        },
    },
});
</script>

<style scoped lang="less">
.app-input{
    width: 100%;
    height: 99px;
    background: #F5F7F9;
    border-radius: 10px;
    display: inline-block;
    position: relative;
    input{
        width: 100%;
        height: 100%;
        background: transparent;
        padding-left: 40px;
    }
    &-right{
        position: absolute;
        right: 40px;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 99px;
        line-height: 99px;
    }
    &-clear{
        height: auto;
        width: 60px;
        opacity: 0;
        transition: 0.3s;
        &.focus{
            opacity: 1;
        }
    }
}
</style>
