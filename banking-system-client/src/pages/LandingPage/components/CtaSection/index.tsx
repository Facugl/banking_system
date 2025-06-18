import { Container, Typography, Grid, Box, Button } from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  Person as PersonIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CtaSectionStyled } from './styles';
import ModernCard, {
  CardContent,
  CardActions,
} from '../../../../components/ModernCard';
import GradientButton from '../../../../components/GradientButton';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <CtaSectionStyled>
      <Container maxWidth='lg'>
        <Box textAlign='center' mb={8}>
          <Typography
            variant='h2'
            component='h2'
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Get Started Today
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Choose your path to better banking
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ModernCard>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon
                    sx={{ fontSize: 30, color: 'primary.main', mr: 1 }}
                  />
                  <Typography
                    variant='h4'
                    component='h3'
                    sx={{ fontWeight: 'bold' }}
                  >
                    For Customers
                  </Typography>
                </Box>
                <Typography color='text.secondary' sx={{ mb: 4 }}>
                  Access your accounts, make transactions, and manage your
                  finances with our intuitive customer portal.
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <GradientButton
                  onClick={() => navigate('/customer-panel')}
                  endIcon={<ChevronRightIcon />}
                  fullWidth
                >
                  Go to Customer Panel
                </GradientButton>
              </CardActions>
            </ModernCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <ModernCard>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShieldIcon
                    sx={{ fontSize: 30, color: 'primary.main', mr: 1 }}
                  />
                  <Typography
                    variant='h4'
                    component='h3'
                    sx={{ fontWeight: 'bold' }}
                  >
                    For Administrators
                  </Typography>
                </Box>
                <Typography color='text.secondary' sx={{ mb: 4 }}>
                  Manage accounts, monitor transactions, and oversee operations
                  with our comprehensive admin dashboard.
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <Button
                  variant='outlined'
                  onClick={() => navigate('/dashboard')}
                  endIcon={<ChevronRightIcon />}
                  fullWidth
                  size='large'
                  sx={{ borderRadius: 2, py: 1.5 }}
                >
                  Go to Dashboard
                </Button>
              </CardActions>
            </ModernCard>
          </Grid>
        </Grid>
      </Container>
    </CtaSectionStyled>
  );
};

export default CtaSection;
