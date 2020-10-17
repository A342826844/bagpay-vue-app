<template>
    <div class="otc-appeal">
        <TitleHeader :title="'订单申诉'" />
        <div class="otc-appeal-body  bg-white">
            <div class="otc-appeal-body-textarea border-b">
                <h3>{{'申述原因'}}</h3>
                <textarea name="" v-model="form.remark" @input="textareaInput" :placeholder="'请输入申述原因'" id="" cols="30" rows="10"></textarea>
                <span>{{form.remark.length}}/120</span>
            </div>
            <div class="otc-appeal-body-tel border-b">
                <h3>{{'联系方式'}}</h3>
                <input v-model="form.tel" :placeholder="'请输入手机号码/QQ/微信号'" type="text">
            </div>
            <div class="otc-appeal-body-upload">
                <h3 class="voucher">{{'上传图片凭证'}}</h3>
                <div class="img-box" >
                    <label for="imgfile" class="add-img">
                        <!-- <img src="@/assets/img/otc/addImg.png" accept="image/*" alt=""> -->
                        <span>{{'添加图片'}}</span>
                    </label>
                    <div class="img" v-if="upload">
                        <img @click="showImgHandle" :src="upload" alt="">
                    </div>
                </div>
                <div v-show="percent" class="myProgress">
                    <!-- <myProgress :percent="percent"></myProgress> -->
                </div>
                <input id="imgfile" @change="fileChange" type="file">
            </div>
        </div>
        <div class="app-size-34 lxa-footer-bottom flex-around-c">
            <Button :radius="false"  @click="submitHandle" type="up">确定</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'OtcSubmit',
    data() {
        return {
            upload: '',
            percent: 0,
            form: {
                remark: '',
                tel: '',
            },
        };
    },
    methods: {
        submitHandle() {
            console.log('submitHandle');
        },
        textareaInput() {
            console.log('textareaInput');
        },
        showImgHandle() {
            console.log('showImgHandle');
        },
        fileChange() {
            console.log('fileChange');
        },
    },
});
</script>
<style lang="less" scoped>
.otc-appeal{
    background: #f8f8f8;
    height: 100%;
    padding-bottom: 100px;
    overflow: scroll;
    &-body{
        padding: 0 25px;
        h3{
            width: 189px;
            color: #575757;
            font-size: 28px;
            line-height: 24px;
            text-align: left;
            &.voucher{
                width: 100%;
            }
        }
        &-textarea{
            display: flex;
            justify-content: flex-start;
            height: 300px;
            margin-top: 46px;
            padding-bottom: 50px;
            position: relative;
            span{
                position: absolute;
                right: 0;
                bottom: 50px;
            }
            textarea{
                color: #AAAAAA;
                line-height: 24px;
                font-size:24px;
                flex: 1;
            }
        }
        &-tel{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 119px;
            input{
                flex: 1;
            }
        }
        &-upload{
            padding-bottom: 47px;
            position: relative;
            .img-box{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .img{
                flex: 1;
                img{
                    width: 80%;
                    height: auto;
                }
            }
            h3{
                padding: 47px 0 39px;
            }
            .add-img{
                width:216px;
                height:188px;
                border:3px solid #D2D2D2;
                img{
                    width: 123px;
                    height: auto;
                    display: block;
                    margin: 25px auto 0;
                }
                span{
                    font-size:24px;
                    color:#949CA2;
                }
            }
            input{
                // visibility: hidden;
                opacity: 0;
                position: absolute;
                z-index: 1;
                top: 100px;
                left: 0;
                width:216px;
                height:188px;
            }
            .myProgress{
                position: absolute;
                z-index: 2;
                top: 80px;
                left: 0;
                right: 0;
                width: 220px;
                height: 220px;
                margin: 0 auto;
            }
        }
    }
}
</style>
