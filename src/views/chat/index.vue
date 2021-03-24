<template>
    <div class="chat flex-column">
        <div>
            <ChatHeader></ChatHeader>
        </div>
        <div class="flex-item-1 chat-message-box">
            <Message></Message>
        </div>
        <div>
            <UserText></UserText>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Message from './components/Message.vue';
import UserText from './components/UserText.vue';
import ChatHeader from './components/ChatHeader.vue';

export default Vue.extend({
    components: {
        Message,
        UserText,
        ChatHeader,
    },
    name: 'Chat',
});
</script>
<style lang="less" scoped>
.chat{
    height: 100%;
    &-message-box{
        background: pink;
        overflow: scroll;
    }
}
</style>
