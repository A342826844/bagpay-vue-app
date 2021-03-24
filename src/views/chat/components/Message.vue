<template>
    <div class="chat-content">
        <div class="message">
            <ul>
                <li v-for="(msg, index) in broadcast[currentSession.id]" :key="msg.id">
                    <p v-show="index===0 || (broadcast[currentSession.id][index].time - broadcast[currentSession.id][index-1].time > 60*5)">
                        {{ msg.time | date('MM-dd hh:mm') }}
                    </p>
                    <div class="msg app-size-34" :class="msg.user.id == currentUser.id ? 'self' : ''">
                        <!-- <img v-show="" :src="msg.user.avatar" :alt="msg.user.nickname"> -->
                        <div class="text">{{ msg.msg }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Chat',
    data() {
        return {
            currentUser: {
                id: 3,
            },
            broadcast: {
                1: [
                    {
                        time: 1542134512,
                        msg: '这是一条消息, 这是液体天阿斯顿看上的了阿瑟东i静安寺哦啊似乎陡坡起步奥萨蒂破解阿三去我欸去阿松娃娃色达我撒打算',
                        user: {
                            id: 2,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 3,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 1,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 3,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 1,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 3,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 1,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 3,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 1,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 3,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 1,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 3,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 1,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 3,
                            user: '',
                            nickname: 'test',
                        },
                    },
                    {
                        time: 1542134512,
                        msg: '这是一条消息',
                        user: {
                            id: 1,
                            user: '',
                            nickname: 'test',
                        },
                    },
                ],
            },
            currentSession: {
                id: 1,
            },
        };
    },
});
</script>

<style lang="less" scoped>
@import '../../../assets/less/color.less';
.chat-content{
    display: flex;
    flex-direction: column;
    background: #F4F6F9;
    // height: 100%;
    .title{
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #d6d6d6;

        p{
            text-align: center;
            font-size: 16px;
            color: #666;
        }
    }

    .message{
        overflow-y: scroll;
        padding: 10px 24px;
        // height: 100%;
        &::-webkit-scrollbar-button{
            display: none;
        }
        &::-webkit-scrollbar{
            width: 8px;
            background-color: #eee;
        }

        /*定义滚动条轨道 内阴影+圆角*/
        &::-webkit-scrollbar-track{
            background-color: #eee;
        }

        /*定义滑块 内阴影+圆角*/
        &::-webkit-scrollbar-thumb{
            border-radius: 10px;
            background: #ccc;
        }

        li{
            display: flex;
            flex-direction: column;
            margin-bottom: 45px;

            p{
                align-self: center;
                padding: 0 18px;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background-color: #dcdcdc;
                margin: 45px auto 24px;
            }

            .msg{
                display: flex;
                flex-direction: row;
                position: relative;

                img{
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    flex-shrink: 0;
                }
                .text{
                    padding: 25px;
                    min-height: 82px;
                    max-width: 80.8%;
                    text-align: left;
                    word-break: break-all;
                    background: #E8EEF7;
                    border-radius: 8px;
                    line-height: 1.4;
                }
                &::after{
                    content: '';
                    position: absolute;
                    border: 10px solid transparent;
                    border-right-color: #E8EEF7;
                    left: -18px;
                    top: 36px;
                    // z-index: 10;
                }
            }
            .self{
                flex-direction: row-reverse;
                .text{
                    .primary-bg;
                }
                img{
                    margin-right: 0px; margin-left: 10px;
                }
                &::after{
                    border-right-color: transparent;
                    border-left-color: @primary-bg;
                    left: auto;
                    right: -18px;
                }
            }
        }
    }
}
</style>
