// pages/ContactPage.tsx
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/constants';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const ContactCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
}));

const ContactPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth='lg'>
          <Typography variant='h1' component='h1' gutterBottom>
            Contact Us
          </Typography>
          <Typography variant='h5' paragraph>
            We’re here to help with your banking needs.
          </Typography>
        </Container>
      </HeroSection>

      {/* Contact Section */}
      <Container maxWidth='lg' sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ContactCard>
              <CardContent>
                <Typography variant='h5' component='h3' gutterBottom>
                  Get in Touch
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Email: support@horizonbank.com
                  <br />
                  Phone: (800) 123-4567
                  <br />
                  Address: 123 Bank Street, Financial City
                  <br />
                  Hours: Monday–Friday, 9:00 AM–5:00 PM
                </Typography>
              </CardContent>
            </ContactCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactCard>
              <CardContent>
                <Typography variant='h5' component='h3' gutterBottom>
                  Send a Message
                </Typography>
                <Box component='form' sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label='Name'
                    margin='normal'
                    variant='outlined'
                    color='primary'
                  />
                  <TextField
                    fullWidth
                    label='Email'
                    margin='normal'
                    variant='outlined'
                    color='primary'
                  />
                  <TextField
                    fullWidth
                    label='Message'
                    margin='normal'
                    variant='outlined'
                    color='primary'
                    multiline
                    rows={4}
                  />
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{ mt: 2 }}
                    fullWidth
                    disabled
                  >
                    Submit (Coming Soon)
                  </Button>
                </Box>
              </CardContent>
            </ContactCard>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to={Routes.REGISTER}
              size='large'
            >
              Join Horizon Bank
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
