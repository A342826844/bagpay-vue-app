<template>
    <div :class="{scroll: contentScroll}"  ref="tabBox" class="tab-list">
        <div
            :class="[
                {'border-b': border},
                {[`tab-list-size-${size}`] : size},
                {sticky},
            ]"
            class="tabbar app-padding40"
        >
            <p
                v-for="(item, index) in tabList"
                @click="toggle(item, index)"
                :key="item.id"
                ref="tabbarTitle"
                :style="{
                    'font-size': moveIng ? titleFontSize[index] : '',
                    'transition-duration': moveIng ? '' : '.3s'
                }"
                :class="{active:index==activeIndex}">
                {{item.title}}
            </p>
        </div>
        <div
            @touchmove.stop="moveHandle"
            @touchstart.stop="startHandle"
            @touchend.stop="endHandle"
            ref="tabbarBody"
            :style="{
                left: bodyLeft,
                'transition-duration': moveIng ? '' : '0.3s'
            }" class="tab-list-body">
            <div v-show="index === activeIndex || (moveIng && position === 'HORIZONTAL') || isMoveIng" :style="{
                left: `${index * 100}%`,
            }" v-for="(item, index) in tabList" :key="item.id" class="tab-list-content">
                <slot :name="item.value"></slot>
            </div>
        </div>
        <div class="tab-list-right">
            <slot name="right"></slot>
        </div>
     </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { deepCopy } from '@/utils/assist';

type HORIZONTAL = 'HORIZONTAL';
type VERTICAL = 'VERTICAL';

type data = {
    active: string;
    activeIndex: number;
    activeValue: string|number;
    moveTo: number;
    moveIng: boolean;
    titleFontSize: Array<any>;
    titleOpacity: Array<any>;
    isMoveIng: boolean; // tab正在切换状态，不去隐藏其他tab
    isMoveIngTimer: any;

    activeTitleFontSize: number;
    defaultTitleFontSize: number;

    nextIndex: number;

    beginX: number;
    beginY: number;
    beginTime: number;

    position: HORIZONTAL|VERTICAL|null;
}

const bigFontRate = 1.5;
const defaultFontRate = 1.2;
const activeTitleOpacity = 1;
const defaultTitleOpacity = 0.8;

const HORIZONTAL = 'HORIZONTAL';
const VERTICAL = 'VERTICAL';

export default Vue.extend({
    name: 'Tablist',
    props: {
        tabList: {
            type: Array,
        },
        size: {
            type: String,
            default: 'default', // big
        },
        defaultVal: {
            type: [Number, String],
        },
        border: {
            type: Boolean,
            default: false,
        },
        swipeable: {
            type: Boolean,
            default: false,
        },
        // 页面是否需要上下滚动
        scroll: {
            type: Boolean,
            default: true,
        },
        contentScroll: {
            type: Boolean,
            default: false,
        },
        sticky: {
            type: Boolean,
            default: false,
        },
    },
    data(): data {
        return {
            active: '',
            activeIndex: 0,
            activeValue: '',
            moveTo: 0,
            moveIng: false,
            titleFontSize: [],
            titleOpacity: [],
            isMoveIng: false, // tab正在切换状态，不去隐藏其他tab
            isMoveIngTimer: 0,

            activeTitleFontSize: 0,
            defaultTitleFontSize: 0,

            nextIndex: 0,

            beginX: 0,
            beginY: 0,
            beginTime: 0,

            position: null,
        };
    },
    computed: {
        renderTabList() {
            return deepCopy(this.tabList);
        },
        bodyLeft() {
            return `calc(-${(this as any).activeIndex * 100}% + ${(this as any).moveTo}px)`;
        },
    },
    watch: {
        defaultVal(value) {
            if (value === this.activeValue) return;
            this.tabList.forEach((item: any, index: number) => {
                if (item.value === value) {
                    this.changgeActiveHandle(index);
                }
            });
        },
    },
    mounted() {
        // 计算字体初始值
        if (!this.swipeable) return;
        const computedStyle = window.getComputedStyle((this.$refs.tabbarTitle as Element[])[0]);
        if ((this.$refs.tabbarTitle as Element[])[0].className.includes('active')) {
            const { fontSize } = computedStyle;
            this.activeTitleFontSize = window.parseFloat(fontSize);
            this.defaultTitleFontSize = this.activeTitleFontSize / (this.size === 'big' ? bigFontRate : defaultFontRate);
        } else {
            const { fontSize } = computedStyle;
            this.defaultTitleFontSize = window.parseFloat(fontSize);
            this.activeTitleFontSize = this.defaultTitleFontSize * (this.size === 'big' ? bigFontRate : defaultFontRate);
        }
        this.activeValue = this.defaultVal;
        this.tabList.forEach((item: any, index: number) => {
            if (item.value === this.defaultVal) {
                this.changgeActiveHandle(index);
            }
        });
    },
    methods: {
        toggle(item: { [x: string]: any; noChange: any }, index: any, isMove: any) {
            if (index === this.activeIndex) return;
            this.$emit('on-click', item);
            if (item.noChange) return;
            this.$emit('input', item.value);
            this.activeValue = item.value;
            this.$emit('change', item);
            this.changgeActiveHandle(index);
            if (!isMove) {
                // eslint-disable-next-line no-unused-expressions
                clearTimeout(this.isMoveIngTimer);
                this.isMoveIng = true;
                this.isMoveIngTimer = setTimeout(() => {
                    this.isMoveIng = false;
                }, 300);
            }
        },
        changgeActiveHandle(index: number) {
            this.activeIndex = index;
            this.renderTabList.forEach((item: any, subIndex: number) => {
                this.titleFontSize[subIndex] = this.computedFontSize(subIndex, 0);
                this.titleOpacity[subIndex] = this.computedOpacity(subIndex, 0);
            });
        },
        // 滑动时js控制title的字体大小显示
        computedFontSize(index: number, moveRate: number) {
            const def = this.activeTitleFontSize - this.defaultTitleFontSize;
            if (this.activeIndex === index) {
                return `${(this.activeTitleFontSize - def * Math.abs(moveRate)).toFixed(2)}px`;
            }
            if (this.activeIndex + this.nextIndex === index) {
                return `${(this.defaultTitleFontSize + def * Math.abs(moveRate)).toFixed(2)}px`;
            }
            return `${this.defaultTitleFontSize}px`;
        },
        // 滑动时js控制title的字体Opacity显示
        computedOpacity(index: number, moveRate: number) {
            const def = activeTitleOpacity - defaultTitleOpacity;
            if (this.activeIndex === index) {
                return (activeTitleOpacity - def * Math.abs(moveRate)).toFixed(2);
            }
            if (this.activeIndex + this.nextIndex === index) {
                return (defaultTitleOpacity + def * Math.abs(moveRate)).toFixed(2);
            }
            return defaultTitleOpacity;
        },

        moveHandle(e: TouchEvent) {
            if (!this.swipeable) return;
            if (!this.moveIng) {
                this.moveIng = true;
            }
            const moveX = e.touches[0].pageX - this.beginX;
            const moveY = e.touches[0].pageY - this.beginY;

            // 判断用户滑动方向， 让垂直滚动和水平滚动不能同时触发
            if (!this.position && this.scroll) {
                if (Math.abs(moveX) > Math.abs(moveY)) {
                    this.position = HORIZONTAL;
                } else {
                    this.position = VERTICAL;
                }
            }
            console.log(this.position);
            if (this.position === VERTICAL) return;

            // 阻止移动端的滑动默认事件
            e.stopPropagation();
            e.preventDefault();

            const width = (this.$refs.tabBox as HTMLElement).clientWidth;
            if ((this.activeIndex === 0 && moveX >= width / 5) || (this.activeIndex === this.tabList.length - 1 && moveX <= -width / 5)) {
                return;
            }
            this.moveTo = moveX;
            if ((this.activeIndex === 0 && this.moveTo >= 0) || (this.activeIndex === this.tabList.length - 1 && this.moveTo <= 0)) {
                return;
            }

            const moveRate = moveX / width;
            this.renderTabList.forEach((item: any, index: number) => {
                this.titleFontSize[index] = this.computedFontSize(index, moveRate);
                this.titleOpacity[index] = this.computedOpacity(index, moveRate);
            });
            this.nextIndex = this.moveTo > 0 ? -1 : 1;
        },
        endHandle(e: TouchEvent) {
            if (!this.swipeable) return;

            // 阻止移动端的滑动默认事件
            if (!this.scroll) {
                e.stopPropagation();
            }

            clearTimeout(this.isMoveIngTimer);
            if (this.moveTo !== 0) {
                this.isMoveIng = true;
                this.isMoveIngTimer = setTimeout(() => {
                    this.isMoveIng = false;
                }, 300);
            }

            // 一次滑动结束， 重置用户滑动方向及状态
            this.position = null;
            this.moveIng = false;
            const endStart = new Date().getTime();
            this.renderTabList.forEach((item: any, index: number) => {
                this.titleFontSize[index] = this.computedFontSize(index, 0);
                this.titleOpacity[index] = this.computedOpacity(index, 0);
            });
            if ((this.activeIndex === 0 && this.moveTo >= 0) || (this.activeIndex === this.tabList.length - 1 && this.moveTo <= 0)) {
                this.moveTo = 0;
                return;
            }
            const width = (this.$refs.tabBox as HTMLElement).clientWidth;
            if (Math.abs(this.moveTo) >= width / 3 || ((endStart - this.beginTime <= 300) && (Math.abs(this.moveTo) > 10))) {
                const next = this.moveTo > 0 ? -1 : 1;
                const index = this.activeIndex + next;
                const item = this.renderTabList[index];
                this.toggle(item, index, true);
                this.moveTo = 0;
                this.renderTabList.forEach((subItem: any, subIndex: number) => {
                    this.titleFontSize[subIndex] = this.computedFontSize(subIndex, 0);
                    this.titleOpacity[subIndex] = this.computedOpacity(subIndex, 0);
                });
                return;
            }
            this.moveTo = 0;
        },
        startHandle(e: TouchEvent) {
            if (!this.swipeable) return;

            // 阻止移动端的滑动默认事件
            if (!this.scroll) {
                e.stopPropagation();
            }

            this.beginX = e.touches[0].pageX;
            this.beginY = e.touches[0].pageY;
            this.beginTime = new Date().getTime();
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tab-list{
    min-height: 100%;
    position: relative;
    &.scroll{
        height: 100%;
        .tab-list-body{
            height: calc(100% - 93px);
            min-height: auto;
            .tab-list-content{
                height: 100%;
                overflow: scroll;
            }
        }
    }
    .tabbar {
        display: flex;
        align-items: flex-end;
        overflow-y: hidden;
        overflow-x: auto;
        padding-bottom: 35px;
        height: 93px;
        &.border{
            border-bottom: 1px solid #ccc;
        }
        &.sticky{
            position: sticky;
            top: 0;
            z-index: 99;
            background: #ffffff;
        }
        & >p{
            font-size: 28px;
            transition-property: all;
            opacity: 0.8;
            &.active{
                color: #333;
                font-size: 33.6px;
                opacity: 1;
                font-weight: bold;
            }
        }
        &.tab-list-size-big {
            & >p{
                font-size: 30px;
                &.active{
                    font-size: 45px;
                }
            }
        }
        p{
            margin-right: 57px;
            white-space: nowrap;
            text-align: left;
            &:last-child{
                margin-right: 0;
            }
        }
    }
    &-body{
        position: relative;
        width: 100%;
        min-height: calc(100% - 93px);
        transition-property: left;
        .tab-list-content {
            min-height: 100%;
            position: absolute;
            width: 100%;
            overflow: scroll;
        }
    }
    &-right{
        position: absolute;
        right: 0;
        top: 0;
        height: 93px;
    }
}
</style>
