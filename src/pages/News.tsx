import { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent,
  Chip, Skeleton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MainLayout from '../components/Layout/MainLayout';
import axios from 'axios';
import { News } from '../types';
import { API_URL } from '../config';

const mockNews: News[] = [
  { id: '1', title: 'FURIA anuncia novo jogador para o time de Valorant', content: '', excerpt: 'A FURIA Esports anunciou hoje a contratação de um novo jogador para reforçar seu time de Valorant com o objetivo de conquistar o próximo campeonato mundial.', imageUrl: '/images/news/valorant-news.jpg', date: new Date(Date.now() - 2 * 86400000), author: 'Equipe FURIA', tags: ['valorant', 'contratação', 'time'] },
  { id: '2', title: 'FURIA se classifica para as finais do Major de CS2', content: '', excerpt: 'A equipe brasileira da FURIA garantiu sua vaga nas finais do Major após uma vitória emocionante contra a NAVI por 2 a 1.', imageUrl: '/images/news/csgo-news.jpg', date: new Date(Date.now() - 5 * 86400000), author: 'Equipe FURIA', tags: ['cs2', 'major', 'torneio'] },
  { id: '3', title: 'Nova coleção de produtos FURIA já disponível na loja oficial', content: '', excerpt: 'A FURIA Esports lançou hoje sua nova coleção de produtos oficiais, incluindo camisetas, moletons e acessórios exclusivos.', imageUrl: '/images/news/store-news.jpg', date: new Date(Date.now() - 8 * 86400000), author: 'Equipe FURIA', tags: ['loja', 'produtos', 'coleção'] },
  { id: '4', title: 'FURIA Valorant conquista o VCT Brazil com virada histórica', content: '', excerpt: 'Em uma das partidas mais emocionantes do ano, o time de Valorant da FURIA virou o placar e conquistou o título do VCT Brazil.', imageUrl: '/images/news/valorant-news.jpg', date: new Date(Date.now() - 12 * 86400000), author: 'Equipe FURIA', tags: ['valorant', 'vct', 'título'] },
  { id: '5', title: 'FURIA anuncia parceria com grande patrocinador internacional', content: '', excerpt: 'A organização brasileira de esports fechou um importante acordo de patrocínio que amplia sua presença no cenário internacional.', imageUrl: '/images/news/csgo-news.jpg', date: new Date(Date.now() - 18 * 86400000), author: 'Equipe FURIA', tags: ['negócios', 'parceria'] },
  { id: '6', title: 'FalleN fala sobre a preparação para o próximo Major', content: '', excerpt: 'O veterano Gabriel "FalleN" Toledo compartilhou detalhes sobre a rotina de treinos intensos que a equipe tem seguido.', imageUrl: '/images/news/csgo-news.jpg', date: new Date(Date.now() - 22 * 86400000), author: 'Equipe FURIA', tags: ['cs2', 'entrevista', 'fallen'] },
];

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/news`)
      .then((res) => setNews(res.data?.data || res.data || []))
      .catch(() => setNews(mockNews))
      .finally(() => setLoading(false));
  }, []);

  const featured = news[0];
  const rest = news.slice(1);

  return (
    <MainLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" sx={{ color: '#00c2ff', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 0.5 }}>
          Novidades
        </Typography>
        <Typography variant="h4" fontWeight={700}>Notícias</Typography>
      </Box>

      {loading ? (
        <Box>
          <Skeleton variant="rectangular" height={360} sx={{ borderRadius: 1.5, mb: 3 }} />
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Card>
                  <Skeleton variant="rectangular" height={180} />
                  <CardContent>
                    <Skeleton variant="text" height={28} />
                    <Skeleton variant="text" height={20} width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <>
          {featured && (
            <Card
              component={Link}
              to={`/news/${featured.id}`}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                mb: 4,
                overflow: 'hidden',
                textDecoration: 'none',
                '&:hover .news-img': { transform: 'scale(1.03)' },
                '&:hover': { borderColor: 'rgba(0,194,255,0.3)' },
              }}
            >
              <Box sx={{ width: { xs: '100%', md: '55%' }, overflow: 'hidden', flexShrink: 0 }}>
                <CardMedia
                  component="img"
                  image={featured.imageUrl}
                  alt={featured.title}
                  className="news-img"
                  sx={{ width: '100%', height: { xs: 220, md: 340 }, objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
              </Box>
              <CardContent sx={{ flex: 1, p: { xs: 2.5, md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                  {featured.tags?.slice(0, 3).map((tag) => (
                    <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.65rem', height: 18, background: 'rgba(0,194,255,0.08)', color: '#00c2ff', border: '1px solid rgba(0,194,255,0.15)' }} />
                  ))}
                </Box>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, lineHeight: 1.3 }}>{featured.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>{featured.excerpt}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(featured.date), "dd 'de' MMMM, yyyy", { locale: ptBR })} · {featured.author}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#00c2ff', fontWeight: 600 }}>Ler mais →</Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          <Grid container spacing={2}>
            {rest.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <Card
                  component={Link}
                  to={`/news/${item.id}`}
                  sx={{
                    textDecoration: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover .news-img': { transform: 'scale(1.04)' },
                    '&:hover': { borderColor: 'rgba(0,194,255,0.3)' },
                  }}
                >
                  <Box sx={{ overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height={180}
                      image={item.imageUrl}
                      alt={item.title}
                      className="news-img"
                      sx={{ transition: 'transform 0.3s ease' }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
                      {item.tags?.slice(0, 2).map((tag) => (
                        <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.6rem', height: 16, background: 'rgba(0,194,255,0.06)', color: '#00c2ff', border: '1px solid rgba(0,194,255,0.12)' }} />
                      ))}
                    </Box>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.75, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', pt: 1 }}>
                      {format(new Date(item.date), "dd 'de' MMM, yyyy", { locale: ptBR })}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </MainLayout>
  );
};

export default NewsPage;
