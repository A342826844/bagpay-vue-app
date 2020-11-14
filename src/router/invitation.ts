// 邀请模块路由
import { RouteConfig } from 'vue-router';

const Invitation = () => import('@/views/invitation/index.vue'); // 邀请
const TotalProfit = () => import('@/views/invitation/totalProfit.vue'); // 邀请
const TeamDetail = () => import('@/views/invitation/teamDetail.vue'); // 邀请
const Help = () => import('@/views/invitation/help.vue'); // 邀请

const routers: Array<RouteConfig> = [
    {
        path: '/invitation',
        name: 'invitation',
        component: Invitation,
        meta: {
            index: 10,
        },
    },
    {
        path: '/invitation/profit',
        name: 'invitationProfit',
        component: TotalProfit,
        meta: {
            index: 100,
        },
    },
    {
        path: '/invitation/Teamdetail',
        name: 'invitationTeamDetail',
        component: TeamDetail,
        meta: {
            index: 100,
        },
    },
    {
        path: '/invitation/help',
        name: 'invitationHelp',
        component: Help,
        meta: {
            index: 100,
        },
    },

];

export default routers;
