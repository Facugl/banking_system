import { Container, Typography, Grid, Box, Button } from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  Person as PersonIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  CtaSectionStyled,
  ModernCardStyled,
  CardContentStyled,
  CardActionsStyled,
  GradientButtonStyled,
} from './styles';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <CtaSectionStyled>
      <Container maxWidth='lg'>
        <Box textAlign='center' mb={{ xs: 4, md: 8 }}>
          <Typography
            variant='h2'
            component='h2'
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Get Started Today
          </Typography>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            Choose your path to better banking
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} md={6}>
            <ModernCardStyled>
              <CardContentStyled sx={{ p: { xs: 2, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon
                    sx={{
                      fontSize: { xs: 24, md: 30 },
                      color: 'primary.main',
                      mr: 1,
                    }}
                  />
                  <Typography
                    variant='h4'
                    component='h3'
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  >
                    For Customers
                  </Typography>
                </Box>
                <Typography
                  color='text.secondary'
                  sx={{ mb: 2, fontSize: { xs: '0.9rem', md: '1rem' } }}
                >
                  Access your accounts, make transactions, and manage your
                  finances with our intuitive customer portal.
                </Typography>
              </CardContentStyled>
              <CardActionsStyled sx={{ p: { xs: 2, md: 4 }, pt: 0 }}>
                <GradientButtonStyled
                  onClick={() => navigate('/customer-panel')}
                  endIcon={<ChevronRightIcon />}
                  fullWidth
                  sx={{
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    py: { xs: 1, md: 1.5 },
                  }}
                  aria-label='Navigate to customer panel'
                >
                  Go to Customer Panel
                </GradientButtonStyled>
              </CardActionsStyled>
            </ModernCardStyled>
          </Grid>

          <Grid item xs={12} md={6}>
            <ModernCardStyled>
              <CardContentStyled sx={{ p: { xs: 2, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShieldIcon
                    sx={{
                      fontSize: { xs: 24, md: 30 },
                      color: 'primary.main',
                      mr: 1,
                    }}
                  />
                  <Typography
                    variant='h4'
                    component='h3'
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  >
                    For Administrators
                  </Typography>
                </Box>
                <Typography
                  color='text.secondary'
                  sx={{ mb: 2, fontSize: { xs: '0.9rem', md: '1rem' } }}
                >
                  Manage accounts, monitor transactions, and oversee operations
                  with our comprehensive admin dashboard.
                </Typography>
              </CardContentStyled>
              <CardActionsStyled sx={{ p: { xs: 2, md: 4 }, pt: 0 }}>
                <Button
                  variant='outlined'
                  onClick={() => navigate('/dashboard')}
                  endIcon={<ChevronRightIcon />}
                  fullWidth
                  size='large'
                  sx={{
                    borderRadius: 2,
                    py: { xs: 1, md: 1.5 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                  }}
                  aria-label='Navigate to dashboard'
                >
                  Go to Dashboard
                </Button>
              </CardActionsStyled>
            </ModernCardStyled>
          </Grid>
        </Grid>
      </Container>
    </CtaSectionStyled>
  );
};

export default CtaSection;
