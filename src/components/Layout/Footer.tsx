import { Link } from 'react-router-dom';
import { Box, Container, Typography, Divider, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../../assets/furia-logo.svg';

const footerLinks = {
  Times: [
    { label: 'CS2', path: '/games/csgo' },
    { label: 'Valorant', path: '/games/valorant' },
    { label: 'League of Legends', path: '/games/lol' },
    { label: 'Apex Legends', path: '/games/apex' },
  ],
  Conteúdo: [
    { label: 'Notícias', path: '/news' },
    { label: 'Partidas', path: '/matches' },
    { label: 'Lives', path: '/streams' },
    { label: 'Loja', path: 'https://www.furia.gg/', external: true },
  ],
  Comunidade: [
    { label: 'Recompensas', path: '/rewards' },
    { label: 'Termos de Uso', path: '/terms' },
  ],
};

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 'auto',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#080808',
    }}
  >
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box component="img" src={logo} alt="FURIA" sx={{ height: 32, mb: 2 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 280, lineHeight: 1.7 }}>
            Organização brasileira de esports fundada em 2017. Competindo no mais alto nível em CS2, Valorant, LoL e mais.
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[
              { icon: <TwitterIcon fontSize="small" />, href: 'https://twitter.com/furia' },
              { icon: <InstagramIcon fontSize="small" />, href: 'https://instagram.com/furiagg' },
              { icon: <YouTubeIcon fontSize="small" />, href: 'https://youtube.com/furiagg' },
            ].map((s, i) => (
              <IconButton
                key={i}
                component="a"
                href={s.href}
                target="_blank"
                size="small"
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  '&:hover': { color: '#00c2ff', background: 'rgba(0,194,255,0.08)' },
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Box>
        </Grid>

        {Object.entries(footerLinks).map(([section, links]) => (
          <Grid key={section} size={{ xs: 6, sm: 4, md: 2.66 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                display: 'block',
                mb: 1.5,
              }}
            >
              {section}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {links.map((link) =>
                link.external ? (
                  <Typography
                    key={link.label}
                    component="a"
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                      '&:hover': { color: '#00c2ff' },
                    }}
                  >
                    {link.label}
                  </Typography>
                ) : (
                  <Typography
                    key={link.label}
                    component={Link}
                    to={link.path}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                      '&:hover': { color: '#00c2ff' },
                    }}
                  >
                    {link.label}
                  </Typography>
                )
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} FURIA Esports. Todos os direitos reservados.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Feito para os fãs da FURIA 🖤
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
