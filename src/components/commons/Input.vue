<template>
    <div class="app-input app-padding40" :class="{[`show-${errorType}`]: error}">
        <slot name="start"></slot>
        <input
            ref="input"
            class="input-cont"
            v-bind="{...$attrs}"
            @focus="focusHandle"
            @blur="blurHandle"
            @input="inputHandle"
            v-model="inputV"
            :type="showPassword ? 'text' : type"
            :autofocus="autofocus"
            :maxlength="maxlength"
        >
        <img
            @click="clearHandle"
            :class="{focus}"
            v-show="clearable"
            class="app-input-clear app-input-right"
            src="@/assets/img/common/clear.png" alt=""
        >
        <img
            @click="changePassword"
            :class="{focus}"
            v-show="password && type === 'password'"
            class="app-input-password app-input-right"
            :src="showPassword ? eyeOpen : eyeClose" alt=""
        >
        <span v-show="error" class="app-input-error">{{errorMsg}}</span>
        <span class="app-input-length app-input-right" v-show="isShowLength">{{inputV.length}}/{{maxlength}}</span>
        <slot></slot>
        <div class="app-input-option" :class="optionSHow ? 'show' : 'hide'">
            <slot name="option"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const eyeClose = require('@/assets/img/common/eye-close.png');
const eyeOpen = require('@/assets/img/common/eye-open.png');

type data = {
    focus: boolean;
    inputV: string;
    timer: any;
    showPassword: boolean;
    eyeClose: any;
    eyeOpen: any;
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
        autofocus: {
            type: Boolean,
            default: false,
        },
        selfInput: {
            type: Boolean,
            default: false, // 是否在父组件中，用input事件手动设置value
        },
        isShowLength: {
            type: Boolean,
            default: false,
        },
        maxlength: {
            type: [Number, String],
        },
        decimal: {
            type: [Number, String, Boolean], // 保留小数位数, true为计价单位的小数位数， 默认不做处理
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        password: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        },
        errorType: {
            type: String,
            default: 'error',
        },
        errorMsg: {
            type: String,
            default: '',
        },
        value: {
            type: [Number, String],
            required: true,
        },
        optionSHow: {
            type: Boolean,
        },
    },
    data(): data {
        return {
            eyeClose,
            eyeOpen,
            focus: false,
            inputV: '',
            timer: 0,
            showPassword: false,
        };
    },
    created() {
        this.inputV = `${this.value}` || '';
    },
    mounted() {
        if (this.autofocus) {
            this.$nextTick(() => {
                (this.$refs.input as any).focus();
            });
        }
    },
    watch: {
        value(value) {
            if (!equal(value, this.inputV)) {
                this.inputV = value;
            }
        },
        inputV(value) {
            if (this.decimal) {
                let { decimal } = this;
                if (typeof this.decimal === 'boolean') {
                    decimal = this.$store.getters.getCurrencyTypeInfo.decaimal;
                }
                setTimeout(() => {
                    this.decimalHandle(Number(decimal));
                }, 0);
            }
            // 如果设置了这个属性，就需要绑定input事件
            if (this.selfInput) return;
            if (!equal(value, this.value)) {
                this.$emit('input', value);
            }
        },
    },
    methods: {
        // 改变显示隐藏状态
        changePassword() {
            clearTimeout(this.timer);
            setTimeout(() => {
                this.showPassword = !this.showPassword;
            }, 0);
            this.setCaretPosition(this.$refs.input as HTMLInputElement, this.inputV.length);
        },
        focusHandle(event: FocusEvent) {
            this.$emit('focus');
            const { userAgent } = window.navigator;
            if ((userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1) && event.target) {
                (event.target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.focus = true;
            }, 50);
        },
        decimalHandle(decimal: number) {
            if (decimal === 0) {
                this.inputV = `${this.inputV.split('.')[0]}`;
                return;
            }
            if ((this.inputV.includes('.') && this.inputV.split('.')[1].length) > decimal) {
                this.inputV = `${this.inputV.split('.')[0]}.${this.inputV.split('.')[1].slice(0, decimal)}`;
            }
        },
        inputHandle() {
            this.$emit('input', this.inputV);
        },
        blurHandle() {
            this.$emit('blur');
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.focus = false;
            }, 50);
        },
        // 控制光标位置
        setCaretPosition(ctrl: HTMLInputElement, pos: number) {
            if (ctrl.setSelectionRange && this.focus) {
                ctrl.focus();
                ctrl.setSelectionRange(pos, pos);
            }
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
@warning: #f90;
@error: #ed4014;
.app-input{
    width: 100%;
    height: 99px;
    line-height: 60px;
    background: #F5F7F9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
    &.img_code_input{
        padding-right: 0px;
        overflow: hidden;
        .code-img{
            vertical-align: middle;
            height: 100%;
        }
    }
    .input-cont{
        flex: 1;
        width: 50px;
        background: transparent;
    }
    &-right{
        // position: absolute;
        // right: 40px;
        // top: 0;
        // bottom: 0;
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
    &-password{
        height: auto;
        width: 50px;
    }
    &-length{
        font-size: 28px;
        color: #b3b3b3;
    }
    &-error{
        position: absolute;
        bottom: -12px;
        font-size: 24px;
        line-height: 24px;
        left: 30px;
        padding: 0 10px;
        background: #fff;
    }
    &.show-error{
        border: @error 1PX solid;
        .app-input-error{
            color: @error;
        }
    }
    &.show-warning{
        border: @warning 1PX solid;
        .app-input-error{
            color: @warning;
        }
    }
    &-option{
        position: absolute;
        z-index: 100;
        width: 100%;
        max-height: 300px;
        overflow: scroll;
        background: #fff;
        top: 100%;
        border-radius: 10px;
        left: 0;
        box-shadow: 0px 3px 16px 0px rgba(191, 191, 191, 0.22);
        &.show{
            overflow: scroll;
            max-height: 300px;
            opacity: 1;
            transition: all 0.3s;
        }
        &.hide{
            transition: all 0.3s;
            max-height: 0px;
            opacity: 0;
            overflow: hidden;
        }
    }
}
</style>
