import { createStore } from 'vuex';
import getAPI from './axios-api';
import router from '@/router';  // Ajouté

// Module d'authentification
const auth = {
  namespaced: true,  // permet de définir un espace de nom pour ce module et de l'utiliser dans les getters, mutations et actions
  state: {
    accessToken: sessionStorage.getItem('accessToken') || null,
    refreshToken: sessionStorage.getItem('refreshToken') || null,
    accessTokenExpiresAt: parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10) || null,
    refreshTokenExpiresAt: parseInt(sessionStorage.getItem('refreshTokenExpiresAt'), 10) || null,
    authError: null,
    errorMessage: null,
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken && Date.now() < state.accessTokenExpiresAt,  // retourne true si l'utilisateur est connecté et que le token n'a pas expiré
    authError: (state) => state.authError,  // retourne l'erreur d'authentification si elle existe  
    errorMessage: (state) => state.errorMessage,  // retourne le message d'erreur s'il existe
  },
  mutations: {
    SET_TOKENS(state, { accessToken, refreshToken }) {
      const accessTokenExpiresAt = Date.now() + 30 * 60 * 1000;  // 30 minutes
      const refreshTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;  // 1 day
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('accessTokenExpiresAt', accessTokenExpiresAt);
      sessionStorage.setItem('refreshTokenExpiresAt', refreshTokenExpiresAt);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.accessTokenExpiresAt = accessTokenExpiresAt;
      state.refreshTokenExpiresAt = refreshTokenExpiresAt;
      state.authError = null;
      state.errorMessage = null;

      console.log('Tokens set successfully');
      console.log(`Access Token Expires At: ${new Date(accessTokenExpiresAt)}`);
      console.log(`Refresh Token Expires At: ${new Date(refreshTokenExpiresAt)}`);
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

      console.log('Tokens cleared successfully');
    },
    SET_AUTH_ERROR(state, error) {
      state.authError = error;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
  },
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
        router.push({ name: 'login' });  // Ajouté
      }
    },
    async refreshToken({ commit, state }) {
      if (!state.refreshToken || Date.now() >= state.refreshTokenExpiresAt) {
        commit('CLEAR_TOKENS');
        router.push({ name: 'login' });  // Ajouté
        throw new Error('Refresh token expired or not available.');
      }
      try {
        const response = await getAPI.post('/api/token/refresh/', { refresh: state.refreshToken });
        commit('SET_TOKENS', { accessToken: response.data.access, refreshToken: response.data.refresh });
        return response.data.access;
      } catch (error) {
        commit('CLEAR_TOKENS');
        router.push({ name: 'login' });  // Ajouté
        throw error;
      }
    }
  }
};

// createStore permet de créer un store Vuex
export const store = createStore({
  modules: {
    auth,
  }
});
