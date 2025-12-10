import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (userData) => api.post('/signup', userData),
  login: (credentials) => api.post('/login', credentials),
  getMe: () => api.get('/me'),
};

export const observationsAPI = {
  getAll: () => api.get('/observations'),
  getOne: (id) => api.get(`/observations/${id}`),
  create: (observationData) => api.post('/observations', { observation: observationData }),
  update: (id, observationData) => api.patch(`/observations/${id}`, { observation: observationData }),
  delete: (id) => api.delete(`/observations/${id}`),
};

export const starPatternsAPI = {
  getAll: () => api.get('/star_patterns'),
  getOne: (id) => api.get(`/star_patterns/${id}`),
};

export const wavePatternsAPI = {
  getAll: () => api.get('/wave_patterns'),
  getOne: (id) => api.get(`/wave_patterns/${id}`),
};

export const birdMigrationsAPI = {
  getAll: () => api.get('/bird_migrations'),
  getOne: (id) => api.get(`/bird_migrations/${id}`),
};

export default api;
