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
      main: '#00c2ff', // Azul FURIA
      light: '#68d5ff',
      dark: '#005973',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffffff', // Branco
      light: '#ffffff',
      dark: '#cccccc',
      contrastText: '#000000',
    },
    background: {
      default: '#000000', // Preto
      paper: '#141414',
    },
    furia: {
      main: '#00c2ff', // Azul FURIA
      light: '#68d5ff',
      dark: '#005973',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#68d5ff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: '#141414',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          boxShadow: '0 1px 0 #00c2ff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141414',
          borderLeft: '1px solid #00c2ff',
        },
      },
    },
  },
});

export default theme;