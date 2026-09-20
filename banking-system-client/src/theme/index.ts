import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 16,
  },
  customShadows: {
    card: '0 20px 60px rgba(108, 142, 232, 0.15)',
    buttonHover: '0 10px 30px rgba(108, 142, 232, 0.35)',
    modal: '0 0 0 3px rgba(108, 142, 232, 0.45)',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          backgroundImage: 'none',
          boxShadow: theme.customShadows.card,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '2px solid currentColor',
            outlineOffset: 2,
          },
        },
      },
    },
  },
});

export default theme;
