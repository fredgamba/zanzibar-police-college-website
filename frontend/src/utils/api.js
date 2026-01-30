<<<<<<< HEAD
// src/utils/api.js - Simple Updated Version
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If 401 error and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken
          });
          const newAccessToken = response.data.access;
          localStorage.setItem('access_token', newAccessToken);
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Export API functions (without mock support for simplicity)
export const apiService = {
  // Posts
  getPosts: (params) => api.get(API_ENDPOINTS.POSTS, { params }),
  createPost: (data) => api.post(API_ENDPOINTS.POSTS, data),
  updatePost: (id, data) => api.put(`${API_ENDPOINTS.POSTS}${id}/`, data),
  deletePost: (id) => api.delete(`${API_ENDPOINTS.POSTS}${id}/`),

  // Pages
  getPages: () => api.get(API_ENDPOINTS.PAGES),
  getPage: (slug) => api.get(API_ENDPOINTS.PAGE_DETAIL.replace(':slug', slug)),
  updatePage: (id, data) => api.put(`${API_ENDPOINTS.PAGES}${id}/`, data),

  // Users
  getUsers: () => api.get(API_ENDPOINTS.USERS),
  createUser: (data) => api.post(API_ENDPOINTS.USER_CREATE, data),
  updateUser: (id, data) => api.put(`${API_ENDPOINTS.USERS}${id}/`, data),
  deleteUser: (id) => api.delete(`${API_ENDPOINTS.USERS}${id}/`),
  getCurrentUser: () => api.get(API_ENDPOINTS.CURRENT_USER),

  // Contact
  getContact: () => api.get(API_ENDPOINTS.CONTACT),
  updateContact: (data) => api.put(API_ENDPOINTS.CONTACT, data),

  // News
  getNews: () => api.get(API_ENDPOINTS.NEWS),
  createNews: (data) => api.post(API_ENDPOINTS.NEWS, data),

  // Auth
  login: (credentials) => api.post(API_ENDPOINTS.USER_LOGIN, credentials),
  logout: () => api.post(API_ENDPOINTS.USER_LOGOUT),
};

=======
// src/utils/api.js - Simple Updated Version
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If 401 error and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken
          });
          const newAccessToken = response.data.access;
          localStorage.setItem('access_token', newAccessToken);
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Export API functions (without mock support for simplicity)
export const apiService = {
  // Posts
  getPosts: (params) => api.get(API_ENDPOINTS.POSTS, { params }),
  createPost: (data) => api.post(API_ENDPOINTS.POSTS, data),
  updatePost: (id, data) => api.put(`${API_ENDPOINTS.POSTS}${id}/`, data),
  deletePost: (id) => api.delete(`${API_ENDPOINTS.POSTS}${id}/`),

  // Pages
  getPages: () => api.get(API_ENDPOINTS.PAGES),
  getPage: (slug) => api.get(API_ENDPOINTS.PAGE_DETAIL.replace(':slug', slug)),
  updatePage: (id, data) => api.put(`${API_ENDPOINTS.PAGES}${id}/`, data),

  // Users
  getUsers: () => api.get(API_ENDPOINTS.USERS),
  createUser: (data) => api.post(API_ENDPOINTS.USER_CREATE, data),
  updateUser: (id, data) => api.put(`${API_ENDPOINTS.USERS}${id}/`, data),
  deleteUser: (id) => api.delete(`${API_ENDPOINTS.USERS}${id}/`),
  getCurrentUser: () => api.get(API_ENDPOINTS.CURRENT_USER),

  // Contact
  getContact: () => api.get(API_ENDPOINTS.CONTACT),
  updateContact: (data) => api.put(API_ENDPOINTS.CONTACT, data),

  // News
  getNews: () => api.get(API_ENDPOINTS.NEWS),
  createNews: (data) => api.post(API_ENDPOINTS.NEWS, data),

  // Auth
  login: (credentials) => api.post(API_ENDPOINTS.USER_LOGIN, credentials),
  logout: () => api.post(API_ENDPOINTS.USER_LOGOUT),
};

>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
export default api;