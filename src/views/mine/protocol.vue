<template>
    <div>
        <Headers></Headers>
        <div class="text" @touchmove.stop=''>
            <p>{{$app_mark}}{{$t('mine.protocol')}}</p>
            <ul style="text-align:left;">
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord2')}}</li>
                <li></li>
                <li>1. {{$t('mineProtocol.protoWord3')}}</li>
                <li></li>
                <li>2. {{$t('mineProtocol.protoWord4')}}</li>
                <li></li>
                <li>3. {{$t('mineProtocol.protoWord4_1')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord13')}}</li>
                <li></li>
                <li><span class="text-bold"> 1.1</span> {{$t('mineProtocol.protoWord15')}}</li>
                <li></li>
                <li><span class="text-bold"> 1.2</span> {{$t('mineProtocol.protoWord16')}}</li>
                <li></li>
                <li><span class="text-bold"> 1.3</span> {{$t('mineProtocol.protoWord17')}}</li>
                <li></li>
                <li><span class="text-bold"> 1.4</span> {{$t('mineProtocol.protoWord17_1')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord18')}}</li>
                <li></li>
                <li><span class="text-bold">2.1 {{$t('mineProtocol.protoWord20')}}</span></li>
                <li>{{$t('mineProtocol.protoWord21')}}</li>
                <li></li>
                <li><span class="text-bold">2.2 {{$t('mineProtocol.protoWord22')}}</span></li>
                <li>{{$t('mineProtocol.protoWord23')}}</li>
                <li></li>
                <li><span class="text-bold">2.3 {{$t('mineProtocol.protoWord24')}}</span></li>
                <li>2.3.1 {{$t('mineProtocol.protoWord25')}}</li>
                <li></li>
                <li>2.3.2 {{$t('mineProtocol.protoWord25_1')}}</li>
                <li></li>
                <li>2.3.3 {{$t('mineProtocol.protoWord25_2')}}</li>
                <li></li>
                <li>2.3.4 {{$t('mineProtocol.protoWord25_3')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord26')}}</li>
                <li>{{$t('mineProtocol.protoWord27')}}</li>
                <li></li>
                <li><span class="text-bold">3.1 {{$t('mineProtocol.protoWord28')}}</span></li>
                <li>3.1.1 {{$t('mineProtocol.protoWord29')}}</li>
                <li></li>
                <li>3.1.2 {{$t('mineProtocol.protoWord29_1')}}</li>
                <li></li>
                <li>3.1.3 {{$t('mineProtocol.protoWord29_2')}}</li>
                <li></li>
                <li>3.1.4 {{$t('mineProtocol.protoWord29_3')}}</li>
                <li></li>
                <li><span class="text-bold">3.2 {{$t('mineProtocol.protoWord30')}}</span></li>
                <li></li>
                <li>{{$t('mineProtocol.protoWord34_1')}}</li>
                <li></li>
                <li>3.2.1 {{$t('mineProtocol.protoWord35')}}</li>
                <li></li>
                <li>3.2.2{{$t('mineProtocol.protoWord36')}}</li>
                <li></li>
                <li>3.2.3 {{$t('mineProtocol.protoWord36_1')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord37')}}</li>
                <li></li>
                <li> <span class="text-bold"> 4.1 </span>{{$t('mineProtocol.protoWord40')}}</li>
                <li></li>
                <li><span class="text-bold"> 4.2 </span>{{$t('mineProtocol.protoWord41')}}</li>
                <li></li>
                <li> <span class="text-bold"> 4.3 </span>{{$t('mineProtocol.protoWord42')}}</li>
                <li></li>
                <li><span class="text-bold"> 4.4 </span>{{$t('mineProtocol.protoWord43')}}</li>
                <li></li>
                <li> <span class="text-bold"> 4.5 </span>{{$t('mineProtocol.protoWord44')}}</li>
                <li></li>
                <li><span class="text-bold"> 4.6 </span>{{$t('mineProtocol.protoWord45')}}</li>
                <li></li>
                <li><span class="text-bold"> 4.7 </span>{{$t('mineProtocol.protoWord46')}}</li>
                <li></li>
                <li><span class="text-bold"> 4.8 </span>{{$t('mineProtocol.protoWord47')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord60')}}</li>
                <li></li>
                <li><span class="text-bold">5.1 </span>{{$t('mineProtocol.protoWord61')}}</li>
                <li></li>
                <li><span class="text-bold">5.2 </span>{{$t('mineProtocol.protoWord62')}}</li>
                <li></li>
                <li><span class="text-bold">5.3 </span>{{$t('mineProtocol.protoWord63')}}</li>
                <li></li>
                <li><span class="text-bold">5.4 </span>{{$t('mineProtocol.protoWord64')}}</li>
                <li></li>
                <li><span class="text-bold">5.5 </span>{{$t('mineProtocol.protoWord65')}}</li>
                <li></li>
                <li><span class="text-bold">5.6 </span>{{$t('mineProtocol.protoWord66')}}</li>
                <li></li>
                <li><span class="text-bold">5.7 </span>{{$t('mineProtocol.protoWord67')}}</li>
                <li></li>
                <li><span class="text-bold">5.8 </span>{{$t('mineProtocol.protoWord68')}}</li>
                <li></li>
                <li><span class="text-bold">5.9 </span>{{$t('mineProtocol.protoWord69')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord75')}}</li>
                <li></li>
                <li>{{$t('mineProtocol.protoWord76')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord77')}}</li>
                <li><span class="text-bold">8.1 </span>{{$t('mineProtocol.protoWord78')}}</li>
                <li></li>
                <li><span class="text-bold">8.2 </span>{{$t('mineProtocol.protoWord79')}}</li>
                <li></li>
                <li><span class="text-bold">8.3 </span>{{$t('mineProtocol.protoWord80')}}</li>
                <li></li>
                <li><span class="text-bold">8.4 </span>{{$t('mineProtocol.protoWord80_1')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord81')}}</li>
                <li></li>
                <li>{{$t('mineProtocol.protoWord82')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord83')}}</li>
                <li></li>
                <li><span class="text-bold">9.1 </span>{{$t('mineProtocol.protoWord84')}}</li>
                <li></li>
                <li><span class="text-bold">9.2 </span>{{$t('mineProtocol.protoWord85')}}</li>
                <li></li>
                <li>9.2.1 {{$t('mineProtocol.protoWord86')}}</li>
                <li></li>
                <li>9.2.2 {{$t('mineProtocol.protoWord87')}}</li>
                <li></li>
                <li>9.2.3 {{$t('mineProtocol.protoWord88')}}</li>
                <li></li>
                <li>9.2.4 {{$t('mineProtocol.protoWord89')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord90')}}</li>
                <li></li>
                <li>{{$t('mineProtocol.protoWord91')}}</li>
                <li></li>
                <li class="font-bold">{{$t('mineProtocol.protoWord92')}}</li>
                <li></li>
                <li>{{$t('mineProtocol.protoWord93')}}</li>

            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'otcProtocol',
    methods: {
        goUserProtocol() {
            this.$router.push('/protocol');
        },
        contact() {
            // TODO:联系客服
        },
    },
};

</script>

<style scoped lang="less">
    p{
        text-align: left;
    }
    .text {
        position: fixed;
        top: 88px;
        bottom: 112px;
        font-size: 24px;
        line-height: 40px;
        padding: 30px 30px 220px 30px;
        width: 100%;
        height: 100%;
        background: #fff;
        overflow: scroll;
        box-sizing: border-box;
        .font-bold {
            font-weight: bold;
            font-size: 28px;
            text-indent: inherit;
        }
        .text-bold {
            font-weight: bold;
        }
        & > p {
            padding-bottom: 50px;
            border-bottom: solid 1px #dcdcdc;
            font-weight: bold;
            font-size: 45px;
        }
        & > ul {
            & > li {
                display: block;
                width: 100%;
                text-indent: 2em;
                line-height: 50px;
                min-height: 36px;
            }
        }
    }
</style>
