import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { FooterSectionStyled } from './styles';

const navItems = [
  { label: 'Home', path: '#home' },
  { label: 'About', path: '#about' },
  { label: 'Services', path: '#services' },
  { label: 'Contact', path: '#contact' },
];

const FooterSection = () => {
  return (
    <FooterSectionStyled>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountBalanceIcon
                sx={{ fontSize: 32, color: 'primary.light', mr: 1 }}
              />
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                Horizon Bank
              </Typography>
            </Box>
            <Typography variant='body2' sx={{ mb: 3, opacity: 0.8 }}>
              Committed to secure and innovative banking since 1990. FDIC
              insured.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} sx={{ fontSize: 20, color: '#FFD700' }} />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  variant='body2'
                  component='a'
                  href={item.path}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
              Services
            </Typography>
            <Stack spacing={1}>
              {[
                'Personal Banking',
                'Business Banking',
                'Loans & Credit',
                'Investment Services',
              ].map((service) => (
                <Typography
                  key={service}
                  variant='body2'
                  sx={{
                    opacity: 0.8,
                    '&:hover': { opacity: 1, cursor: 'pointer' },
                  }}
                >
                  {service}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Stack spacing={1}>
              <Typography variant='body2' sx={{ opacity: 0.8 }}>
                support@horizonbank.com
              </Typography>
              <Typography variant='body2' sx={{ opacity: 0.8 }}>
                (800) 123-4567
              </Typography>
              <Typography variant='body2' sx={{ opacity: 0.8 }}>
                123 Bank Street
                <br />
                Financial City
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Typography variant='body2' align='center' sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} Horizon Bank. All rights reserved.
        </Typography>
      </Container>
    </FooterSectionStyled>
  );
};

export default FooterSection;
