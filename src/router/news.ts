// 资讯模块路由
import { RouteConfig } from 'vue-router';

const News = () => import('@/views/news/index.vue'); // 邀请
const Notice = () => import('@/views/news/notice.vue'); // 邀请
const NoticeDetail = () => import('@/views/news/noticeDetail.vue'); // 邀请

const routers: Array<RouteConfig> = [
    {
        path: '/news',
        name: 'news',
        component: News,
        meta: {
            index: 10,
        },
    },
    {
        path: '/news/notice',
        name: 'newsNotice',
        component: Notice,
        meta: {
            index: 10,
        },
    },
    {
        path: '/news/noticedetail',
        name: 'noticedetail',
        component: NoticeDetail,
        meta: {
            index: 10,
        },
    },

];

export default routers;
