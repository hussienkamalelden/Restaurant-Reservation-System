import { createRouter, createWebHistory } from 'vue-router';

// Routes
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/features/auth/pages/LoginPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/branches',
    name: 'Branches',
    component: () => import('@/features/branches/pages/BranchesPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/branches',
  },
];

// Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard middleware to check if user is authenticated
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
