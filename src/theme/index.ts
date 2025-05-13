import { createTheme, type ThemeOptions } from '@mui/material/styles';
import type {ThemeMode} from '../store/slices/themeSlice';

// Define common theme settings
const commonThemeSettings: ThemeOptions = {
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.85rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 12,
        },
      },
    },
  },
};

// Light theme settings
const lightThemeSettings: ThemeOptions = {
  ...commonThemeSettings,
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6B6B', // Bright red for a festive look
      light: '#FF9B9B',
      dark: '#E05050',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6C63FF', // Vibrant purple
      light: '#9D97FF',
      dark: '#4B44CC',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF5252',
    },
    warning: {
      main: '#FFB74D',
    },
    info: {
      main: '#64B5F6',
    },
    success: {
      main: '#66BB6A',
    },
    background: {
      default: '#F8F9FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.05)',
    '0px 8px 16px rgba(0, 0, 0, 0.05)',
    '0px 12px 24px rgba(0, 0, 0, 0.05)',
    '0px 16px 32px rgba(0, 0, 0, 0.05)',
    '0px 20px 40px rgba(0, 0, 0, 0.05)',
    // ... rest of the shadows array
  ] as any,
};

// Dark theme settings
const darkThemeSettings: ThemeOptions = {
  ...commonThemeSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B', // Keep the same primary color for brand consistency
      light: '#FF9B9B',
      dark: '#E05050',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6C63FF', // Vibrant purple
      light: '#9D97FF',
      dark: '#4B44CC',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF5252',
    },
    warning: {
      main: '#FFB74D',
    },
    info: {
      main: '#64B5F6',
    },
    success: {
      main: '#66BB6A',
    },
    background: {
      default: '#171923',
      paper: '#1A202C',
    },
    text: {
      primary: '#F7FAFC',
      secondary: '#A0AEC0',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.2)',
    '0px 8px 16px rgba(0, 0, 0, 0.2)',
    '0px 12px 24px rgba(0, 0, 0, 0.2)',
    '0px 16px 32px rgba(0, 0, 0, 0.2)',
    '0px 20px 40px rgba(0, 0, 0, 0.2)',
    // ... rest of the shadows array
  ] as any,
};

// Create theme based on mode
export const getTheme = (mode: ThemeMode) => {
  return createTheme(mode === 'light' ? lightThemeSettings : darkThemeSettings);
};
