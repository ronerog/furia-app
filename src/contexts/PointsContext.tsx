
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { Activity, Reward } from '../types';
import { API_URL } from '../config';

interface PointsContextType {
  points: number;
  rewards: Reward[];
  activities: Activity[];
  addPoints: (amount: number, activityType: string) => Promise<void>;
  redeemReward: (rewardId: string) => Promise<unknown>;
}

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsContext = createContext<PointsContextType>({
  points: 0,
  rewards: [],
  activities: [],
  addPoints: async () => {},
  redeemReward: async () => ({}),
});

export const PointsProvider = ({ children }: PointsProviderProps) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setPoints(user.points || 0);
      loadRewards();
      loadActivities();
    }
  }, [isAuthenticated, user]);

  const loadRewards = async () => {
    try {
      const response = await axios.get(`${API_URL}/rewards`);
      setRewards(response.data);
    } catch (err) {
      console.error('Erro ao carregar recompensas:', err);
    }
  };

  const loadActivities = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get(`${API_URL}/users/${user.id}/activities`);
      setActivities(response.data);
    } catch (err) {
      console.error('Erro ao carregar atividades:', err);
    }
  };

  const addPoints = async (amount: number, activityType: string) => {
    if (!isAuthenticated || !user) return;
    
    try {
      const response = await axios.post(`${API_URL}/users/${user.id}/points`, {
        amount,
        activityType
      });
      
      setPoints(response.data.totalPoints);
      loadActivities();
    } catch (err) {
      console.error('Erro ao adicionar pontos:', err);
    }
  };

  const redeemReward = async (rewardId: string) => {
    if (!isAuthenticated || !user) {
      throw new Error('Usuário não autenticado');
    }
    
    try {
      const response = await axios.post(`${API_URL}/users/${user.id}/redeem`, {
        rewardId
      });
      
      setPoints(response.data.remainingPoints);
      loadActivities();
      return response.data;
    } catch (err) {
      console.error('Erro ao resgatar recompensa:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    let interval: number;
    let viewTime = 0;
    
    const checkActivity = () => {
      viewTime += 1;
      
      if (viewTime % 300 === 0) {
        addPoints(5, 'view_time');
      }
    };
    
    // eslint-disable-next-line prefer-const
    interval = window.setInterval(checkActivity, 1000);
    
    return () => {
      window.clearInterval(interval);
    };
  }, [isAuthenticated]);

  return (
    <PointsContext.Provider
      value={{
        points,
        rewards,
        activities,
        addPoints,
        redeemReward
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};