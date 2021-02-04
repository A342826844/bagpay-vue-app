<template>
    <div class="red-envelope flex-column">
        <Headers ref="headers" bold theme="red" title="发红包"/>
        <div ref="fringe" class="red-envelope-fringe">
            <div class="red-envelope-fringe-info red-bg"></div>
        </div>
        <div class="red-envelope-info">
            <div class="red-envelope-box1 app-padding40 app-size-34">
                <div class="form-item">
                    <Select @click="$router.push(`/choisesymbol?symbol=${form.coin}&type=1`)">
                        <span class=" form-item-start">
                            <IconImg class="app-img-50" :symbol="form.coin"/>
                        </span>
                        <span class="vertical-m"> {{form.coin && form.coin.toUpperCase()}}</span>
                    </Select>
                </div>
                <div class="form-lable flex-between-c">
                    <div>单个金额</div>
                    <div class="form-item-switch" @click="form.type = (form.type ? 0 : 1)">
                        <img src="@/assets/img/common/switch2.png" class="app-img-50" alt="">
                        <span> {{form.type | redEnvelopeType}}</span>
                    </div>
                </div>
                <div class="form-item">
                    <Inputs :decimal="coinInfo.decimal" v-model="form.amount" placeholder="填写金额">
                        {{form.coin && form.coin.toUpperCase()}}
                    </Inputs>
                </div>
                <div class="form-lable flex-between-c">
                    <!-- TODO: 取消这个事件 -->
                    <span @click="testHandle">红包个数</span>
                </div>
                <div class="form-item">
                    <Inputs decimal="0" v-model="form.shares" placeholder="填写个数">
                        个
                    </Inputs>
                </div>
            </div>
            <div class="light-grey-bg red-envelope-empty"></div>
            <div class="red-envelope-box2 app-padding40 app-size-34">
                <div class="form-lable flex-between-c">
                    <div>祝福语</div>
                </div>
                <div class="form-item">
                    <Inputs maxlength="30" v-model="form.text" :placeholder="luckyText"></Inputs>
                </div>
                <div class="ellipsis-1">
                    <b class="app-size-100 yellow-color">{{Number(form.amount) || 0}} </b>
                    <span class="envelope-coin color-light"> {{form.coin && form.coin.toUpperCase()}}</span>
                </div>
                <div class="form-btn">
                    <Button @click="verfyValue" type="down">发送红包</Button>
                    <p class="form-btn-tip app-size-28">24小时内未被领取，红包金额将退回</p>
                </div>
            </div>
        </div>
        <V-Popup
            position="bottom"
            class="app-popup-bottom"
            :overlay-style="{ background: 'rgba(62, 62, 62, 0.3)' }"
            v-model="popup"
        >
            <div class="text-align-r popup-colse">
                <img class="app-img-50" @click="popup=false" src="@/assets/img/common/close.png" alt/>
            </div>
            <div class="app-padding40 red-envelope-box3 app-size-34">
                <!-- <div class="form-lable flex-between-c">
                    <div>支付密码</div>
                </div>
                <div class="form-item">
                    <Inputs v-model="form.pws" placeholder="请输入您的交易密码"></Inputs>
                </div> -->
                <div class="form-lable flex-between-c">
                    <div>红包口令</div>
                </div>
                <div class="form-item">
                    <Inputs maxlength="64" v-model="form.cdk" placeholder="设置红包口令"></Inputs>
                </div>
                <div class="form-btn">
                    <Button @click="redEnvelopeSend" type="down">发送红包</Button>
                </div>
            </div>
        </V-Popup>
        <V-Popup
            class="send-success"
            v-model="show"
            :overlay-style="{ background: 'rgba(62, 62, 62, 0.3)' }"
            @click-overlay="closedHandle"
        >
            <div class="send-success-info">
                <img class="send-success-bg" src="@/assets/img/envelope/send-s.png" alt="">
                <div class="send-success-box">
                    <h5 class="send-success-tip">红包已备好</h5>
                    <div @click="$copyText(dataInfo.cdk)" class="send-success-btn">
                        <span class="form-item2-btn btn app-size-45 ">复制口令</span>
                    </div>
                    <div @click="shareHandle(dataInfo.cdk)" class="send-success-btn">
                        <span class="form-item2-btn btn app-size-45 ">分享口令</span>
                    </div>
                </div>
            </div>
            <div>
                <img @click="closedHandle" class="app-img-50" src="@/assets/img/common/close1.png" alt="">
            </div>
        </V-Popup>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    popup: boolean;
    show: boolean;
    luckyText: string;
    dataInfo: any;
    form: {
        cdk: string; // [string] 可选,口令
        coin: string; // [string] 币种
        password: string; // [string] 密码
        amount: string; // [float64] 金额
        shares: string; // [int] 份数,至少为1
        type: 0|1; // [int] 0.固定金额 1.拼手气
        text: string; // [string] 消息
    };
}

// TODO
const defaultLucky: any = {
    'zh-CN': ['恭喜发财，大吉大利'],
    'en-us': ['May everything turn out as you wish'],
    'zh-tw': ['恭喜發財，大吉大利'],
};

export default Vue.extend({
    name: 'Envelope',
    data(): data {
        return {
            popup: false,
            show: false,
            luckyText: '',
            dataInfo: {
                amount: 10,
                cdk: '414141',
                chat_id: 0,
                coin: 'usdt',
                created_at: '2021-02-04 07:05:54',
                id: 61,
                refund_at: null,
                shares: 2,
                text: '恭喜发财，大吉大利',
                took_amount: 0,
                took_count: 0,
                type: 1,
                uid: 75,
            },
            form: {
                cdk: '', // [string] 可选,口令
                coin: 'usdt', // [string] 币种
                password: '', // [string] 密码
                amount: '', // [float64] 金额
                shares: '', // [int] 份数,至少为1
                type: 1, // [int] 0.固定金额 1.拼手气
                text: '', // [string] 消息
            },
        };
    },
    created() {
        [this.luckyText] = defaultLucky[this.lang];
    },
    beforeRouteEnter(to, from, next) {
        next((vm: any) => {
            if (from.name === 'choisesymbol') {
                // eslint-disable-next-line no-param-reassign
                vm.form.coin = sessionStorage.getItem('symbol');
            }
        });
    },
    computed: {
        coinInfo(): CoinInfo {
            return this.$store.getters.getCoinInfo(this.form.coin);
        },
        lang(): string {
            return this.$store.state.lang;
        },
        cdk(): string {
            return '';
        },
    },
    methods: {
        verfyValue() {
            if (!Number(this.form.shares)) {
                this.$normalToast('请输入红包金额');
                return;
            }
            if (!Number(this.form.shares)) {
                this.$normalToast('请输入红包个数');
                return;
            }
            if (Number(this.form.shares) <= 0) {
                this.$normalToast('调皮，最少发1个');
                return;
            }
            this.popup = true;
        },
        redEnvelopeSend() {
            if (!this.form.cdk) {
                this.$normalToast('请输入红包口令');
                return;
            }
            if (this.form.cdk.length < 6) {
                this.$normalToast(this.$t('error.ERR_CDK_TOO_SHORT'));
                return;
            }
            const params = {
                ...this.form,
                text: this.form.text || this.luckyText,
            };
            if (this._loading) return;
            this.changeLoading(true);
            this.$api.redEnvelopeSend(params).then((res: any) => {
                this.dataInfo = res.data;
                this.show = true;
                this.popup = false;
            }).finally(() => {
                this.changeLoading(false);
            });
        },
        shareHandle(content: string) {
            this.$shareDataHandle({
                content,
                type: 'text',
            }, () => {
                // that.$normalToast(that.$t('invitauser.invitationSuccess'), 1000);
            }, () => {
                this.$normalToast(this.$t('common.invitationFail'), 1000);
            });
        },
        testHandle() {
            this.$getRedEnvelopeCdk('请前往BagPay钱包输入口令👉这是领取红包的口令👈领取红包 https://bagpay.io/');
        },
        closedHandle() {
            this.show = false;
            this.$router.push(`/redEnvelopeLog?id=${this.dataInfo.id}`);
        },
    },
});
</script>

<style lang="less" scoped>
.red-envelope{
    height: 100%;
    overflow: scroll;
    .color-light{
        color: #A6A6A6;
    }
    &-fringe{
        height: 100px;
        left: 0;
        top: 68px;
        width: 100%;
        position: absolute;
        overflow: hidden;
        background: #fff;
        z-index: 2000;
        &-info{
            border-radius: 0 0 50% 50%;
            height: 1500px;
            width: 1500px;
            left: -50%;
            position: absolute;
            top: -1400px;
        }
    }
    &-info{
        height: calc(100% - 100px);
        overflow: auto;
        margin-top: 70px;
    }
    &-empty{
        height: 13px;
    }
    &-box1{
        // margin-top: 120px;
        padding-bottom: 45px;
    }
    &-box2{
        padding-bottom: 84px;
        margin-top: 45px;
    }
    &-box3{
        padding-bottom: 84px;
    }
    .form-item{
        margin: 40px 0;
        &-switch{
            min-width: 100px;
            transition: all 0.3s;
        }
    }
    .form-btn{
        margin-top: 45px;
        &-tip{
            margin-top: 45px;
            color: #A6A6A6;
        }
    }
    .popup-colse{
        margin: 40px;
    }
}
.send-success{
    background: transparent;
    &-bg{
        width: 750px;
    }
    &-info{
        position: relative;
    }
    &-box{
        position: absolute;
        top: 600px;
        margin: 0 auto;
        left: 0;
        right: 0;
    }
    &-tip{
        // margin-top: 338px;
        font-size: 40px;
        font-weight: 900;
        color: #FADA26 ;
        background: linear-gradient(0deg, #FADA26 0%, #FFF8E1 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-bottom: 60px;
    }
    &-btn{
        width: 567px;
        margin: 48px auto;
        height: 100px;
        color: #EF2B31;
        line-height: 100px;
        background: linear-gradient(0deg, #F8C136  0%, #FFEFBE 100%);
        border-radius: 50px;
    }
}
</style>
