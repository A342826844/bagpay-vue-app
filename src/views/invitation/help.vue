<template>
    <div class="invitation-profit">
        <TitleHeader :title="$t('invitation.commRuleInstru')">
            <div class="app-padding40">
                <ul class="invitation-profit-ul app-padding40">
                    <li class="li flex-between-c">
                        <span class="li-span" v-for="subItem in lableList" :key="subItem.key">{{subItem.title}}</span>
                    </li>
                    <li v-for="item in rule" :key="item.id" class="li flex-between-c">
                        <span class="li-span" v-for="subItem in lableList" :key="subItem.key">{{item[subItem.key]}}{{subItem.lable}}</span>
                    </li>
                </ul>
            </div>
            <div class="invitation-profit-poptip text-align-l app-padding40">
                <PoptipItem class="invitation-profit-poptip-item">
                    {{$t('invitation.tip1')}}
                </PoptipItem>
                <PoptipItem class="invitation-profit-poptip-item">
                    {{$t('invitation.tip2')}}
                </PoptipItem>
                <PoptipItem class="invitation-profit-poptip-item">
                    {{$t('invitation.tip3')}}
                </PoptipItem>
            </div>
        </TitleHeader>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type data = {
    rule: any;
    lableList: Array<any>;
}

export default Vue.extend({
    name: 'InvitationHelp',
    data(): data {
        return {
            rule: [],
            lableList: [
                {
                    title: '等级',
                    key: 'name',
                },
                {
                    title: '直推',
                    key: 'firstComm',
                    lable: '%',
                },
                {
                    title: '2级',
                    key: 'secondComm',
                    lable: '%',
                },
                {
                    title: '3级',
                    key: 'threeComm',
                    lable: '%',
                },
                {
                    title: '团队',
                    key: 'teamComm',
                },
            ],
        };
    },
    created() {
        this.getGradeComm();
    },
    methods: {
        // 获取返佣规则
        getGradeComm() {
            this.changeLoading(true);
            this.$api.getGradeComm().then((res: any) => {
                this.rule = (res.data as Array<any>).sort((a, b) => a.sort - b.sort);
            }).finally(() => {
                this.changeLoading(false);
            });
        },
    },
});
</script>

<style lang="less" scoped>
.invitation-profit{
    &-ul{
        margin-top: 55px;
        background: #F4F6F9;
        .li{
            margin-bottom: 44px;
            font-size: 24px;
            &:first-child{
                font-size: 22px;
                padding-top: 42px;
                color: #A5A5A5;
            }
            &:last-child{
                margin: 0;
                padding-bottom: 44px;
            }
            .li-span{
                display: inline-block;
                width: 50px;
                white-space: nowrap;
                // &:first-child{
                //     text-align: left;
                // }
                &:last-child{
                    text-align: right;
                    width: 50px;
                }
            }
        }
    }
    &-poptip{
        margin-top: 64px;
        font-size: 28px;
        &-item{
            margin-top: 52px;
        }
    }
}
</style>
