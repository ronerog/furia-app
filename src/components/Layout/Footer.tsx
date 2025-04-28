import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../../assets/furia-logo.png';



const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6, 
        px: 2,
        mt: 8,
        backgroundColor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{xs:12, md: 6}} sx={{ mb: isMobile ? 2 : 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
              <Box component="img" src={logo} alt="FURIA Logo" sx={{ height: 60, mb: 2 }} />
              <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'left'}>
                FURIA Esports é uma organização brasileira multi-gaming fundada em 2017, 
                com times em diversos jogos como CS:GO, Valorant, League of Legends e mais.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex' }}>
                <IconButton color="primary" aria-label="Twitter" component="a" href="https://twitter.com/furia" target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="primary" aria-label="Instagram" component="a" href="https://instagram.com/furiagg" target="_blank">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="primary" aria-label="Facebook" component="a" href="https://facebook.com/furiagg" target="_blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="primary" aria-label="YouTube" component="a" href="https://youtube.com/furiagg" target="_blank">
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          
          <Grid size={{xs:12, md: 8}}>
            <Grid container spacing={3}>
              <Grid size={{xs:6, md: 4}}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Times
                </Typography>
                <nav>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Link 
                      to="/games/valorant" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
                      }}
                    >
                      Valorant
                    </Link>
                    <Link 
                      to="/games/csgo" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
                     
                      }}
                    >
                      CS:GO
                    </Link>
                    <Link 
                      to="/games/lol" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
                   
                      }}
                    >
                      League of Legends
                    </Link>
                    <Link 
                      to="/games/apex" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
                   
                      }}
                    >
                      Apex Legends
                    </Link>
                  </Box>
                </nav>
              </Grid>
              
              <Grid size={{xs:6, md: 4}}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Conteúdo
                </Typography>
                <nav>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Link 
                      to="/news" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
                
                      }}
                    >
                      Notícias
                    </Link>
                    <Link 
                      to="/matches" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
                
                      }}
                    >
                      Partidas
                    </Link>
                    <Link 
                      to="/streams" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
                  
                      }}
                    >
                      Lives
                    </Link>
                    <Link 
                      to="/shop" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
       
                      }}
                    >
                      Loja
                    </Link>
                  </Box>
                </nav>
              </Grid>
              
              <Grid size={{xs:6, md: 4}}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Comunidade
                </Typography>
                <nav>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Link 
                      to="/rewards" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
             
                      }}
                    >
                      Recompensas
                    </Link>
                    <Link 
                      to="/about" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
           
                      }}
                    >
                      Sobre Nós
                    </Link>
                    <Link 
                      to="/contact" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
          
                      }}
                    >
                      Contato
                    </Link>
                    <Link 
                      to="/terms" 
                      style={{ 
                        color: theme.palette.text.secondary, 
                        textDecoration: 'none',
                        marginBottom: 8,
      
                      }}
                    >
                      Termos de Uso
                    </Link>
                  </Box>
                </nav>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 6, mb: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'left'} sx={{ width: isMobile ? '100%' : 'auto', mb: isMobile ? 1 : 0 }}>
            &copy; {new Date().getFullYear()} FURIA Esports. Todos os direitos reservados.
          </Typography>
          <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'right'} sx={{ width: isMobile ? '100%' : 'auto' }}>
            Desenvolvido com ❤️ para os fãs da FURIA
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;