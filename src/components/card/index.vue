<template>
    <div @click="$emit('click')" class="n_card_item">
        <div class="card_title">
            <div class="left_cont">
                <slot name="title"></slot>
            </div>
            <div class="right_status" v-if="$slots.right">
                <slot name="right"></slot>
                <img v-show="showArrow" class="arrow_icon" src="@/assets/img/common/arrow_right1.png" alt="">
            </div>
            <img v-else class="arrow_icon" src="@/assets/img/common/arrow_right1.png" alt="">
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
        showArrow: Boolean,
    },
    data() {
        return {};
    },
};
</script>

<style lang="less">
.n_card_item{
    border-bottom: 1px solid #DBDBDB;
    padding: 30px 20px;
    .card_title{
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:34px;
        color: #202025;
        // font-weight:bold;
        margin-bottom: 12px;

        .left_cont{
            &>span{
                margin-right: 20px;
                vertical-align: middle;
                &:first-child{
                font-weight:bold;
                }
            }
        }
        .right_status{
            font-size: 24px;
            vertical-align: middle;
            & span{
                vertical-align: middle;
            }
        }
        .arrow_icon{
            width:11px;
            height:19px;
            vertical-align: middle;
            margin-left: 8px;
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
