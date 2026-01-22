// API endpoints configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: 'auth/login/',
  LOGOUT: 'auth/logout/',
  REGISTER: 'auth/register/',
  REFRESH_TOKEN: 'auth/token/refresh/',
  CURRENT_USER: 'auth/user/',
  
  // Users
  USERS: 'users/',
  USER_DETAIL: 'users/:id/',
  
  // Posts
  POSTS: 'posts/',
  POST_DETAIL: 'posts/:id/',
  
  // Pages
  PAGES: 'pages/',
  PAGE_DETAIL: 'pages/:id/',
  PAGE_BY_SLUG: 'pages/:slug/',
  
  // Contact
  CONTACT: 'contact/',
  
  // News (if separate)
  NEWS: 'news/',
  
  // Dashboard
  DASHBOARD_STATS: 'dashboard/stats/',
};

// Helper function to build URLs
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint;
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
};
