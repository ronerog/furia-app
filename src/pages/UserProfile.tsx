import { useState, useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Button,
  useTheme,
  IconButton,
  CardMedia
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MessageIcon from '@mui/icons-material/Message';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RedeemIcon from '@mui/icons-material/Redeem';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthContext } from '../contexts/AuthContext';
import { PointsContext } from '../contexts/PointsContext';
import MainLayout from '../components/Layout/MainLayout';
// import axios from 'axios';
// import { Activity } from '../types';
// import { API_URL } from '../config';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const UserProfile = () => {
  const theme = useTheme();
  const { isAuthenticated, user } = useContext(AuthContext);
  const { points, activities } = useContext(PointsContext);
  const [tabValue, setTabValue] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userStats, setUserStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const currentLevel = Math.floor(points / 100);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const nextLevelPoints = (currentLevel + 1) * 100;
  const progress = ((points % 100) / 100) * 100;
  
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        setUserStats({
          totalTimeMinutes: 320,
          messagesCount: 45,
          matchesWatched: 12,
          rewardsRedeemed: 2,
          favoriteGame: 'valorant',
          joinDate: new Date(new Date().getTime() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
        });
      } catch (err) {
        console.error('Erro ao carregar estatísticas do usuário:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserStats();
  }, [isAuthenticated, user]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const activityCounts = activities.reduce((acc, activity) => {
    const type = activity.type;
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type]++;
    return acc;
  }, {} as Record<string, number>);

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <Container maxWidth="md">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Acesso restrito
            </Typography>
            <Typography variant="body1" paragraph>
              Faça login para acessar seu perfil.
            </Typography>
            <Button variant="contained" color="primary" href="/login">
              Login
            </Button>
          </Paper>
        </Container>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <Container maxWidth="md">
          <LinearProgress />
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 2,
            background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid>
              <Avatar 
                sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
              >
                {user?.username.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            
            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">
                  {user?.username}
                </Typography>
                <IconButton size="small" sx={{ ml: 1 }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <Typography variant="body1" color="text.secondary">
                Membro desde {userStats ? format(new Date(userStats.joinDate), "MMMM 'de' yyyy", { locale: ptBR }) : ''}
              </Typography>
            </Grid>
            
            <Grid>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  textAlign: 'center',
                  minWidth: 150
                }}
              >
                <Typography variant="h3" color="primary">
                  {points}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  PONTOS
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Typography variant="body2" color="text.secondary">
                  Nível {currentLevel}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ mt: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {points % 100}/{100} para o nível {currentLevel + 1}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Content tabs */}
        <Paper elevation={0} sx={{ borderRadius: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Perfil" {...a11yProps(0)} />
            <Tab label="Estatísticas" {...a11yProps(1)} />
            <Tab label="Atividades" {...a11yProps(2)} />
          </Tabs>
          
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid size={{xs:12, md:6 }} >
                <Typography variant="h6" gutterBottom>
                  Informações Pessoais
                </Typography>
                
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={{xs:12}}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Nome completo
                      </Typography>
                      <Typography variant="body1">
                        {user?.fullName || '-'}
                      </Typography>
                    </Grid>
                    
                    <Grid  size={{xs:12}}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {user?.email}
                      </Typography>
                    </Grid>
                    
                    <Grid  size={{xs:12}}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Data de nascimento
                      </Typography>
                      <Typography variant="body1">
                        {user?.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '-'}
                      </Typography>
                    </Grid>
                    
                    <Grid  size={{xs:12}}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Localização
                      </Typography>
                      <Typography variant="body1">
                        {user?.city && user?.state ? `${user.city}, ${user.state}, ${user.country || ''}` : '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              
              <Grid  size={{xs:12, md: 6}}>
                <Typography variant="h6" gutterBottom>
                  Preferências FURIA
                </Typography>
                
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid  size={{xs:12}}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Jogo favorito
                      </Typography>
                      <Typography variant="body1">
                        {user?.favoriteGame === 'valorant' ? 'Valorant' : 
                         user?.favoriteGame === 'csgo' ? 'CS:GO' : 
                         user?.favoriteGame === 'lol' ? 'League of Legends' :
                         user?.favoriteGame === 'apex' ? 'Apex Legends' :
                         '-'}
                      </Typography>
                    </Grid>
                    
                    <Grid  size={{xs:12}}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Jogador favorito
                      </Typography>
                      <Typography variant="body1">
                        {user?.favoritePlayer || '-'}
                      </Typography>
                    </Grid>
                    
                    <Grid  size={{xs:12}}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Conheceu a FURIA por
                      </Typography>
                      <Typography variant="body1">
                        {user?.howDidYouFind === 'youtube' ? 'YouTube' : 
                         user?.howDidYouFind === 'twitch' ? 'Twitch' : 
                         user?.howDidYouFind === 'instagram' ? 'Instagram' :
                         user?.howDidYouFind === 'twitter' ? 'Twitter' :
                         user?.howDidYouFind === 'friend' ? 'Amigo' :
                         user?.howDidYouFind === 'tournament' ? 'Torneio' :
                         user?.howDidYouFind === 'other' ? 'Outro' :
                         '-'}
                      </Typography>
                    </Grid>
                    
                    <Grid  size={{xs:12}}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Redes sociais
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                        {user?.instagramHandle ? (
                          <Chip 
                            size="small" 
                            label={`Instagram: ${user.instagramHandle}`} 
                            color="primary" 
                            variant="outlined" 
                          />
                        ) : null}
                        
                        {user?.twitterHandle ? (
                          <Chip 
                            size="small" 
                            label={`Twitter: ${user.twitterHandle}`} 
                            color="primary" 
                            variant="outlined" 
                          />
                        ) : null}
                        
                        {user?.twitchHandle ? (
                          <Chip 
                            size="small" 
                            label={`Twitch: ${user.twitchHandle}`} 
                            color="primary" 
                            variant="outlined" 
                          />
                        ) : null}
                        
                        {!user?.instagramHandle && !user?.twitterHandle && !user?.twitchHandle && (
                          <Typography variant="body2">-</Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<EditIcon />}
                  >
                    Editar perfil
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Minhas Estatísticas
            </Typography>
            
            <Grid container spacing={3}>
              <Grid  size={{xs:12, md: 6, sm: 3}}>
                <Card sx={{ bgcolor: 'background.default', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        bgcolor: 'rgba(0, 194, 255, 0.1)', 
                        color: 'primary.main',
                        margin: '0 auto 16px'
                      }}
                    >
                      <MessageIcon />
                    </Avatar>
                    <Typography variant="h4" color="primary">
                      {activityCounts['chat_message'] || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mensagens no chat
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{xs:12, md: 6, sm: 3}}>
                <Card sx={{ bgcolor: 'background.default', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        bgcolor: 'rgba(0, 194, 255, 0.1)', 
                        color: 'primary.main',
                        margin: '0 auto 16px'
                      }}
                    >
                      <VideogameAssetIcon />
                    </Avatar>
                    <Typography variant="h4" color="primary">
                      {activityCounts['watch_match'] || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Partidas assistidas
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{xs:12, md: 6, sm: 3}}>
                <Card sx={{ bgcolor: 'background.default', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        bgcolor: 'rgba(0, 194, 255, 0.1)', 
                        color: 'primary.main',
                        margin: '0 auto 16px'
                      }}
                    >
                      <AccessTimeIcon />
                    </Avatar>
                    <Typography variant="h4" color="primary">
                      {userStats?.totalTimeMinutes || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Minutos no site
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{xs:12, md: 6, sm: 3}}>
                <Card sx={{ bgcolor: 'background.default', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        bgcolor: 'rgba(0, 194, 255, 0.1)', 
                        color: 'primary.main',
                        margin: '0 auto 16px'
                      }}
                    >
                      <RedeemIcon />
                    </Avatar>
                    <Typography variant="h4" color="primary">
                      {activityCounts['reward_redemption'] || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recompensas resgatadas
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Conquistas
              </Typography>
              
              <Grid container spacing={2}>
                <Grid size={{xs:12, md: 6, sm: 4}}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'background.default',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">
                        Primeiro login
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Completado em {format(new Date(userStats.joinDate), 'dd/MM/yyyy')}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid size={{xs:12, md: 6, sm: 4}}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'background.default',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">
                        Primeira mensagem no chat
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Completado em {format(new Date(new Date().getTime() - 45 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy')}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid size={{xs:12, md: 6, sm: 4}}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'background.default',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      opacity: activityCounts['watch_match'] >= 10 ? 1 : 0.5
                    }}
                  >
                    {activityCounts['watch_match'] >= 10 ? (
                      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                    ) : (
                      <CheckCircleIcon color="disabled" sx={{ mr: 1 }} />
                    )}
                    <Box>
                      <Typography variant="subtitle2">
                        Assistir 10 partidas
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activityCounts['watch_match'] || 0}/10 completado
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Histórico de Atividades
            </Typography>
            
            <Paper elevation={0} sx={{ bgcolor: 'background.default', borderRadius: 2 }}>
              <List>
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {activity.type === 'chat_message' && <MessageIcon />}
                            {activity.type === 'watch_match' && <VideogameAssetIcon />}
                            {activity.type === 'watch_highlights' && <VideogameAssetIcon />}
                            {activity.type === 'view_time' && <AccessTimeIcon />}
                            {activity.type === 'daily_login' && <CheckCircleIcon />}
                            {activity.type === 'reward_redemption' && <RedeemIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="subtitle2">
                                {activity.type === 'chat_message' && 'Mensagem no chat'}
                                {activity.type === 'watch_match' && 'Assistiu partida'}
                                {activity.type === 'watch_highlights' && 'Assistiu highlights'}
                                {activity.type === 'view_time' && 'Tempo de visualização'}
                                {activity.type === 'daily_login' && 'Login diário'}
                                {activity.type === 'reward_redemption' && `Resgatou recompensa: ${activity.rewardName}`}
                              </Typography>
                              <Typography
                                variant="body2"
                                color={activity.points > 0 ? 'primary.main' : 'error.main'}
                              >
                                {activity.points > 0 ? '+' : ''}{activity.points} pontos
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {format(new Date(activity.timestamp), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < activities.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText
                      primary="Nenhuma atividade registrada ainda."
                      secondary="Interaja com o site para ganhar pontos e recompensas!"
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </TabPanel>
        </Paper>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Próximas Recompensas
          </Typography>
          
          <Grid container spacing={2}>
            <Grid size={{xs:12, md: 6, sm: 4}}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12, 
                    bgcolor: 'background.paper', 
                    color: 'primary.main',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    boxShadow: 1
                  }}
                >
                  200 pontos
                </Box>
                <CardMedia
                  component="img"
                  height={180}
                  image="/images/rewards/mousepad.jpg"
                  alt="Mousepad FURIA"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    Mousepad FURIA
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mousepad premium com logo da FURIA. Tamanho: 40x30cm.
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={(points / 200) * 100} 
                    sx={{ height: 8, borderRadius: 4, mb: 1 }} 
                  />
                  <Typography variant="body2" color="text.secondary" align="center">
                    {points}/200 pontos
                  </Typography>
                </Box>
              </Card>
            </Grid>
            
            <Grid size={{xs:12, md: 6, sm: 4}}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12, 
                    bgcolor: 'background.paper', 
                    color: 'primary.main',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    boxShadow: 1
                  }}
                >
                  500 pontos
                </Box>
                <CardMedia
                  component="img"
                  height={180}
                  image="/images/rewards/keychain.jpg"
                  alt="Chaveiro FURIA"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    Chaveiro FURIA
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chaveiro metálico com logo da FURIA. Edição limitada.
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={(points / 500) * 100} 
                    sx={{ height: 8, borderRadius: 4, mb: 1 }} 
                  />
                  <Typography variant="body2" color="text.secondary" align="center">
                    {points}/500 pontos
                  </Typography>
                </Box>
              </Card>
            </Grid>
            
            <Grid size={{xs:12, md: 6, sm: 4}}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12, 
                    bgcolor: 'background.paper', 
                    color: 'primary.main',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    boxShadow: 1
                  }}
                >
                  1000 pontos
                </Box>
                <CardMedia
                  component="img"
                  height={180}
                  image="/images/rewards/tshirt.jpg"
                  alt="Camiseta FURIA"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    Camiseta FURIA
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Camiseta oficial da FURIA, material premium com estampa exclusiva.
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={(points / 1000) * 100} 
                    sx={{ height: 8, borderRadius: 4, mb: 1 }} 
                  />
                  <Typography variant="body2" color="text.secondary" align="center">
                    {points}/1000 pontos
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/rewards"
              sx={{ px: 4, py: 1 }}
            >
              Ver todas as recompensas
            </Button>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default UserProfile;