import axios from 'axios';
import { store } from './store';
import router from '@/router';

// Création d'une instance d'axios pour les requêtes API
const getAPI = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

let isRefreshing = false; // Variable pour vérifier si le token est en cours de rafraîchissement
let failedQueue = []; // Tableau pour stocker les requêtes échouées         

// Fonction pour traiter les requêtes échouées 
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshTokenRoutine = () => {
  const refreshTokenInterval = 25 * 60 * 1000; 
  setInterval(async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const refreshTokenExpiresAt = parseInt(sessionStorage.getItem('refreshTokenExpiresAt'), 10);
    const now = Date.now();

    if (refreshToken && now < refreshTokenExpiresAt) {
      try {
        const response = await store.dispatch('auth/refreshToken');
        console.log('Token refreshed successfully in routine:', response);
      } catch (error) {
        console.error('Error refreshing token in routine:', error);
        store.dispatch('auth/logout');
        router.push({ name: 'login' });
      }
    } else {
      console.error('Refresh token expired or not available in routine');
      store.dispatch('auth/logout');
      router.push({ name: 'login' });
    }
  }, refreshTokenInterval);
};

refreshTokenRoutine();

// Interceptor pour rafraîchir le token JWT
getAPI.interceptors.request.use(async function (config) {
  const token = sessionStorage.getItem('accessToken');
  const accessTokenExpiresAt = parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10);
  const now = Date.now();

  console.log('Request Interceptor: Checking token expiry and refreshing if necessary');

  if (token) {
    console.log(`Token expires at: ${new Date(accessTokenExpiresAt)}`);
    console.log(`Current time: ${new Date(now)}`);

    // Vérifie si le token expire dans les 5 prochaines minutes
    if (now >= accessTokenExpiresAt - (60 * 1000)) {
      console.log('Token is about to expire or has expired. Attempting to refresh.');

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await store.dispatch('auth/refreshToken');
          console.log('Token refreshed successfully:', newToken);
          isRefreshing = false;
          processQueue(null, newToken);
        } catch (error) {
          console.error('Error refreshing token:', error);
          isRefreshing = false;
          processQueue(error);
          await store.dispatch('auth/logout');
          router.push({ name: 'login' });
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(newToken => {
        config.headers['Authorization'] = 'Bearer ' + newToken;
        return config;
      }).catch(error => {
        return Promise.reject(error);
      });
    }

    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

getAPI.interceptors.response.use(response => {
  return response;
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const newToken = await store.dispatch('auth/refreshToken');
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
      originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
      return axios(originalRequest);
    } catch (e) {
      await store.dispatch('auth/logout');
      router.push({ name: 'login' });
      return Promise.reject(e);
    }
  }
  return Promise.reject(error);
});

export default getAPI;
