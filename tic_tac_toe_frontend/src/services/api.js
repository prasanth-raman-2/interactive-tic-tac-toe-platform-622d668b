import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const createGame = async () => {
  const response = await api.post('/games');
  return response.data;
};

export const makeMove = async (gameId, position) => {
  const response = await api.post(`/games/${gameId}/moves`, { position });
  return response.data;
};

export const getGameHistory = async () => {
  const response = await api.get('/games/history');
  return response.data;
};

export const getCurrentGame = async (gameId) => {
  const response = await api.get(`/games/${gameId}`);
  return response.data;
};
