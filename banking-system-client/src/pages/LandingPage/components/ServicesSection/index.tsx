import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Slide } from '@mui/material';
import {
  ServicesSectionStyled,
  ServiceCardStyled,
  CardContentStyled,
  CardActionsStyled,
  StyledAvatarStyled,
} from './styles';
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
        <Box textAlign='center' mb={{ xs: 4, md: 8 }}>
          <Typography
            variant='h2'
            component='h2'
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              mb: { xs: 2, md: 3 },
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              maxWidth: { xs: '100%', md: '800px' },
              mx: 'auto',
            }}
          >
            Comprehensive banking solutions designed for your financial success
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Slide direction='up' in timeout={500 + index * 100}>
                <ServiceCardStyled>
                  <CardContentStyled sx={{ p: { xs: 2, md: 4 } }}>
                    <StyledAvatarStyled className='service-icon'>
                      <service.icon sx={{ fontSize: { xs: 30, md: 40 } }} />
                    </StyledAvatarStyled>
                    <Typography
                      variant='h5'
                      component='h3'
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        fontSize: {
                          xs: '1.25rem',
                          sm: '1.5rem',
                          md: '1.75rem',
                        },
                        mb: { xs: 1, md: 2 },
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      color='text.secondary'
                      sx={{
                        mb: { xs: 2, md: 3 },
                        fontSize: { xs: '0.9rem', md: '1rem' },
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContentStyled>
                  <CardActionsStyled sx={{ p: { xs: 1, md: 2 }, pt: 0 }}>
                    <Button
                      onClick={() => navigate(service.link)}
                      endIcon={<ChevronRightIcon />}
                      sx={{
                        mx: 'auto',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        py: { xs: 0.5, md: 1 },
                      }}
                      aria-label={`Learn more about ${service.title}`}
                    >
                      Learn More
                    </Button>
                  </CardActionsStyled>
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
