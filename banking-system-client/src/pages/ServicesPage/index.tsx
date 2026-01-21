// pages/ServicesPage.tsx
import { Link } from 'react-router-dom';
import { Routes, permissionLabels } from '../../utils/constants';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PersonIcon from '@mui/icons-material/Person';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.customShadows.card,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.customShadows.buttonHover,
  },
}));

const ServicesPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth='lg'>
          <Typography variant='h1' component='h1' gutterBottom>
            Our Services
          </Typography>
          <Typography variant='h5' paragraph>
            Comprehensive banking solutions for all your needs.
          </Typography>
        </Container>
      </HeroSection>

      {/* Services Section */}
      <Container maxWidth='lg' sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {[
            {
              icon: (
                <AccountBalanceIcon color='primary' sx={{ fontSize: 40 }} />
              ),
              title: permissionLabels.CHECK_ACCOUNT_BALANCE,
              description: 'Monitor your account balances in real-time.',
              link: Routes.CUSTOMER_PANEL,
            },
            {
              icon: (
                <TransferWithinAStationIcon
                  color='primary'
                  sx={{ fontSize: 40 }}
                />
              ),
              title: permissionLabels.TRANSFER_BETWEEN_ACCOUNTS,
              description: 'Transfer funds between accounts instantly.',
              link: Routes.TRANSACTIONS,
            },
            {
              icon: <SecurityIcon color='primary' sx={{ fontSize: 40 }} />,
              title: permissionLabels.DEPOSIT_INTO_ACCOUNT,
              description: 'Securely deposit funds with ease.',
              link: Routes.CUSTOMER_PANEL,
            },
            {
              icon: <PersonIcon color='primary' sx={{ fontSize: 40 }} />,
              title: 'Profile Management',
              description: 'Update your personal information securely.',
              link: Routes.PROFILE,
            },
          ].map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.title}>
              <ServiceCard>
                <CardContent>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography variant='h6' component='h3'>
                    {service.title}
                  </Typography>
                  <Typography color='text.secondary' sx={{ mt: 1 }}>
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' component={Link} to={service.link}>
                    Learn More
                  </Button>
                </CardActions>
              </ServiceCard>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to={Routes.REGISTER}
              size='large'
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesPage;
