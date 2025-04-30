// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';
import { authService } from '../services/api';
import { connectSocket, disconnectSocket } from '../services/socket';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
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
        
        const response = await authService.getMe();
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        console.error('Error verifying token:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      
      if (!response.data || response.data.success === false) {
        throw new Error(response.data?.message || 'Erro ao fazer login');
      }
      
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Resposta incompleta do servidor');
      }
      
      localStorage.setItem('token', token);
      
      connectSocket(token);

      setUser(user);
      setIsAuthenticated(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Email ou senha incorretos');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      throw error;
    }
  };

  const register = async (userData: unknown) => {
    try {
      const response = await authService.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      
      setUser(user);
      setIsAuthenticated(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Register error:', error);
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Erro ao registrar');
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    
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
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};