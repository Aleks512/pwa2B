import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import CustomerOrderItems from '@/views/private/CustomerOrderItems.vue';
import CustomerOrderItemDetail from '@/views/private/CustomerOrderItemDetail.vue';
import CustomerSentMessages from '@/views/private/CustomerSentMessages.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  {
    path: '/send-message',
    name: 'CustomerMessageForm',
    component: () => import('@/views/private/CustomerMessageForm.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/orderitems',
    name: 'CustomerOrderItems',
    component: CustomerOrderItems,
    meta: { requiresAuth: true },
  },
  {
    path: '/orderitem/:id',
    name: 'CustomerOrderItemDetail',
    component: CustomerOrderItemDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '/sent-messages',
    name: 'CustomerSentMessages',
    component: CustomerSentMessages,
    meta: { requiresAuth: true },
  },
  { path: '/:catchAll(.*)', component: () => import('@/views/NotFoundView.vue') },
];

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
