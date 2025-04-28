import { useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Avatar,
  Button,
  useTheme
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { PointsContext } from '../contexts/PointsContext';
import { Stream } from '../types';

interface StreamCardProps {
  stream: Stream;
  compact?: boolean;
}

const StreamCard = ({ stream, compact = false }: StreamCardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const { addPoints } = useContext(PointsContext);
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={compact ? 140 : 180}
          image={stream.thumbnailUrl}
          alt={stream.title}
        />
        {stream.isLive && (
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
        )}
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
          <Box 
            component="img" 
            src="/images/icons/viewers.png" 
            alt="Viewers"
            sx={{ width: 16, height: 16, mr: 0.5 }}
          />
          {stream.viewerCount}
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar 
            src={stream.streamerAvatar} 
            alt={stream.streamerName}
            sx={{ mr: 1, width: compact ? 24 : 32, height: compact ? 24 : 32 }}
          />
          <Typography variant={compact ? "caption" : "subtitle2"} color="text.secondary">
            {stream.streamerName}
          </Typography>
        </Box>
        
        <Typography 
          variant={compact ? "subtitle1" : "h6"} 
          component="div" 
          sx={{ 
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {stream.title}
        </Typography>
        
        <Button 
          fullWidth
          variant={compact ? "outlined" : "contained"}
          color="primary"
          component="a"
          href={stream.url}
          target="_blank"
          onClick={() => isAuthenticated && addPoints(stream.isLive ? 5 : 2, stream.isLive ? 'watch_stream' : 'watch_content')}
          size={compact ? "small" : "medium"}
        >
          Assistir
        </Button>
      </CardContent>
    </Card>
  );
};

export default StreamCard;