<template>
    <div class="app-poptip">
        <h5>{{$t('common.poptip')}}:</h5>
        <slot></slot>
    </div>
</template>

<script>
export default {

};
</script>

<style lang='less' scoped>
.app-poptip{
    padding-top: 60px;
    font-size: 24px;
    font-weight: normal;
    line-height: 60px;
    color: #979797;
    letter-spacing: 0px;
    text-align: left;
    padding-left: 46px;
    padding-right: 32px;
    margin-bottom: 100px;
}
</style>
