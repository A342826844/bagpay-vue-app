<template>
    <div class="payment primary-bg">
        <TitleHeader class="payment-body" theme="primary" ref="titleHeader" :title="$t('payment.paymentTitle')">

            <div class="payment-card payment-info">
                <h5 class="payment-info-title">{{$t('home.paymentTip') + symbol.toUpperCase()}}</h5>
                <div :class="hasProtocol ? 'chainshow' : 'chainhide' " class="payment-chain">
                    <ul class="flex-center">
                        <li class="payment-chain-item" @click="selectChain(item)" v-for="item in chainList" :key="item.id">
                            <Button :type="activeProtocol.protocol === item.protocol ? 'primary' : 'disabled'" size="auto">
                                {{ item.protocol.toUpperCase() }}
                            </Button>
                        </li>
                    </ul>
                    <!-- <Select @click="showPopupHandle">
                        <div class="flex-between-c">
                            <span v-t="'common.chainProtocol'"></span>
                            <span class="vertical-m">
                                {{activeProtocol.protocol && activeProtocol.protocol.toUpperCase()}}
                            </span>
                        </div>
                    </Select> -->
                </div>
                <div class="payment-info-qrcode" :style="{width: `${size + 15}px`, height: `${size + 15}px`}">
                    <Loading v-show="loading"/>
                    <QrcodeVue ref="qrcode" v-show="qrValue" foreground="#5894EE" :size="size" :value="qrValue"></QrcodeVue>
                </div>
                <div>
                    <h5 class="payment-info-title" v-t="'payment.paymentAddr'"></h5>
                    <p class="payment-info-address">{{address}}</p>
                </div>
                <div class="payment-info-btn">
                    <img @click="$copyText(address)" src="../../assets/img/common/copy.png" alt="">
                    <img @click="html2CanvasHnadle" src="../../assets/img/common/share.png" alt="">
                </div>
            </div>
            <Poptip class="payment-poptip">
                <PoptipItem notRed>
                    {{ $t("home.paymentTip1", {"symbol": symbol.toUpperCase()}) }}
                </PoptipItem>
                <PoptipItem notRed v-show="!hasProtocol">
                    {{ $t("home.paymentTip2", {"symbol": symbol.toUpperCase()}) }}
                </PoptipItem>
                <PoptipItem notRed v-show="hasProtocol">
                    {{$t('common.erc20Charge', {
                        protocol: activeProtocol.protocol && activeProtocol.protocol.toUpperCase(),
                        coin: symbol && symbol.toUpperCase()
                    })}}
                </PoptipItem>
                <PoptipItem notRed>
                    {{ $t("home.paymentTip3") }}
                </PoptipItem>
            </Poptip>
        </TitleHeader>
        <SelectPopup v-model="chainPopup">
            <SelectPopupItem
                v-for="item in chainList"
                :key="item.id"
                class="select-box"
                @click="selectChain(item)"
            >
                {{ item.protocol.toUpperCase() }}
            </SelectPopupItem>
        </SelectPopup>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import html2canvas from 'html2canvas';
import QrcodeVue from 'qrcode.vue';
import Loading from '@/components/loading/index.vue'; // @ is an alias to /src
import {
    // getQueryValue,
    // isBagPayUrl,
    // getQueryUrl,
    queryStringify,
} from '@/utils/tool';

type data = {
    chainPopup: boolean; // 显示协议弹出
    hasProtocol: boolean; // 是否有协议
    activeProtocol: any; // 所选协议
    chainList: any[]; // 协议列表
    address: string; // 地址
    loading: boolean; // 是否在加载中
    symbol: string; // 币种
    qrValue: string; // 二维码的值
    memo: string; // 备注
    value: string; // 暂时没用
    size: number; // 二维码大小
}

export default Vue.extend({
    name: 'Payment',
    components: {
        QrcodeVue,
        Loading,
    },
    data(): data {
        return {
            chainPopup: false,
            hasProtocol: false,
            activeProtocol: {},
            chainList: [],
            address: '',
            symbol: '',
            loading: true,
            qrValue: '',
            value: '',
            memo: '',
            size: 100,
        };
    },
    created() {
        this.size = window.innerWidth * 0.42;
        this.symbol = this.$route.query.symbol as string;
        this.getDataHandle();
        // this.getDeposit();
        // this.$api.getCoinProtocols(this.symbol);
    },
    methods: {
        selectChain(item: any) {
            this.activeProtocol = { ...item };
            this.loading = true;
            this.getDeposit(this.activeProtocol.protocol);
        },
        showPopupHandle() {
            if (this.hasProtocol) {
                this.chainPopup = true;
            }
        },
        html2CanvasHnadle() {
            this.loading = true;
            html2canvas((this.$refs.titleHeader as any).$el).then((canvas: HTMLCanvasElement) => {
                const shareImg = canvas.toDataURL('image/png');
                this.shareDataHandle(shareImg);
            });
        },
        shareDataHandle(base64: string) {
            try {
                // const qrcodeDom = ((this.$refs.qrcode as any).$el as HTMLElement);
                // const canvas = (qrcodeDom.querySelector('canvas') as HTMLCanvasElement);
                // const base64 = canvas.toDataURL('image/png');
                this.$saveImg(base64, (url: string) => {
                    this.loading = false;
                    if (this.$route.name !== 'payment') return;
                    this.$shareDataHandle({
                        type: 'image',
                        pictures: [url],
                        title: '',
                    }, () => {
                        // that.$normalToast(that.$t('invitauser.invitationSuccess'), 1000);
                    }, () => {
                        this.$normalToast(this.$t('common.invitationFail'), 1000);
                    });
                }, () => {
                    this.$normalToast(this.$t('common.invitationFail'), 1000);
                });
            } catch (e) {
                this.$normalToast(this.$t('common.invitationFail'), 1000);
            }
        },
        getDataHandle() {
            this.getCoinProtocols().then((res: any) => {
                if (res.length) {
                    this.activeProtocol = { ...res[0] };
                    this.getDeposit(this.activeProtocol.protocol);
                    this.hasProtocol = true;
                    this.chainList = res;
                    return;
                }
                this.activeProtocol = {};
                this.hasProtocol = false;
                this.chainList = [];
                this.getDeposit();
            });
        },
        getCoinProtocols() {
            return this.$api.getCoinProtocols(this.symbol).then((res: any) => {
                if (res.data) return res.data;
                return [];
            }).catch(() => []);
        },
        getDeposit(protocol?: string) {
            this.$api.getDeposit({
                protocol,
                coin: this.symbol,
            }).then((res: any) => {
                if (res.data) {
                    this.address = res.data.address;
                    this.memo = res.data.memo;
                    this.qrValue = queryStringify({
                        address: this.address,
                        symbol: this.symbol,
                        value: '',
                        memo: this.memo,
                        protocol: this.activeProtocol.protocol,
                    });
                    this.loading = false;
                }
            });
        },
    },
});
</script>

<style lang="less" scoped>
@import '../../assets/less/excludecss/index.less';
.payment{
    height: 100%;
    overflow: scroll;
    &-body{
        padding-bottom: 55px;
    }

    &-card{
        background: #FFFFFF;
        color: #585858;
        box-shadow: 1px 4px 13px 0px rgba(198, 194, 216, 0.5);
        margin: auto;
        margin-top: 49px;
        width: 650px;
        border-radius: 20px;
    }
    &-chain{
        &-item{
            margin: 0 15px;
        }
    }
    .chainshow{
        margin-top: 49px;
        height: 99px;
        opacity: 1;
        transition: all 0.3s;
    }
    .chainhide{
        height: 0;
        transition: all 0.3s;
        margin-top: 0;
        opacity: 0;
    }
    &-info{
        position: relative;
        padding-top: 71px;
        height: 992px;
        &-title{
            font-size: 34px;
        }
        &-qrcode{
            margin: 59px 0 71px;
            display: inline-block;
            padding: 15px;
            .scale-1px(#98D0FF, 10px);
        }
        &-address{
            margin-top: 29px;
            color: #A5A5A5;
        }
        &-btn{
            position: absolute;
            bottom: 60px;
            right: 37px;
            img{
                width: 50px;
                margin-left: 46px;
            }
        }
    }
    &-poptip{
        color: #FFFFFF;
    }
}
</style>
