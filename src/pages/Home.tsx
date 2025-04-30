import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Skeleton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthContext } from '../contexts/AuthContext';
// import { PointsContext } from '../contexts/PointsContext.tsx';
import MainLayout from '../components/Layout/MainLayout';
import axios from 'axios';
import { Match, News, Stream } from '../types';
import { API_URL } from '../config';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [featuredMatches, setFeaturedMatches] = useState<Match[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [liveStreams, setLiveStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [matchesRes, newsRes, streamsRes] = await Promise.all([
          axios.get(`${API_URL}/matches/featured`),
          axios.get(`${API_URL}/news`),
          axios.get(`${API_URL}/streams/live`)
        ]);
        
        setFeaturedMatches(matchesRes.data || []);
        setNews(newsRes.data || []);
        setLiveStreams(streamsRes.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar dados da página inicial:', err);
        
        setFeaturedMatches(mockMatches);
        setNews(mockNews);
        setLiveStreams(mockStreams);
        
        setLoading(false);
      }
    };
    
    fetchHomeData();
    
  }, [isAuthenticated]);

  const HeroSection = () => (
    <Box
      sx={{
        position: 'relative',
        height: '75vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'url("/images/furia-hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))`,
          zIndex: 1
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          px: { xs: 3, md: 10 },
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        <Typography
          variant="h1"
          color="white"
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          BEM-VINDO AO <Box component="span" sx={{ color: 'primary.main' }}>MUNDO FURIA</Box>
        </Typography>
        
        <Typography
          variant="h5"
          color="white"
          sx={{
            maxWidth: { xs: '100%', md: '60%' },
            mb: 4,
            opacity: 0.9
          }}
        >
          Acompanhe nossos times, assista partidas ao vivo e ganhe recompensas exclusivas.
        </Typography>
        
        {!isAuthenticated && (
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/register"
              sx={{ 
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2
              }}
            >
              Cadastre-se
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to="/login"
              sx={{ 
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2
              }}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <MainLayout heroSection={<HeroSection />}>
      {(loading || featuredMatches.length > 0) && (
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Próximas Partidas
            </Typography>
            
            <Button 
              component={Link} 
              to="/matches" 
              endIcon={<ArrowForwardIcon />}
              color="primary"
            >
              Ver todas
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {loading ? (
              Array.from(new Array(3)).map((_, index) => (
                <Grid size={{ xs: 12, md: 4}} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <Skeleton variant="rectangular" height={60} />
                    <CardContent>
                      <Skeleton variant="text" height={40} />
                      <Skeleton variant="text" height={30} width="40%" />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Skeleton variant="rectangular" width={80} height={60} />
                        <Skeleton variant="text" width={40} height={40} />
                        <Skeleton variant="rectangular" width={80} height={60} />
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Skeleton variant="rectangular" width="100%" height={36} />
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              featuredMatches.map((match) => (
                <Grid size={{ xs: 12, md: 4}} key={match.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ 
                      p: 2, 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      bgcolor: 'background.default'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          src={match.tournamentLogo} 
                          alt={match.tournamentName}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography variant="subtitle2">{match.tournamentName}</Typography>
                      </Box>
                      <Chip 
                        size="small" 
                        label={match.game.toUpperCase()} 
                        color="primary" 
                        variant="outlined"
                      />
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        align="center"
                        sx={{ mb: 2 }}
                      >
                        {format(new Date(match.date), "dd 'de' MMMM, HH:mm", { locale: ptBR })}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
                          <Avatar 
                            src="/images/teams/furia.png" 
                            alt="FURIA" 
                            sx={{ width: 64, height: 64, mb: 1 }}
                          />
                          <Typography variant="subtitle1" align="center">FURIA</Typography>
                        </Box>
                        
                        <Typography variant="h5" color="text.secondary">VS</Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
                          <Avatar 
                            src={match.opponentLogo} 
                            alt={match.opponentName} 
                            sx={{ width: 64, height: 64, mb: 1 }}
                          />
                          <Typography variant="subtitle1" align="center">{match.opponentName}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      {match.streamUrl ? (
                        <Button 
                          fullWidth 
                          variant="contained" 
                          color="primary"
                          component="a"
                          href={match.streamUrl}
                          target="_blank"
                          onClick={() => isAuthenticated}
                        >
                          Assistir Ao Vivo
                        </Button>
                      ) : (
                        <Button 
                          fullWidth 
                          variant="outlined" 
                          color="primary"
                        >
                          Lembrete
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}
      
      <Grid container spacing={4}></Grid>
      <Grid container spacing={4}>
        <Grid size={{xs: 12, md: 7}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2">
              Notícias FURIA
            </Typography>
            
            <Button 
              component={Link} 
              to="/news" 
              endIcon={<ArrowForwardIcon />}
              color="primary"
            >
              Ver todas
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {loading ? (
              Array.from(new Array(3)).map((_, index) => (
                <Card key={index}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Skeleton variant="rectangular" 
                      sx={{ 
                        width: { xs: '100%', sm: 200 }, 
                        height: { xs: 200, sm: '100%' } 
                      }} 
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Skeleton variant="text" height={30} width="80%" />
                      <Skeleton variant="text" height={20} width="30%" sx={{ mb: 1 }} />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </CardContent>
                  </Box>
                </Card>
              ))
            ) : (
              news.slice(0, 3).map((item) => (
                <Card key={item.id}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <CardMedia
                      component="img"
                      sx={{ 
                        width: { xs: '100%', sm: 200 }, 
                        height: { xs: 200, sm: 'auto' } 
                      }}
                      image={item.imageUrl}
                      alt={item.title}
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h6">
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 1 }}>
                        {format(new Date(item.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {item.excerpt}
                      </Typography>
                      <Button 
                        component={Link} 
                        to={`/news/${item.id}`} 
                        color="primary"
                        size="small"
                      >
                        Ler mais
                      </Button>
                    </CardContent>
                  </Box>
                </Card>
              ))
            )}
          </Box>
        </Grid>
        
        <Grid size={{xs: 12, md: 5}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2">
              Lives Ao Vivo
            </Typography>
            
            <Button 
              component={Link} 
              to="/streams" 
              endIcon={<ArrowForwardIcon />}
              color="primary"
            >
              Ver todas
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {loading ? (
              Array.from(new Array(2)).map((_, index) => (
                <Card key={index}>
                  <Skeleton variant="rectangular" height={180} />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
                      <Skeleton variant="text" width={120} />
                    </Box>
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              ))
            ) : liveStreams.length > 0 ? (
              liveStreams.slice(0, 2).map((stream) => (
                <Card key={stream.id}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height={180}
                      image={stream.thumbnailUrl}
                      alt={stream.title}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'error.main',
                        color: 'white',
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      LIVE
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RemoveRedEyeIcon sx={{ fontSize: '0.875rem', mr: 0.5 }} />
                      {stream.viewerCount}
                    </Box>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar 
                        src={stream.streamerAvatar} 
                        alt={stream.streamerName}
                        sx={{ mr: 1, width: 32, height: 32 }}
                      />
                      <Typography variant="subtitle2" color="text.secondary">
                        {stream.streamerName}
                      </Typography>
                    </Box>
                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                      {stream.title}
                    </Typography>
                    <Button 
                      fullWidth
                      variant="contained" 
                      color="primary"
                      component="a"
                      href={stream.url}
                      target="_blank"
                      onClick={() => isAuthenticated}
                    >
                      Assistir
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Nenhuma live disponível no momento.
                </Typography>
                <Button 
                  component={Link} 
                  to="/streams" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Ver todas as streams
                </Button>
              </Card>
            )}
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

const mockMatches: Match[] = [
  {
    id: '1',
    tournamentName: 'VALORANT Champions',
    tournamentLogo: '/images/tournaments/valorant-champions.png',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    game: 'valorant',
    opponentName: 'Sentinels',
    opponentLogo: '/images/teams/sentinels.png',
    streamUrl: 'https://twitch.tv/valorant',
    status: 'upcoming'
  },
  {
    id: '2',
    tournamentName: 'ESL Pro League',
    tournamentLogo: '/images/tournaments/esl.png',
    date: new Date(new Date().getTime() + 5 * 60 * 60 * 1000), // 5 hours from now
    game: 'csgo',
    opponentName: 'Natus Vincere',
    opponentLogo: '/images/teams/navi.png',
    streamUrl: 'https://twitch.tv/esl_csgo',
    status: 'upcoming'
  },
  {
    id: '3',
    tournamentName: 'LCS Summer Split',
    tournamentLogo: '/images/tournaments/lcs.png',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    game: 'lol',
    opponentName: 'Team Liquid',
    opponentLogo: '/images/teams/liquid.png',
    status: 'upcoming'
  }
];

const mockNews: News[] = [
  {
    id: '1',
    title: 'FURIA anuncia novo jogador para o time de Valorant',
    content: 'Conteúdo completo da notícia...',
    excerpt: 'A FURIA Esports anunciou hoje a contratação de um novo jogador para reforçar seu time de Valorant...',
    imageUrl: '/images/news/valorant-news.jpg',
    date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    author: 'Equipe FURIA',
    tags: ['valorant', 'contratação', 'time']
  },
  {
    id: '2',
    title: 'FURIA se classifica para as finais do Major de CS:GO',
    content: 'Conteúdo completo da notícia...',
    excerpt: 'A equipe brasileira de CS:GO da FURIA garantiu sua vaga nas finais do Major após uma vitória emocionante...',
    imageUrl: '/images/news/csgo-news.jpg',
    date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    author: 'Equipe FURIA',
    tags: ['csgo', 'major', 'torneio']
  },
  {
    id: '3',
    title: 'Nova coleção de produtos FURIA já disponível na loja',
    content: 'Conteúdo completo da notícia...',
    excerpt: 'A FURIA Esports lançou hoje sua nova coleção de produtos oficiais, incluindo camisetas, moletons e acessórios...',
    imageUrl: '/images/news/store-news.jpg',
    date: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    author: 'Equipe FURIA',
    tags: ['loja', 'produtos', 'coleção']
  }
];

const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'Treinando para o próximo campeonato de Valorant!',
    streamerName: 'FURIA Xarola',
    streamerAvatar: '/images/streamers/player1.jpg',
    thumbnailUrl: '/images/streams/valorant-stream.jpg',
    url: 'https://www.twitch.tv/xarola_?lang=pt-br',
    game: 'valorant',
    viewerCount: 12500,
    isLive: true,
    startedAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000) 
  },
  {
    id: '2',
    title: 'Jogando ranqueadas com o time da FURIA',
    streamerName: 'FURIA Fallen',
    streamerAvatar: '/images/streamers/player2.jpg',
    thumbnailUrl: '/images/streams/csgo-stream.jpg',
    url: 'https://www.twitch.tv/gafallen/',
    game: 'csgo',
    viewerCount: 8700,
    isLive: true,
    startedAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000)
  }
];

export default Home;