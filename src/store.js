import { createStore } from 'vuex';
import getAPI from './axios-api';
import router from '@/router';

// Module d'autentification
const auth = {
  // namespaced: true permet de définir un espace de nom pour ce module et de l'utiliser dans les getters, mutations et actions
  namespaced: true,
  // state contient les données intitales de l'application qui peuvent être modifiées par les mutations et les actions du store
  state: {
    accessToken: sessionStorage.getItem('accessToken') || null,
    refreshToken: sessionStorage.getItem('refreshToken') || null,
    accessTokenExpiresAt: parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10) || null,
    refreshTokenExpiresAt: parseInt(sessionStorage.getItem('refreshTokenExpiresAt'), 10) || null,
    authError: null,
    errorMessage: null,
  },
  // getters permettent d'accéder aux données du state
  getters: {
    // isLoggedIn retourne true si l'utilisateur est connecté et que le token n'a pas expiré (la date actuelle est inférieure à la date d'expiration du token)
    isLoggedIn: (state) => !!state.accessToken && Date.now() < state.accessTokenExpiresAt, // !! convertit la valeur en booléen
    authError: (state) => state.authError, // retourne l'erreur d'authentification  si elle existe  
    errorMessage: (state) => state.errorMessage, // retourne le message d'erreur si il existe
  },
  // mutations permettent de modifier les données du state de manière synchrone
  mutations: {
    SET_TOKENS(state, { accessToken, refreshToken }) {
     // Date.now() retourne le nombre de millisecondes écoulées depuis le 1er janvier 1970
      const accessTokenExpiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
      const refreshTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day
    // sessionStorage permet de stocker les tokens dans le navigateur pour les conserver après un rafraîchissement de la page
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('accessTokenExpiresAt', accessTokenExpiresAt);
      sessionStorage.setItem('refreshTokenExpiresAt', refreshTokenExpiresAt);
    // getAPI.defaults.headers.common['Authorization'] permet d'ajouter le token d'authentification aux en-têtes de toutes les requêtes
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.accessTokenExpiresAt = accessTokenExpiresAt;
      state.refreshTokenExpiresAt = refreshTokenExpiresAt;
      state.authError = null;
      state.errorMessage = null;
    },
    CLEAR_TOKENS(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiresAt = null;
      state.refreshTokenExpiresAt = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessTokenExpiresAt');
      sessionStorage.removeItem('refreshTokenExpiresAt');
      delete getAPI.defaults.headers.common['Authorization'];
      state.errorMessage = null;
    },
    SET_AUTH_ERROR(state, error) {
      state.authError = error;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
  },
  // actions permettent de modifier les données du state de manière asynchrone
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await getAPI.post('/api/token/', credentials);
        commit('SET_TOKENS', { accessToken: response.data.access, refreshToken: response.data.refresh });
        getAPI.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      } catch (error) {
        commit('SET_AUTH_ERROR', 'Login failed');
        if (error.response && error.response.status === 403) {
          commit('SET_ERROR_MESSAGE', "Vous n'avez pas la permission d'effectuer cette action.");
        } else if (error.response && error.response.data && error.response.data.detail) {
          commit('SET_ERROR_MESSAGE', error.response.data.detail);
        } else {
          commit('SET_ERROR_MESSAGE', 'An error occurred during login');
        }
        throw error;
      }
    },
    async logout({ commit, state }) {
      try {
        await getAPI.post('/api/logout/', { refresh: state.refreshToken });
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        commit('CLEAR_TOKENS');
        router.push({ name: 'login' });
      }
    },
    async refreshToken({ commit, state }) {
      if (!state.refreshToken || Date.now() >= state.refreshTokenExpiresAt) {
        commit('CLEAR_TOKENS');
        router.push({ name: 'login' });
        throw new Error('Refresh token expired or not available.');
      }
      try {
        const response = await getAPI.post('/api/token/refresh/', { refresh: state.refreshToken });
        commit('SET_TOKENS', { accessToken: response.data.access, refreshToken: response.data.refresh });
        return response.data.access;
      } catch (error) {
        commit('CLEAR_TOKENS');
        router.push({ name: 'login' });
        throw error;
      }
    }
  }
};

// Affichage des valeurs de state pour le débogage
console.log('accessToken', sessionStorage.getItem('accessToken'));
console.log('refreshToken', sessionStorage.getItem('refreshToken'));
console.log('accessTokenExpiresAt', parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10));
console.log('refreshTokenExpiresAt', parseInt(sessionStorage.getItem('refreshTokenExpiresAt'), 10));

// createStore permet de créer un store Vuex
export const store = createStore({
  modules: {
    auth,
  }
});
