
import axios from 'axios';
import { store } from './store';

const getAPI = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

let isRefreshing = false;
let failedQueue = [];

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

getAPI.interceptors.request.use(async function (config) {
  const token = sessionStorage.getItem('accessToken');
  const accessTokenExpiresAt = parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10);
  const now = Date.now();

  // Define public endpoints
  const publicEndpoints = ['/api/home/', '/login/'];

  // Check if the request is to a public endpoint
  const isPublicEndpoint = publicEndpoints.some(endpoint => config.url.includes(endpoint));

  if (!isPublicEndpoint && token) {
    if (now >= accessTokenExpiresAt - (60 * 1000)) {
      if (!isRefreshing) {
        isRefreshing = true;
        store.dispatch('auth/refreshToken').then(newToken => {
          isRefreshing = false;
          processQueue(null, newToken);
        }).catch(error => {
          isRefreshing = false;
          processQueue(error);
        });
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        config.headers['Authorization'] = 'Bearer ' + token;
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

export default getAPI;
