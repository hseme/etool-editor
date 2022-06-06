import { RouteRecordRaw } from 'vue-router';
import { LayoutBase } from '../constants';

const routes: RouteRecordRaw[] = [
  {
    path: '/dash',
    name: 'dash',
    meta: {
      title: '概览',
      sort: 0
    },
    component: LayoutBase,
    redirect: {
      path: '/dash/normal'
    },
    children: [
      {
        path: '/dash/normal',
        name: 'dash-normal',
        meta: {
          title: '面板'
        },
        component: () => import('@/views/dash/normal')
      }
    ]
  }
];

export default routes;
