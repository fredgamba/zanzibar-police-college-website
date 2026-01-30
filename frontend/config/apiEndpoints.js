<<<<<<< HEAD
// src/config/apiEndpoints.js
export const API_ENDPOINTS = {
  // Posts endpoints
  POSTS: 'posts/',
  POST_CREATE: 'posts/create/',
  POST_UPDATE: 'posts/update/',
  POST_DELETE: 'posts/delete/',

  // Pages endpoints
  PAGES: 'pages/',
  PAGE_DETAIL: 'pages/:slug/',

  // Users endpoints
  USERS: 'auth/users/',  // Changed from 'users/'
  USER_DETAIL: 'auth/users/:id/',
  USER_CREATE: 'auth/register/',
  USER_LOGIN: 'auth/login/',
  USER_LOGOUT: 'auth/logout/',
  CURRENT_USER: 'auth/user/',
  USER_PROFILE: 'auth/profile/',

  // Contact endpoint
  CONTACT: 'contact/',

  // News endpoints (if separate from posts)
  NEWS: 'news/',
  NEWS_CREATE: 'news/create/',

  // Dashboard stats
  DASHBOARD_STATS: 'dashboard/stats/',
  
  // Other endpoints
  CATEGORIES: 'categories/',
  TAGS: 'tags/',
};

// Helper function to build URLs
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint;
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
=======
// src/config/apiEndpoints.js
export const API_ENDPOINTS = {
  // Posts endpoints
  POSTS: 'posts/',
  POST_CREATE: 'posts/create/',
  POST_UPDATE: 'posts/update/',
  POST_DELETE: 'posts/delete/',

  // Pages endpoints
  PAGES: 'pages/',
  PAGE_DETAIL: 'pages/:slug/',

  // Users endpoints
  USERS: 'auth/users/',  // Changed from 'users/'
  USER_DETAIL: 'auth/users/:id/',
  USER_CREATE: 'auth/register/',
  USER_LOGIN: 'auth/login/',
  USER_LOGOUT: 'auth/logout/',
  CURRENT_USER: 'auth/user/',
  USER_PROFILE: 'auth/profile/',

  // Contact endpoint
  CONTACT: 'contact/',

  // News endpoints (if separate from posts)
  NEWS: 'news/',
  NEWS_CREATE: 'news/create/',

  // Dashboard stats
  DASHBOARD_STATS: 'dashboard/stats/',
  
  // Other endpoints
  CATEGORIES: 'categories/',
  TAGS: 'tags/',
};

// Helper function to build URLs
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint;
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
};