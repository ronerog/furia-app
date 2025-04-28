import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { ChatMessage } from '../types';
import { SOCKET_URL } from '../config';

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (message: Omit<ChatMessage, 'id'>) => void;
  onlineUsers: number;
}

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  onlineUsers: 0,
});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    const token = localStorage.getItem('token');
    
    if (!token) return;
    
    // Criar nova conexão de socket
    const newSocket = io(SOCKET_URL, {
      auth: { token }
    });
    
    setSocket(newSocket);
    
    newSocket.on('connect', () => {
      console.log('Conectado ao chat');
    });
    
    newSocket.on('recent_messages', (recentMessages: ChatMessage[]) => {
      setMessages(recentMessages);
    });
    
    newSocket.on('new_message', (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    });
    
    newSocket.on('user_count', (count: number) => {
      setOnlineUsers(count);
    });
    

    newSocket.on('disconnect', () => {
      console.log('Desconectado do chat');
    });
    
    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated, user]);

  const sendMessage = (messageData: Omit<ChatMessage, 'id'>) => {
    if (!socket || !isAuthenticated) return;
    
    socket.emit('send_message', {
      text: messageData.text
    });
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        onlineUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};