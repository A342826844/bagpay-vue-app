<template>
    <div class="otc-submit">
        <TitleHeader>
            <template #title>
                {{ orderDetail.type | orderSide}}
                <span class="primary-color">{{orderDetail.coin && orderDetail.coin.toUpperCase()}}</span>
            </template>
            <div class="otc-submit-box app-margin-t40">
                <div class="flex-between-c app-padding40">
                    <div>
                        <div class="flex-start-c">
                            <h5 class="name">{{ orderDetail.nickname }}</h5>
                            <img class="app-img-50" src="@/assets/img/common/arrow_right1.png" alt="">
                        </div>
                        <p class="otc-submit-pay">Huione Pay</p>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">单价</p>
                        <h6 class="app-size-34 primary-color otc-submit-price">{{ orderDetail.price }}</h6>
                    </div>
                </div>
                <div class="flex-between-c app-padding40 app-margin-t40">
                    <div class="text-align-l">
                        <p class="lable">数量(USDT)</p>
                        <h6 class="app-size-34 otc-submit-price">{{ orderDetail.total }}</h6>
                    </div>
                    <div class="text-align-r">
                        <p class="lable">限额</p>
                        <h6 class="app-size-34 otc-submit-price">{{orderDetail.min_value}}~{{orderDetail.max_value}}</h6>
                    </div>
                </div>
                <div class="app-padding40 app-margin-t40">
                    <div class="border-b "></div>
                </div>
                <div class="text-align-l otc-submit-mark app-padding40">
                    <p class="lable">备注</p>
                    <div class="otc-submit-num">
                        {{ orderDetail.remark }}
                    </div>
                </div>
            </div>
        </TitleHeader>
        <form class="otc-submit-form app-padding40 text-align-l app-size-34">
            <div class="form-lable">购买数量</div>
            <Inputs
                class="form-input"
                :placeholder="`最大可买${maxTip} ${orderDetail.coin && orderDetail.coin.toUpperCase()}`"
                v-model="form.amount"
            />
            <div class="form-lable">支付金额</div>
            <Inputs
                class="form-input"
                :placeholder="`单笔最低${minTip} ${_unit}`"
                v-model="form.value"
            />
        </form>
        <div>
            <Poptip>
                <PoptipItem>
                    为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。
                </PoptipItem>
                <PoptipItem>
                    请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
                </PoptipItem>
            </Poptip>
        </div>
        <div class="app-size-34 lxa-footer-bottom flex-around-c">
            <Button :radius="false" @click="$router.go(-1)" type="cancel">取消（{{download}} s）</Button>
            <Button :radius="false"  @click="submitHandle" type="up">确定</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    orderDetail: any;
    timer: any;
    download: number;
    form: {
        amount: string;
        value: string;
    };
}

export default Vue.extend({
    name: 'OtcSubmit',
    data(): data {
        return {
            download: 60,
            timer: 0,
            orderDetail: {
                // id: 1,
                // uid: 10, // 所属用户id
                // nickname: 'allen', // 昵称
                // coin: 'usdt', // 币种
                // type: 1, // OrderSide 交易方向
                // price: 1, // 价格
                // total: 100, // 总数量
                // filled: 10, // 已成交
                // filled_value: 10, // 已成交金额
                // frozen: 0, // 下单被冻结数量
                // min_value: 10, // 最小下单金额
                // max_value: 100, // 最大下单金额
                // pay_types: '1,2', // 支持的支付类型
                // country: 1, // 国家类型
                // currency: 1, // 货币类型
                // remark: '', // 备注
                // status: 1, // OrderState
                // floating_rate: 0, // 采用浮动价格后有效，溢价比例，0为不采用浮动价格, 1为不溢价，大于1为正溢价，小于1为负溢价
                // close_why: '', // 平台强制关闭的原因
                // created_at: '', // 创建时间
            },
            form: {
                amount: '',
                value: '',
            },
        };
    },
    created() {
        this.getOrder();
        this.downLoadHandle();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    computed: {
        maxTip() {
            const {
                max_value, total, price, frozen,
            } = (this as any).orderDetail;
            const maxValue = (max_value / price).toFixed(2);
            const maxTotal = (total - frozen).toFixed(2);
            const res = Math.max(Number(maxValue), Number(maxTotal));
            return res;
        },
        minTip() {
            return (this as any).orderDetail.min_value;
        },
    },
    methods: {
        getOrder() {
            this.orderDetail = { ...this.$route.query };
        },
        downLoadHandle() {
            this.timer = setInterval(() => {
                this.download -= 1;
                console.log(2121);
                if (this.download === 0) {
                    this.$router.go(-1);
                }
            }, 1000);
        },
        submitHandle() {
            this.otcDealSubmit();
        },
        otcDealSubmit() {
            const params = {
                order_id: this.orderDetail.id, // [int64] 广告id
                pay_type: 1, // [PayType] 支付类型
                price: 1, // [float64] 价格
                amount: 1, // [float64] 数量
            };
            this.$api.otcDealSubmit(params).then((res: any) => {
                this.$router.replace(`/otc/order/detail?id=${res.date.id}`);
            });
        },
    },
});
</script>
<style lang="less" scoped>
.otc-submit{
    background: #f8f8f8;
    height: 100%;
    padding-bottom: 100px;
    overflow: scroll;
    .lable{
        color: #A5A5A5;
    }
    .name{
        color: #202025;
        font-size: 28px;
    }
    .value{
        color: #333333;
    }
    &-pay{
        margin-top: 8px;
    }
    &-price{
        margin-top: 15px;
    }
    &-num{
        margin-top: 22px;
        line-height: 50px;
    }
    &-mark{
        padding-top: 33px;
        color: #333333;
        font-size: 28px;
        height: 248px;
        .lable{
            font-size: 24px;
        }
    }
    &-form{
        margin-top: 34px;
        padding-top: 53px;
        background: #ffffff;
        .form-lable{
            margin-bottom: 43px;
        }
        .form-input{
            margin-bottom: 43px;
        }
    }
}
</style>
