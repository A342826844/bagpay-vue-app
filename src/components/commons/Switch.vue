<template>
    <span
        tabindex="0"
        :class="wrapClasses"
        :style="wrapStyles"
        @click="toggle"
        @keydown.space="toggle"
    >
        <input type="hidden" :name="name" :value="currentValue">
        <span :class="innerClasses">
            <slot name="open" v-if="currentValue === trueValue"></slot>
            <slot name="close" v-if="currentValue === falseValue"></slot>
        </span>
    </span>
</template>
<script>
import { oneOf } from '@/utils/assist';

const prefixCls = 'app-switch';

export default {
    name: 'Switchs',
    props: {
        value: {
            type: [String, Number, Boolean],
            default: false,
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: true,
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            validator(value) {
                return oneOf(value, ['large', 'small', 'default']);
            },
            default() {
                return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
            },
        },
        name: {
            type: String,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        trueColor: {
            type: String,
        },
        falseColor: {
            type: String,
        },
        beforeChange: Function,
    },
    data() {
        return {
            currentValue: this.value,
        };
    },
    computed: {
        wrapClasses() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                    [`${prefixCls}-disabled`]: this.itemDisabled,
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-loading`]: this.loading,
                },
            ];
        },
        wrapStyles() {
            const style = {};

            if (this.trueColor && this.currentValue === this.trueValue) {
                style['border-color'] = this.trueColor;
                style['background-color'] = this.trueColor;
            } else if (this.falseColor && this.currentValue === this.falseValue) {
                style['border-color'] = this.falseColor;
                style['background-color'] = this.falseColor;
            }

            return style;
        },
        innerClasses() {
            return `${prefixCls}-inner`;
        },
    },
    methods: {
        handleToggle() {
            const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

            this.currentValue = checked;
            this.$emit('input', checked);
            this.$emit('on-change', checked);
        },
        toggle(event) {
            event.preventDefault();
            if (this.itemDisabled || this.loading) {
                return false;
            }

            if (!this.beforeChange) {
                return this.handleToggle();
            }

            const before = this.beforeChange();

            if (before && before.then) {
                before.then(() => {
                    this.handleToggle();
                });
            } else {
                this.handleToggle();
            }
            return false;
        },
    },
    watch: {
        value(val) {
            if (val !== this.trueValue && val !== this.falseValue) {
                throw new Error('Value should be trueValue or falseValue.');
            }
            this.currentValue = val;
        },
    },
};
</script>
<style lang="less" scoped>
@import '../../assets/less/color.less';

.app-switch {
    display: inline-block;
    width: 103px;
    height: 50px;
    line-height: 20px;
    border-radius: 50px;
    vertical-align: middle;
    border: 1px solid #ccc;
    background-color: #ccc;
    position: relative;
    user-select: none;
    transition: all .2s ease-in-out;

    &-loading{
        opacity: .4;
    }

    &-inner {
        color: #fff;
        position: absolute;
        left: 23px;

        i {
            width: 12px;
            height: 12px;
            text-align: center;
            position: relative;
            top: -1px;
        }
    }

    &:after {
        content: '';
        width: 47px;
        height: 47px;
        border-radius: 47px;
        background-color: #fff;
        position: absolute;
        left: 1px;
        top: 1px;
        cursor: pointer;
        transition: left .2s ease-in-out, width .2s ease-in-out;
    }

    &:active:after {
        width: 70px;
    }

    &:before{
        content: '';
        display: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: transparent;
        position: absolute;
        left: 3px;
        top: 3px;
        z-index: 1;
        border: 1px solid @primary;
        border-color: transparent transparent transparent @primary;
        animation: switch-loading 1s linear;
        animation-iteration-count: infinite;
    }
    &-loading:before{
        display: block;
    }

    &:focus {
        box-shadow: 0 0 0 2px fade(@primary, 20%);
        outline: 0;
    }

    &:focus:hover {
        box-shadow: none;
    }

    &-small {
        width: 28px;
        height: 16px;
        line-height: 14px;
        &:after {
            width: 12px;
            height: 12px;
        }
        &:active:after {
            width: 14px;
        }
        &:before{
            width: 10px;
            height: 10px;
            left: 2px;
            top: 2px;
        }
    }

    &-small&-checked:after {
        left: 13px;
    }
    &-small&-checked:before {
        left: 14px;
    }

    &-small:active&-checked:after {
        left: 11px;
    }

    &-large{
        width: 56px;
        &:active:after {
            width: 26px;
        }
    }

    &-large:active:after {
        width: 30px;
    }

    &-large&-checked:after {
        left: 35px;
    }
    &-large&-checked:before {
        left: 37px;
    }

    &-large:active&-checked:after {
        left: 23px;
    }

    &-checked {
        border-color: @primary;
        background-color: @primary;

        .app-switch-inner {
            left: 16px;
        }

        &:after {
            left: 54px;
        }
        &:before{
            left: 58px;
        }

        &:active:after {
            left: 30px;
        }
    }

    &-disabled {
        cursor: not-allowed;;
        opacity: .4;

        &:after {
            background: #fff;
            cursor: not-allowed;
        }

        .app-switch-inner {
            color: #fff;
        }
    }

    &-disabled&-checked{
        border-color: @primary;
        background-color: @primary;
        opacity: .4;
        &:after {
            background: #fff;
        }

        .app-switch-inner {
            color: #fff;
        }
    }

}

@keyframes switch-loading {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
