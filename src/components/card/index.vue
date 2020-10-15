<template>
    <div @click="$emit('click')" class="n_card_item app-padding40">
        <div class="card_title flex-between-c">
            <div class="left_cont">
                <slot name="title"></slot>
            </div>
            <div class="right_status" v-if="$slots.right">
                <slot name="right"></slot>
                <img v-show="showArrow" class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
            </div>
            <img v-show="showArrow" v-else class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
        </div>
        <div v-for="(item, index) in lineNum" :key="item">
            <div class="text_row text_title">
                <slot :name="`lable${index || ''}`"></slot>
            </div>
            <div class="text_row text_content">
                <slot :name="`value${index || ''}`"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        state: {
            type: String,
            default: '',
        },
        lineNum: {
            type: Number,
            default: 1,
        },
        showArrow: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
};
</script>

<style lang="less">
.n_card_item{
    border-bottom: 1px solid #DBDBDB;
    padding-top: 30px;
    padding-bottom: 30px;
    .card_title{
        height: 48px;
        font-size:34px;
        line-height: 34px;
        color: #202025;
        // font-weight:bold;
        margin-bottom: 12px;

        .left_cont{
            &>span{
                margin-right: 20px;
                vertical-align: middle;
                font-weight:bold;
            }
        }
        .right_status{
            font-size: 24px;
            vertical-align: middle;
            & span{
                vertical-align: middle;
            }
        }
    }
    .text_row{
        display: flex;
        justify-content: space-between;
        // padding: 0 10px;
        line-height: 52px;
        &.text_title{
            color: #9B9B9B;
            font-size: 22px;
            margin-top: 8px;
        }
        &.text_content{
            color: #333;
            font-size: 28px;
        }
        &>span{
            flex: 0 1 33%;
            text-align: left;
            white-space: nowrap;
            &:nth-child(1) {
                flex: 0 1 40%;
                // text-align: left;
            }
            &:last-child{
                text-align: right;
            }
        }
    }
}
</style>
