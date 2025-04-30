import { useState, useContext } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Paper,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { AuthContext } from '../contexts/AuthContext';
// import { PointsContext } from '../contexts/PointsContext.tsx';
import MainLayout from '../components/Layout/MainLayout';
import { Reward } from '../types';

const Rewards = () => {
  const { isAuthenticated } = useContext(AuthContext);
  // const { points } = useContext(PointsContext);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  
  const currentLevel = Math.floor(100);
  const progress = ((100 % 100) / 100) * 100;
  
  const mockRewards: Reward[] = [
    {
      id: '1',
      name: 'Mousepad FURIA',
      description: 'Mousepad premium com logo da FURIA. Tamanho: 40x30cm.',
      imageUrl: '/images/rewards/mousepad.jpeg',
      pointsCost: 200
    },
    {
      id: '2',
      name: 'Chaveiro FURIA',
      description: 'Chaveiro metálico com logo da FURIA. Edição limitada.',
      imageUrl: '/images/rewards/keychain.jpeg',
      pointsCost: 500
    },
    {
      id: '3',
      name: 'Camiseta FURIA',
      description: 'Camiseta oficial da FURIA, material premium com estampa exclusiva.',
      imageUrl: '/images/rewards/tshirt.jpeg',
      pointsCost: 1000
    },
    {
      id: '4',
      name: 'Boné FURIA',
      description: 'Boné oficial da FURIA, ajustável, com logo bordado.',
      imageUrl: '/images/rewards/cap.jpeg',
      pointsCost: 800
    },
    {
      id: '5',
      name: 'Adesivos FURIA (Pack)',
      description: 'Pacote com 5 adesivos exclusivos da FURIA.',
      imageUrl: '/images/rewards/stickers.jpeg',
      pointsCost: 150
    },
    {
      id: '6',
      name: 'Moletom FURIA',
      description: 'Moletom oficial com capuz, material confortável com estampa exclusiva.',
      imageUrl: '/images/rewards/hoodie.jpg',
      pointsCost: 1500
    }
  ];
  
  const handleOpenDialog = (reward: Reward) => {
    setSelectedReward(reward);
    setDialogOpen(true);
    setAddress('');
    setAddressError(false);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRedeem = async () => {
    if (!selectedReward) return;
    
    if (!address.trim()) {
      setAddressError(true);
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage(`Parabéns! Seu ${selectedReward.name} será enviado para o endereço informado em breve.`);
      setErrorMessage(null);
      
      setTimeout(() => {
        setDialogOpen(false);
      }, 3000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Erro ao resgatar recompensa. Tente novamente.');
      setSuccessMessage(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <Container maxWidth="md">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Acesso restrito
            </Typography>
            <Typography variant="body1" paragraph>
              Faça login para acessar as recompensas da FURIA.
            </Typography>
            <Button variant="contained" color="primary" href="/login">
              Login
            </Button>
          </Paper>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundImage: 'url("/images/rewards-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 8,
          mb: 4,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Recompensas FURIA
          </Typography>
          <Typography variant="h6" gutterBottom>
            Ganhe pontos interagindo com a comunidade e resgate produtos exclusivos!
          </Typography>
          
          <Box sx={{ mt: 4, bgcolor: 'rgba(0, 0, 0, 0.5)', p: 3, borderRadius: 2 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RedeemIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h4" color="primary">
                    {100} pontos
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Nível {currentLevel} ({100 % 100}/{100} para o nível {currentLevel + 1})
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ mt: 1, height: 8, borderRadius: 4 }}
                />
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Como ganhar mais pontos:
                </Typography>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 6 }}>
                    <Chip 
                      label="Chat: 1 ponto por mensagem" 
                      size="small" 
                      sx={{ mb: 1, bgcolor: 'rgba(0, 194, 255, 0.2)' }} 
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Chip 
                      label="Partidas: 10 pontos" 
                      size="small" 
                      sx={{ mb: 1, bgcolor: 'rgba(0, 194, 255, 0.2)' }} 
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Chip 
                      label="Tempo: 5 pontos/5min" 
                      size="small" 
                      sx={{ mb: 1, bgcolor: 'rgba(0, 194, 255, 0.2)' }} 
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Chip 
                      label="Login diário: 20 pontos" 
                      size="small" 
                      sx={{ mb: 1, bgcolor: 'rgba(0, 194, 255, 0.2)' }} 
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Produtos Disponíveis
        </Typography>
        
        <Grid container spacing={3}>
          {mockRewards.map((reward) => (
            <Grid size={{ xs: 12, md: 6, sm: 4 }} key={reward.id}>
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
                  {reward.pointsCost} pontos
                </Box>
                <CardMedia
                  component="img"
                  height={200}
                  image={reward.imageUrl}
                  alt={reward.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {reward.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reward.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={100 < reward.pointsCost}
                    onClick={() => handleOpenDialog(reward)}
                  >
                    {100 >= reward.pointsCost ? 'Resgatar' : 'Pontos insuficientes'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Paper elevation={0} sx={{ mt: 6, p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <HelpOutlineIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                Como funciona o programa de recompensas?
              </Typography>
              <Typography variant="body2" paragraph>
                Acumule pontos participando ativamente do site da FURIA. Envie mensagens no chat, assista partidas ao vivo, 
                navegue pelo site e faça login diariamente para ganhar pontos. Quanto mais você interagir, mais pontos 
                acumulará para trocar por produtos exclusivos da FURIA.
              </Typography>
              <Typography variant="body2">
                Os produtos serão enviados para o endereço informado no momento do resgate. O prazo de entrega pode variar 
                conforme a sua localização. Caso tenha alguma dúvida, entre em contato com nossa equipe de suporte.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
      
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          Resgatar {selectedReward?.name}
        </DialogTitle>
        <DialogContent>
          {successMessage ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          ) : errorMessage ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          ) : (
            <>
              <DialogContentText>
                Você está prestes a resgatar {selectedReward?.name} por {selectedReward?.pointsCost} pontos.
                Por favor, informe o endereço de entrega:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Endereço completo"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (e.target.value.trim()) {
                    setAddressError(false);
                  }
                }}
                error={addressError}
                helperText={addressError ? "Por favor, informe seu endereço completo" : ""}
                sx={{ mt: 2 }}
              />
              <DialogContentText variant="caption" sx={{ mt: 1 }}>
                * O prazo de entrega é de 10 a 20 dias úteis, dependendo da sua localização.
              </DialogContentText>
            </>
          )}
        </DialogContent>
        {!successMessage && (
          <DialogActions>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancelar
            </Button>
            <Button onClick={handleRedeem} color="primary" variant="contained" disabled={!!successMessage}>
              Confirmar Resgate
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </MainLayout>
  );
};

export default Rewards;