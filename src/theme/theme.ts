import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    furia: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    furia: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00c2ff',
      light: '#5dd8ff',
      dark: '#0090c0',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#b0b0b0',
      contrastText: '#000000',
    },
    background: {
      default: '#080808',
      paper: '#111111',
    },
    divider: 'rgba(255,255,255,0.07)',
    text: {
      primary: '#f0f0f0',
      secondary: '#888888',
    },
    furia: {
      main: '#00c2ff',
      light: '#5dd8ff',
      dark: '#0090c0',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#333 transparent',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 3 },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '9px 22px',
          fontSize: '0.875rem',
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: '#00c2ff',
          color: '#000',
          boxShadow: 'none',
          '&:hover': {
            background: '#5dd8ff',
            boxShadow: '0 0 20px rgba(0,194,255,0.25)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(0,194,255,0.5)',
          '&:hover': {
            borderColor: '#00c2ff',
            background: 'rgba(0,194,255,0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'none',
          transition: 'border-color 0.2s ease, transform 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(0,194,255,0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 4 },
        outlinedPrimary: {
          borderColor: 'rgba(0,194,255,0.4)',
          color: '#00c2ff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(8,8,8,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#0d0d0d',
          borderLeft: '1px solid rgba(0,194,255,0.15)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(255,255,255,0.07)' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
            '&:hover fieldset': { borderColor: 'rgba(0,194,255,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#00c2ff' },
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: { background: 'rgba(255,255,255,0.05)' },
      },
    },
  },
});

export default theme;
