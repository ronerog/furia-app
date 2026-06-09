import { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardActions,
  Button, Chip, Avatar, Skeleton, Tabs, Tab, Container,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MainLayout from '../components/Layout/MainLayout';
import axios from 'axios';
import { Match } from '../types';
import { API_URL } from '../config';

const mockMatches: Match[] = [
  { id: '1', tournamentName: 'VALORANT Champions 2026', tournamentLogo: '/images/tournaments/valorant-champions.png', date: new Date(Date.now() + 2 * 86400000), game: 'valorant', opponentName: 'Sentinels', opponentLogo: '/images/teams/sentinels.png', streamUrl: 'https://twitch.tv/valorant', status: 'upcoming' },
  { id: '2', tournamentName: 'ESL Pro League S21', tournamentLogo: '/images/tournaments/esl.png', date: new Date(Date.now() + 5 * 3600000), game: 'csgo', opponentName: 'Natus Vincere', opponentLogo: '/images/teams/navi.png', streamUrl: 'https://twitch.tv/esl_csgo', status: 'upcoming' },
  { id: '3', tournamentName: 'LCS Summer Split', tournamentLogo: '/images/tournaments/lcs.png', date: new Date(Date.now() + 3 * 86400000), game: 'lol', opponentName: 'Team Liquid', opponentLogo: '/images/teams/liquid.png', status: 'upcoming' },
  { id: '4', tournamentName: 'ESL Pro League', tournamentLogo: '/images/tournaments/esl.png', date: new Date(Date.now() - 5 * 86400000), game: 'csgo', opponentName: 'Astralis', opponentLogo: '/images/teams/astralis.png', furiaScore: 2, opponentScore: 0, highlightsUrl: 'https://youtube.com', status: 'completed' },
  { id: '5', tournamentName: 'BLAST Premier', tournamentLogo: '/images/tournaments/blast.png', date: new Date(Date.now() - 10 * 86400000), game: 'csgo', opponentName: 'G2 Esports', opponentLogo: '/images/teams/g2.png', furiaScore: 1, opponentScore: 2, highlightsUrl: 'https://youtube.com', status: 'completed' },
  { id: '6', tournamentName: 'VCT Brazil', tournamentLogo: '/images/tournaments/vct.png', date: new Date(Date.now() - 7 * 86400000), game: 'valorant', opponentName: 'LOUD', opponentLogo: '/images/teams/loud.png', furiaScore: 2, opponentScore: 1, highlightsUrl: 'https://youtube.com', status: 'completed' },
];

const gameColors: Record<string, string> = {
  csgo: '#F4A01C',
  valorant: '#FF4655',
  lol: '#C89B3C',
  apex: '#DA2D1F',
};

const MatchRow = ({ match }: { match: Match }) => {
  const isCompleted = match.status === 'completed';
  const furiaWon = isCompleted && Number(match.furiaScore) > Number(match.opponentScore);
  const furiaLost = isCompleted && Number(match.furiaScore) < Number(match.opponentScore);

  return (
    <Card sx={{ mb: 1.5 }}>
      <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 160 }}>
            <Avatar src={match.tournamentLogo} sx={{ width: 20, height: 20 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                {match.tournamentName}
              </Typography>
              <Typography variant="caption" sx={{ color: gameColors[match.game] || '#00c2ff', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase' }}>
                {match.game === 'csgo' ? 'CS2' : match.game}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1, justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src="/images/teams/furia.png" sx={{ width: 32, height: 32, background: 'rgba(255,255,255,0.05)' }} />
              <Typography variant="body2" fontWeight={600}>FURIA</Typography>
            </Box>

            {isCompleted ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Typography variant="h6" fontWeight={800} sx={{ color: furiaWon ? '#00c2ff' : 'rgba(255,255,255,0.4)', minWidth: 20, textAlign: 'center' }}>
                  {match.furiaScore}
                </Typography>
                <Typography variant="caption" color="text.secondary">×</Typography>
                <Typography variant="h6" fontWeight={800} sx={{ color: furiaLost ? '#00c2ff' : 'rgba(255,255,255,0.4)', minWidth: 20, textAlign: 'center' }}>
                  {match.opponentScore}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  {format(new Date(match.date), "dd/MM · HH:mm", { locale: ptBR })}
                </Typography>
                <Typography variant="caption" sx={{ color: '#00c2ff', fontWeight: 600, fontSize: '0.65rem' }}>VS</Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight={600}>{match.opponentName}</Typography>
              <Avatar src={match.opponentLogo} sx={{ width: 32, height: 32, background: 'rgba(255,255,255,0.05)' }} />
            </Box>
          </Box>

          <Box sx={{ minWidth: 110, display: 'flex', justifyContent: 'flex-end' }}>
            {isCompleted ? (
              <>
                <Chip
                  label={furiaWon ? 'Vitória' : 'Derrota'}
                  size="small"
                  sx={{
                    background: furiaWon ? 'rgba(0,194,255,0.1)' : 'rgba(255,255,255,0.05)',
                    color: furiaWon ? '#00c2ff' : 'rgba(255,255,255,0.4)',
                    border: `1px solid ${furiaWon ? 'rgba(0,194,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    fontSize: '0.65rem',
                    mr: match.highlightsUrl ? 1 : 0,
                  }}
                />
                {match.highlightsUrl && (
                  <Button size="small" component="a" href={match.highlightsUrl} target="_blank" sx={{ fontSize: '0.7rem', py: 0.25, px: 1, color: '#00c2ff', border: '1px solid rgba(0,194,255,0.2)', borderRadius: 1 }}>
                    Highlights
                  </Button>
                )}
              </>
            ) : (
              match.streamUrl ? (
                <Button size="small" variant="outlined" color="primary" component="a" href={match.streamUrl} target="_blank" sx={{ fontSize: '0.75rem' }}>
                  Assistir
                </Button>
              ) : (
                <Button size="small" variant="outlined" color="primary" sx={{ fontSize: '0.75rem' }}>
                  Lembrete
                </Button>
              )
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/matches`)
      .then((res) => setMatches(res.data?.data || res.data || []))
      .catch(() => setMatches(mockMatches))
      .finally(() => setLoading(false));
  }, []);

  const upcoming = matches.filter((m) => m.status === 'upcoming' || m.status === 'live');
  const completed = matches.filter((m) => m.status === 'completed');
  const displayed = tab === 0 ? upcoming : completed;

  return (
    <MainLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" sx={{ color: '#00c2ff', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 0.5 }}>
          Resultados & Agenda
        </Typography>
        <Typography variant="h4" fontWeight={700}>Partidas</Typography>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          '& .MuiTab-root': { fontSize: '0.875rem', textTransform: 'none', fontWeight: 500, minWidth: 100, color: 'rgba(255,255,255,0.45)' },
          '& .Mui-selected': { color: '#fff' },
          '& .MuiTabs-indicator': { background: '#00c2ff', height: 2 },
        }}
      >
        <Tab label={`Próximas (${upcoming.length})`} />
        <Tab label={`Resultados (${completed.length})`} />
      </Tabs>

      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} sx={{ mb: 1.5 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width={140} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="text" width={60} />
                    <Skeleton variant="circular" width={32} height={32} />
                  </Box>
                  <Skeleton variant="rectangular" width={80} height={28} sx={{ borderRadius: 1 }} />
                </Box>
              </CardContent>
            </Card>
          ))
        : displayed.length > 0
        ? displayed.map((match) => <MatchRow key={match.id} match={match} />)
        : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">Nenhuma partida encontrada.</Typography>
          </Box>
        )}
    </MainLayout>
  );
};

export default Matches;
