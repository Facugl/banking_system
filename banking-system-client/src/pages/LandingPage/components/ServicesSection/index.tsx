import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CardActions,
} from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Slide } from '@mui/material';
import { ServicesSectionStyled, ServiceCardStyled } from './styles';
import { CardContent } from '../../../../components/ModernCard';
import StyledAvatar from '../../../../components/StyledAvatar';
import {
  AccountBalance as AccountBalanceIcon,
  SwapHoriz as SwapHorizIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const services = [
  {
    icon: AccountBalanceIcon,
    title: 'Account Balance',
    description:
      'Monitor your account balances in real-time with instant notifications and detailed analytics.',
    link: '/customer-panel',
  },
  {
    icon: SwapHorizIcon,
    title: 'Fund Transfers',
    description:
      'Transfer funds between accounts instantly with zero fees and military-grade security.',
    link: '/customer-transactions',
  },
  {
    icon: SecurityIcon,
    title: 'Secure Deposits',
    description:
      'Deposit funds securely with advanced encryption and fraud protection systems.',
    link: '/customer-panel',
  },
  {
    icon: PersonIcon,
    title: 'Profile Management',
    description:
      'Update your personal information and preferences with our intuitive interface.',
    link: '/customer-profile',
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <ServicesSectionStyled id='services'>
      <Container maxWidth='lg'>
        <Box textAlign='center' mb={8}>
          <Typography
            variant='h2'
            component='h2'
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Our Services
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Comprehensive banking solutions designed for your financial success
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Slide direction='up' in timeout={500 + index * 100}>
                <ServiceCardStyled>
                  <CardContent sx={{ p: 4 }}>
                    <StyledAvatar className='service-icon'>
                      <service.icon sx={{ fontSize: 40 }} />
                    </StyledAvatar>
                    <Typography
                      variant='h5'
                      component='h3'
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {service.title}
                    </Typography>
                    <Typography color='text.secondary' sx={{ mb: 3 }}>
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      onClick={() => navigate(service.link)}
                      endIcon={<ChevronRightIcon />}
                      sx={{ mx: 'auto' }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </ServiceCardStyled>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ServicesSectionStyled>
  );
};

export default ServicesSection;
