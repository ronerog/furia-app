
import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});


api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const authService = {
  login: async (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: async (userData: any) => {
    return api.post('/auth/register', userData);
  },
  getMe: async () => {
    return api.get('/auth/me');
  }
};


export const gameService = {
  getGames: async () => {
    return api.get('/games');
  },
  getGame: async (slug: string) => {
    return api.get(`/games/${slug}`);
  }
};


export const matchService = {
  getMatches: async (filters?: { game?: string, status?: string }) => {
    return api.get('/matches', { params: filters });
  },
  getFeaturedMatches: async () => {
    return api.get('/matches/featured');
  },
  getMatch: async (id: string) => {
    return api.get(`/matches/${id}`);
  }
};


export const playerService = {
  getPlayers: async (filters?: { game?: string, active?: boolean }) => {
    return api.get('/players', { params: filters });
  },
  getPlayer: async (id: string) => {
    return api.get(`/players/${id}`);
  }
};


export const streamService = {
  getStreams: async (filters?: { game?: string, isLive?: boolean }) => {
    return api.get('/streams', { params: filters });
  },
  getLiveStreams: async () => {
    return api.get('/streams/live');
  },
  getStream: async (id: string) => {
    return api.get(`/streams/${id}`);
  }
};


export const rewardService = {
  getRewards: async () => {
    return api.get('/rewards');
  },
  redeemReward: async (userId: string, rewardId: string, shippingAddress: string) => {
    return api.post(`/users/${userId}/redeem`, { rewardId, shippingAddress });
  }
};


export const userService = {
  getUserActivities: async (userId: string) => {
    return api.get(`/users/${userId}/activities`);
  },
  getUserStats: async (userId: string) => {
    return api.get(`/users/${userId}/stats`);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateUser: async (userId: string, userData: any) => {
    return api.put(`/users/${userId}`, userData);
  }
};

export default api;