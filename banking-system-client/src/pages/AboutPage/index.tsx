// pages/AboutPage.tsx
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Routes } from '../../utils/constants';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const AboutCard = styled(Card)(({ theme }) => ({
  height: '100%',
  boxShadow: theme.customShadows.card,
}));

const AboutPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth='lg'>
          <Typography variant='h1' component='h1' gutterBottom>
            About Horizon Bank
          </Typography>
          <Typography variant='h5' paragraph>
            Your trusted partner in financial excellence since 1990.
          </Typography>
        </Container>
      </HeroSection>

      {/* Content Section */}
      <Container maxWidth='lg' sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='h3' component='h2' gutterBottom>
              Our Mission
            </Typography>
            <Typography variant='body1' color='text.secondary' paragraph>
              At Horizon Bank, we are committed to providing innovative and
              secure banking solutions that empower our customers to achieve
              their financial goals. With over three decades of experience, we
              combine cutting-edge technology with personalized service.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <AboutCard>
              <CardContent>
                <Typography variant='h5' component='h3' gutterBottom>
                  Our Values
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  - Integrity: Upholding the highest ethical standards.
                  <br />
                  - Innovation: Embracing technology for better banking.
                  <br />- Customer Focus: Your success is our priority.
                </Typography>
              </CardContent>
            </AboutCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <AboutCard>
              <CardContent>
                <Typography variant='h5' component='h3' gutterBottom>
                  Our History
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Founded in 1990, Horizon Bank has grown into a trusted name,
                  serving thousands with secure and reliable financial services.
                </Typography>
              </CardContent>
            </AboutCard>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to={Routes.REGISTER}
              size='large'
            >
              Join Horizon Bank Today
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
