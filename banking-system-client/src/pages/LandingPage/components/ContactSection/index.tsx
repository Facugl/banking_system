import { Grid, Stack, TextField, Button, Typography } from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import ModernCard, { CardContent } from '../../../../components/ModernCard';
import {
  StyledContainer,
  SectionHeader,
  SectionSubtitle,
  StyledCardTitle,
  ContactItem,
  ContactAvatar,
  StyledForm,
} from './styles';

const ContactSection = () => {
  return (
    <StyledContainer maxWidth='lg' id='contact'>
      <SectionHeader>
        <Typography variant='h2' component='h2' gutterBottom>
          Get in Touch
        </Typography>
        <SectionSubtitle variant='h6'>
          We're here to help you with all your banking needs
        </SectionSubtitle>
      </SectionHeader>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <ModernCard>
            <CardContent sx={{ p: 4 }}>
              <StyledCardTitle variant='h4' component='h3' gutterBottom>
                Contact Information
              </StyledCardTitle>
              <Stack spacing={3} sx={{ mt: 4 }}>
                {[
                  {
                    icon: EmailIcon,
                    title: 'Email',
                    info: 'support@horizonbank.com',
                  },
                  {
                    icon: PhoneIcon,
                    title: 'Phone',
                    info: '(800) 123-4567',
                  },
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
                  <ContactItem key={index}>
                    <ContactAvatar>
                      <contact.icon sx={{ color: 'primary.main' }} />
                    </ContactAvatar>
                    <div>
                      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {contact.title}
                      </Typography>
                      <Typography color='text.secondary'>
                        {contact.info}
                      </Typography>
                    </div>
                  </ContactItem>
                ))}
              </Stack>
            </CardContent>
          </ModernCard>
        </Grid>

        <Grid item xs={12} lg={6}>
          <ModernCard>
            <CardContent sx={{ p: 4 }}>
              <StyledCardTitle variant='h4' component='h3' gutterBottom>
                Send us a Message
              </StyledCardTitle>
              <StyledForm component='form'>
                <Stack spacing={3}>
                  <TextField fullWidth label='Full Name' variant='outlined' />
                  <TextField
                    fullWidth
                    label='Email Address'
                    type='email'
                    variant='outlined'
                  />
                  <TextField
                    fullWidth
                    label='Message'
                    multiline
                    rows={4}
                    variant='outlined'
                  />
                  <Button variant='contained' size='large' disabled>
                    Submit Message (Coming Soon)
                  </Button>
                </Stack>
              </StyledForm>
            </CardContent>
          </ModernCard>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ContactSection;
