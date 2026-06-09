import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
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
  Typography,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/furia-logo.svg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Partidas", path: "/matches" },
  { label: "Lives", path: "/streams" },
  { label: "Notícias", path: "/news" },
];

const games = [
  { name: "Valorant", path: "/games/valorant" },
  { name: "CS2", path: "/games/csgo" },
  { name: "League of Legends", path: "/games/lol" },
  { name: "Apex Legends", path: "/games/apex" },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gamesMenuAnchor, setGamesMenuAnchor] = useState<null | HTMLElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleGamesMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setGamesMenuAnchor(e.currentTarget);
  const handleGamesMenuClose = () => setGamesMenuAnchor(null);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    handleGamesMenuClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 64, justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <Box component="img" src={logo} alt="FURIA" sx={{ height: 36 }} />
          </Link>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: isActive(link.path) ? '#00c2ff' : 'rgba(255,255,255,0.7)',
                    fontSize: '0.8125rem',
                    fontWeight: isActive(link.path) ? 600 : 400,
                    px: 1.5,
                    '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.05)' },
                  }}
                >
                  {link.label}
                </Button>
              ))}

              <Button
                onClick={handleGamesMenuOpen}
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1rem !important', transition: 'transform 0.2s', transform: Boolean(gamesMenuAnchor) ? 'rotate(180deg)' : 'none' }} />}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8125rem',
                  px: 1.5,
                  '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.05)' },
                }}
              >
                Games
              </Button>
              <Menu
                anchorEl={gamesMenuAnchor}
                open={Boolean(gamesMenuAnchor)}
                onClose={handleGamesMenuClose}
                PaperProps={{
                  sx: {
                    background: '#0d0d0d',
                    border: '1px solid rgba(255,255,255,0.08)',
                    mt: 1,
                    minWidth: 160,
                  },
                }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                {games.map((game) => (
                  <MenuItem
                    key={game.name}
                    onClick={() => handleNavigation(game.path)}
                    sx={{
                      fontSize: '0.8125rem',
                      color: 'rgba(255,255,255,0.8)',
                      '&:hover': { color: '#00c2ff', background: 'rgba(0,194,255,0.06)' },
                    }}
                  >
                    {game.name}
                  </MenuItem>
                ))}
              </Menu>

              <Button
                component="a"
                href="https://www.furia.gg/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8125rem',
                  px: 1.5,
                  '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.05)' },
                }}
              >
                Loja
              </Button>
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <Chip
                    label={`${100} pts`}
                    size="small"
                    sx={{
                      background: 'rgba(0,194,255,0.1)',
                      color: '#00c2ff',
                      border: '1px solid rgba(0,194,255,0.2)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                  <Button
                    component={Link}
                    to="/profile"
                    startIcon={
                      <Avatar sx={{ width: 22, height: 22, bgcolor: '#00c2ff', color: '#000', fontSize: '0.7rem', fontWeight: 700 }}>
                        {user?.username?.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8125rem' }}
                  >
                    {user?.username}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', '&:hover': { color: '#fff' } }}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    component={Link}
                    to="/login"
                    sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem' }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/register"
                    sx={{ fontSize: '0.8125rem' }}
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
              onClick={() => setMobileMenuOpen(true)}
              sx={{ color: 'rgba(255,255,255,0.8)' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { width: '80vw', maxWidth: 320, background: '#0a0a0a' } }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box component="img" src={logo} alt="FURIA" sx={{ height: 28 }} />
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'rgba(255,255,255,0.5)' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {isAuthenticated && (
          <>
            <Box sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: '#00c2ff', color: '#000', fontWeight: 700 }}>
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>{user?.username}</Typography>
                <Typography variant="caption" color="primary">100 pontos</Typography>
              </Box>
            </Box>
            <Divider />
          </>
        )}

        <List dense>
          {navLinks.map((link) => (
            <ListItem
              key={link.path}
              component="button"
              onClick={() => handleNavigation(link.path)}
              sx={{
                width: '100%',
                color: isActive(link.path) ? '#00c2ff' : 'rgba(255,255,255,0.75)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                '&:hover': { background: 'rgba(255,255,255,0.04)' },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ fontSize: '0.9375rem', fontWeight: isActive(link.path) ? 600 : 400 }}
              />
            </ListItem>
          ))}
          <ListItem
            component="a"
            href="https://www.furia.gg/"
            target="_blank"
            sx={{ color: 'rgba(255,255,255,0.75)', '&:hover': { background: 'rgba(255,255,255,0.04)' } }}
          >
            <ListItemText primary="Loja" primaryTypographyProps={{ fontSize: '0.9375rem' }} />
          </ListItem>
        </List>

        <Divider />
        <Typography variant="caption" sx={{ px: 2, pt: 1.5, pb: 0.5, color: 'rgba(255,255,255,0.3)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Games
        </Typography>
        <List dense>
          {games.map((game) => (
            <ListItem
              key={game.name}
              component="button"
              onClick={() => handleNavigation(game.path)}
              sx={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', '&:hover': { background: 'rgba(255,255,255,0.04)' } }}
            >
              <ListItemText
                primary={game.name}
                primaryTypographyProps={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}
              />
            </ListItem>
          ))}
        </List>

        <Divider />
        {isAuthenticated ? (
          <List dense>
            <ListItem component="button" onClick={() => handleNavigation("/profile")} sx={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', '&:hover': { background: 'rgba(255,255,255,0.04)' } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><PersonIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} /></ListItemIcon>
              <ListItemText primary="Meu Perfil" primaryTypographyProps={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }} />
            </ListItem>
            <ListItem component="button" onClick={() => handleNavigation("/rewards")} sx={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', '&:hover': { background: 'rgba(255,255,255,0.04)' } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><CardGiftcardIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} /></ListItemIcon>
              <ListItemText primary="Recompensas" primaryTypographyProps={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }} />
            </ListItem>
            <ListItem component="button" onClick={handleLogout} sx={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', '&:hover': { background: 'rgba(255,255,255,0.04)' } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><ExitToAppIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} /></ListItemIcon>
              <ListItemText primary="Sair" primaryTypographyProps={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }} />
            </ListItem>
          </List>
        ) : (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button fullWidth variant="outlined" color="primary" component={Link} to="/login" onClick={() => setMobileMenuOpen(false)}>
              Login
            </Button>
            <Button fullWidth variant="contained" color="primary" component={Link} to="/register" onClick={() => setMobileMenuOpen(false)}>
              Cadastre-se
            </Button>
          </Box>
        )}
      </Drawer>
    </AppBar>
  );
};

export default Header;
