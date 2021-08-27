import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Character.vue') }]
  },

  {
    path: '/tale',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/Tale.vue') }]
  },

  {
    path: '/locations',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Locations.vue') }]
  },

  {
    path: '/npcs',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/NPCs.vue') }]
  },

  {
    path: '/truths',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Truths.vue') }]
  },

  {
    path: '/sites',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Sites.vue') }]
  },

  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Test.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
