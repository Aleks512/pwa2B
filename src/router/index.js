import { createRouter, createWebHistory } from 'vue-router';
import { store } from "../store"; 
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';


const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  {
    path: "/logout",
    name: "logout",
    component: () => import("@/views/LogoutView.vue"),
  },
  { path: '/send-message', name: 'CustomerMessageForm', 
    component: () => import("@/views/private/CustomerMessageForm.vue"),
    meta: { requiresAuth: true } },
  { path: '/:catchAll(.*)', component: () => import('@/views/NotFoundView.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guard global pour vérifier les routes nécessitant une authentification
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Cette route nécessite une authentification
    if (store.getters["auth/isLoggedIn"]) {
      next(); // L'utilisateur est connecté, continuer vers la route
    } else {
      next({ name: "login" }); // Rediriger vers la page de connexion
    }
  } else {
    next(); // Pas de vérification nécessaire, continuer vers la route
  }
});

export default router;
