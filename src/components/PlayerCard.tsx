import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Button,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  compact?: boolean;
}

const PlayerCard = ({ player, compact = false }: PlayerCardProps) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? theme.shadows[8] : theme.shadows[1],
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardMedia
        component="img"
        image={player.photoUrl}
        alt={player.nickname}
        sx={{
          height: compact ? 200 : 280,
          objectFit: 'cover',
          objectPosition: 'top',
          transition: 'transform 0.5s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant={compact ? "h6" : "h5"} component="div" gutterBottom>
          {player.nickname}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {player.realName}
        </Typography>
        
        <Chip 
          label={player.role} 
          size="small" 
          color="primary" 
          variant="outlined" 
        />
        
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          {player.twitterUrl && (
            <Tooltip title="Twitter">
              <IconButton 
                size="small" 
                href={player.twitterUrl} 
                target="_blank"
                sx={{ 
                  minWidth: 0, 
                  p: 1,
                  bgcolor: 'rgba(0, 194, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 194, 255, 0.2)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  src="/images/social/twitter.png" 
                  alt="Twitter"
                  sx={{ width: 20, height: 20 }}
                />
              </IconButton>
            </Tooltip>
          )}
          
          {player.twitchUrl && (
            <Tooltip title="Twitch">
              <IconButton 
                size="small" 
                href={player.twitchUrl} 
                target="_blank"
                sx={{ 
                  minWidth: 0, 
                  p: 1,
                  bgcolor: 'rgba(0, 194, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 194, 255, 0.2)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  src="/images/social/twitch.png" 
                  alt="Twitch"
                  sx={{ width: 20, height: 20 }}
                />
              </IconButton>
            </Tooltip>
          )}
          
          {player.instagramUrl && (
            <Tooltip title="Instagram">
              <IconButton 
                size="small" 
                href={player.instagramUrl} 
                target="_blank"
                sx={{ 
                  minWidth: 0, 
                  p: 1,
                  bgcolor: 'rgba(0, 194, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 194, 255, 0.2)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  src="/images/social/instagram.png" 
                  alt="Instagram"
                  sx={{ width: 20, height: 20 }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button 
          size="small" 
          component={Link} 
          to={`/player/${player.id}`}
          fullWidth
          variant="outlined"
          color="primary"
        >
          Ver perfil
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;