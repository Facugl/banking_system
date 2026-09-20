import { styled } from '@mui/material/styles';
import {
  Drawer,
  ListItemButton,
  Toolbar,
  Typography,
  TypographyProps,
  ListItemButtonProps,
} from '@mui/material';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 260,
  flexShrink: 0,

  '.MuiDrawer-paper': {
    width: 260,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.sidebar,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const LogoContainer = styled(Toolbar)({
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const BrandName = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontSize: '1.25rem',
  textAlign: 'center',
  position: 'relative',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 40,
    height: 3,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
}));

interface StyledListItemProps extends ListItemButtonProps {
  isActive?: boolean;
  to?: string;
}

export const StyledListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<StyledListItemProps>(({ theme, isActive }) => ({
  margin: '0.5rem 0.75rem',
  borderRadius: theme.shape.borderRadius,
  padding: '0.75rem 1rem',
  transition: 'all 0.2s ease',

  ...(isActive
    ? {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(91, 141, 191, 0.16)'
            : 'rgba(26, 54, 93, 0.08)',
        borderLeft: `4px solid ${theme.palette.primary.main}`,

        '.MuiListItemIcon-root': {
          color: theme.palette.primary.main,
        },
        '.MuiTypography-root': {
          fontWeight: 600,
          color: theme.palette.primary.main,
        },
      }
    : {
        '&:hover': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(91, 141, 191, 0.1)'
              : 'rgba(26, 54, 93, 0.05)',
        },
      }),

  '.MuiListItemIcon-root': {
    color: theme.palette.text.secondary,
    minWidth: 40,
  },
  '.MuiTypography-root': {
    fontSize: '0.95rem',
    color: theme.palette.text.primary,
  },
}));
