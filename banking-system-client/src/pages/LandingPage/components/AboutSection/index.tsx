import { Container, Typography, Box, Grid } from '@mui/material';
import ModernCard, { CardContent } from '../../../../components/ModernCard';
import StatsBox from '../../../../components/StatsBox';

const AboutSection = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 10 }} id='about'>
      <Box textAlign='center' mb={8}>
        <Typography
          variant='h2'
          component='h2'
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          About Horizon Bank
        </Typography>
        <Typography
          variant='h6'
          color='text.secondary'
          sx={{ maxWidth: '800px', mx: 'auto' }}
        >
          Founded in 1990, we've been dedicated to providing secure and
          innovative banking solutions for over three decades.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ModernCard>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant='h4'
                component='h3'
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Our Values
              </Typography>
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Integrity',
                    desc: 'Ethical standards in everything we do',
                  },
                  {
                    title: 'Innovation',
                    desc: 'Technology-driven banking solutions',
                  },
                  {
                    title: 'Customer Focus',
                    desc: 'Your success is our priority',
                  },
                ].map((value, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {value.title}
                      </Typography>
                      <Typography color='text.secondary'>
                        {value.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </ModernCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ModernCard>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant='h4'
                component='h3'
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Our History
              </Typography>
              <Typography
                color='text.secondary'
                sx={{ mb: 4, lineHeight: 1.7 }}
              >
                From a local institution to a trusted name, we've grown to serve
                thousands of customers with reliable financial services.
              </Typography>
              <Grid container spacing={2}>
                {[
                  { number: '30+', label: 'Years' },
                  { number: '50K+', label: 'Customers' },
                  { number: '99.9%', label: 'Uptime' },
                ].map((stat, index) => (
                  <Grid item xs={4} key={index}>
                    <StatsBox number={stat.number} label={stat.label} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </ModernCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutSection;
