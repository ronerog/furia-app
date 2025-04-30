
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://seu-backend-render-url.onrender.com/api'
  : 'http://localhost:5000/api';

export const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? 'https://seu-backend-render-url.onrender.com'
  : 'http://localhost:5000';