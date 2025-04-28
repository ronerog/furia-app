import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';
import { API_URL } from '../config';
import api from '../services/api';
import { connectSocket, disconnectSocket } from '../services/socket';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (tokenId: string) => Promise<void>;
  register: (userData: unknown) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  id: string;
  exp: number;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  googleLogin: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setLoading(false);
          return;
        }
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const response = await axios.get(`${API_URL}/users/me`);
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        return err;
      } finally {
        setLoading(false);
      }
    };
    
    checkToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success === false) {
        throw new Error(response.data.message || 'Erro ao fazer login');
      }
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      
      // Conectar ao socket
      connectSocket(token);
      
      setUser(user);
      setIsAuthenticated(true);
      
        return user;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    };

  const googleLogin = async (tokenId: string) => {
    const response = await axios.post(`${API_URL}/auth/google`, { tokenId });
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setUser(user);
    setIsAuthenticated(true);
  };

  const register = async (userData: unknown) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    
    // Desconectar do socket
    disconnectSocket();
    
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        googleLogin,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};