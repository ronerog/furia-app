// src/components/Layout/ChatBox.tsx
import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ChatBox = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [message, setMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const { isAuthenticated, user } = useContext(AuthContext);
  const { messages, sendMessage, onlineUsers } = useContext(ChatContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isAuthenticated && user) {
      sendMessage({
        text: message,
        userId: user.id,
        username: user.username,
        timestamp: new Date()
      });
      setMessage('');
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderChatContent = () => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: isMobile ? '100%' : 320,
      bgcolor: 'background.paper',
      boxShadow: theme.shadows[5],
      borderLeft: `1px solid ${theme.palette.primary.main}`,
    }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">Chat da FURIA</Typography>
          <Badge 
            badgeContent={onlineUsers} 
            color="primary" 
            sx={{ ml: 2 }}
          >
            <ChatIcon />
          </Badge>
        </Box>
        {isMobile && (
          <IconButton onClick={toggleDrawer} edge="end">
            <CloseIcon />
          </IconButton>
        )}
      </Paper>

      {isAuthenticated ? (
        <>
          <Box sx={{ 
            flexGrow: 1, 
            overflow: 'auto', 
            p: 2,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {messages.map((msg, index) => (
              <Box 
                key={index} 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.userId === user?.id ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  flexDirection: msg.userId === user?.id ? 'row-reverse' : 'row' 
                }}>
                  <Avatar 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      bgcolor: msg.userId === user?.id ? 'primary.main' : 'grey.700',
                      mr: msg.userId === user?.id ? 0 : 1,
                      ml: msg.userId === user?.id ? 1 : 0
                    }}
                  >
                    {msg.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="caption" color="text.secondary">
                    {msg.username}
                  </Typography>
                </Box>
                
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 1.5, 
                    mt: 0.5, 
                    maxWidth: '80%', 
                    borderRadius: 2,
                    bgcolor: msg.userId === user?.id ? 'primary.dark' : 'grey.800',
                    color: msg.userId === user?.id ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
                
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {format(new Date(msg.timestamp), 'HH:mm', { locale: ptBR })}
                </Typography>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Paper 
            component="form" 
            onSubmit={handleSend}
            elevation={0} 
            sx={{ 
              p: 2, 
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex', 
              alignItems: 'center'
            }}
          >
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ 
                mr: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4
                }
              }}
            />
            <IconButton 
              type="submit" 
              color="primary" 
              disabled={!message.trim()}
            >
              <SendIcon />
            </IconButton>
          </Paper>
        </>
      ) : (
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: 3 
        }}>
          <Typography variant="body1" align="center" gutterBottom>
            Faça login para participar do chat com outros fãs!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/login"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <Box 
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16, 
            zIndex: 1000 
          }}
        >
          <Badge 
            badgeContent={onlineUsers} 
            color="primary"
            invisible={drawerOpen}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={toggleDrawer}
              startIcon={<ChatIcon />}
              sx={{ borderRadius: '50%', minWidth: 0, width: 56, height: 56, p: 0 }}
            >
              <ChatIcon />
            </Button>
          </Badge>
        </Box>
        
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              width: '100%', 
              maxWidth: 360,
              height: '100%',
              border: 'none'
            },
          }}
        >
          {renderChatContent()}
        </Drawer>
      </>
    );
  }

  return (
    <Box 
      sx={{ 
        position: 'fixed',
        right: 0,
        top: 64,
        bottom: 0,
        width: 320,
        zIndex: 100,
        display: drawerOpen ? 'block' : 'none'
      }}
    >
      {renderChatContent()}
    </Box>
  );
};

export default ChatBox;