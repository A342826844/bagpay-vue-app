<template>
    <Headers size="bigger">

        <div class="chat-header-left" slot="left">
            <h6 class="app-size-34">隔壁老王</h6>
            <div class="app-size-24">在线</div>
        </div>
        <div class="chat-header-right app-size-22">
            <p>累计广告： 120</p>
            <p>成交单量： 88</p>
        </div>
    </Headers>
    <!-- <div class="chat-header flex-between-c">
        <div>返回</div>
        <div class="flex-item-1 flex-between-c">
            <div>
                <h6>隔壁老王</h6>
                <div>在线</div>
            </div>
            <div>
                <p>累计广告： 120</p>
                <p>成交单量： 88</p>
            </div>
        </div>
    </div> -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>

<style lang="less" scoped>
.chat-header{
    &-left{
        margin-top: 14px;
    }
     &-right{
         margin-top: 22px;
         line-height: 42px;
     }
}
</style>
