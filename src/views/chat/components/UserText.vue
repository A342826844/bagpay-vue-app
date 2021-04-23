<template>
    <div class="chat-user-text flex-between-end">
        <div class="chat-user-text-left">
            <!-- TODO: -->
        </div>
        <div class="chat-user-text-center">
            <textarea class="textarea-base" ref="textareabase" name="" id="" cols="30" rows="1"></textarea>
            <textarea
                class="textarea"
                ref="textarea"
                name=""
                id=""
                :rows="rows" cols=""
                placeholder="Press enter to send"
                v-model="content"
                @keyup.enter="send"></textarea>
        </div>
        <div class="chat-user-text-right">
            <Button size="minuscule" @click="send">发送</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ChatUserText',
    data(): any {
        return {
            content: '',
            currentUser: {
                id: 1,
            },
            currentSession: {
                id: '',
            },

        };
    },
    computed: {
        // 计算输入框高度
        rows() {
            const { textarea, textareabase } = this.$refs;
            if (this.content && textarea && textareabase) {
                const { scrollHeight } = textarea as HTMLTextAreaElement;
                const height = (textareabase as HTMLTextAreaElement).clientHeight;
                console.log(scrollHeight / height, scrollHeight, height);
                if (scrollHeight / height >= 3) return 3;
                return Math.floor(scrollHeight / height);
            }
            return 1;
        },
    },
    methods: {
        send() {
            console.log(this.$store);
            const date = new Date().toLocaleString();
            const msg = {
                from: this.currentUser.id,
                to: this.currentSession.id,
                msg: this.content,
                date,
                is_self: 0,
            };

            if (this.content !== '') {
                // this.conn.send(JSON.stringify(msg));
                this.content = '';
                msg.is_self = 1;
                // this.addMessage(msg);
                this.$store.dispatch('chat/addMessage', msg);
            } else {
                this.showNotice(' 消息不能为空!', 'warning');
            }
        },
    },
});
</script>
<style lang="less" scoped>
.chat-user-text{
    // height: 103px;
    padding: 20px 15px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 1px 6px 0px rgba(178, 178, 178, 0.75);
    &-center{
        flex: 1;
        text-align: left;
        margin: 0 15px;
        margin-left: 0;
        padding: 12px 24px;
        background: #F6F6F6;
        position: relative;
        .textarea{
            background: transparent;
            height: auto;
            width: 100%;
            resize:none;
        }
        .textarea-base{
            position: absolute;
            opacity: 0;
            visibility: hidden;
        }
    }
}
</style>
