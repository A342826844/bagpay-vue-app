<template>
    <div class="orders-filter" :class="[size]">
        <div v-show="title" class="orders-filter-header border-b ui-flex">
            <p>{{title}}</p>
        </div>
        <div class="orders-filter-container">
            <div v-for="(item) in renderData" :key="item.key">
                <div class="tips">{{item.title}}</div>
                <div class="ui-flex flex-between flex-wrap">
                    <div
                        v-for="sub_item in item.data"
                        :key="sub_item.value"
                        @click="choose(item, sub_item)"
                        :class="{'primary-bg': sub_item[item.key] === keys[item.key], empty: sub_item.empty}"
                        class="type">
                            <span v-show="!sub_item.empty">
                                {{sub_item.title}}
                            </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type subItem = {
    title: string;
    // [title]: number|string;
    [elem: string]: number|string|boolean;
}

type itemData = {
    title: string;
    key: string;
    value: number|string;
    data: Array<subItem>;
}

type data = {
    keys: {
        [elem: string]: any;
    };
    oldValue: {
        [elem: string]: any;
    };
}

export type renderData = Array<itemData>;

export default Vue.extend({
    props: {
        title: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: '',
        },

        // render树
        renderData: {
            type: Array,
            required: true,
        },

    },
    data(): data {
        return {
            keys: {},
            oldValue: {},
        };
    },
    created() {
        this.setDefaultValue();
    },
    methods: {
        cancel() {
            this.keys = { ...this.oldValue };
        },
        setDefaultValue() {
            (this.renderData as renderData).forEach((item: itemData) => {
                this.$set(this.keys, item.key, item.value);
                this.$set(this.oldValue, item.key, item.value);
            });
        },
        submit() {
            const { keys } = this;
            this.oldValue = { ...keys };
            this.$emit('submit', { ...keys });
        },
        choose(item: itemData, subItem: subItem) {
            if (subItem.disable) return;
            if (this.keys[item.key] === subItem[item.key]) return;
            this.keys[item.key] = subItem[item.key];
            this.$emit('choose', { ...this.keys }, item.key, subItem);
        },
    },
});
</script>

<style lang="less" scoped>
.orders-filter{
    height: 100%;
    .orders-filter-header{
        padding: 0 20px 35px;
        text-align: left;
        color: #202025;
        font-size: 45px;
        line-height: 45px;
        font-weight:bold;
        height: 226px;
        align-items: flex-end;
        span{
            vertical-align: bottom;
        }
        &::after{
            content: '';
            vertical-align: bottom;
        }
    }
    &.small{
        .orders-filter-header{
            height: 178px;
        }
    }
    .orders-filter-container{
        height: calc(100% - 180px);
        overflow: scroll;
        padding: 48px 28px;
        .tips{
            margin: 10px 0 48px 0;
            text-align: left;
            font-size:34px;
            color:rgba(109,109,109,1);
        }
        .type{
            margin-bottom: 38px;
            font-size: 28px;
            // color: rgba(87,87,87,1);
            width: 190px;
            line-height: 70px;
            // background: rgba(255,255,255,1);
            border: 1PX solid rgba(160,160,160,1);
            border-radius: 10px;
            white-space: nowrap;
            padding: 0 5px;
            &.primary-bg{
                border-color: transparent;
            }
            &.empty{
                border: none;

            }
        }
    }
}
</style>
