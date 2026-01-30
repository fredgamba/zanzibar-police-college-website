<<<<<<< HEAD
// src/utils/publicApi.js
import axios from 'axios';

const publicApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
});

// Public endpoints that don't require auth
export const publicEndpoints = {
  getPageBySlug: (slug) => publicApi.get(`public/pages/by-page/?page=${slug}`),
  getNews: () => publicApi.get('public/news/'),
  getPosts: () => publicApi.get('public/posts/'),
  getPostDetail: (id) => publicApi.get(`public/posts/${id}/`),
  getContactInfo: () => publicApi.get('public/contact/current/'),
};

=======
// src/utils/publicApi.js
import axios from 'axios';

const publicApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
});

// Public endpoints that don't require auth
export const publicEndpoints = {
  getPageBySlug: (slug) => publicApi.get(`public/pages/by-page/?page=${slug}`),
  getNews: () => publicApi.get('public/news/'),
  getPosts: () => publicApi.get('public/posts/'),
  getPostDetail: (id) => publicApi.get(`public/posts/${id}/`),
  getContactInfo: () => publicApi.get('public/contact/current/'),
};

>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
export default publicApi;