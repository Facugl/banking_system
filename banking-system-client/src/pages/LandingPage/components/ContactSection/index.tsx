import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import ModernCard, { CardContent } from '../../../../components/ModernCard';

const ContactSection = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 10 }} id='contact'>
      <Box textAlign='center' mb={8}>
        <Typography
          variant='h2'
          component='h2'
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Get in Touch
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          We're here to help you with all your banking needs
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <ModernCard>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant='h4'
                component='h3'
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Contact Information
              </Typography>
              <Stack spacing={3} sx={{ mt: 4 }}>
                {[
                  {
                    icon: EmailIcon,
                    title: 'Email',
                    info: 'support@horizonbank.com',
                  },
                  { icon: PhoneIcon, title: 'Phone', info: '(800) 123-4567' },
                  {
                    icon: LocationOnIcon,
                    title: 'Address',
                    info: '123 Bank Street, Financial City',
                  },
                  {
                    icon: ScheduleIcon,
                    title: 'Hours',
                    info: 'Monday–Friday, 9:00 AM–5:00 PM',
                  },
                ].map((contact, index) => (
                  <Box
                    key={index}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                  >
                    <Avatar sx={{ backgroundColor: '#f3f4f6' }}>
                      <contact.icon sx={{ color: 'primary.main' }} />
                    </Avatar>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {contact.title}
                      </Typography>
                      <Typography color='text.secondary'>
                        {contact.info}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </ModernCard>
        </Grid>

        <Grid item xs={12} lg={6}>
          <ModernCard>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant='h4'
                component='h3'
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Send us a Message
              </Typography>
              <Box component='form' sx={{ mt: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label='Full Name'
                    variant='outlined'
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                  <TextField
                    fullWidth
                    label='Email Address'
                    type='email'
                    variant='outlined'
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                  <TextField
                    fullWidth
                    label='Message'
                    multiline
                    rows={4}
                    variant='outlined'
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                  <Button
                    variant='contained'
                    size='large'
                    disabled
                    sx={{ borderRadius: 2, py: 1.5 }}
                  >
                    Submit Message (Coming Soon)
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </ModernCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactSection;
