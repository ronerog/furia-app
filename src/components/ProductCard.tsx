import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  useTheme
} from '@mui/material';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
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
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={compact ? 160 : 200}
          image={product.imageUrl}
          alt={product.name}
          sx={{
            objectFit: 'contain',
            bgcolor: 'background.default',
            p: 2
          }}
        />
        
        {product.game && (
          <Chip 
            label={product.game.toUpperCase()}
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant={compact ? "subtitle1" : "h6"} 
          component="div" 
          gutterBottom
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        
        {!compact && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            gutterBottom
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.description}
          </Typography>
        )}
        
        <Typography variant="h6" color="primary" sx={{ mt: compact ? 1 : 2 }}>
          R$ {product.price.toFixed(2)}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: compact ? 1 : 2, pt: 0 }}>
        <Button 
          size={compact ? "small" : "medium"}
          fullWidth
          variant="contained"
          color="primary"
          disabled={!product.inStock}
        >
          {product.inStock ? 'Comprar' : 'Esgotado'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;