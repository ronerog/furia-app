import { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent,
  Button, Chip, Avatar, Skeleton, Tabs, Tab,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MainLayout from '../components/Layout/MainLayout';
import axios from 'axios';
import { Stream } from '../types';
import { API_URL } from '../config';

const mockStreams: Stream[] = [
  { id: '1', title: 'Treinando para o próximo campeonato de Valorant!', streamerName: 'FURIA Xarola', streamerAvatar: '/images/streamers/player1.jpg', thumbnailUrl: '/images/streams/valorant-stream.jpg', url: 'https://www.twitch.tv/xarola_', game: 'valorant', viewerCount: 12500, isLive: true, startedAt: new Date(Date.now() - 3 * 3600000) },
  { id: '2', title: 'Jogando ranqueadas com o time da FURIA', streamerName: 'FURIA FalleN', streamerAvatar: '/images/streamers/player2.jpg', thumbnailUrl: '/images/streams/csgo-stream.jpg', url: 'https://www.twitch.tv/gafallen/', game: 'csgo', viewerCount: 8700, isLive: true, startedAt: new Date(Date.now() - 3600000) },
  { id: '3', title: 'Highlights da última partida do campeonato', streamerName: 'FURIA CS2', streamerAvatar: '/images/streamers/player3.jpg', thumbnailUrl: '/images/streams/csgo-stream.jpg', url: 'https://youtube.com', game: 'csgo', viewerCount: 5400, isLive: false },
  { id: '4', title: 'Dicas de Valorant com os jogadores da FURIA', streamerName: 'FURIA Valo', streamerAvatar: '/images/streamers/valo1.jpg', thumbnailUrl: '/images/streams/valorant-stream.jpg', url: 'https://youtube.com', game: 'valorant', viewerCount: 3200, isLive: false },
];

const gameColors: Record<string, string> = {
  csgo: '#F4A01C',
  valorant: '#FF4655',
  lol: '#C89B3C',
  apex: '#DA2D1F',
};

const StreamCard = ({ stream }: { stream: Stream }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover .stream-img': { transform: 'scale(1.04)' }, '&:hover': { borderColor: 'rgba(0,194,255,0.3)' } }}>
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <CardMedia
        component="img"
        height={180}
        image={stream.thumbnailUrl}
        alt={stream.title}
        className="stream-img"
        sx={{ transition: 'transform 0.3s ease' }}
      />
      {stream.isLive && (
        <Box sx={{ position: 'absolute', top: 10, left: 10, background: '#f44336', borderRadius: '4px', px: 0.75, py: 0.25, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <FiberManualRecordIcon sx={{ fontSize: 7, color: '#fff' }} />
          <Typography sx={{ fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>LIVE</Typography>
        </Box>
      )}
      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        <Chip
          label={stream.game === 'csgo' ? 'CS2' : stream.game.toUpperCase()}
          size="small"
          sx={{ fontSize: '0.6rem', height: 18, background: 'rgba(0,0,0,0.7)', color: gameColors[stream.game] || '#00c2ff', border: `1px solid ${gameColors[stream.game] || '#00c2ff'}40` }}
        />
      </Box>
      <Box sx={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.75)', borderRadius: '4px', px: 0.75, py: 0.25, display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <RemoveRedEyeIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }} />
        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)' }}>
          {stream.viewerCount.toLocaleString('pt-BR')}
        </Typography>
      </Box>
    </Box>
    <CardContent sx={{ flex: 1, py: 1.5, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Avatar src={stream.streamerAvatar} sx={{ width: 24, height: 24 }} />
        <Typography variant="caption" color="text.secondary">{stream.streamerName}</Typography>
      </Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
        {stream.title}
      </Typography>
      <Button fullWidth variant={stream.isLive ? 'contained' : 'outlined'} color="primary" component="a" href={stream.url} target="_blank" size="small">
        {stream.isLive ? 'Assistir ao vivo' : 'Assistir'}
      </Button>
    </CardContent>
  </Card>
);

const Streams = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/streams`)
      .then((res) => setStreams(res.data?.data || res.data || []))
      .catch(() => setStreams(mockStreams))
      .finally(() => setLoading(false));
  }, []);

  const live = streams.filter((s) => s.isLive);
  const vods = streams.filter((s) => !s.isLive);
  const displayed = tab === 0 ? streams : tab === 1 ? live : vods;

  return (
    <MainLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" sx={{ color: '#00c2ff', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 0.5 }}>
          Conteúdo ao vivo e gravado
        </Typography>
        <Typography variant="h4" fontWeight={700}>Streams</Typography>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          '& .MuiTab-root': { fontSize: '0.875rem', textTransform: 'none', fontWeight: 500, minWidth: 80, color: 'rgba(255,255,255,0.45)' },
          '& .Mui-selected': { color: '#fff' },
          '& .MuiTabs-indicator': { background: '#00c2ff', height: 2 },
        }}
      >
        <Tab label="Todos" />
        <Tab label={`Ao vivo${live.length > 0 ? ` (${live.length})` : ''}`} />
        <Tab label="Gravados" />
      </Tabs>

      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Card>
                  <Skeleton variant="rectangular" height={180} />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Skeleton variant="circular" width={24} height={24} />
                      <Skeleton variant="text" width={80} />
                    </Box>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={30} sx={{ mt: 1.5, borderRadius: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : displayed.map((stream) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stream.id}>
                <StreamCard stream={stream} />
              </Grid>
            ))}
      </Grid>

      {!loading && displayed.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">Nenhuma stream disponível no momento.</Typography>
        </Box>
      )}
    </MainLayout>
  );
};

export default Streams;
