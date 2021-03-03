// 商户模块路由
import { RouteConfig } from 'vue-router';

import Merchant from '@/views/merchant/index.vue'; // 商户首页

const Apply = () => import('@/views/merchant/apply.vue'); // 申请商户
const Gateway = () => import('@/views/merchant/gateway.vue'); // 交易网关
const Record = () => import('@/views/merchant/record.vue'); // 收款记录
const Statistics = () => import('@/views/merchant/statistics.vue'); // 统计
const RecordDetail = () => import('@/views/merchant/recordDetail.vue'); // 账单详情
const Fund = () => import('@/views/merchant/fund.vue'); // 账单详情

const routers: Array<RouteConfig> = [
    {
        path: '/merchant',
        name: 'merchant',
        component: Merchant,
        meta: {
            index: 20,
        },
    },
    {
        path: '/merchant/apply',
        name: 'merchantApply',
        component: Apply,
        meta: {
            index: 100,
        },
    },
    {
        path: '/merchant/gateway',
        name: 'merchantGateway',
        component: Gateway,
        meta: {
            index: 200,
        },
    },
    {
        path: '/merchant/record',
        name: 'merchantRecord',
        component: Record,
        meta: {
            index: 100,
        },
    },
    {
        path: '/merchant/statistics',
        name: 'merchantStatistics',
        component: Statistics,
        meta: {
            index: 200,
        },
    },
    {
        path: '/merchant/record/detail',
        name: 'merchantRecordDetail',
        component: RecordDetail,
        meta: {
            index: 200,
        },
    },
    {
        path: '/merchant/fund',
        name: 'merchantFund',
        component: Fund,
        meta: {
            index: 100,
        },
    },
];

export default routers;
