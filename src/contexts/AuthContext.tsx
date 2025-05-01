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
        setUser(response?.data);
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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      console.log(data.success)
      const { token, user, success } = data;
      if (success == true) {
        localStorage.setItem('token', token);
      
        connectSocket(token);
  
        setUser(user);
        setIsAuthenticated(true);
      } else {
        console.log('CAIU AQUI - erro', data);
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setIsAuthenticated(false)
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