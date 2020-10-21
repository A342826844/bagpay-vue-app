<template>
    <div>
        <Headers></Headers>
        <div class="text" @touchmove.stop=''>
            <p>{{$app_mark}}{{$t('广告发布方协议')}}</p>
            <ul style="text-align:left;">
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord2')}}</li>
                <li></li>
                <li>1. {{$t('otcProtoWord.protoWord3')}}</li>
                <li></li>
                <li>2. {{$t('otcProtoWord.protoWord4')}}</li>
                <li></li>
                <li>3. {{$t('otcProtoWord.protoWord4_1')}}</li>
                <li></li>
                <li>4. {{$t('otcProtoWord.protoWord5')}}</li>
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord6')}}</li>
                <li></li>
                <li class="text-bold">
                    1. {{$t('otcProtoWord.protoWord7')}}
                    <span @click="goUserProtocol" class="color-main">{{$t('register.userProtocol')}}</span>
                    {{$t('otcProtoWord.protoWord7_1')}}
                </li>
                <li></li>
                <li class="text-bold">2. {{$t('otcProtoWord.protoWord8')}}</li>
                <li></li>
                <li class="text-bold">3. {{$t('otcProtoWord.protoWord9')}}</li>
                <li></li>
                <li class="text-bold">4. {{$t('otcProtoWord.protoWord10')}}</li>
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord13')}}</li>
                <!-- <li></li> -->
                <li>{{$t('otcProtoWord.protoWord14')}}</li>
                <li></li>
                <li><span class="text-bold"> 1.1</span> {{$t('otcProtoWord.protoWord15')}}</li>
                <li></li>
                <li><span class="text-bold"> 1.2</span> {{$t('otcProtoWord.protoWord16')}}</li>
                <li></li>
                <li><span class="text-bold"> 1.3</span> {{$t('otcProtoWord.protoWord17')}}</li>
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord18')}}</li>
                <!-- <li></li> -->
                <li>{{$t('otcProtoWord.protoWord19')}}</li>
                <li></li>
                <li><span class="text-bold">2.1 {{$t('otcProtoWord.protoWord20')}}</span> {{$t('otcProtoWord.protoWord21')}}</li>
                <li></li>
                <li><span class="text-bold">2.2 {{$t('otcProtoWord.protoWord22')}}</span> {{$t('otcProtoWord.protoWord23')}}</li>
                <li></li>
                <li><span class="text-bold">2.3 {{$t('otcProtoWord.protoWord24')}}</span> {{$t('otcProtoWord.protoWord25')}}</li>
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord26')}}</li>
                <li>{{$t('otcProtoWord.protoWord27')}}</li>
                <li></li>
                <li><span class="text-bold">3.1 {{$t('otcProtoWord.protoWord28')}}</span>{{$t('otcProtoWord.protoWord29')}}</li>
                <li></li>
                <li><span class="text-bold">3.2 {{$t('otcProtoWord.protoWord30')}}</span></li>
                <li></li>
                <li>3.2.1 {{$t('otcProtoWord.protoWord31')}}</li>
                <li></li>
                <li>3.2.2{{$t('otcProtoWord.protoWord32')}}</li>
                <li></li>
                <li>3.2.3 {{$t('otcProtoWord.protoWord33')}}</li>
                <li></li>
                <li><span class="text-bold">3.3 {{$t('otcProtoWord.protoWord34')}}</span></li>
                <li></li>
                <li>3.3.1 {{$t('otcProtoWord.protoWord35')}}</li>
                <li></li>
                <li>3.3.2{{$t('otcProtoWord.protoWord36')}}</li>
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord37')}}</li>
                <li></li>
                <li><span class="text-bold">4.1 {{$t('otcProtoWord.protoWord38')}}</span>{{$t('otcProtoWord.protoWord39')}}</li>
                <li></li>
                <li class="text-bold">4.2 {{$t('otcProtoWord.protoWord40')}}</li>
                <li  class="text-bold">{{$t('otcProtoWord.protoWord41')}}</li>
                <li></li>
                <li>4.2.1 {{$t('otcProtoWord.protoWord42')}}</li>
                <li></li>
                <li>4.2.2 {{$t('otcProtoWord.protoWord43')}}</li>
                <li></li>
                <li>4.2.3 {{$t('otcProtoWord.protoWord44')}}</li>
                <li></li>
                <li>4.2.4 {{$t('otcProtoWord.protoWord45')}}</li>
                <li></li>
                <li>4.2.5 {{$t('otcProtoWord.protoWord46')}}</li>
                <li></li>
                <li>4.2.6 {{$t('otcProtoWord.protoWord47')}}</li>
                <li></li>
                <li>4.2.7 {{$t('otcProtoWord.protoWord48')}}</li>
                <li></li>
                <li>4.2.8 {{$t('otcProtoWord.protoWord49')}}</li>
                <li></li>
                <li>4.2.9 {{$t('otcProtoWord.protoWord50')}}</li>
                <li></li>
                <li>4.2.10  {{$t('otcProtoWord.protoWord51')}}</li>
                <li></li>
                <li class="text-bold">4.3 {{$t('otcProtoWord.protoWord52')}}</li>
                <li></li>
                <li>4.2.1 {{$t('otcProtoWord.protoWord53')}}</li>
                <li></li>
                <li>4.2.2 {{$t('otcProtoWord.protoWord54')}}</li>
                <li></li>
                <li>(1) {{$t('otcProtoWord.protoWord55')}}</li>
                <li></li>
                <li>(2) {{$t('otcProtoWord.protoWord56')}}</li>
                <li></li>
                <li>(3) {{$t('otcProtoWord.protoWord57')}}</li>
                <li></li>
                <li>(4) {{$t('otcProtoWord.protoWord58')}}</li>
                <li></li>
                <li>(5){{$t('otcProtoWord.protoWord59')}}</li>
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord60')}}</li>
                <li></li>
                <li class="text-bold">5.1 {{$t('otcProtoWord.protoWord61')}}</li>
                <li>{{$t('otcProtoWord.protoWord62')}}</li>
                <li></li>
                <li class="text-bold">5.2 {{$t('otcProtoWord.protoWord63')}}</li>
                <li></li>
                <li >{{$t('otcProtoWord.protoWord64')}}</li>
                <li></li>
                <li>(1) {{$t('otcProtoWord.protoWord65')}}</li>
                <li></li>
                <li>(2) {{$t('otcProtoWord.protoWord66')}}</li>
                <li></li>
                <li>(3) {{$t('otcProtoWord.protoWord67')}}</li>
                <li></li>
                <li>(4) {{$t('otcProtoWord.protoWord68')}}</li>
                <li></li>
                <li>(5) {{$t('otcProtoWord.protoWord69')}}</li>
                <li></li>
                <li>(6) {{$t('otcProtoWord.protoWord70')}}</li>
                <li></li>
                <li>(7) {{$t('otcProtoWord.protoWord71')}}</li>
                <li></li>
                <li>(8) {{$t('otcProtoWord.protoWord72')}}</li>
                <li></li>
                <li>(9) {{$t('otcProtoWord.protoWord73')}}</li>
                <li></li>
                <li>(10) {{$t('otcProtoWord.protoWord74')}}</li>
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord75')}}</li>
                <li>
                    {{$t('otcProtoWord.protoWord76')}}
                    <span @click="goUserProtocol" class="color-main">{{$t('register.userProtocol')}}</span>
                    {{$t('otcProtoWord.protoWord76_1')}}
                </li>
                <li></li>
                <li class="text-bold">6.1 {{$t('otcProtoWord.protoWord77')}}</li>
                <li></li>
                <li class="text-bold">6.2 {{$t('otcProtoWord.protoWord78')}}</li>
                <li></li>
                <li class="text-bold">6.3 {{$t('otcProtoWord.protoWord79')}}</li>
                <li></li>
                <li class="text-bold">6.4 {{$t('otcProtoWord.protoWord80')}}</li>
                <li></li>
                <li class="font-bold">{{$t('otcProtoWord.protoWord81')}}</li>
                <li></li>
                <li><span class="text-bold">7.1 </span>{{$t('otcProtoWord.protoWord82')}}</li>
                <li></li>
                <li><span class="text-bold">7.2
                    </span>{{$t('otcProtoWord.protoWord83')}}
                    <span @click="contact" class="color-main">{{$t('stopPopup.8tpcgGae')}} </span>
                </li>
                <li></li>
                <li><span class="text-bold">7.3 </span>{{$t('otcProtoWord.protoWord84')}}</li>
                <li></li>
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
