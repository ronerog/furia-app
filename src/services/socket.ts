// src/services/socket.ts
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config';

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (socket) {
    socket.disconnect();
  }
  
  // Conectar ao Socket.IO do backend
  socket = io(SOCKET_URL, {
    auth: { token }
  });
  
  // Configurar eventos básicos
  socket.on('connect', () => {
    console.log('Conectado ao chat');
  });
  
  socket.on('disconnect', () => {
    console.log('Desconectado do chat');
  });
  
  socket.on('connect_error', (error) => {
    console.error('Erro de conexão:', error.message);
  });
  
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};

export default {
  connectSocket,
  disconnectSocket,
  getSocket
};