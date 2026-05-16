import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#c7d300',
      light: '#d9e633',
      dark: '#9aa000',
      contrastText: '#1a1a1a',
    },
    secondary: {
      main: '#1a1a2e',
      light: '#2d2d4a',
      dark: '#0d0d1a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#555577',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '12px 32px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 8px 24px rgba(199,211,0,0.4)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #c7d300, #9aa000)',
          color: '#1a1a2e',
          '&:hover': {
            background: 'linear-gradient(135deg, #d9e633, #c7d300)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        },
      },
    },
  },
});
