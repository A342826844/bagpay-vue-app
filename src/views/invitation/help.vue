<template>
    <div class="invitation-profit">
        <TitleHeader title="返佣规则说明">
            <div class="app-padding40">
                <ul class="invitation-profit-ul app-padding40">
                    <li class="li flex-between-c">
                        <span v-for="subItem in lableList" :key="subItem.key">{{subItem.title}}</span>
                    </li>
                    <li v-for="item in rule" :key="item.id" class="li flex-between-c">
                        <span v-for="subItem in lableList" :key="subItem.key">{{item[subItem.key]}}{{subItem.lable}}</span>
                    </li>
                </ul>
            </div>
            <div class="invitation-profit-poptip text-align-l app-padding40">
                <PoptipItem class="invitation-profit-poptip-item">
                        凡邀请好友完成下载并注册后，好友在平台交易过程 中产生的每笔真实交易手续费，将获得相应比例的手续 费返佣。
                </PoptipItem>
                <PoptipItem class="invitation-profit-poptip-item">
                            返佣的形式将按照用户实际交易币种所产生的对应手续费返佣到您的交易账户。
                </PoptipItem>
                <PoptipItem class="invitation-profit-poptip-item">
                                好友交易返佣实时统计，随时可申请提现；返佣额=  直推用户实际产生交易量 * 手续费比例*返佣比例+间推 用户实际产生
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
