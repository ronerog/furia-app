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

  // Efeito para conectar/desconectar o socket
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    const token = localStorage.getItem('token');
    
    if (!token) return;
    
    // Criar nova conexão de socket
    const newSocket = io(SOCKET_URL, {
      auth: { token }
    });
    
    setSocket(newSocket);
    
    // Configurar event listeners do socket
    newSocket.on('connect', () => {
      console.log('Conectado ao chat');
    });
    
    // Receber mensagens históricas ao conectar
    newSocket.on('recent_messages', (recentMessages: ChatMessage[]) => {
      setMessages(recentMessages);
    });
    
    // Receber nova mensagem
    newSocket.on('new_message', (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    });
    
    // Atualizar contagem de usuários online
    newSocket.on('user_count', (count: number) => {
      setOnlineUsers(count);
    });
    
    // Notificar desconexão
    newSocket.on('disconnect', () => {
      console.log('Desconectado do chat');
    });
    
    // Limpar conexão ao desmontar o componente
    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated, user]);

  // Função para enviar mensagem
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