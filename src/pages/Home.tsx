import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Grid, Card, CardMedia,
  CardContent, CardActions, Chip, Avatar, Skeleton, Container,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthContext } from '../contexts/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import axios from 'axios';
import { Match, News, Stream } from '../types';
import { API_URL } from '../config';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="caption"
    sx={{
      color: '#00c2ff',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      fontWeight: 700,
      fontSize: '0.7rem',
      display: 'block',
      mb: 0.75,
    }}
  >
    {children}
  </Typography>
);

const SectionHeader = ({
  label,
  title,
  linkTo,
  linkLabel = 'Ver todas',
}: {
  label: string;
  title: string;
  linkTo: string;
  linkLabel?: string;
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
    <Box>
      <SectionLabel>{label}</SectionLabel>
      <Typography variant="h5" fontWeight={700}>
        {title}
      </Typography>
    </Box>
    <Button
      component={Link}
      to={linkTo}
      endIcon={<ArrowForwardIcon sx={{ fontSize: '0.875rem !important' }} />}
      sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', '&:hover': { color: '#00c2ff' } }}
    >
      {linkLabel}
    </Button>
  </Box>
);

const MatchCardItem = ({ match }: { match: Match }) => {
  const isUpcoming = match.status === 'upcoming';
  const isLive = match.status === 'live';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          px: 2,
          py: 1.25,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Avatar src={match.tournamentLogo} sx={{ width: 18, height: 18 }} />
          <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 120 }}>
            {match.tournamentName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          {isLive && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FiberManualRecordIcon sx={{ fontSize: 8, color: '#f44336', animation: 'pulse 1.5s infinite' }} />
              <Typography variant="caption" sx={{ color: '#f44336', fontWeight: 700, fontSize: '0.65rem' }}>
                AO VIVO
              </Typography>
            </Box>
          )}
          <Chip
            label={match.game.toUpperCase()}
            size="small"
            variant="outlined"
            color="primary"
            sx={{ fontSize: '0.6rem', height: 18 }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, py: 2.5 }}>
        {!isLive && (
          <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mb: 2 }}>
            {format(new Date(match.date), "dd 'de' MMM, HH:mm", { locale: ptBR })}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', gap: 0.75 }}>
            <Avatar src="/images/teams/furia.png" sx={{ width: 52, height: 52, background: 'rgba(255,255,255,0.05)' }} />
            <Typography variant="caption" fontWeight={600} align="center">
              FURIA
            </Typography>
            {!isUpcoming && (
              <Typography variant="h5" fontWeight={800} color={Number(match.furiaScore) > Number(match.opponentScore) ? 'primary.main' : 'text.secondary'}>
                {match.furiaScore}
              </Typography>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {isUpcoming ? 'VS' : '×'}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', gap: 0.75 }}>
            <Avatar src={match.opponentLogo} sx={{ width: 52, height: 52, background: 'rgba(255,255,255,0.05)' }} />
            <Typography variant="caption" fontWeight={600} align="center" noWrap sx={{ maxWidth: 80 }}>
              {match.opponentName}
            </Typography>
            {!isUpcoming && (
              <Typography variant="h5" fontWeight={800} color={Number(match.opponentScore) > Number(match.furiaScore) ? 'primary.main' : 'text.secondary'}>
                {match.opponentScore}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 1.5, pt: 0 }}>
        {match.streamUrl ? (
          <Button fullWidth variant={isLive ? 'contained' : 'outlined'} color="primary" component="a" href={match.streamUrl} target="_blank" size="small">
            {isLive ? 'Assistir Ao Vivo' : 'Lembrete'}
          </Button>
        ) : (
          <Button fullWidth variant="outlined" color="primary" size="small">Lembrete</Button>
        )}
      </CardActions>
    </Card>
  );
};

const NewsCardItem = ({ item }: { item: News }) => (
  <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, overflow: 'hidden' }}>
    <Box sx={{ width: { xs: '100%', sm: 200 }, flexShrink: 0, overflow: 'hidden' }}>
      <CardMedia
        component="img"
        image={item.imageUrl}
        alt={item.title}
        sx={{ width: '100%', height: { xs: 180, sm: '100%' }, minHeight: { sm: 140 }, objectFit: 'cover', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)' } }}
      />
    </Box>
    <CardContent sx={{ flex: 1, py: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
          {item.tags?.slice(0, 2).map((tag) => (
            <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.65rem', height: 18, background: 'rgba(0,194,255,0.08)', color: '#00c2ff', border: '1px solid rgba(0,194,255,0.15)' }} />
          ))}
        </Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5, lineHeight: 1.4 }}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.excerpt}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
        <Typography variant="caption" color="text.secondary">
          {format(new Date(item.date), "dd 'de' MMM, yyyy", { locale: ptBR })}
        </Typography>
        <Button component={Link} to={`/news/${item.id}`} size="small" sx={{ color: '#00c2ff', fontSize: '0.75rem', p: 0, minWidth: 0 }}>
          Ler mais →
        </Button>
      </Box>
    </CardContent>
  </Card>
);

const StreamCardItem = ({ stream }: { stream: Stream }) => (
  <Card sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <CardMedia component="img" height={160} image={stream.thumbnailUrl} alt={stream.title} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)' } }} />
      {stream.isLive && (
        <Box sx={{ position: 'absolute', top: 10, left: 10, background: '#f44336', color: '#fff', borderRadius: '4px', px: 0.75, py: 0.25, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <FiberManualRecordIcon sx={{ fontSize: 7 }} />
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 700 }}>LIVE</Typography>
        </Box>
      )}
      <Box sx={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.75)', borderRadius: '4px', px: 0.75, py: 0.25, display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <RemoveRedEyeIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }} />
        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)' }}>
          {stream.viewerCount.toLocaleString('pt-BR')}
        </Typography>
      </Box>
    </Box>
    <CardContent sx={{ flex: 1, py: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Avatar src={stream.streamerAvatar} sx={{ width: 24, height: 24 }} />
        <Typography variant="caption" color="text.secondary">{stream.streamerName}</Typography>
      </Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
        {stream.title}
      </Typography>
      <Button fullWidth variant="outlined" color="primary" component="a" href={stream.url} target="_blank" size="small">
        Assistir
      </Button>
    </CardContent>
  </Card>
);

const mockMatches: Match[] = [
  { id: '1', tournamentName: 'VALORANT Champions', tournamentLogo: '/images/tournaments/valorant-champions.png', date: new Date(Date.now() + 2 * 86400000), game: 'valorant', opponentName: 'Sentinels', opponentLogo: '/images/teams/sentinels.png', streamUrl: 'https://twitch.tv/valorant', status: 'upcoming' },
  { id: '2', tournamentName: 'ESL Pro League', tournamentLogo: '/images/tournaments/esl.png', date: new Date(Date.now() + 5 * 3600000), game: 'csgo', opponentName: 'Natus Vincere', opponentLogo: '/images/teams/navi.png', streamUrl: 'https://twitch.tv/esl_csgo', status: 'upcoming' },
  { id: '3', tournamentName: 'LCS Summer Split', tournamentLogo: '/images/tournaments/lcs.png', date: new Date(Date.now() + 3 * 86400000), game: 'lol', opponentName: 'Team Liquid', opponentLogo: '/images/teams/liquid.png', status: 'upcoming' },
];

const mockNews: News[] = [
  { id: '1', title: 'FURIA anuncia novo jogador para o time de Valorant', content: '', excerpt: 'A FURIA Esports anunciou hoje a contratação de um novo jogador para reforçar seu time de Valorant...', imageUrl: '/images/news/valorant-news.jpg', date: new Date(Date.now() - 2 * 86400000), author: 'Equipe FURIA', tags: ['valorant', 'contratação'] },
  { id: '2', title: 'FURIA se classifica para as finais do Major de CS2', content: '', excerpt: 'A equipe brasileira da FURIA garantiu sua vaga nas finais do Major após uma vitória emocionante contra a NAVI...', imageUrl: '/images/news/csgo-news.jpg', date: new Date(Date.now() - 7 * 86400000), author: 'Equipe FURIA', tags: ['cs2', 'major'] },
  { id: '3', title: 'Nova coleção de produtos FURIA disponível na loja', content: '', excerpt: 'A FURIA lançou sua nova coleção oficial com camisetas, moletons e acessórios exclusivos para os fãs...', imageUrl: '/images/news/store-news.jpg', date: new Date(Date.now() - 14 * 86400000), author: 'Equipe FURIA', tags: ['loja', 'produtos'] },
];

const mockStreams: Stream[] = [
  { id: '1', title: 'Treinando para o próximo campeonato de Valorant!', streamerName: 'FURIA Xarola', streamerAvatar: '/images/streamers/player1.jpg', thumbnailUrl: '/images/streams/valorant-stream.jpg', url: 'https://www.twitch.tv/xarola_', game: 'valorant', viewerCount: 12500, isLive: true, startedAt: new Date(Date.now() - 3 * 3600000) },
  { id: '2', title: 'Jogando ranqueadas com o time da FURIA', streamerName: 'FURIA FalleN', streamerAvatar: '/images/streamers/player2.jpg', thumbnailUrl: '/images/streams/csgo-stream.jpg', url: 'https://www.twitch.tv/gafallen/', game: 'csgo', viewerCount: 8700, isLive: true, startedAt: new Date(Date.now() - 3600000) },
];

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
          axios.get(`${API_URL}/streams/live`),
        ]);
        setFeaturedMatches(matchesRes.data?.data || matchesRes.data || []);
        setNews(newsRes.data?.data || newsRes.data || []);
        setLiveStreams(streamsRes.data?.data || streamsRes.data || []);
      } catch {
        setFeaturedMatches(mockMatches);
        setNews(mockNews);
        setLiveStreams(mockStreams);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, [isAuthenticated]);

  const HeroSection = () => (
    <Box
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#080808',
      }}
    >
      <Box
        sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/images/furia-hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          opacity: 0.18,
        }}
      />
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,194,255,0.06) 0%, transparent 70%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to top, #080808, transparent)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 16 } }}>
        <Box sx={{ maxWidth: { xs: '100%', md: '65%' } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              background: 'rgba(0,194,255,0.08)',
              border: '1px solid rgba(0,194,255,0.2)',
              borderRadius: '20px',
              px: 1.5,
              py: 0.5,
              mb: 3,
            }}
          >
            <FiberManualRecordIcon sx={{ fontSize: 8, color: '#00c2ff', animation: 'pulse 2s infinite' }} />
            <Typography variant="caption" sx={{ color: '#00c2ff', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.7rem' }}>
              CS2 • VALORANT • LOL • APEX
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              lineHeight: 1.0,
              mb: 2.5,
              color: '#f0f0f0',
            }}
          >
            BEM-VINDO AO{' '}
            <Box component="span" sx={{ color: '#00c2ff', display: 'block' }}>
              MUNDO FURIA
            </Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400, lineHeight: 1.6, mb: 4, maxWidth: 480, fontSize: { xs: '1rem', md: '1.125rem' } }}
          >
            Acompanhe partidas ao vivo, assista streams dos jogadores e ganhe recompensas exclusivas por ser fã.
          </Typography>

          {!isAuthenticated ? (
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" size="large" component={Link} to="/register" sx={{ px: 3.5 }}>
                Criar conta gratuita
              </Button>
              <Button variant="outlined" color="primary" size="large" component={Link} to="/matches" sx={{ px: 3.5 }}>
                Ver partidas
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" size="large" component={Link} to="/matches" sx={{ px: 3.5 }}>
                Ver partidas
              </Button>
              <Button variant="outlined" color="primary" size="large" component={Link} to="/rewards" sx={{ px: 3.5 }}>
                Minhas recompensas
              </Button>
            </Box>
          )}
        </Box>
      </Container>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </Box>
  );

  return (
    <MainLayout heroSection={<HeroSection />}>
      {(loading || featuredMatches.length > 0) && (
        <Box sx={{ mb: 8 }}>
          <SectionHeader label="Agenda" title="Próximas Partidas" linkTo="/matches" />
          <Grid container spacing={2}>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Grid size={{ xs: 12, md: 4 }} key={i}>
                    <Card>
                      <Skeleton variant="rectangular" height={48} />
                      <CardContent>
                        <Skeleton variant="text" height={32} width="60%" sx={{ mx: 'auto' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          <Skeleton variant="circular" width={52} height={52} />
                          <Skeleton variant="text" width={24} height={28} />
                          <Skeleton variant="circular" width={52} height={52} />
                        </Box>
                      </CardContent>
                      <Box sx={{ p: 1.5 }}>
                        <Skeleton variant="rectangular" height={32} sx={{ borderRadius: 1 }} />
                      </Box>
                    </Card>
                  </Grid>
                ))
              : featuredMatches.map((match) => (
                  <Grid size={{ xs: 12, md: 4 }} key={match.id}>
                    <MatchCardItem match={match} />
                  </Grid>
                ))}
          </Grid>
        </Box>
      )}

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <SectionHeader label="Novidades" title="Últimas Notícias" linkTo="/news" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 150, sm: 140 } }} />
                    <CardContent sx={{ flex: 1 }}>
                      <Skeleton variant="text" height={28} width="80%" />
                      <Skeleton variant="text" height={20} width="40%" sx={{ mb: 1 }} />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </CardContent>
                  </Card>
                ))
              : news.slice(0, 3).map((item) => <NewsCardItem key={item.id} item={item} />)}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <SectionHeader label="Ao vivo" title="Streams" linkTo="/streams" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <Card key={i}>
                    <Skeleton variant="rectangular" height={160} />
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" width={100} />
                      </Box>
                      <Skeleton variant="text" height={24} />
                      <Skeleton variant="rectangular" height={32} sx={{ mt: 1.5, borderRadius: 1 }} />
                    </CardContent>
                  </Card>
                ))
              : liveStreams.length > 0
              ? liveStreams.slice(0, 2).map((stream) => <StreamCardItem key={stream.id} stream={stream} />)
              : (
                <Card sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Nenhuma stream ao vivo no momento.
                  </Typography>
                  <Button component={Link} to="/streams" size="small" color="primary">
                    Ver todos os conteúdos
                  </Button>
                </Card>
              )}
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Home;
