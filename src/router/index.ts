import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../pages/home.vue') },
  { path: '/login', component: () => import('../pages/login.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const ignoreVerify = ['/login'];
  if (!ignoreVerify.includes(to.path)) {
    const token = localStorage.getItem('token');
    if (!token) {
      return '/login';
    }
  }
});

export default router;
