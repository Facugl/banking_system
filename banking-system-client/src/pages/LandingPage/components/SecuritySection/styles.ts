import { Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SecuritySectionStyled = styled(Box)(({ theme }) => ({
  background: `
    radial-gradient(circle at 50% 0%, rgba(108, 142, 232, 0.18), transparent 60%),
    ${theme.palette.background.paper}
  `,
  color: theme.palette.text.primary,
  padding: theme.spacing(6, 0),
  textAlign: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

export const ChipStyled = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: '1rem',
  padding: theme.spacing(1, 2),
  height: 'auto',
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: theme.spacing(0.75, 1.5),
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
    padding: theme.spacing(1, 2),
  },
}));
