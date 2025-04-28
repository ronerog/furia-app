import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Container,
  Avatar,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
// s
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { AuthContext } from '../../contexts/AuthContext';
import { PointsContext } from '../../contexts/PointsContext';
import logo from '../../assets/furia-logo.png';

interface Game {
  name: string;
  path: string;
  icon: string;
}

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { points } = useContext(PointsContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gamesMenuAnchor, setGamesMenuAnchor] = useState<null | HTMLElement>(null);

  const games: Game[] = [
    { name: 'Valorant', path: '/games/valorant', icon: '/images/games/valorant-icon.png' },
    { name: 'CS:GO', path: '/games/csgo', icon: '/images/games/csgo-icon.png' },
    { name: 'League of Legends', path: '/games/lol', icon: '/images/games/lol-icon.png' },
    { name: 'Apex Legends', path: '/games/apex', icon: '/images/games/apex-icon.png' }
  ];

  const handleGamesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setGamesMenuAnchor(event.currentTarget);
  };

  const handleGamesMenuClose = () => {
    setGamesMenuAnchor(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    handleGamesMenuClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={logo} alt="FURIA Logo" sx={{ height: 50 }} />
          </Link>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              
              <Button 
                color="inherit" 
                onClick={handleGamesMenuOpen} 
                aria-haspopup="true"
              >
                Games
              </Button>
              <Menu
                anchorEl={gamesMenuAnchor}
                open={Boolean(gamesMenuAnchor)}
                onClose={handleGamesMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {games.map((game) => (
                  <MenuItem key={game.name} onClick={() => handleNavigation(game.path)}>
                    <Box component="img" src={game.icon} alt={game.name} sx={{ width: 24, mr: 1 }} />
                    {game.name}
                  </MenuItem>
                ))}
              </Menu>
              
              <Button color="inherit" component={Link} to="/matches">
                Partidas
              </Button>
              
              <Button color="inherit" component={Link} to="/streams">
                Lives
              </Button>
              
              <Button color="inherit" component={Link} to="/news">
                Notícias
              </Button>
              
              <Button color="inherit" component={Link} to="https://www.furia.gg/">
                Loja
              </Button>
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isAuthenticated ? (
                <>
                  <Typography variant="body2" color="primary" sx={{ mr: 2 }}>
                    {points} pontos
                  </Typography>
                  
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/profile"
                    startIcon={
                      <Avatar 
                        sx={{ 
                          width: 24, 
                          height: 24,
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText'
                        }}
                      >
                        {user?.username.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                  >
                    {user?.username}
                  </Button>
                  
                  <Button 
                    color="inherit"
                    onClick={handleLogout}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    component={Link} 
                    to="/login"
                    sx={{ mr: 1 }}
                  >
                    Login
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to="/register"
                  >
                    Cadastre-se
                  </Button>
                </>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          {isAuthenticated && (
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Avatar 
                sx={{ 
                  width: 60, 
                  height: 60,
                  mb: 1,
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                }}
              >
                {user?.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6">{user?.username}</Typography>
              <Typography variant="body2" color="primary">
                {points} pontos
              </Typography>
            </Box>
          )}
          
          <Divider />
          
          <List>
            <ListItem component="button" onClick={() => handleNavigation('/')}>
              <ListItemText primary="Home" />
            </ListItem>
            
            <ListItem component="button" onClick={() => handleNavigation('/matches')}>
              <ListItemText primary="Partidas" />
            </ListItem>
            
            <ListItem component="button" onClick={() => handleNavigation('/streams')}>
              <ListItemText primary="Lives" />
            </ListItem>
            
            <ListItem component="button" onClick={() => handleNavigation('/news')}>
              <ListItemText primary="Notícias" />
            </ListItem>
            
            <ListItem component="button" onClick={() => handleNavigation('/shop')}>
              <ListItemText primary="Loja" />
            </ListItem>
          </List>
          
          <Divider />
          
          <List subheader={
            <Typography variant="subtitle2" color="text.secondary" sx={{ pl: 2, pt: 1 }}>
              Games
            </Typography>
          }>
            {games.map((game) => (
              <ListItem component="button" key={game.name} onClick={() => handleNavigation(game.path)}>
                <ListItemIcon>
                  <Box component="img" src={game.icon} alt={game.name} sx={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary={game.name} />
              </ListItem>
            ))}
          </List>
          
          <Divider />
          
          {isAuthenticated ? (
            <List>
              <ListItem component="button" onClick={() => handleNavigation('/profile')}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Meu Perfil" />
              </ListItem>
              
              <ListItem component="button" onClick={() => handleNavigation('/rewards')}>
                <ListItemIcon>
                  <CardGiftcardIcon />
                </ListItemIcon>
                <ListItemText primary="Recompensas" />
              </ListItem>
              
              <ListItem component="button" onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem component="button" onClick={() => handleNavigation('/login')}>
                <ListItemText primary="Login" />
              </ListItem>
              
              <ListItem component="button" onClick={() => handleNavigation('/register')}>
                <ListItemText primary="Cadastre-se" />
              </ListItem>
            </List>
          )}
        </Box>
        </Drawer>
    </AppBar>
  );
}

export default Header;