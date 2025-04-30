import { useContext } from 'react';
import {
  Card,
  Box,
  Typography,
  Avatar,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthContext } from '../contexts/AuthContext';
import { Match } from '../types';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const isUpcoming = match.status === 'upcoming';
  const isLive = match.status === 'live';
  
  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ p: 2, bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={match.tournamentLogo} 
              alt={match.tournamentName}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="subtitle1">
              {match.tournamentName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {isLive ? (
                <Chip 
                  label="AO VIVO" 
                  size="small" 
                  color="error" 
                />
              ) : format(new Date(match.date), 
                          isUpcoming ? "dd 'de' MMMM, HH:mm" : "dd 'de' MMMM, yyyy", 
                          { locale: ptBR })}
            </Typography>
            <Chip 
              label={match.game.toUpperCase()} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
      
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
            <Avatar 
              src="/images/furia-logo.png" 
              alt="FURIA" 
              sx={{ width: 64, height: 64, mb: 1 }}
            />
            <Typography variant="subtitle1" align="center">FURIA</Typography>
            {!isUpcoming && (
              <Typography 
                variant="h5" 
                color={Number(match.furiaScore) > Number(match.opponentScore) ? 'primary.main' : 'text.secondary'}
              >
                {match.furiaScore}
              </Typography>
            )}
          </Box>
          
          <Typography variant="h5" color="text.secondary">
            {isUpcoming ? 'VS' : 'x'}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
            <Avatar 
              src={match.opponentLogo} 
              alt={match.opponentName} 
              sx={{ width: 64, height: 64, mb: 1 }}
            />
            <Typography variant="subtitle1" align="center">{match.opponentName}</Typography>
            {!isUpcoming && (
              <Typography 
                variant="h5" 
                color={Number(match.opponentScore) > Number(match.furiaScore) ? 'primary.main' : 'text.secondary'}
              >
                {match.opponentScore}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        {isUpcoming || isLive ? (
          match.streamUrl ? (
            <Button 
              fullWidth 
              variant="contained" 
              color="primary"
              component="a"
              href={match.streamUrl}
              target="_blank"
              onClick={() => isAuthenticated}
            >
              {isLive ? 'Assistir Ao Vivo' : 'Lembrete'}
            </Button>
          ) : (
            <Button 
              fullWidth 
              variant="outlined" 
              color="primary"
            >
              Lembrete
            </Button>
          )
        ) : (
          match.highlightsUrl ? (
            <Button 
              fullWidth 
              variant="outlined" 
              color="primary"
              component="a"
              href={match.highlightsUrl}
              target="_blank"
              onClick={() => isAuthenticated}
            >
              Ver Highlights
            </Button>
          ) : (
            <Button 
              fullWidth 
              variant="outlined" 
              color="primary"
              disabled
            >
              Sem Highlights
            </Button>
          )
        )}
      </CardActions>
    </Card>
  );
};

export default MatchCard;