import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Character.vue') }],
  },

  {
    path: '/truths',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Truths.vue') }],
  },

  {
    path: '/sector',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Sector.vue') }],
  },

    {
    path: '/challenges',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Challenges.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
