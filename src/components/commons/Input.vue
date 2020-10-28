<template>
    <div class="app-input app-padding40">
        <slot name="start"></slot>
        <input
            ref="input"
            class="input-cont"
            v-bind="{...$attrs}"
            @focus="focusHandle"
            @blur="blurHandle"
            @input="inputHandle"
            v-model="inputV"
            :type="type"
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
        <span class="app-input-length app-input-right" v-show="isShowLength">{{inputV.length}}/{{maxlength}}</span>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    focus: boolean;
    inputV: string;
    timer: any;
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
            type: [Number, Boolean], // 保留小数位数, true为计价单位的小数位数， 默认不做处理
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
                    decimal = this.$store.state.unitDecimal;
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
        focusHandle() {
            this.$emit('focus');
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.focus = true;
            }, 50);
        },
        decimalHandle(decimal: number) {
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
    &-length{
        font-size: 28px;
        color: #b3b3b3;
    }
}
</style>
