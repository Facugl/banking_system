import { Box, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Routes } from '../../utils/constants';
import RouterLink from '../RouterLink';

/**
 * Clickable "Banking System" brand mark that navigates to the public home
 * page. Used wherever a page has no other way back to the home page (e.g.
 * Login/Register).
 */
const BrandLink: React.FC = () => (
  <Box
    component={RouterLink}
    to={Routes.HOME}
    aria-label='Go to home page'
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      color: 'text.primary',
      textDecoration: 'none',
      '&:hover': {
        color: 'primary.main',
      },
    }}
  >
    <AccountBalanceIcon color='primary' />
    <Typography variant='h6' component='span' fontWeight={700}>
      Banking System
    </Typography>
  </Box>
);

export default BrandLink;
