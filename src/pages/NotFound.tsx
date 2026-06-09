import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';

const NotFound = () => (
  <MainLayout withoutChat>
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '6rem', md: '9rem' },
            fontWeight: 800,
            color: 'transparent',
            WebkitTextStroke: '2px rgba(0,194,255,0.3)',
            lineHeight: 1,
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          Página não encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          A página que você está procurando não existe ou foi movida.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/" size="large">
          Voltar para Home
        </Button>
      </Box>
    </Container>
  </MainLayout>
);

export default NotFound;
